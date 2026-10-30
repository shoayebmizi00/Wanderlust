"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  MapPin,
  Minus,
  PencilLine,
  Plus,
  Star,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EditPackageDialog, DeletePackageDialog } from "@/components/package-dialogs";
import { RatingBadge } from "@/components/destination-card";
import { useStore } from "@/lib/store";

const highlights = [
  "Luxury beachfront accommodation",
  "Traditional Balinese spa treatment",
  "Sunrise trek to Mount Batur",
  "Visit Uluwatu Temple at sunset",
  "Private beach dinner experience",
];

export default function DestinationDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { getPackage, addBooking } = useStore();
  const pkg = getPackage(id);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [travelers, setTravelers] = useState(2);
  const [departure, setDeparture] = useState(pkg?.departure ?? "05/15/2026");

  if (!pkg) {
    return (
      <main className="flex min-h-[60dvh] flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-4xl font-semibold text-[#0c0b0b]">Destination not found</h1>
        <Link
          href="/destinations"
          className="inline-flex h-14 items-center rounded-lg bg-primary px-8 text-base font-medium text-white transition-colors hover:bg-[#0e8aa4]"
        >
          Back to Destinations
        </Link>
      </main>
    );
  }

  const thumbnails = [pkg.image, "/assets/swiss-alps.jpg", "/assets/peru-trek.jpg"].filter(
    (src, i, arr) => arr.indexOf(src) === i,
  );

  return (
    <main className="pb-24">
      <div className="mx-auto max-w-6xl px-5 pt-31">
        {/* Back / actions */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/destinations"
            className="flex items-center gap-2 text-xl text-[#6c696d] transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-5" />
            Back to Destinations
          </Link>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setEditOpen(true)}
              className="inline-flex h-12 items-center gap-2 rounded-lg border border-[#b6b6b6] px-6 text-base text-[#0c0b0b] transition-colors hover:border-primary hover:text-primary"
            >
              <PencilLine className="size-5" />
              Edit
            </button>
            <button
              type="button"
              onClick={() => setDeleteOpen(true)}
              className="inline-flex h-12 items-center gap-2 rounded-lg border border-[#b6b6b6] px-6 text-base text-[#ef4444] transition-colors hover:border-[#ef4444]"
            >
              <Trash2 className="size-5" />
              Cancel
            </button>
          </div>
        </div>

        {/* Hero image */}
        <div className="relative mt-6 h-125 w-full overflow-hidden rounded-2xl">
          <Image src={pkg.image} alt={pkg.name} fill priority sizes="(max-width: 1280px) 100vw, 1280px" className="object-cover" />
          <RatingBadge rating={pkg.rating} className="absolute right-4 top-4 h-12" />
        </div>

        {/* Thumbnails */}
        <div className="mt-4 flex gap-4">
          {thumbnails.map((src, i) => (
            <div key={i} className="relative h-40 w-62 overflow-hidden rounded-xl">
              <Image src={src} alt={`${pkg.name} view ${i + 1}`} fill sizes="250px" className="object-cover" />
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
          {/* Left column */}
          <div>
            <p className="flex items-center gap-2 text-base text-[#6c696d]">
              <MapPin className="size-5" />
              {pkg.country}
            </p>
            <h1 className="mt-2 text-[60px] font-semibold leading-none text-[#0c0b0b]">{pkg.name}</h1>
            <div className="mt-5 flex items-center gap-20">
              <p className="flex items-center gap-2 text-lg text-[#6c696d]">
                <Star className="size-5 fill-current text-[#0c0b0b]" />
                <span className="text-[#0c0b0b]">{pkg.rating.toFixed(1)}</span>
                ({pkg.reviews} reviews)
              </p>
              <p className="flex items-center gap-2 text-lg text-[#6c696d]">
                <Calendar className="size-5" />
                {pkg.duration}
              </p>
            </div>

            <div className="mt-16">
              <h2 className="text-[32px] font-semibold text-[#0c0b0b]">Overview</h2>
              <p className="mt-2 text-lg leading-7 text-[#6c696d]">{pkg.description}</p>
            </div>

            <div className="mt-14">
              <h2 className="text-[32px] font-semibold text-[#0c0b0b]">Highlights</h2>
              <p className="mt-2 text-lg leading-7 text-[#6c696d]">{pkg.description}</p>
              <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3">
                {(pkg.highlights.length ? pkg.highlights : highlights).map((h) => (
                  <li key={h} className="flex items-start gap-2 text-base text-[#6c696d]">
                    <Check className="mt-0.5 size-5 shrink-0 text-[#1e9e35]" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            {pkg.itinerary.length > 0 && (
              <div className="mt-14">
                <h2 className="text-[32px] font-semibold text-[#0c0b0b]">Itinerary</h2>
                <ol className="mt-3 space-y-5">
                  {pkg.itinerary.map((d) => (
                    <li key={d.day} className="flex gap-4">
                      <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary text-2xl font-semibold text-white">
                        {d.day}
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold text-[#0c0b0b]">{d.title}</h3>
                        <p className="mt-1 max-w-[764px] text-lg leading-7 text-[#6c696d]">{d.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>

          {/* Booking widget */}
          <aside className="self-start rounded-xl border border-[#eeeeee] bg-white p-5">
            <p className="text-base text-[#6c696d]">Starting from</p>
            <p className="mt-1 text-[40px] font-semibold leading-none text-[#0c0b0b]">${pkg.price}</p>
            <p className="mt-2 text-base text-[#6c696d]">per person</p>

            <div className="mt-7 space-y-4">
              <div>
                <p className="text-base text-[#0c0b0b]">Departure Date</p>
                <input
                  aria-label="Departure date"
                  className="mt-2 h-12 w-full rounded-lg border border-[#eeeeee] bg-[#f8fafc] px-4 text-lg text-[#0c0b0b] focus:border-primary focus:outline-none"
                  value={departure}
                  onChange={(e) => setDeparture(e.target.value)}
                />
              </div>
              <div>
                <p className="text-base text-[#0c0b0b]">Number of Travelers</p>
                <div className="mt-2 flex h-12 items-center justify-between rounded-lg border border-[#eeeeee] bg-[#f8fafc] px-4">
                  <button
                    type="button"
                    aria-label="Decrease travelers"
                    onClick={() => setTravelers((t) => Math.max(1, t - 1))}
                    className="text-[#6c696d] transition-colors hover:text-primary"
                  >
                    <Minus className="size-5" />
                  </button>
                  <span className="text-lg text-[#0c0b0b]">{travelers}</span>
                  <button
                    type="button"
                    aria-label="Increase travelers"
                    onClick={() => setTravelers((t) => Math.min(20, t + 1))}
                    className="text-[#6c696d] transition-colors hover:text-primary"
                  >
                    <Plus className="size-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="my-5 h-px bg-[#efefef]" />

            <div className="space-y-1">
              <p className="text-base text-[#0c0b0b]">Total Price</p>
              <p className="text-2xl font-semibold text-primary">${pkg.price * travelers}</p>
            </div>

            <Button
              className="mt-6 h-14 w-full rounded-lg bg-primary text-base"
              onClick={() => {
                addBooking({
                  packageId: pkg.id,
                  name: pkg.name,
                  image: pkg.image,
                  price: pkg.price * travelers,
                  departure,
                  status: "Confirmed",
                });
                router.push("/bookings");
              }}
            >
              Book Now
              <ArrowRight className="size-5" />
            </Button>

            <ul className="mt-6 space-y-2">
              <li className="flex items-center gap-2 text-base text-[#6c696d]">
                <Check className="size-5 text-[#1e9e35]" />
                Free cancellation up to 7 days
              </li>
              <li className="flex items-center gap-2 text-base text-[#6c696d]">
                <Check className="size-5 text-[#1e9e35]" />
                Travel insurance included
              </li>
              <li className="flex items-center gap-2 text-base text-[#6c696d]">
                <Check className="size-5 text-[#1e9e35]" />
                24/7 customer support
              </li>
            </ul>
          </aside>
        </div>
      </div>

      <EditPackageDialog pkg={pkg} open={editOpen} onOpenChange={setEditOpen} />
      <DeletePackageDialog pkg={pkg} open={deleteOpen} onOpenChange={setDeleteOpen} deletedRedirect />
    </main>
  );
}
