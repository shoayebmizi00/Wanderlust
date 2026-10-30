"use client";

import { useRouter } from "next/navigation";
import { Save, Trash2, X } from "lucide-react";import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PackageForm } from "@/components/package-form";
import { useStore } from "@/lib/store";
import type { TravelPackage } from "@/lib/types";

export function EditPackageDialog({
  pkg,
  open,
  onOpenChange,
}: {
  pkg: TravelPackage;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { updatePackage } = useStore();
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[800px] gap-0 rounded-2xl p-10">
        <button
          type="button"
          aria-label="Close"
          onClick={() => onOpenChange(false)}
          className="absolute right-6 top-6 text-[#b6b6b6] transition-colors hover:text-[#0c0b0b]"
        >
          <X className="size-6" />
        </button>

        <div className="space-y-1">
          <DialogTitle className="text-2xl font-semibold text-[#0c0b0b]">Update Travel Package</DialogTitle>
          <p className="text-base text-[#6c696d]">
            Make changes to the travel package details below
          </p>
        </div>

        <div className="mt-6">
          <PackageForm
            id="edit-package"
            pkg={pkg}
            onSubmit={(p) => {
              updatePackage({ ...p, id: pkg.id });
              onOpenChange(false);
              router.refresh();
            }}
          />
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <Button
            variant="outline"
            className="h-14 rounded-lg border-[#eeeeee] px-6 text-base text-[#ef4444] hover:text-[#ef4444]"
            onClick={() => onOpenChange(false)}
          >
            <Trash2 className="size-5" />
            Cancel
          </Button>
          <Button form="edit-package" type="submit" className="h-14 rounded-lg bg-primary px-6 text-base">
            <Save className="size-5" />
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function DeletePackageDialog({
  pkg,
  open,
  onOpenChange,
  deletedRedirect = false,
}: {
  pkg: TravelPackage;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  deletedRedirect?: boolean;
}) {
  const { deletePackage } = useStore();
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[600px] gap-0 rounded-2xl p-10">
        <button
          type="button"
          aria-label="Close"
          onClick={() => onOpenChange(false)}
          className="absolute right-6 top-6 text-[#b6b6b6] transition-colors hover:text-[#0c0b0b]"
        >
          <X className="size-6" />
        </button>

        <div className="flex items-center gap-4">
          <span className="flex size-15 items-center justify-center rounded-full bg-[#f3eded]">
            <Trash2 className="size-6 text-[#ef4444]" />
          </span>
          <DialogTitle className="text-2xl font-semibold text-[#0c0b0b]">Delete Travel Package</DialogTitle>
        </div>

        <p className="mt-4 text-base text-[#6c696d]">
          Are you sure you want to delete &quot;{pkg.name}&quot;? This action cannot be undone and will permanently
          remove this travel package from the system.
        </p>

        <div className="mt-8 flex items-center justify-end gap-4">
          <Button
            variant="outline"
            className="h-14 rounded-lg border-[#eeeeee] px-6 text-base text-[#ef4444] hover:text-[#ef4444]"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            form="delete-package"
            className="h-14 rounded-lg bg-[#ef4444] px-6 text-base hover:bg-[#dc2626]"
            onClick={() => {
              deletePackage(pkg.id);
              onOpenChange(false);
              if (deletedRedirect) router.push("/destinations");
            }}
          >
            <Trash2 className="size-5" />
            Delete Package
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
