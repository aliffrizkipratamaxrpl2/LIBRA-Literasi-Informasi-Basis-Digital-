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
