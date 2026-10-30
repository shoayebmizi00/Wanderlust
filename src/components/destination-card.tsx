import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar, MapPin, Star } from "lucide-react";
import type { TravelPackage } from "@/lib/types";
import { cn } from "@/lib/utils";

export function RatingBadge({ rating, className }: { rating: number; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-10 items-center gap-1 rounded-full bg-white px-3 text-base font-medium text-[#121212]",
        className,
      )}
    >
      {rating.toFixed(1)}
      <Star className="size-5 fill-current text-[#121212]" />
    </span>
  );
}

/** Large card used in the Home "Featured Destinations" carousel. */
export function DestinationCardLarge({ pkg }: { pkg: TravelPackage }) {
  return (
    <div className="w-full">
      <Link href={`/destinations/${pkg.id}`} className="group relative block aspect-[628/400] w-full overflow-hidden rounded-xl">
        <Image
          src={pkg.image}
          alt={pkg.name}
          fill
          sizes="(max-width: 1024px) 100vw, 628px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <RatingBadge rating={pkg.rating} className="absolute right-2.5 top-2.5" />
      </Link>
      <div className="mt-6 space-y-2">
        <p className="flex items-center gap-2 text-base text-[#6c696d]">
          <MapPin className="size-5" />
          {pkg.country}
        </p>
        <Link href={`/destinations/${pkg.id}`} className="flex min-w-0 items-baseline justify-between gap-4">
          <h3 className="truncate text-2xl font-semibold text-[#0c0b0b] transition-colors group-hover:text-primary">
            {pkg.name}
          </h3>
          <p className="shrink-0 text-2xl font-semibold text-[#0c0b0b]">${pkg.price}/Person</p>
        </Link>
        <p className="flex items-center gap-2 text-base text-[#6c696d]">
          <Calendar className="size-5" />
          {pkg.duration.replace(" / ", "/")}
        </p>
      </div>
      <Link
        href={`/destinations/${pkg.id}`}
        className="mt-3 inline-flex items-center gap-1 text-base font-medium text-primary transition-colors hover:text-[#0c8ba6]"
      >
        BOOK NOW
        <ArrowUpRight className="size-5" />
      </Link>
    </div>
  );
}

/** Compact card used in the Destinations grid. */
export function DestinationCardCompact({ pkg }: { pkg: TravelPackage }) {
  return (
    <div className="w-full overflow-hidden rounded-xl">
      <Link href={`/destinations/${pkg.id}`} className="group relative block aspect-[411/231] w-full overflow-hidden rounded-xl">
        <Image
          src={pkg.image}
          alt={pkg.name}
          fill
          sizes="(max-width: 1024px) 100vw, 411px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <RatingBadge rating={pkg.rating} className="absolute right-2.5 top-2.5 h-8 px-2.5 text-sm" />
      </Link>
      <div className="mt-3 space-y-1">
        <p className="flex items-center gap-2 text-base text-[#6c696d]">
          <MapPin className="size-5" />
          {pkg.country}
        </p>
        <Link href={`/destinations/${pkg.id}`} className="flex min-w-0 items-baseline justify-between gap-2">
          <h3 className="truncate text-2xl font-semibold text-[#0c0b0b] transition-colors hover:text-primary">
            {pkg.name}
          </h3>
          <p className="shrink-0 text-2xl font-semibold text-[#0c0b0b]">${pkg.price}/Person</p>
        </Link>
        <p className="flex items-center gap-2 text-base text-[#6c696d]">
          <Calendar className="size-5" />
          {pkg.duration.replace(" / ", "/")}
        </p>
      </div>
      <Link
        href={`/destinations/${pkg.id}`}
        className="mt-2 inline-flex items-center gap-1 border-b border-transparent py-1 text-base font-medium text-primary transition-colors hover:border-current"
      >
        BOOK NOW
        <ArrowUpRight className="size-5" />
      </Link>
    </div>
  );
}
