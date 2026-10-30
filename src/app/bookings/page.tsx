"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, CheckCircle2, Clock, Eye, MapPin, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const ratingCircleStyles = {
  Confirmed: "bg-[#e8f9ee] text-[#1e9e35]",
  Pending: "bg-[#fff5e5] text-[#fe9a00]",
} as const;

export default function BookingsPage() {
  const { bookings, cancelBooking } = useStore();

  return (
    <main className="bg-[#f9fafc] pb-24">
      <div className="pt-31">
        <div className="mx-auto max-w-6xl px-5">
          <h1 className="text-[60px] font-semibold leading-none text-[#0c0b0b]">My Bookings</h1>
          <p className="mt-4 text-xl text-[#6c696d]">Manage and view your upcoming travel plans</p>

          <div className="mt-12 space-y-6">
            {bookings.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-[#eeeeee] bg-white py-20">
                <p className="text-2xl text-[#6c696d]">You have no bookings yet.</p>
                <Link
                  href="/destinations"
                  className="inline-flex h-14 items-center rounded-lg bg-primary px-8 text-base font-medium text-white transition-colors hover:bg-[#0e8aa4]"
                >
                  Explore Destinations
                </Link>
              </div>
            )}
            {bookings.map((b) => (
              <article
                key={b.id}
                className="flex flex-nowrap items-center justify-between gap-6 rounded-xl border border-[#eeeeee] bg-white p-6"
              >
                <div className="relative h-53 w-80 shrink-0 overflow-hidden rounded-lg">
                  <Image src={b.image} alt={b.name} fill sizes="320px" className="object-cover" />
                </div>

                <div className="min-w-0 max-w-[500px] flex-1">
                  <span
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-base font-medium",
                      ratingCircleStyles[b.status],
                    )}
                  >
                    {b.status === "Confirmed" ? <CheckCircle2 className="size-5" /> : <Clock className="size-5" />}
                    {b.status}
                  </span>
                  <h2 className="mt-2 text-[40px] font-semibold leading-tight text-[#0c0b0b]">{b.name}</h2>
                  <div className="mt-3 space-y-1.5 text-base text-[#6c696d]">
                    <p className="flex items-center gap-2">
                      <MapPin className="size-5" />
                      Booking ID: {b.id}
                    </p>
                    <p className="flex items-center gap-2">
                      <Calendar className="size-5" />
                      Departure: {b.departure}
                    </p>
                  </div>
                  <p className="mt-3 text-[40px] font-semibold leading-none text-primary">${b.price}</p>
                </div>

                <div className="flex items-end gap-4">
                  <Button
                    variant="outline"
                    className="h-12 rounded-lg border-[#ef4444] px-5 text-base text-[#ef4444] hover:text-[#ef4444]"
                    onClick={() => cancelBooking(b.id)}
                  >
                    <Trash2 className="size-5" />
                    Cancel
                  </Button>
                  <Link
                    href={`/destinations/${b.packageId}`}
                    className="inline-flex h-12 items-center gap-2 rounded-lg bg-primary px-5 text-base font-medium text-white transition-colors hover:bg-[#0e8aa4]"
                  >
                    <Eye className="size-5" />
                    View
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
