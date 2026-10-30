import type { TravelPackage } from "./types";

/**
 * Central API layer — every screen reads destination data through here.
 * When new endpoints arrive (bookings, auth, ...), add them as functions below
 * and the pages will consume them the same way.
 */
export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
};

async function request<T>(path: string, { method = "GET", body }: RequestOptions = {}): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      method,
      headers: body != null ? { "Content-Type": "application/json" } : undefined,
      body: body != null ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    // Server unreachable or invalid payload — callers fall back gracefully.
    return null;
  }
}

/** Backend records may use _id/id and either camelCase or snake_case — map tolerantly. */
export function normalizeDestination(raw: Record<string, unknown>, index: number): TravelPackage {
  const pick = (...keys: string[]) => {
    for (const k of keys) {
      const v = raw[k];
      if (v != null && typeof v === "string" && v.trim()) return v;
    }
    return "";
  };
  const num = (...keys: string[]) => {
    for (const k of keys) {
      const v = raw[k];
      const n = typeof v === "string" ? Number(v) : typeof v === "number" ? v : NaN;
      if (!Number.isNaN(n) && v != null) return n;
    }
    return 0;
  };

  return {
    id: pick("id", "_id", "packageId", "slug") || `api-${index}`,
    name: pick("name", "title", "destinationName", "package_name") || "Untitled Package",
    country: pick("country", "location", "country_name") || "Unknown",
    category: pick("category", "type") || "Beach",
    price: num("price", "pricePerPerson", "price_per_person", "cost") || 0,
    duration: pick("duration", "days", "trip_length") || "7 Days / 6 Nights",
    departure: pick("departure", "departureDate", "start_date") || "05/15/2026",
    image: pick("image", "image_url", "imageUrl", "photo", "img", "thumbnail") || "/assets/bali-paradise.jpg",
    rating: num("rating", "averageRating", "stars") || 4.5,
    reviews: num("reviews", "reviewsCount", "review_count") || 0,
    description: pick("description", "summary", "overview", "about"),
    highlights: Array.isArray(raw.highlights) ? (raw.highlights as string[]) : [],
    itinerary: Array.isArray(raw.itinerary) ? (raw.itinerary as TravelPackage["itinerary"]) : [],
  };
}

type DestinationsResponse = unknown;

function extractDestinations(data: DestinationsResponse): Record<string, unknown>[] {
  const asArray = (v: unknown) => (Array.isArray(v) ? (v as Record<string, unknown>[]) : null);
  return asArray(data) ?? asArray((data as { data?: unknown }).data) ?? asArray((data as { destinations?: unknown }).destinations) ?? [];
}

/** GET /destination — full list from the Mongo-backed API. */
export async function getDestinations(): Promise<TravelPackage[]> {
  const data = await request<DestinationsResponse>("/destination");
  if (!data) return [];
  return extractDestinations(data).map(normalizeDestination);
}

/** GET /destination/:id — a single destination. */
export async function getDestination(id: string): Promise<TravelPackage | null> {
  const data = await request<Record<string, unknown>>(`/destination/${id}`);
  if (!data) return null;
  return normalizeDestination(data, 0);
}

/** POST /destination — create a destination in Mongo (current stub). */
export function createDestination(pkg: Omit<TravelPackage, "id">): Promise<unknown> {
  return request<unknown>("/destination", { method: "POST", body: pkg });
}

// ───────────────────────── Profile ─────────────────────────

export type ProfileStats = {
  totalBookings: number;
  countriesVisited: number;
  upcomingTrips: number;
  totalSpent: number;
};

export type Profile = {
  name: string;
  location: string;
  memberSince: string;
  nationality: string;
  avatar: string;
  /** Computed numbers from the backend, or null when unavailable (stat fallbacks are used instead). */
  stats: ProfileStats | null;
};

const SEED_PROFILE: Profile = {
  name: "Sarah Mitchell",
  location: "San Francisco, CA",
  memberSince: "Mar 2024",
  nationality: "United States",
  avatar: "/assets/avatar-sarah.jpg",
  stats: null,
};

function extractProfile(raw: Record<string, unknown>): Profile {
  const pick = (...keys: string[]) => {
    for (const k of keys) {
      const v = raw[k];
      if (v != null && typeof v === "string" && v.trim()) return v;
    }
    return "";
  };
  const num = (...keys: string[]) => {
    for (const k of keys) {
      const v = raw[k];
      const n = typeof v === "string" ? Number(v) : typeof v === "number" ? v : NaN;
      if (!Number.isNaN(n) && v != null) return n;
    }
    return 0;
  };

  const statsRaw = (raw.stats ?? raw.travelStats) as Record<string, unknown> | undefined;

  return {
    name: pick("name", "full_name", "displayName"),
    location: pick("location", "city", "address"),
    memberSince: pick("memberSince", "member_since", "joinedAt"),
    nationality: pick("nationality", "country"),
    avatar: pick("avatar", "photo", "image", "profileImage") || SEED_PROFILE.avatar,
    stats: statsRaw
      ? {
          totalBookings: num("totalBookings", "bookings"),
          countriesVisited: num("countriesVisited", "countries_visited", "countries") ?? 0,
          upcomingTrips: num("upcomingTrips", "upcoming_trips", "trips") ?? 0,
          totalSpent: num("totalSpent", "total_spent", "spent") ?? 0,
        }
      : null,
  };
}

/** GET /profile — profile document plus backend-computed travel statistics. */
export async function getProfile(): Promise<Profile> {
  const data = await request<Record<string, unknown>>("/profile");
  if (!data) return SEED_PROFILE;
  const profile = extractProfile(data);
  return { ...profile, name: profile.name || SEED_PROFILE.name, location: profile.location || SEED_PROFILE.location };
}

/** PATCH /profile — update profile fields and get the saved document back. */
export async function updateProfile(fields: Record<string, string>): Promise<Profile | null> {
  const data = await request<Record<string, unknown>>("/profile", { method: "PATCH", body: fields });
  if (!data) return null;
  const profileRaw = ((data as { profile?: unknown }).profile ?? data) as Record<string, unknown>;
  return extractProfile(profileRaw);
}
