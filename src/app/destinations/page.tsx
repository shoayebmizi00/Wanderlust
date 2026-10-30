"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { DestinationCardCompact } from "@/components/destination-card";
import { useStore } from "@/lib/store";

const filterInput =
  "h-14 w-full appearance-none rounded-lg border border-[#b6b6b640] bg-transparent px-6 text-xl text-[#6c696d] focus:border-primary focus:outline-none";

const sortOptions = [
  { value: "default", label: "SORT BY" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

export default function DestinationsPage() {
  const { packages } = useStore();
  const [category, setCategory] = useState("ALL");
  const [price, setPrice] = useState("ANY");
  const [sort, setSort] = useState("default");

  const showing = useMemo(() => {
    let list = [...packages];
    if (category !== "ALL") list = list.filter((p) => p.category === category);
    if (price !== "ANY") {
      const range = price === "LOW" ? [0, 1300] : price === "MID" ? [1300, 1600] : [1600, 999999];
      list = list.filter((p) => p.price >= range[0] && p.price < range[1]);
    }
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [packages, category, price, sort]);

  return (
    <main className="bg-white pb-24">
      <div className="bg-white pt-44">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="text-[60px] font-semibold leading-none text-[#0c0b0b]">Explore All Destinations</h1>
          <p className="mt-4 text-xl text-[#6c696d]">Find your perfect travel experience from our curated collection</p>

          <div className="mt-12 grid grid-cols-3 gap-2">
            <div className="relative">
              <select
                aria-label="Category"
                className={filterInput}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="ALL">Category</option>
                <option value="Beach">Beach</option>
                <option value="Adventure">Adventure</option>
                <option value="Culture">Culture</option>
                <option value="Cruise">Cruise</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-6 top-1/2 size-5 -translate-y-1/2 text-[#b6b6b6]" />
            </div>
            <div className="relative">
              <select
                aria-label="Price Range"
                className={filterInput}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              >
                <option value="ANY">Price Range</option>
                <option value="LOW">Under $1,300</option>
                <option value="MID">$1,300 – $1,600</option>
                <option value="HIGH">$1,600+</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-6 top-1/2 size-5 -translate-y-1/2 text-[#b6b6b6]" />
            </div>
            <div className="relative">
              <select aria-label="Sort by" className={filterInput} value={sort} onChange={(e) => setSort(e.target.value)}>
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-6 top-1/2 size-5 -translate-y-1/2 text-[#b6b6b6]" />
            </div>
          </div>

          <p className="mt-7 text-xl text-[#6c696d]">Showing {showing.length} destinations</p>

          <div className="mt-12 grid gap-8 pb-24 sm:grid-cols-2 lg:grid-cols-3">
            {showing.map((pkg) => (
              <DestinationCardCompact key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
