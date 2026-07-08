"use client";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { ArrowRight, Loader2, Mail, Sparkles } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth, googleProvider } from "@/src/lib/firebase";

function getAuthMessage(error: unknown) {
  const code = typeof error === "object" && error !== null && "code" in error
    ? String((error as { code?: string }).code)
    : "";

  switch (code) {
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/missing-password":
      return "Please enter your password.";
    case "auth/weak-password":
      return "Use at least 6 characters for your password.";
    case "auth/email-already-in-use":
      return "This email already has a CraftVerse account.";
    case "auth/invalid-credential":
    case "auth/user-not-found":
    case "auth/wrong-password":
      return "The email or password does not look right.";
    case "auth/popup-closed-by-user":
      return "Google sign-in was closed before it finished.";
    default:
      return "Something went wrong. Please try again.";
  }
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loadingAction, setLoadingAction] = useState<"login" | "signup" | "google" | null>(null);

  const redirectToDashboard = () => {
    router.push("/dashboard");
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoadingAction("login");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      redirectToDashboard();
    } catch (authError) {
      setError(getAuthMessage(authError));
    } finally {
      setLoadingAction(null);
    }
  };

  const handleSignup = async () => {
    setError("");
    setLoadingAction("signup");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      redirectToDashboard();
    } catch (authError) {
      setError(getAuthMessage(authError));
    } finally {
      setLoadingAction(null);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoadingAction("google");

    try {
      await signInWithPopup(auth, googleProvider);
      redirectToDashboard();
    } catch (authError) {
      setError(getAuthMessage(authError));
    } finally {
      setLoadingAction(null);
    }
  };

  const isBusy = loadingAction !== null;

  return (
    <section className="min-h-[calc(100vh-112px)] overflow-hidden rounded-[2rem] border border-[#008099]/15 bg-[#FFF8F3] text-slate-950 shadow-[0_22px_70px_rgba(0,128,153,0.16)] dark:border-white/10 dark:bg-[#08111f] dark:text-white">
      <div className="grid min-h-[calc(100vh-112px)] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative flex items-center px-5 py-8 sm:px-8 lg:px-12">
          <div className="w-full max-w-xl">
            <div className="mb-8 flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="CraftVerse"
                width={58}
                height={58}
                priority
                className="h-14 w-14 object-contain"
              />
              <div>
                <p className="text-2xl font-black tracking-tight">
                  Craft<span className="text-[#008099]">Verse</span>
                </p>
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Learn, create, share, sell.
                </p>
              </div>
            </div>

            <div className="mb-8">
              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#4EFE32]/40 bg-white/70 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#008099] dark:bg-white/10">
                <Sparkles size={14} />
                Cozy creator access
              </p>
              <h1 className="max-w-lg text-4xl font-black leading-tight tracking-tight sm:text-5xl">
                Continue your creative journey.
              </h1>
              <p className="mt-4 max-w-md text-base leading-7 text-slate-600 dark:text-slate-300">
                Save tutorials, track XP, unlock badges, and build your handmade reputation.
              </p>
            </div>

            <form onSubmit={handleLogin} className="rounded-3xl border border-white/80 bg-white/88 p-4 shadow-2xl shadow-[#008099]/10 backdrop-blur sm:p-6 dark:border-white/10 dark:bg-white/10">
              <label className="mb-4 block">
                <span className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">
                  Email
                </span>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#008099]" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="creator@craftverse.com"
                    autoComplete="email"
                    required
                    className="h-13 rounded-2xl border-[#008099]/20 bg-[#FFF8F3] pl-12 font-semibold focus-visible:ring-[#008099]/25 dark:bg-white/10"
                  />
                </div>
              </label>

              <label className="mb-4 block">
                <span className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">
                  Password
                </span>
                <Input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="At least 6 characters"
                  autoComplete="current-password"
                  required
                  className="h-13 rounded-2xl border-[#008099]/20 bg-[#FFF8F3] font-semibold focus-visible:ring-[#008099]/25 dark:bg-white/10"
                />
              </label>

              {error ? (
                <p className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 dark:border-rose-400/30 dark:bg-rose-500/10 dark:text-rose-200">
                  {error}
                </p>
              ) : null}

              <div className="grid gap-3 sm:grid-cols-2">
                <Button
                  type="submit"
                  disabled={isBusy}
                  className="h-12 rounded-2xl bg-[#008099] text-base font-black text-white shadow-lg shadow-[#008099]/20 hover:bg-[#006f85]"
                >
                  {loadingAction === "login" ? <Loader2 className="animate-spin" /> : <ArrowRight />}
                  Log in
                </Button>
                <Button
                  type="button"
                  disabled={isBusy}
                  onClick={handleSignup}
                  className="h-12 rounded-2xl bg-[#7C4DFF] text-base font-black text-white shadow-lg shadow-[#7C4DFF]/20 hover:bg-[#6b3df0]"
                >
                  {loadingAction === "signup" ? <Loader2 className="animate-spin" /> : null}
                  Create account
                </Button>
              </div>

              <Button
                type="button"
                variant="outline"
                disabled={isBusy}
                onClick={handleGoogleSignIn}
                className="mt-3 h-12 w-full rounded-2xl border-[#008099]/25 bg-white text-base font-black text-slate-900 hover:bg-[#4EFE32]/15 dark:bg-white/10 dark:text-white"
              >
                {loadingAction === "google" ? <Loader2 className="animate-spin" /> : null}
                Continue with Google
              </Button>
            </form>
          </div>
        </div>

        <div className="hidden min-h-full bg-[#008099] p-8 lg:flex">
          <div className="flex w-full flex-col justify-between rounded-[1.5rem] bg-[linear-gradient(135deg,rgba(78,254,50,0.92),rgba(255,248,243,0.94)_42%,rgba(124,77,255,0.9))] p-8 text-slate-950 shadow-2xl">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#008099]">
                CraftVerse Passport
              </p>
              <h2 className="mt-4 text-4xl font-black leading-tight">
                One account for tutorials, XP, projects, and your maker shop.
              </h2>
            </div>
            <div className="grid gap-3">
              {["Watch curated lessons", "Ask the AI tutor", "Upload finished projects", "Unlock your dashboard"].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/70 px-4 py-3 text-sm font-black shadow-sm">
                  <span className="h-3 w-3 rounded-full bg-[#008099]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
