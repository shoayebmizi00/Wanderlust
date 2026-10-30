"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

function XLogo({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M18.24 2.25h3.32l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.22 5.45-6.22Zm-1.16 17.52h1.84L7.3 3.95H5.32L17.08 19.77Z" />
    </svg>
  );
}

function LinkedInLogo({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1-.02 5 2.5 2.5 0 0 1 .02-5ZM3 9h4v12H3V9Zm6 0h3.8v1.71h.06c.53-1 1.83-2.06 3.77-2.06C20.55 8.65 21 11.2 21 14.27V21h-4v-5.17c0-1.36-.03-3.11-1.93-3.11-1.93 0-2.22 1.49-2.22 3.01V21H9V9Z" />
    </svg>
  );
}

function InstagramLogo({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/bookings", label: "My Bookings" },
  { href: "/profile", label: "My Profile" },
];

const supportLinks = ["Help Center", "Terms of Service", "Privacy Policy"];


export function Footer() {
  return (
    <footer className="bg-[#0c0b0b] text-white">
      <div className="mx-auto max-w-6xl px-10 py-16">
        <div className="grid grid-cols-[repeat(3,minmax(0,233px))_1fr] gap-16">
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-3 space-y-3 text-[#f2eae6]">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="mt-3 space-y-3 text-[#f2eae6]">
              {supportLinks.map((l) => (
                <li key={l}>
                  <Link href="#" className="transition-colors hover:text-primary">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <ul className="mt-3 space-y-3 text-[#f2eae6]">
              {["786 901 1622", "info@wandarland.com"].map((l) => (
                <li key={l}>
                  <a href={`tel:${l}`} className="transition-colors hover:text-primary">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="max-w-sm">
            <h3 className="text-lg font-semibold">NEWSLETTER</h3>
            <p className="mt-2 text-sm text-white">
              Subscribe for exclusive travel deals and inspiration.
            </p>
            <form className="mt-3 flex items-center rounded-lg bg-[#373737] px-4">
              <input
                type="email"
                placeholder="Enter email"
                className="h-12 flex-1 bg-transparent text-[#f2eae6] placeholder:text-[#f2eae6] focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="text-white transition-colors hover:text-primary"
              >
                <ArrowUpRight className="size-6" />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-14">
          <p className="text-5xl font-semibold text-primary">
            Wander<span className="font-bold">lust</span>
          </p>
          <p className="mt-4 text-lg text-white">
            Your gateway to extraordinary travel experiences around the world.
          </p>
        </div>

        <div
          className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[#373737] pt-6 text-sm text-[#f2eae6]"
          style={{ fontSize: 14 }}
        >
          <p>© 2026 Wanderlust. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" aria-label="X (Twitter)" className="text-[#e0e4eb] transition-colors hover:text-primary">
              <XLogo />
            </a>
            <a href="#" aria-label="LinkedIn" className="text-[#e0e4eb] transition-colors hover:text-primary">
              <LinkedInLogo />
            </a>
            <a href="#" aria-label="Instagram" className="text-[#e0e4eb] transition-colors hover:text-primary">
              <InstagramLogo />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
