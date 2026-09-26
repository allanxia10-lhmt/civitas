"use client";

import { ArrowLeft, Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { getSupabase, supabaseConfigured } from "@/lib/supabase/client";

/**
 * Passwordless sign-in with a Supabase magic link. The link returns to
 * /dashboard, where the Supabase client exchanges the code for a session and
 * the store switches to the Supabase repository.
 */
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    getSupabase()
      ?.auth.getSession()
      .then(({ data }) => {
        if (data.session) router.replace("/dashboard");
      });
  }, [router]);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = getSupabase();
    if (!supabase) return;
    setStatus("sending");
    const { error: err } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/dashboard` },
    });
    if (err) {
      setError(err.message);
      setStatus("error");
    } else setStatus("sent");
  };

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <Logo href="/" />
        </div>
        <div className="rounded-2xl border bg-card p-6 shadow-card">
          {!supabaseConfigured ? (
            <>
              <h1 className="text-xl font-bold tracking-tight">Accounts aren&apos;t set up yet</h1>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                This copy of Civitas runs in demo mode and saves progress in your browser. To enable sign-in and cloud sync, add your Supabase URL and anon key to
                <code className="mx-1 rounded bg-muted px-1 py-0.5 text-xs">.env.local</code>— see the README.
              </p>
              <Button asChild className="mt-5 w-full">
                <Link href="/dashboard">Continue in demo mode</Link>
              </Button>
            </>
          ) : status === "sent" ? (
            <div className="text-center" role="status">
              <Mail className="mx-auto size-8 text-primary" aria-hidden />
              <h1 className="mt-3 text-xl font-bold tracking-tight">Check your email</h1>
              <p className="mt-2 text-sm text-muted-foreground">We sent a sign-in link to {email}. Open it on this device to continue.</p>
            </div>
          ) : (
            <form onSubmit={send} className="space-y-4">
              <div>
                <h1 className="text-xl font-bold tracking-tight">Sign in to Civitas</h1>
                <p className="mt-1 text-sm text-muted-foreground">We&apos;ll email you a secure sign-in link — no password needed.</p>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required autoComplete="email" className="mt-1.5" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              {status === "error" && (
                <p className="text-sm text-danger" role="alert">
                  {error}
                </p>
              )}
              <Button type="submit" className="w-full" disabled={status === "sending"}>
                {status === "sending" ? <Loader2 className="animate-spin" /> : <Mail />} Email me a link
              </Button>
            </form>
          )}
        </div>
        <Link href="/" className="mt-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> Back home
        </Link>
      </div>
    </div>
  );
}
