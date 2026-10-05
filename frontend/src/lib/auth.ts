import type { AuthUser } from "@/lib/api";

const TOKEN_KEY = "libra_token";
const USER_KEY = "libra_user";
const AUTH_EVENT = "libra_auth_changed";
export const DISPLAY_PROFILE_KEY = "libra_user_profile";

export interface DisplayProfile {
  fullName: string;
  email: string;
  dob: string;
  location: string;
  dailyGoal: string;
  favoriteGenres: string[];
  dailyReminders: boolean;
  newBookAlerts: boolean;
  weeklySummary: boolean;
  publicProfile: boolean;
  shareHistory: boolean;
}

function browser(): boolean {
  return typeof window !== "undefined";
}

function emitAuthChange(): void {
  if (!browser()) return;
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function subscribeAuth(onStoreChange: () => void): () => void {
  if (!browser()) return () => {};
  const handler = () => onStoreChange();
  window.addEventListener(AUTH_EVENT, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(AUTH_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}

export function saveSession(
  token: string,
  user?: AuthUser,
  remember = true
): void {
  if (!browser()) return;
  try {
    window.localStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(TOKEN_KEY);
    const store = remember ? window.localStorage : window.sessionStorage;
    store.setItem(TOKEN_KEY, token);
    if (user) {
      window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  } catch {
    // Storage unavailable
  }
  emitAuthChange();
}

export function getToken(): string | null {
  if (!browser()) return null;
  try {
    return (
      window.localStorage.getItem(TOKEN_KEY) ??
      window.sessionStorage.getItem(TOKEN_KEY)
    );
  } catch {
    return null;
  }
}

export function getAuthUser(): AuthUser | null {
  if (!browser()) return null;
  try {
    const raw = window.localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function clearSession(): void {
  if (!browser()) return;
  try {
    window.localStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(USER_KEY);
  } catch {
    // Storage unavailable
  }
  emitAuthChange();
}

export function isLoggedIn(): boolean {
  return getToken() !== null;
}

function defaultDisplayProfile(): DisplayProfile {
  return {
    fullName: "",
    email: "",
    dob: "March 14, 1995",
    location: "Boston, MA",
    dailyGoal: "45 minutes",
    favoriteGenres: ["Fiction", "Technology", "History"],
    dailyReminders: true,
    newBookAlerts: true,
    weeklySummary: false,
    publicProfile: false,
    shareHistory: true,
  };
}

export function getDisplayProfile(): DisplayProfile | null {
  if (!browser()) return null;
  try {
    const raw = window.localStorage.getItem(DISPLAY_PROFILE_KEY);
    return raw ? (JSON.parse(raw) as DisplayProfile) : null;
  } catch {
    return null;
  }
}

export function writeDisplayProfile(fields: Partial<DisplayProfile>): void {
  if (!browser()) return;
  try {
    const current = getDisplayProfile() ?? defaultDisplayProfile();
    const next: DisplayProfile = { ...current, ...fields };
    window.localStorage.setItem(DISPLAY_PROFILE_KEY, JSON.stringify(next));
  } catch {
    // Storage unavailable
  }
}

export function displayNameFromEmail(email: string): string {
  const base = email.split("@")[0] || "Reader";
  return base.charAt(0).toUpperCase() + base.slice(1);
}
