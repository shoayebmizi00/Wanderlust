"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Lock, Mail } from "lucide-react";
import { AuthField, Divider, googleBtn, primaryBtn } from "@/components/auth-shared";
import { GoogleIcon } from "@/components/google-icon";
import { signIn } from "@/lib/auth";
import { cn } from "@/lib/utils";

function SimpleCheckbox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onChange}
      className={cn(
        "flex size-5 items-center justify-center rounded border transition-colors",
        checked ? "border-primary bg-primary" : "border-[#b6b6b6] bg-white",
      )}
    >
      {checked && (
        <svg viewBox="0 0 16 16" className="size-3 fill-none stroke-2 stroke-white">
          <path d="M3 8.5 6 11.5 13 4.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isPending, setIsPending] = useState(false);

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsPending(true);
    try {
      const result = await signIn(email, password);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.push("/");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <main className="bg-[#f9fafc] pb-24">
      <div className="pt-31">
        <div className="mx-auto max-w-6xl px-5">
          <div className="text-center">
            <h1 className="text-5xl font-semibold text-[#0c0b0b]">Welcome Back</h1>
            <p className="mt-2 text-xl text-[#6c696d]">Resume your adventure with Wanderlust</p>
          </div>

          <div className="mx-auto mt-12 w-full max-w-[600px] rounded-xl border border-[#eeeeee] bg-white p-10">
            {message && (
              <p className="mb-6 rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-base text-primary">
                {message}
              </p>
            )}

            <form className="space-y-6" onSubmit={handleSignIn}>
              <AuthField
                id="signin-email"
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                icon={<Mail className="size-5" />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <AuthField
                id="signin-password"
                label="Password"
                type="password"
                placeholder="Enter your password"
                icon={<Lock className="size-5" />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <div className="flex items-center justify-between text-lg text-[#6c696d]">
                <label className="flex cursor-pointer items-center gap-2">
                  <SimpleCheckbox checked={remember} onChange={() => setRemember((v) => !v)} />
                  Remember me
                </label>
                <Link href="#" className="transition-colors hover:text-primary">
                  Forgot password?
                </Link>
              </div>

              {error && (
                <p className="rounded-lg border border-[#ef4444]/30 bg-[#ef4444]/10 px-4 py-3 text-base text-[#ef4444]">
                  {error}
                </p>
              )}

              <button type="submit" disabled={isPending} className={cn(primaryBtn, "disabled:opacity-60")}>
                {isPending ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <Divider>Or continue with</Divider>

            <button
              type="button"
              onClick={() => setMessage("Google sign-in isn't set up yet — use your email & password.")}
              className={`${googleBtn} mt-4`}
            >
              <GoogleIcon className="size-5" />
              Sign In With Google
            </button>

            <p className="mt-6 text-center text-lg text-[#6c696d]">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="font-medium text-primary transition-colors hover:text-[#0e8aa4]">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
