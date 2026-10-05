import type { Book } from "@/types";

const SAVED_BOOKS_KEY = "libra_saved_books_data";
const EVENT_NAME = "libra_saved_books_updated";

export const initialDefaultSaved: Book[] = [
  {
    id: "echo-of-silence",
    title: "The Echo of Silence",
    author: "Marcia Sterling",
    rating: 4.8,
    category: "Fiction",
    cover: "/images/books/echo-of-silence.jpeg",
  },
  {
    id: "algorithms-of-joy",
    title: "The Algorithms of Joy",
    author: "Dr. Arthur Pendelton",
    rating: 4.7,
    category: "Technology",
    cover: "/images/books/algorithms-of-joy.jpeg",
  },
];

let cachedSavedBooks: Book[] = initialDefaultSaved;
let cacheInitialized = false;

function readSavedFromStorage(): Book[] {
  if (typeof window === "undefined") return initialDefaultSaved;
  try {
    const raw = localStorage.getItem(SAVED_BOOKS_KEY);
    if (raw === null) {
      localStorage.setItem(SAVED_BOOKS_KEY, JSON.stringify(initialDefaultSaved));
      localStorage.setItem(
        "libra_saved_books",
        JSON.stringify(initialDefaultSaved.map((b) => b.id))
      );
      return initialDefaultSaved;
    }
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list : initialDefaultSaved;
  } catch {
    return initialDefaultSaved;
  }
}

export function getSavedBooks(): Book[] {
  if (typeof window === "undefined") return initialDefaultSaved;
  if (!cacheInitialized) {
    cachedSavedBooks = readSavedFromStorage();
    cacheInitialized = true;
  }
  return cachedSavedBooks;
}

export function isBookSaved(id: string): boolean {
  if (typeof window === "undefined" || !id) return false;
  const saved = getSavedBooks();
  return saved.some((b) => b.id === id);
}

export function toggleSaveBook(book: Book): boolean {
  if (typeof window === "undefined") return false;
  try {
    const current = getSavedBooks();
    const exists = current.some((b) => b.id === book.id);
    let updated: Book[];

    if (exists) {
      updated = current.filter((b) => b.id !== book.id);
    } else {
      updated = [
        {
          id: String(book.id),
          title: book.title,
          author: book.author,
          rating: book.rating ?? 4.8,
          cover: book.cover || "/images/books/echo-of-silence.jpeg",
          category: book.category,
        },
        ...current,
      ];
    }

    cachedSavedBooks = updated;
    cacheInitialized = true;
    localStorage.setItem(SAVED_BOOKS_KEY, JSON.stringify(updated));

    // Also maintain legacy ID array if needed
    const idList = updated.map((b) => b.id);
    localStorage.setItem("libra_saved_books", JSON.stringify(idList));

    // Broadcast change to all listening components
    window.dispatchEvent(
      new CustomEvent(EVENT_NAME, {
        detail: { bookId: book.id, isSaved: !exists, books: updated },
      })
    );

    return !exists;
  } catch {
    return false;
  }
}

export function removeSavedBook(id: string): void {
  if (typeof window === "undefined") return;
  try {
    const current = getSavedBooks();
    const updated = current.filter((b) => b.id !== id);
    cachedSavedBooks = updated;
    cacheInitialized = true;
    localStorage.setItem(SAVED_BOOKS_KEY, JSON.stringify(updated));
    localStorage.setItem("libra_saved_books", JSON.stringify(updated.map((b) => b.id)));
    window.dispatchEvent(
      new CustomEvent(EVENT_NAME, {
        detail: { bookId: id, isSaved: false, books: updated },
      })
    );
  } catch {
    // Fallback
  }
}

export function subscribeSavedBooks(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = () => {
    cachedSavedBooks = readSavedFromStorage();
    cacheInitialized = true;
    callback();
  };
  window.addEventListener(EVENT_NAME, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(EVENT_NAME, handler);
    window.removeEventListener("storage", handler);
  };
}
