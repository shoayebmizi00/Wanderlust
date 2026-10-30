"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Headphones,
  MapPin,
  ShieldCheck,
  Star,
} from "lucide-react";
import { DestinationCardLarge } from "@/components/destination-card";
import { TESTIMONIALS } from "@/lib/data";
import { useStore } from "@/lib/store";

const searchFields = [
  { label: "Location", value: "Address, City or Zip" },
  { label: "Date/Duration", value: "Anytime/3 Days" },
  { label: "Budget", value: "$0-$3000" },
  { label: "People", value: "5-10" },
];

const whyItems = [
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    text: "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: MapPin,
    title: "Expert Guides",
    text: "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    text: "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

function SearchBar() {
  return (
    <div className="mx-auto grid h-19 max-w-6xl grid-cols-[repeat(4,310px)_200px] overflow-hidden rounded-none bg-white text-[#6c696d]">
      {searchFields.map((f) => (
        <button
          key={f.label}
          type="button"
          className="h-19 border-r border-[#efefef] px-6 text-left transition-colors hover:bg-[#f9fafc]"
        >
          <p className="text-xl font-medium text-[#0c0b0b]">{f.label}</p>
          <p className="mt-0.5 text-sm">{f.value}</p>
        </button>
      ))}
      <Link
        href="/destinations"
        className="flex h-19 items-center justify-center bg-primary text-xl font-medium text-white transition-colors hover:bg-[#0e8aa4]"
      >
        Search
      </Link>
    </div>
  );
}

function FeaturedDestinations() {
  const { packages } = useStore();
  const [page, setPage] = useState(0);
  const pageCount = Math.max(1, Math.ceil(packages.length / 3));
  const visible = packages.slice(page * 3, page * 3 + 3);

  return (
    <section className="bg-white py-32">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <h2 className="text-[60px] font-semibold leading-none text-[#0c0b0b]">Featured Destinations</h2>
            <p className="mt-2 text-lg text-[#6c696d]">Handpicked travel experiences for the adventure seekers</p>
          </div>
          <Link
            href="/destinations"
            className="inline-flex h-14 items-center gap-2 rounded-lg border border-primary px-6 text-base font-medium text-primary transition-colors hover:bg-primary hover:text-white"
          >
            ALL DESTINATIONS
            <ArrowRight className="size-5" />
          </Link>
        </div>

        <div className="mt-14 gap-10 sm:gap-8 lg:grid lg:grid-cols-3">
          {visible.map((pkg) => (
            <DestinationCardLarge key={pkg.id} pkg={pkg} />
          ))}
        </div>

        <div className="mt-24 flex items-center gap-5">
          <p className="text-3xl font-semibold text-primary">
            {page + 1}/{pageCount}
          </p>
          <div className="h-px flex-1 bg-[#d3d3d3]" />
          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => setPage((p) => (p - 1 + pageCount) % pageCount)}
              className="flex size-15 items-center justify-center rounded-full bg-[#b6b6b6]/80 text-white transition-colors hover:bg-primary"
            >
              <ArrowLeft className="size-6" />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => setPage((p) => (p + 1) % pageCount)}
              className="flex size-15 items-center justify-center rounded-full bg-[#b6b6b6]/80 text-white transition-colors hover:bg-primary"
            >
              <ArrowRight className="size-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyChoose() {
  return (
    <section className="bg-[#edfcff] py-30">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-[60px] font-semibold leading-none text-[#0c0b0b]">Why Choose Wanderlust</h2>
        <p className="mt-2 text-lg text-[#6c696d]">Your trusted partner for exceptional travel experiences</p>
        <div className="mt-14 gap-6 lg:grid lg:grid-cols-3">
          {whyItems.map((item) => (
            <div key={item.title} className="p-10 lg:bg-white">
              <item.icon className="size-12 text-primary" strokeWidth={1.8} />
              <h3 className="mt-6 text-[32px] font-semibold text-[#0c0b0b]">{item.title}</h3>
              <p className="mt-2 max-w-[331px] text-base text-[#6c696d]">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stars() {
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="size-4 fill-current text-white" />
      ))}
    </span>
  );
}

function Testimonials() {
  const [start, setStart] = useState(0);

  return (
    <section className="bg-white py-32">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <h2 className="text-[60px] font-semibold leading-none text-[#0c0b0b]">What Travelers Say</h2>
            <p className="mt-2 text-lg text-[#6c696d]">Real experiences from our happy travelers</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => setStart((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
              className="flex size-15 items-center justify-center rounded-full bg-[#b6b6b6]/80 text-white transition-colors hover:bg-primary"
            >
              <ArrowLeft className="size-6" />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => setStart((p) => (p + 1) % TESTIMONIALS.length)}
              className="flex size-15 items-center justify-center rounded-full bg-[#b6b6b6]/80 text-white transition-colors hover:bg-primary"
            >
              <ArrowRight className="size-6" />
            </button>
          </div>
        </div>

        <div className="mt-14 gap-16 lg:grid lg:grid-cols-2">
          {TESTIMONIALS.map((_, i) => TESTIMONIALS[(i + start) % TESTIMONIALS.length]).map((t) => (
            <article key={t.author} className="flex justify-between gap-12 border border-[#eeeeee] bg-white p-6">
              <div className="max-w-[314px]">
                <div className="flex items-center gap-2">
                  {/* Google mark */}
                  <svg viewBox="0 0 24 24" className="size-6" aria-hidden>
                    <path fill="#FFC107" d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-5.58 5-7.44 6.68-7.44 2.06 0 3.53.7 4.9 2.1l1.9-1.93C16.79 3.05 14.66 2 11.68 2 6.98 2 2.03 5.79 2.03 12c0 5.89 4.94 10 9.65 10 5.11 0 9.93-3.94 9.93-9.83 0-.55-.06-1.07-.26-1.07z" />
                    <path fill="#FF3D00" d="M2.03 12c0-2.86 1.32-4.98 2.88-6.27l-1.9-2.13C1.06 5.35 0 8.36 0 12s1.06 6.65 3.01 8.4l1.9-2.13C3.35 16.98 2.03 14.86 2.03 12" />
                    <path fill="#4CAF50" d="M11.68 24c4.4 0 8.61-2.53 9.93-6.77l-2.24-1.44c-.8 2.42-3.62 4.7-7.69 4.7-3.1 0-6.1-2.16-6.93-5.1l-1.9 2.13C4.55 21.1 7.9 24 11.68 24" />
                    <path fill="#1976D2" d="M21.61 11.1h-9.43v2.73h6.84c-.17 1.44-.98 2.87-2.22 3.86l2.24 1.44c1.64-1.48 2.57-3.55 2.57-8.03z" />
                  </svg>
                  <span className="text-sm font-medium text-[#121212]">{t.rating}</span>
                  <Stars />
                </div>
                <p className="mt-4 text-2xl leading-8 text-[#0c0b0b]">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-4 border-t border-[#efefef] pt-3">
                  <p className="text-base font-medium text-primary">— {t.author}</p>
                  <p className="text-sm text-[#6c696d]">{t.from}</p>
                </div>
              </div>
              <div className="relative aspect-218/264 w-54 shrink-0 overflow-hidden rounded-lg">
                <Image src={t.photo} alt={t.author} fill sizes="218px" className="object-cover" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section className="relative h-110 overflow-hidden">
      <Image src="/assets/cta.jpg" alt="Aerial view of a tropical island" fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0c0b0b]/70 via-[#0c0b0b]/40 to-transparent" />
      <div className="relative mx-auto flex h-full max-w-6xl flex-col items-center justify-center text-center">
        <h2 className="text-[60px] font-semibold leading-none text-white">Ready to Start Your Journey?</h2>
        <p className="mt-4 text-xl text-white">Join thousands of travelers who have discovered the world with us</p>
        <Link
          href="/destinations"
          className="mt-11 inline-flex h-14 items-center gap-2 rounded-lg bg-white px-8 text-base font-medium text-[#0c0b0b] transition-colors hover:bg-[#f0f0f0]"
        >
            BOOK YOUR TRIP TODAY
            <ArrowUpRight className="size-5" />
        </Link>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative">
        <div className="relative h-[93.5rem] min-h-[746px] overflow-hidden">
          <Image
            src="/assets/hero.jpg"
            alt="Coastal mountains with a plane taking off"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/50" />
        </div>

        <div className="absolute inset-x-0 top-40 mx-auto flex max-w-6xl flex-col items-center px-6 text-center">
          <h1 className="text-[104px] font-semibold leading-[1.1] text-white">Discover Your Next Adventure</h1>
          <p className="mt-4 max-w-[662px] text-xl text-[#b6b6b6]">
            Explore breathtaking destinations and create unforgettable memories with our curated travel experiences.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <Link
              href="/destinations"
              className="inline-flex h-14 items-center gap-2 rounded-lg bg-primary px-8 text-base font-medium text-white transition-colors hover:bg-[#0e8aa4]"
            >
              EXPLORE NOW
              <ArrowRight className="size-5" />
            </Link>
            <Link
              href="/destinations"
              className="inline-flex h-14 items-center gap-2 rounded-lg bg-white px-8 text-base font-medium text-[#0c0b0b] transition-colors hover:bg-[#f0f0f0]"
            >
              VIEW DESTINATION
            </Link>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0">
          <SearchBar />
        </div>
      </section>

      <FeaturedDestinations />
      <WhyChoose />
      <Testimonials />
      <Cta />
    </main>
  );
}
