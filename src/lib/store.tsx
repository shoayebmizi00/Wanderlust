"use client";

import { useCallback, useSyncExternalStore } from "react";
import { SEED_BOOKINGS, SEED_PACKAGES } from "./data";
import type { Booking, TravelPackage } from "./types";
import { getDestinations } from "./api";

type BookingInput = Omit<Booking, "id">;

type StoreState = {
  packages: TravelPackage[];
  bookings: Booking[];
};

const SEED_STATE: StoreState = { packages: SEED_PACKAGES, bookings: SEED_BOOKINGS };

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Server snapshot is always the seed data; hydration uses it, then swaps to the client snapshot. */
function getServerSnapshot(): StoreState {
  return SEED_STATE;
}

// Client cache is initialized lazily on first call, so `typeof window` checks stay inside event paths.
let clientState: StoreState | null = null;

function getSnapshot(): StoreState {
  if (clientState === null) {
    try {
      const raw = window.localStorage.getItem("wanderlust-store");
      clientState = raw ? (JSON.parse(raw) as StoreState) : SEED_STATE;
      if (!clientState.packages?.length) clientState.packages = SEED_PACKAGES;
      if (!clientState.bookings) clientState.bookings = SEED_BOOKINGS;
    } catch {
      clientState = SEED_STATE;
    }
  }
  return clientState;
}

function commit(next: StoreState) {
  clientState = next;
  try {
    window.localStorage.setItem("wanderlust-store", JSON.stringify(next));
  } catch {
    // Storage can fail (private mode, quota); state still lives for the session.
  }
  listeners.forEach((l) => l());
}

let bookingCounter = 100;

function setPackages(packages: TravelPackage[]) {
  const current = getSnapshot();
  commit({ ...current, packages });
}

/**
 * Pulls destinations from the API (GET /destination) and swaps them in as the
 * package source — used by the ApiSync bootstrap component.
 */
export async function syncPackagesFromApi(): Promise<boolean> {
  const packages = await getDestinations();
  if (packages.length) {
    setPackages(packages);
    return true;
  }
  return false;
}

export function useStore() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const { packages, bookings } = state;

  const getPackage = useCallback(
    (id: string) => packages.find((p) => p.id === id),
    [packages],
  );

  return {
    packages,
    bookings,
    getPackage,
    addPackage: (p: TravelPackage) => {
      const current = getSnapshot();
      commit({ ...current, packages: [...current.packages, p] });
    },
    updatePackage: (p: TravelPackage) => {
      const current = getSnapshot();
      commit({ ...current, packages: current.packages.map((x) => (x.id === p.id ? p : x)) });
    },
    deletePackage: (id: string) => {
      const current = getSnapshot();
      commit({
        packages: current.packages.filter((p) => p.id !== id),
        bookings: current.bookings.filter((b) => b.packageId !== id),
      });
    },
    addBooking: (b: BookingInput): Booking => {
      const created = { ...b, id: `b${++bookingCounter}` };
      const current = getSnapshot();
      commit({ ...current, bookings: [...current.bookings, created] });
      return created;
    },
    cancelBooking: (id: string) => {
      const current = getSnapshot();
      commit({ ...current, bookings: current.bookings.filter((b) => b.id !== id) });
    },
  };
}
