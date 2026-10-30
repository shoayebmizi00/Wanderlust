"use client";

import { useEffect, useState } from "react";
import { Camera, DollarSign, Globe, MapPin, PencilLine, Plane, TrendingUp, X } from "lucide-react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { PROFILE } from "@/lib/data";
import { getProfile, updateProfile } from "@/lib/api";
import type { Profile } from "@/lib/api";

const statIcons = {
  plane: Plane,
  globe: Globe,
  trend: TrendingUp,
  dollar: DollarSign,
} as const;

/** Design-defined styling per stat; values come from the backend when available. */
const STAT_DEFS = [
  { label: "Total Bookings", key: "totalBookings", icon: "plane", iconBg: "#ffffff", iconColor: "#0c0b0b" },
  { label: "Countries Visited", key: "countriesVisited", icon: "globe", iconBg: "#e8f9ee", iconColor: "#6c696d" },
  { label: "Upcoming Trips", key: "upcomingTrips", icon: "trend", iconBg: "#fff1e2", iconColor: "#ff8a0d" },
  { label: "Total Spent", key: "totalSpent", icon: "dollar", iconBg: "#feeaff", iconColor: "#dc24e5" },
] as const;

const profileInput =
  "h-12 w-full rounded-lg border border-[#eeeeee] bg-[#f8fafc] px-4 text-lg text-[#6c696d] focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none";

/** Seed values shown until the backend responds (and after, when a stat has no value). */
const seedValues = Object.fromEntries(
  PROFILE.stats.map((s) => [s.label.toLowerCase().replace(/ /g, ""), s.value]),
);

function formatStat(key: string, stats: Profile["stats"]): string {
  const value = stats ? stats[key as keyof NonNullable<Profile["stats"]>] : undefined;
  if (value == null) return seedValues[key] ?? "0";
  return key === "totalSpent" ? `$${value.toLocaleString()}` : String(value);
}

function TravelStatistics({ stats }: { stats: Profile["stats"] }) {
  return (
    <div className="rounded-xl border border-[#eeeeee] bg-white p-6">
      <h2 className="text-2xl font-semibold text-[#0c0b0b]">Travel Statistics</h2>
      <div className="mt-4 grid gap-6 lg:grid-cols-2">
        {STAT_DEFS.map((s) => {
          const Icon = statIcons[s.icon as keyof typeof statIcons];
          return (
            <div key={s.label} className="flex items-center justify-between rounded-xl border border-[#eeeeee] bg-white p-4">
              <div>
                <p className="text-2xl font-semibold text-[#0c0b0b]">{formatStat(s.key, stats)}</p>
                <p className="mt-1 text-base text-[#6c696d]">{s.label}</p>
              </div>
              <span
                className="flex size-14 items-center justify-center rounded-full border border-[#eeeeee]"
                style={{ backgroundColor: s.iconBg }}
              >
                <Icon className="size-7" style={{ color: s.iconColor }} strokeWidth={1.8} />
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>({
    name: PROFILE.name,
    location: PROFILE.location,
    memberSince: PROFILE.memberSince,
    nationality: PROFILE.nationality,
    avatar: PROFILE.avatar,
    stats: null,
  });
  const [editOpen, setEditOpen] = useState(false);
  const [name, setName] = useState(PROFILE.name);
  const [location, setLocation] = useState(PROFILE.location);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  // Load profile + computed stats from the backend (design data shows until it responds).
  useEffect(() => {
    let active = true;
    getProfile().then((data) => {
      if (!active) return;
      setProfile(data);
    });
    return () => {
      active = false;
    };
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaveError("");
    try {
      const saved = await updateProfile({ name: name.trim(), location: location.trim() });
      if (saved) {
        setProfile((p) => ({
          ...p,
          name: saved.name || p.name,
          location: saved.location || p.location,
          avatar: saved.avatar,
        }));
      }
      setEditOpen(false);
    } finally {
      setSaving(false);
    }
  }

  function openEdit() {
    // Show the current backend values when the dialog opens.
    setSaveError("");
    setName(profile.name);
    setLocation(profile.location);
    setEditOpen(true);
  }

  return (
    <main className="bg-white pb-24">
      <div className="pt-31">
        <div className="mx-auto max-w-6xl px-5">
          <h1 className="text-[60px] font-semibold leading-none text-[#0c0b0b]">My Profile</h1>
          <p className="mt-4 text-xl text-[#6c696d]">Manage your account settings and travel preferences</p>

          <div className="mt-12 grid gap-10 lg:grid-cols-[400px_1fr]">
            <aside className="self-start rounded-xl border border-[#eeeeee] bg-white p-5">
              <div className="relative mx-auto size-38">
                <Image
                  src={profile.avatar}
                  alt={profile.name}
                  fill
                  sizes="152px"
                  className="rounded-full object-cover"
                />
                <button
                  type="button"
                  aria-label="Change photo"
                  onClick={openEdit}
                  className="absolute bottom-2 right-2 flex size-10 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-[#0e8aa4]"
                >
                  <Camera className="size-5" />
                </button>
              </div>
              <div className="mt-6 text-center">
                <h2 className="text-2xl font-semibold text-[#0c0b0b]">{profile.name}</h2>
                <p className="mt-1 flex items-center justify-center gap-2 text-base text-[#6c696d]">
                  <MapPin className="size-5" />
                  {profile.location}
                </p>
              </div>
              <div className="my-5 h-px bg-[#efefef]" />
              <dl className="space-y-3 text-base">
                <div className="flex items-center justify-between">
                  <dt className="text-[#6c696d]">Member since</dt>
                  <dd className="font-medium text-[#0c0b0b]">{profile.memberSince}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-[#6c696d]">Nationality</dt>
                  <dd className="font-medium text-[#0c0b0b]">{profile.nationality}</dd>
                </div>
              </dl>
              <button
                type="button"
                onClick={openEdit}
                className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-primary text-base font-medium text-white transition-colors hover:bg-[#0e8aa4]"
              >
                <PencilLine className="size-5" />
                Edit Profile
              </button>
            </aside>

            <TravelStatistics stats={profile.stats} />
          </div>
        </div>
      </div>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-[600px] gap-0 rounded-2xl p-10">
          <button
            type="button"
            aria-label="Close"
            onClick={() => setEditOpen(false)}
            className="absolute right-6 top-6 text-[#b6b6b6] transition-colors hover:text-[#0c0b0b]"
          >
            <X className="size-6" />
          </button>
          <div className="space-y-1">
            <DialogTitle className="text-2xl font-semibold text-[#0c0b0b]">Edit Profile</DialogTitle>
            <p className="text-base text-[#6c696d]">Update your personal details below</p>
          </div>
          <form className="mt-6 space-y-6" onSubmit={handleSave}>
            <div className="space-y-2">
              <label htmlFor="profile-name" className="block text-lg text-[#0c0b0b]">
                Full Name
              </label>
              <input
                id="profile-name"
                className={profileInput}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="profile-location" className="block text-lg text-[#0c0b0b]">
                Location
              </label>
              <input
                id="profile-location"
                className={profileInput}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            {saveError && (
              <p className="rounded-lg border border-[#ef4444]/30 bg-[#ef4444]/10 px-4 py-3 text-base text-[#ef4444]">
                {saveError}
              </p>
            )}
            <div className="flex items-center justify-end gap-4">
              <button
                type="button"
                className="inline-flex h-14 items-center rounded-lg border border-[#eeeeee] px-6 text-base text-[#ef4444] transition-colors hover:border-[#ef4444]"
                onClick={() => setEditOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex h-14 items-center gap-2 rounded-lg bg-primary px-6 text-base font-medium text-white transition-colors hover:bg-[#0e8aa4] disabled:opacity-60"
              >
                <PencilLine className="size-5" />
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  );
}
