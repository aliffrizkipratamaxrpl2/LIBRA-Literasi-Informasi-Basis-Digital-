"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bookmark } from "lucide-react";
import Rating from "./Rating";
import { isBookSaved, toggleSaveBook, subscribeSavedBooks } from "@/lib/savedBooks";
import type { Book, BackendBook } from "@/types";

export interface BookCardProps {
  // Can accept a direct book object from backend/frontend mapping
  book?: Book | BackendBook;
  // Or individual props for flexible composition
  id?: string | number;
  title?: string;
  author?: string;
  writer?: string;
  rating?: number;
  cover?: string;
  category?: string;
  category_id?: number | string;
  className?: string;
  showCategoryBadge?: boolean;
}

export default function BookCard({
  book,
  id: propId,
  title: propTitle,
  author: propAuthor,
  writer: propWriter,
  rating: propRating,
  cover: propCover,
  category: propCategory,
  category_id: propCategoryId,
  className = "",
  showCategoryBadge = false,
}: BookCardProps) {
  // Normalize book data from either full book object or individual props
  const rawId = book?.id ?? propId ?? "1";
  const bookId = String(rawId);
  const bookTitle = book?.title ?? propTitle ?? "Untitled Book";
  const bookAuthor =
    (book as Book)?.author ??
    (book as BackendBook)?.writer ??
    propAuthor ??
    propWriter ??
    "Unknown Author";
  const bookRating = (book as Book)?.rating ?? propRating ?? 4.8;
  const bookCover =
    book?.cover ||
    propCover ||
    "/images/books/echo-of-silence.jpeg";
  const bookCategory =
    (book as Book)?.category ??
    (book as BackendBook)?.category_id?.toString() ??
    propCategory ??
    (propCategoryId ? String(propCategoryId) : undefined);

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setSaved(isBookSaved(bookId));
    });

    // Listen to real-time save events across the app
    const unsubscribe = subscribeSavedBooks(() => {
      setSaved(isBookSaved(bookId));
    });

    return () => {
      cancelAnimationFrame(frame);
      unsubscribe();
    };
  }, [bookId]);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nextSaved = toggleSaveBook({
      id: bookId,
      title: bookTitle,
      author: bookAuthor,
      rating: bookRating,
      cover: bookCover,
      category: bookCategory,
    });
    setSaved(nextSaved);
  };

  return (
    <div className={`group flex flex-col relative ${className}`}>
      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-3.5 bg-[#f4efe6] shadow-2xs border border-[#e6e0d6]/60">
        <Link
          href={`/books/${bookId}`}
          className="absolute inset-0 z-0"
          aria-label={`View details of ${bookTitle}`}
        >
          <Image
            src={bookCover}
            alt={bookTitle}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 16vw"
          />
        </Link>

        {/* Optional Category Pill */}
        {showCategoryBadge && bookCategory && (
          <div className="pointer-events-none absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#8c695b] shadow-2xs z-10">
            {bookCategory}
          </div>
        )}

        {/* Bookmark Button */}
        <button
          type="button"
          aria-label={saved ? "Remove from Library" : "Save to Library"}
          title={saved ? "Saved in Library" : "Save to Library"}
          onClick={handleBookmarkClick}
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-all cursor-pointer ${
            saved
              ? "bg-[#8c695b] text-white opacity-100 shadow-md scale-105"
              : "bg-white/85 text-[#1c1917] opacity-0 group-hover:opacity-100 hover:bg-white"
          }`}
        >
          <Bookmark
            size={14}
            className={saved ? "fill-white" : ""}
          />
        </button>
      </div>

      <Link href={`/books/${bookId}`} className="block">
        <h3 className="text-sm font-semibold text-[#1c1917] leading-snug line-clamp-2 group-hover:text-[#8c695b] transition-colors">
          {bookTitle}
        </h3>
      </Link>
      <p className="text-xs text-[#79716b] mt-1 truncate">{bookAuthor}</p>
      {bookRating !== undefined && <Rating value={bookRating} className="mt-1.5" />}
    </div>
  );
}
