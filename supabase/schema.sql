-- =============================================================================
-- Civitas — Supabase schema
--
-- Part 1: user data (required for accounts + sync). Every table is protected by
--         Row Level Security so each student can only read/write their own rows.
-- Part 2: course content (optional). The app ships content as typed modules in
--         src/content. If you want to manage content in the database instead,
--         create these tables and load them with `npm run seed:sql`.
--
-- Run in the Supabase SQL editor (or `supabase db push`).
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Part 1 · User data
-- -----------------------------------------------------------------------------

create table if not exists public.profiles (
  id                   uuid primary key references auth.users on delete cascade,
  name                 text not null default '',
  courses              text[] not null default '{}',          -- 'usgov' | 'compgov'
  exam_dates           jsonb not null default '{}',           -- { "usgov": "2027-05-04" }
  minutes_per_day      int  not null default 30 check (minutes_per_day between 5 and 240),
  confidence           int  not null default 3 check (confidence between 1 and 5),
  plan_start_date      date not null default current_date,
  weekly_goal_minutes  int  not null default 150,
  onboarded            boolean not null default false,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);

create table if not exists public.lesson_progress (
  user_id       uuid not null references auth.users on delete cascade,
  lesson_id     text not null,
  started_at    timestamptz,
  completed_at  timestamptz,
  primary key (user_id, lesson_id)
);

create table if not exists public.question_attempts (
  id            text primary key,
  user_id       uuid not null references auth.users on delete cascade,
  question_id   text not null,
  course_id     text not null,
  unit_id       text not null,
  topic_id      text not null,
  selected      text not null check (selected in ('A','B','C','D')),
  correct       boolean not null,
  seconds       int not null default 0,
  source        text not null check (source in ('practice','quick-check','test','review')),
  attempted_at  timestamptz not null default now()
);
create index if not exists question_attempts_user_time on public.question_attempts (user_id, attempted_at);
create index if not exists question_attempts_user_topic on public.question_attempts (user_id, topic_id);

create table if not exists public.flashcard_states (
  user_id        uuid not null references auth.users on delete cascade,
  card_id        text not null,
  ease           real not null default 2.5,
  interval_days  int  not null default 0,
  reps           int  not null default 0,
  lapses         int  not null default 0,
  reviews        int  not null default 0,
  due            date not null,
  last_grade     text check (last_grade in ('again','hard','easy')),
  last_reviewed  timestamptz,
  primary key (user_id, card_id)
);
create index if not exists flashcard_states_due on public.flashcard_states (user_id, due);

create table if not exists public.custom_flashcards (
  id          text primary key,
  user_id     uuid not null references auth.users on delete cascade,
  course_id   text not null,
  front       text not null,
  back        text not null,
  unit_id     text,
  created_at  timestamptz not null default now()
);

create table if not exists public.frq_submissions (
  id            text primary key,
  user_id       uuid not null references auth.users on delete cascade,
  frq_id        text not null,
  course_id     text not null,
  frq_type      text not null,
  responses     jsonb not null,           -- string[] (one per part)
  criteria_met  text[] not null default '{}',
  earned        int not null,             -- self-confirmed estimate, not official AP scoring
  possible      int not null,
  seconds       int not null default 0,
  submitted_at  timestamptz not null default now()
);

create table if not exists public.test_attempts (
  id             text primary key,
  user_id        uuid not null references auth.users on delete cascade,
  test_id        text not null,
  course_id      text not null,
  mode           text not null check (mode in ('timed','untimed')),
  section        text not null check (section in ('full','mcq','frq')),
  answers        jsonb not null,          -- { questionId: 'A' | null }
  flagged        text[] not null default '{}',
  frq_responses  jsonb not null default '{}',
  correct        int not null,
  total          int not null,
  seconds        int not null,
  started_at     timestamptz not null,
  completed_at   timestamptz not null
);

create table if not exists public.study_sessions (
  id          text primary key,
  user_id     uuid not null references auth.users on delete cascade,
  date        date not null,              -- the student's local calendar day
  minutes     int not null check (minutes >= 0),
  activity    text not null check (activity in ('lesson','practice','flashcards','frq','test','reading')),
  ref_id      text,
  created_at  timestamptz not null default now()
);
create index if not exists study_sessions_user_date on public.study_sessions (user_id, date);

create table if not exists public.completed_tasks (
  user_id       uuid not null references auth.users on delete cascade,
  task_id       text not null,            -- deterministic study-plan task id
  completed_at  timestamptz not null default now(),
  primary key (user_id, task_id)
);

create table if not exists public.user_meta (
  user_id            uuid primary key references auth.users on delete cascade,
  seen_achievements  text[] not null default '{}',
  last_viewed        jsonb not null default '{}',
  saved_questions    jsonb not null default '{}',   -- copies of missed generated/AI questions (Mistake Log)
  dismissed_mistakes text[] not null default '{}'
);
-- For databases created before the Mistake Log existed:
alter table public.user_meta add column if not exists saved_questions jsonb not null default '{}';
alter table public.user_meta add column if not exists dismissed_mistakes text[] not null default '{}';

-- Row Level Security: owners only ---------------------------------------------
alter table public.profiles          enable row level security;
alter table public.lesson_progress   enable row level security;
alter table public.question_attempts enable row level security;
alter table public.flashcard_states  enable row level security;
alter table public.custom_flashcards enable row level security;
alter table public.frq_submissions   enable row level security;
alter table public.test_attempts     enable row level security;
alter table public.study_sessions    enable row level security;
alter table public.completed_tasks   enable row level security;
alter table public.user_meta         enable row level security;

drop policy if exists "own profile" on public.profiles;
create policy "own profile" on public.profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

do $$
declare t text;
begin
  foreach t in array array[
    'lesson_progress','question_attempts','flashcard_states','custom_flashcards',
    'frq_submissions','test_attempts','study_sessions','completed_tasks','user_meta'
  ] loop
    execute format('drop policy if exists "own rows" on public.%I', t);
    execute format(
      'create policy "own rows" on public.%I for all using (auth.uid() = user_id) with check (auth.uid() = user_id)', t);
  end loop;
end $$;

-- Handy view for analytics: accuracy per topic per student.
create or replace view public.topic_accuracy
with (security_invoker = true) as
select user_id, course_id, topic_id,
       count(*)                                   as attempts,
       count(*) filter (where correct)            as correct,
       round(100.0 * count(*) filter (where correct) / nullif(count(*), 0)) as percent,
       max(attempted_at)                          as last_attempt
from public.question_attempts
group by user_id, course_id, topic_id;

-- -----------------------------------------------------------------------------
-- Part 2 · Course content (optional)
-- Public read, no client writes. Load with: npm run seed:sql > supabase/seed.sql
-- -----------------------------------------------------------------------------

create table if not exists public.courses (
  id          text primary key,
  title       text not null,
  data        jsonb not null              -- framework + exam metadata
);

create table if not exists public.units (
  id              text primary key,
  course_id       text not null references public.courses,
  number          int  not null,
  title           text not null,
  exam_weight     text not null,          -- official CED weighting, e.g. '15%–22%'
  weight_midpoint real not null,
  lesson_ids      text[] not null
);

create table if not exists public.lessons (
  id         text primary key,            -- also the topic id
  course_id  text not null references public.courses,
  unit_id    text not null references public.units,
  title      text not null,
  minutes    int  not null,
  tags       text[] not null default '{}',
  body       jsonb not null               -- overview, keyConcepts, deepDive, example, examConnection, commonMistakes, related ids
);

create table if not exists public.questions (
  id          text primary key,
  course_id   text not null references public.courses,
  unit_id     text not null references public.units,
  topic_id    text not null references public.lessons,
  difficulty  text not null check (difficulty in ('easy','medium','hard')),
  concept     text not null,
  stem        text not null,
  stimulus    jsonb,
  choices     jsonb not null,             -- [{ id, text, rationale }]
  answer      text not null check (answer in ('A','B','C','D')),
  explanation text not null,
  refs        jsonb not null default '{}' -- { caseIds, documentIds, countryIds }
);

create table if not exists public.flashcards (
  id         text primary key,
  course_id  text not null references public.courses,
  deck       text not null,
  front      text not null,
  back       text not null,
  unit_id    text
);

create table if not exists public.frqs (
  id                 text primary key,
  course_id          text not null references public.courses,
  frq_type           text not null,
  title              text not null,
  suggested_minutes  int  not null,
  data               jsonb not null       -- intro, stimulus, parts (with practice rubric + model answers), scoring notes
);

create table if not exists public.supreme_court_cases (
  id        text primary key,
  name      text not null,
  year      int  not null,
  required  boolean not null,
  unit_id   text references public.units,
  data      jsonb not null
);

create table if not exists public.foundational_documents (
  id        text primary key,
  title     text not null,
  added_in  text,
  data      jsonb not null
);

create table if not exists public.countries (
  id            text primary key,
  name          text not null,
  last_updated  date not null,            -- shown on the profile page
  data          jsonb not null
);

do $$
declare t text;
begin
  foreach t in array array[
    'courses','units','lessons','questions','flashcards','frqs',
    'supreme_court_cases','foundational_documents','countries'
  ] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists "public read" on public.%I', t);
    execute format('create policy "public read" on public.%I for select using (true)', t);
  end loop;
end $$;
