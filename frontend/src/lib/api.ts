import type { Book, BackendBook, BackendCategory, BackendPlan } from "@/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";

export function mapBackendBookToBook(b: BackendBook): Book {
  return {
    id: String(b.id),
    title: b.title,
    author: b.writer,
    cover: b.cover || "/images/books/echo-of-silence.jpeg",
    category: b.category_id ? String(b.category_id) : undefined,
    synopsis: b.synopsis,
    content: b.content,
  };
}

export async function getBooks(): Promise<Book[] | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/books`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data: { books: BackendBook[] } = await res.json();
    return (data.books || []).map(mapBackendBookToBook);
  } catch {
    return null;
  }
}

export async function getCategories(): Promise<BackendCategory[] | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/categories`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data: { categories: BackendCategory[] } = await res.json();
    return data.categories || [];
  } catch {
    return null;
  }
}

export async function getPlans(): Promise<BackendPlan[] | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/plans`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data: { plans: BackendPlan[] } = await res.json();
    return data.plans || [];
  } catch {
    return null;
  }
}

export async function postBook(formData: FormData): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/post-books`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.error || "Failed to upload book" };
    }
    return { success: true, message: data.message };
  } catch (err) {
    return { success: false, error: (err as Error).message || "Backend connection failed" };
  }
}

export interface AuthUser {
  id: number | string;
  email: string;
  img?: string;
  username?: string;
}

export interface AuthResult {
  success: boolean;
  token?: string;
  message?: string;
  error?: string;
}

function formatApiError(error: unknown, fallback: string): string {
  if (typeof error === "string") return error;
  if (Array.isArray(error)) {
    const messages = error
      .map((issue) => (issue?.message as string) || String(issue))
      .filter(Boolean);
    if (messages.length > 0) return messages.join(", ");
  }
  if (error && typeof error === "object" && "message" in error) {
    const message = (error as { message?: unknown }).message;
    if (typeof message === "string" && message) return message;
  }
  return fallback;
}

export async function loginUser(
  email: string,
  pass: string
): Promise<AuthResult> {
  try {
    const res = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, pass }),
    });
    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        error: formatApiError(data.error, "Login failed. Please try again."),
      };
    }
    return { success: true, token: data.token, message: data.message };
  } catch {
    return {
      success: false,
      error: "Cannot reach the API server. Please make sure the backend is running.",
    };
  }
}

export async function registerUser(
  formData: FormData
): Promise<AuthResult> {
  try {
    const res = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        error: formatApiError(data.error, "Registration failed. Please try again."),
      };
    }
    return { success: true, message: data.message };
  } catch {
    return {
      success: false,
      error: "Cannot reach the API server. Please make sure the backend is running.",
    };
  }
}

export async function getProfile(
  token: string
): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: formatApiError(data.error, "Failed to load profile") };
    }
    return { success: true, user: data.user };
  } catch {
    return { success: false, error: "Cannot reach the API server." };
  }
}

export async function updateUserProfile(
  userId: string | number,
  formData: FormData,
  token?: string
): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const headers: Record<string, string> = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: "PUT",
      headers,
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.error || "Failed to update profile" };
    }
    return { success: true, message: data.message };
  } catch (err) {
    return { success: false, error: (err as Error).message || "Backend connection failed" };
  }
}
