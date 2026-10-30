"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { CATEGORIES } from "@/lib/types";
import type { TravelPackage } from "@/lib/types";

export const packageInputClass =
  "h-12 w-full rounded-lg border border-[#eeeeee] bg-[#f8fafc] px-4 text-lg text-[#6c696d] focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none";
export const packageLabelClass = "text-lg text-[#0c0b0b]";

export function PackageForm({
  id,
  pkg,
  onSubmit,
}: {
  /** form id so a submit button outside the form can trigger it via `form={id}` */
  id: string;
  pkg?: TravelPackage;
  onSubmit: (p: TravelPackage) => void;
}) {
  const [values, setValues] = useState({
    name: pkg?.name ?? "",
    country: pkg?.country ?? "",
    category: pkg?.category ?? CATEGORIES[0],
    price: pkg?.price != null ? String(pkg.price) : "",
    duration: pkg?.duration ?? "",
    departure: pkg?.departure ?? "",
    image: pkg?.image ?? "",
    description: pkg?.description ?? "",
  });

  const set =
    (k: keyof typeof values) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setValues((v) => ({ ...v, [k]: e.target.value }));

  return (
    <form
      id={id}
      className="grid grid-cols-2 gap-x-10 gap-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({
          id: pkg?.id ?? "",
          name: values.name.trim() || "Untitled Package",
          country: values.country.trim() || "Unknown",
          category: values.category,
          price: Number(values.price) || 0,
          duration: values.duration.trim() || "7 Days / 6 Nights",
          departure: values.departure.trim() || "05/15/2026",
          image: values.image.trim() || "/assets/bali-paradise.jpg",
          rating: pkg?.rating ?? 4.5,
          reviews: pkg?.reviews ?? 0,
          description: values.description.trim() || values.name.trim(),
          highlights: pkg?.highlights ?? [],
          itinerary: pkg?.itinerary ?? [],
        });
      }}
    >
      <div className="col-span-2 space-y-2">
        <label htmlFor={`${id}-name`} className={`block ${packageLabelClass}`}>
          Destination Name
        </label>
        <input
          id={`${id}-name`}
          placeholder="Bali Paradise"
          className={packageInputClass}
          value={values.name}
          onChange={set("name")}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor={`${id}-country`} className={`block ${packageLabelClass}`}>
          Country
        </label>
        <input
          id={`${id}-country`}
          placeholder="Indonesia"
          className={packageInputClass}
          value={values.country}
          onChange={set("country")}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor={`${id}-category`} className={`block ${packageLabelClass}`}>
          Category
        </label>
        <div className="relative">
          <select
            id={`${id}-category`}
            className={`${packageInputClass} appearance-none pr-10`}
            value={values.category}
            onChange={set("category")}
          >
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-[#b6b6b6]" />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor={`${id}-price`} className={`block ${packageLabelClass}`}>
          Price (USD)
        </label>
        <input
          id={`${id}-price`}
          placeholder="e.g., 1299"
          className={packageInputClass}
          value={values.price}
          onChange={set("price")}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor={`${id}-duration`} className={`block ${packageLabelClass}`}>
          Duration
        </label>
        <input
          id={`${id}-duration`}
          placeholder="e.g., 7 Days/6 Nights"
          className={packageInputClass}
          value={values.duration}
          onChange={set("duration")}
        />
      </div>

      <div className="col-span-2 space-y-2">
        <label htmlFor={`${id}-departure`} className={`block ${packageLabelClass}`}>
          Departure Date
        </label>
        <input
          id={`${id}-departure`}
          placeholder="mm/dd/yyyy"
          className={packageInputClass}
          value={values.departure}
          onChange={set("departure")}
        />
      </div>

      <div className="col-span-2 space-y-2">
        <label htmlFor={`${id}-image`} className={`block ${packageLabelClass}`}>
          Image URL
        </label>
        <input
          id={`${id}-image`}
          placeholder="https://example.com/image.jpg"
          className={packageInputClass}
          value={values.image}
          onChange={set("image")}
        />
      </div>

      <div className="col-span-2 space-y-2">
        <label htmlFor={`${id}-description`} className={`block ${packageLabelClass}`}>
          Description
        </label>
        <textarea
          id={`${id}-description`}
          rows={6}
          placeholder="Describe the travel experience..."
          className="h-[150px] w-full resize-none rounded-lg border border-[#eeeeee] bg-[#f8fafc] px-4 py-3 text-lg leading-6 text-[#6c696d] focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none"
          value={values.description}
          onChange={set("description")}
        />
      </div>
    </form>
  );
}
