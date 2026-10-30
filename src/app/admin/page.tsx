"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PackageForm } from "@/components/package-form";
import { useStore } from "@/lib/store";
import { createDestination } from "@/lib/api";
import { syncPackagesFromApi } from "@/lib/store";

export default function AdminPage() {
  const { addPackage } = useStore();
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  return (
    <main className="pb-24">
      <div className="pt-31">
        <div className="mx-auto max-w-6xl px-5">
          <h1 className="text-center text-[60px] font-semibold leading-none text-[#0c0b0b]">
            Add New Travel Package
          </h1>
          <p className="mt-4 text-center text-xl text-[#6c696d]">
            Fill in the details below to add a new package to the catalog
          </p>

          <div className="mx-auto mt-12 max-w-200 rounded-xl border border-[#eeeeee] bg-white p-10">
            <PackageForm
              id="add-package"
              onSubmit={async (p) => {
                setSaving(true);
                try {
                  // Persist through the API (POST /destination)…
                  await createDestination(p);
                  // …show it right away locally…
                  addPackage({ ...p, id: p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") || `package-${Date.now()}` });
                  // …then let server data (GET /destination) win once it's live.
                  await syncPackagesFromApi();
                  router.push("/destinations");
                } finally {
                  setSaving(false);
                }
              }}
            />

            <div className="mt-8 flex items-center justify-center gap-4">
              <Button
                variant="outline"
                className="h-14 rounded-lg border-[#eeeeee] px-6 text-base text-[#ef4444] hover:text-[#ef4444]"
                onClick={() => router.push("/destinations")}
              >
                <Trash2 className="size-5" />
                Cancel
              </Button>
              <Button form="add-package" type="submit" disabled={saving} className="h-14 rounded-lg bg-primary px-8 text-base">
                <Save className="size-5" />
                {saving ? "Saving..." : "Add Travel Package"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
