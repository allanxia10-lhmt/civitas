"use client";

import { Cloud, Database, Download, ExternalLink, HardDrive, LogIn, LogOut, Monitor, Moon, RotateCcw, Save, Sparkles, Sun, Upload } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input, Label, NativeSelect } from "@/components/ui/input";
import { Segmented } from "@/components/ui/misc";
import { CONTENT_VERSION, COURSES } from "@/content";
import type { CourseId } from "@/content/types";
import type { UserProgress } from "@/lib/progress-types";
import { useStore } from "@/lib/store";
import { getSupabase, supabaseConfigured } from "@/lib/supabase/client";
import { getThemePreference, setThemePreference, type ThemePreference } from "@/lib/theme";
import { formatDate, toDateKey } from "@/lib/utils";

export default function SettingsPage() {
  const router = useRouter();
  const progress = useStore((s) => s.progress);
  const backend = useStore((s) => s.backend);
  const user = useStore((s) => s.user);
  const updateProfile = useStore((s) => s.updateProfile);
  const loadDemo = useStore((s) => s.loadDemo);
  const resetProgress = useStore((s) => s.resetProgress);
  const importProgress = useStore((s) => s.importProgress);
  const profile = progress.profile;

  const [name, setName] = useState(profile.name);
  const [courses, setCourses] = useState<CourseId[]>(profile.courses);
  const [examDates, setExamDates] = useState(profile.examDates);
  const [minutes, setMinutes] = useState(profile.minutesPerDay);
  const [weekly, setWeekly] = useState(profile.weeklyGoalMinutes);
  const [confidence, setConfidence] = useState(profile.confidence);
  const [start, setStart] = useState(profile.planStartDate);
  const [theme, setTheme] = useState<ThemePreference>("system");
  const [resetOpen, setResetOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => setTheme(getThemePreference()), []);

  const dirty =
    name !== profile.name ||
    courses.join() !== profile.courses.join() ||
    JSON.stringify(examDates) !== JSON.stringify(profile.examDates) ||
    minutes !== profile.minutesPerDay ||
    weekly !== profile.weeklyGoalMinutes ||
    confidence !== profile.confidence ||
    start !== profile.planStartDate;

  const save = () => {
    if (!courses.length) {
      toast.error("Choose at least one course.");
      return;
    }
    updateProfile({ name: name.trim() || profile.name, courses, examDates, minutesPerDay: minutes, weeklyGoalMinutes: weekly, confidence, planStartDate: start });
    toast.success("Settings saved. Your study plan has been updated.");
  };

  const exportData = () => {
    const blob = new Blob([JSON.stringify(progress, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `civitas-progress-${toDateKey()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = async (file: File) => {
    try {
      const data = JSON.parse(await file.text()) as UserProgress;
      importProgress(data);
      toast.success("Progress imported.");
      router.push("/dashboard");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Couldn't read that file.");
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <PageHeader title="Settings" description="Your profile, study plan, appearance, and data." />

      <Card id="profile">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <Label htmlFor="s-name">Name</Label>
          <Input id="s-name" className="mt-1.5 max-w-sm" value={name} onChange={(e) => setName(e.target.value)} autoComplete="given-name" />
        </CardContent>
      </Card>

      <Card id="plan" className="scroll-mt-24">
        <CardHeader>
          <CardTitle>Study plan</CardTitle>
          <CardDescription>Changes regenerate your plan. Completed lessons stay complete; other plan tasks may shift weeks.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <fieldset>
            <legend className="text-sm font-medium">Courses</legend>
            <div className="mt-2 space-y-3">
              {COURSES.map((c) => {
                const on = courses.includes(c.id);
                return (
                  <div key={c.id} className="flex flex-col gap-3 rounded-lg border p-3 sm:flex-row sm:items-center">
                    <label className="flex flex-1 items-center gap-3 text-sm font-medium">
                      <input
                        type="checkbox"
                        className="size-4 accent-[var(--primary)]"
                        checked={on}
                        onChange={() => setCourses((prev) => (on ? prev.filter((x) => x !== c.id) : [...prev, c.id]))}
                      />
                      {c.title}
                    </label>
                    {on && (
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`s-date-${c.id}`} className="text-xs text-muted-foreground">
                          Exam date
                        </Label>
                        <Input
                          id={`s-date-${c.id}`}
                          type="date"
                          className="h-9 w-44"
                          value={examDates[c.id] ?? c.exam.nextExamDate ?? ""}
                          onChange={(e) => setExamDates((d) => ({ ...d, [c.id]: e.target.value }))}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </fieldset>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="s-minutes">Daily study time</Label>
              <NativeSelect id="s-minutes" className="mt-1.5" value={minutes} onChange={(e) => setMinutes(Number(e.target.value))}>
                {[15, 30, 45, 60, 90].map((m) => (
                  <option key={m} value={m}>
                    {m} minutes/day
                  </option>
                ))}
              </NativeSelect>
            </div>
            <div>
              <Label htmlFor="s-weekly">Weekly goal (minutes)</Label>
              <Input id="s-weekly" type="number" min={30} step={15} className="mt-1.5" value={weekly} onChange={(e) => setWeekly(Number(e.target.value) || 0)} />
            </div>
            <div>
              <Label htmlFor="s-confidence">Confidence (1–5)</Label>
              <NativeSelect id="s-confidence" className="mt-1.5" value={confidence} onChange={(e) => setConfidence(Number(e.target.value))}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </NativeSelect>
            </div>
            <div>
              <Label htmlFor="s-start">Plan start date</Label>
              <Input id="s-start" type="date" className="mt-1.5" value={start} onChange={(e) => setStart(e.target.value)} />
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={save} disabled={!dirty}>
              <Save /> Save changes
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent>
          <Segmented
            ariaLabel="Theme"
            value={theme}
            onChange={(t) => {
              setTheme(t);
              setThemePreference(t);
            }}
            options={[
              { value: "light", label: <><Sun /> Light</> },
              { value: "dark", label: <><Moon /> Dark</> },
              { value: "system", label: <><Monitor /> System</> },
            ]}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account & sync</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3 rounded-lg bg-muted/60 p-4">
            {backend === "supabase" ? <Cloud className="mt-0.5 size-5 text-success" aria-hidden /> : <HardDrive className="mt-0.5 size-5 text-muted-foreground" aria-hidden />}
            <div className="flex-1 text-sm">
              {backend === "supabase" ? (
                <>
                  <p className="font-semibold">Signed in{user?.email ? ` as ${user.email}` : ""}</p>
                  <p className="text-muted-foreground">Your progress syncs to your account.</p>
                </>
              ) : (
                <>
                  <p className="font-semibold">{profile.isDemo ? "Demo mode" : "Saved on this device"}</p>
                  <p className="text-muted-foreground">
                    Progress is stored in this browser.{" "}
                    {supabaseConfigured ? "Sign in to sync across devices." : "Connect Supabase (see README) to enable accounts and cloud sync."}
                  </p>
                </>
              )}
            </div>
          </div>
          {supabaseConfigured &&
            (user ? (
              <Button
                variant="outline"
                onClick={async () => {
                  await getSupabase()?.auth.signOut();
                  window.location.href = "/";
                }}
              >
                <LogOut /> Sign out
              </Button>
            ) : (
              <Button asChild variant="outline">
                <Link href="/login">
                  <LogIn /> Sign in
                </Link>
              </Button>
            ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your data</CardTitle>
          <CardDescription>Export a backup, move progress between browsers, or start over.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={exportData}>
            <Download /> Export progress
          </Button>
          <Button variant="outline" onClick={() => fileRef.current?.click()}>
            <Upload /> Import progress
          </Button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void importData(f);
              e.target.value = "";
            }}
          />
          <Button
            variant="outline"
            onClick={() => {
              loadDemo();
              toast.success("Demo data loaded.");
              router.push("/dashboard");
            }}
          >
            <Sparkles /> Load demo student
          </Button>
          <Button variant="destructive" onClick={() => setResetOpen(true)}>
            <RotateCcw /> Reset & start over
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="size-4" aria-hidden /> Content
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p className="text-muted-foreground">Content version {CONTENT_VERSION}</p>
          {COURSES.map((c) => (
            <p key={c.id}>
              {c.framework.name} ({c.framework.schoolYear}) — verified {formatDate(c.framework.verifiedOn, { month: "short", day: "numeric", year: "numeric" })}.{" "}
              <a href={c.framework.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-0.5 font-medium text-primary hover:underline">
                AP Central <ExternalLink className="size-3" />
              </a>
            </p>
          ))}
        </CardContent>
      </Card>

      <Dialog open={resetOpen} onOpenChange={setResetOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset all progress?</DialogTitle>
            <DialogDescription>
              This deletes your lessons, answers, flashcard history, FRQs, and test results{backend === "supabase" ? " from your account" : " from this browser"}, then takes you to setup. Export a backup
              first if you might want it later.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setResetOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={async () => {
                await resetProgress();
                setResetOpen(false);
                router.push("/onboarding");
              }}
            >
              Reset everything
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
