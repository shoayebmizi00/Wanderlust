"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Lock, Mail, User } from "lucide-react";
import { AuthField, Divider, googleBtn, primaryBtn } from "@/components/auth-shared";
import { GoogleIcon } from "@/components/google-icon";
import { signUp } from "@/lib/auth";
import { cn } from "@/lib/utils";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isPending, setIsPending] = useState(false);

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    setIsPending(true);
    try {
      const result = await signUp(name, email, password);
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
            <h1 className="text-5xl font-semibold text-[#0c0b0b]">Create Account</h1>
            <p className="mt-2 text-xl text-[#6c696d]">Start your adventure with Wanderlust</p>
          </div>

          <div className="mx-auto mt-12 w-full max-w-[600px] rounded-xl border border-[#eeeeee] bg-white p-10">
            {message && (
              <p className="mb-6 rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-base text-primary">
                {message}
              </p>
            )}

            <form className="space-y-6" onSubmit={handleSignUp}>
              <AuthField
                id="signup-name"
                label="Full Name"
                placeholder="Enter your name"
                icon={<User className="size-5" />}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <AuthField
                id="signup-email"
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                icon={<Mail className="size-5" />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <AuthField
                id="signup-password"
                label="Password"
                type="password"
                placeholder="At least 6 characters"
                icon={<Lock className="size-5" />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <AuthField
                id="signup-confirm"
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
                icon={<Lock className="size-5" />}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />

              {error && (
                <p className="rounded-lg border border-[#ef4444]/30 bg-[#ef4444]/10 px-4 py-3 text-base text-[#ef4444]">
                  {error}
                </p>
              )}

              <button type="submit" disabled={isPending} className={cn(primaryBtn, "disabled:opacity-60")}>
                {isPending ? "Creating account..." : "Create Account"}
              </button>
            </form>

            <Divider>Or sign up with</Divider>

            <button
              type="button"
              onClick={() => setMessage("Google sign-up isn't set up yet — use your email & password.")}
              className={`${googleBtn} mt-4`}
            >
              <GoogleIcon className="size-5" />
              Sign Up With Google
            </button>

            <p className="mt-6 text-center text-lg text-[#6c696d]">
              Already have an account?{" "}
              <Link href="/signin" className="font-medium text-primary transition-colors hover:text-[#0e8aa4]">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
