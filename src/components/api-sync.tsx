"use client";

import { useEffect } from "react";
import { syncPackagesFromApi } from "@/lib/store";

/**
 * Bootstrap component mounted in the root layout: on first load it syncs the
 * package store with the backend API (GET /destination). Seeds stay in place
 * until the API has content, then API data takes over everywhere.
 */
export function ApiSync() {
  useEffect(() => {
    void syncPackagesFromApi();
  }, []);

  return null;
}
