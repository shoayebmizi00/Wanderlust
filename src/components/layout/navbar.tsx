"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User, LogOut } from "lucide-react";
import { useAuthUser, signOut } from "@/lib/auth";
import { cn } from "@/lib/utils";

const mainLinks = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/bookings", label: "My Bookings" },
  { href: "/admin", label: "Admin" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  // Reactive session from the auth store (null when signed out).
  const user = useAuthUser();

  const accountLinks = [
    { href: "/profile", label: "Profile", icon: true },
    ...(user
      ? []
      : [
          { href: "/signin", label: "Login", icon: false },
          { href: "/signup", label: "Sign Up", icon: false },
        ]),
  ];

  function handleSignOut() {
    signOut();
    router.push("/");
  }

  return (
    <div className="absolute inset-x-0 top-0 z-40 px-4 pt-4">
      <div className="mx-auto h-14 max-w-[1408px] rounded-full bg-white px-6 shadow-sm">
        <nav className="flex h-14 items-center justify-between">
          <ul className="flex items-center gap-8 text-base text-[#0c0b0b]">
            {mainLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "transition-colors hover:text-primary",
                    (pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))) &&
                      "text-primary",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 text-2xl font-semibold tracking-tight text-primary"
          >
            Wander<span className="font-bold">lust</span>
          </Link>

          <ul className="flex items-center gap-8 text-base text-[#0c0b0b]">
            {user && (
              <li>
                <Link
                  href="/profile"
                  className={cn(
                    "flex items-center gap-1.5 transition-colors hover:text-primary",
                    pathname === "/profile" && "text-primary",
                  )}
                >
                  <User className="size-4" />
                  <span className="max-w-40 truncate">{user.name || user.email}</span>
                </Link>
              </li>
            )}
            {accountLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-1 transition-colors hover:text-primary",
                    pathname === link.href && "text-primary",
                  )}
                >
                  {link.icon && <User className="size-4" />}
                  {link.label}
                </Link>
              </li>
            ))}
            {user && (
              <li>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex cursor-pointer items-center gap-1.5 transition-colors hover:text-primary"
                >
                  <LogOut className="size-4" />
                  Sign Out
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}
