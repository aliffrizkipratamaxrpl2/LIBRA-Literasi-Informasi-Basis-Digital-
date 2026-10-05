import type { Book, BackendBook, BackendCategory, BackendPlan } from "@/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";

const curatedCovers = [
  "/images/books/echo-of-silence.jpeg",
  "/images/books/algorithms-of-joy.jpeg",
  "/images/books/beyond-the-grid.jpeg",
  "/images/books/contours-of-memory.jpeg",
  "/images/books/cozy-cabin.jpeg",
  "/images/books/design-systems.jpeg",
  "/images/books/echoes-of-renaissance.jpeg",
  "/images/books/lessons-of-time.jpeg",
  "/images/books/midsummer-wanderlust.jpeg",
  "/images/books/organic-forms.jpeg",
  "/images/books/shifting-light.jpeg",
  "/images/books/whispers-of-kyoto.jpeg",
];

export const categoryIdMap: Record<number, string> = {
  1: "Fiction",
  2: "Non-Fiction",
  3: "Science & Technology",
  4: "Self-Development",
  5: "Business & Finance",
  6: "History",
  7: "Philosophy",
  8: "Biography & Memoir",
  9: "Comics & Graphic Novels",
  10: "Horror & Mystery",
  11: "Poetry & Literature",
  12: "Children & Young Adult",
};

export function resolveBookCover(cover?: string, id?: string | number): string {
  if (
    cover &&
    (cover.startsWith("http://") ||
      cover.startsWith("https://") ||
      cover.startsWith("/images/"))
  ) {
    return cover;
  }
  const numericId =
    typeof id === "number" ? id : parseInt(String(id), 10) || 1;
  const index = Math.abs(numericId - 1) % curatedCovers.length;
  return curatedCovers[index];
}

export function resolveCategoryName(
  categoryId?: number | string,
  customCategory?: string
): string {
  if (customCategory && isNaN(Number(customCategory))) {
    return customCategory;
  }
  const idNum =
    typeof categoryId === "number"
      ? categoryId
      : parseInt(String(categoryId), 10);
  if (idNum && categoryIdMap[idNum]) {
    return categoryIdMap[idNum];
  }
  return customCategory || "General";
}

export function mapBackendBookToBook(b: BackendBook): Book {
  const numericId = typeof b.id === "number" ? b.id : parseInt(String(b.id), 10) || 1;
  const catName = resolveCategoryName(b.category_id);
  const coverUrl = resolveBookCover(b.cover, b.id);
  const ratingValue = 4.5 + ((numericId * 7) % 5) / 10;

  return {
    id: String(b.id),
    title: b.title,
    author: b.writer,
    cover: coverUrl,
    category: catName,
    synopsis: b.synopsis,
    content: b.content,
    rating: Number(ratingValue.toFixed(1)),
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
