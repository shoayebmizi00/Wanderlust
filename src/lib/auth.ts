"use client";

import { useSyncExternalStore } from "react";
import { API_URL } from "./api";

/**
 * Auth layer — talks to the backend's JWT auth routes:
 *   POST /user/signup  { name, email, password } -> { token, user }
 *   POST /user/signin  { email, password }       -> { token, user }
 *
 * The session (token + user) persists in localStorage under "wanderlust-auth"
 * and is exposed to components through a tiny external store, so the navbar
 * and every page update reactively.
 */

export type SessionUser = { id: string; name: string; email: string };

type AuthState = { user: SessionUser | null; token: string | null };

const STORAGE_KEY = "wanderlust-auth";
const LOGGED_OUT: AuthState = { user: null, token: null };

const listeners = new Set<() => void>();

/** Lazily hydrated from localStorage on the first client snapshot read. */
let state: AuthState | null = null;

function readStorage(): AuthState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as AuthState;
      if (parsed?.user && parsed?.token) return parsed;
    }
  } catch {
    // Corrupted or unavailable storage — treat as signed out.
  }
  return LOGGED_OUT;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): AuthState {
  if (state === null && typeof window !== "undefined") {
    state = readStorage();
  }
  return state ?? LOGGED_OUT;
}

function getServerSnapshot(): AuthState {
  return LOGGED_OUT;
}

export function useAuthUser(): SessionUser | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot).user;
}

function commit(next: AuthState) {
  state = next;
  try {
    if (next.token) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // Storage unavailable (private mode) — in-memory session still works.
  }
  listeners.forEach((l) => l());
}

/** Set the session (after signup / signin) and persist it. */
export function setSession(user: SessionUser, token: string) {
  commit({ user, token });
}

/** Signed out — clears the stored session. */
export function clearSession() {
  commit(LOGGED_OUT);
}

const offlineError = "Can't reach the server. Is the backend running on port 5000?";

type AuthResult = { ok: true } | { ok: false; error: string };

async function authRequest(path: string, body: Record<string, unknown>): Promise<AuthResult> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    const data = (await res.json()) as { message?: string; token?: string; user?: SessionUser };

    if (!res.ok) {
      return { ok: false, error: data?.message ?? "Something went wrong. Try again." };
    }
    if (!data.token || !data.user) {
      return { ok: false, error: "Unexpected server response. Try again." };
    }
    setSession(data.user, data.token);
    return { ok: true };
  } catch {
    return { ok: false, error: offlineError };
  }
}

/** POST /user/signup — creates the account and signs the user in. */
export function signUp(name: string, email: string, password: string): Promise<AuthResult> {
  return authRequest("/user/signup", { name, email, password });
}

/** POST /user/signin — validates credentials and stores the session. */
export function signIn(email: string, password: string): Promise<AuthResult> {
  return authRequest("/user/signin", { email, password });
}

/** Signs the user out (client-side only — the backend token simply expires). */
export function signOut() {
  clearSession();
}
