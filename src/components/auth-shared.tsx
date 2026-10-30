"use client";

import type { ReactNode } from "react";
import { Mail, Lock, User } from "lucide-react";

export const authInput =
  "h-12 w-full rounded-lg border border-[#eeeeee] bg-[#f8fafc] pl-12 pr-4 text-lg text-[#6c696d] focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none";
export const primaryBtn =
  "flex h-14 w-full items-center justify-center rounded-lg bg-primary text-base font-medium text-white transition-colors hover:bg-[#0e8aa4]";
export const googleBtn =
  "flex h-14 w-full items-center justify-center gap-3 rounded-lg border border-[#eeeeee] bg-white text-base text-[#6c696d] transition-colors hover:border-primary";

export function AuthField({
  label,
  icon,
  ...input
}: {
  label: string;
  icon: ReactNode;
} & React.ComponentProps<"input">) {
  return (
    <div className="space-y-2">
      <label htmlFor={input.id} className="block text-lg text-[#0c0b0b]">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6c696d]">{icon}</span>
        <input {...input} className={authInput} />
      </div>
    </div>
  );
}

export function Divider({ children }: { children: ReactNode }) {
  return (
    <div className="mt-4 flex items-center gap-4 text-base text-[#6c696d]">
      <span className="h-px flex-1 bg-[#efefef]" />
      {children}
      <span className="h-px flex-1 bg-[#efefef]" />
    </div>
  );
}

export { Mail, Lock, User };


