"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bookmark } from "lucide-react";
import Rating from "./Rating";
import { isBookSaved, toggleSaveBook, subscribeSavedBooks } from "@/lib/savedBooks";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  rating?: number;
  cover: string;
  category?: string;
  className?: string;
}

export default function BookCard({
  id,
  title,
  author,
  rating,
  cover,
  category,
  className = "",
}: BookCardProps) {
  const [saved, setSaved] = useState(() => isBookSaved(id));

  useEffect(() => {
    // Listen to real-time save events across the app
    const unsubscribe = subscribeSavedBooks(() => {
      setSaved(isBookSaved(id));
    });
    return unsubscribe;
  }, [id]);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nextSaved = toggleSaveBook({
      id,
      title,
      author,
      rating,
      cover,
      category,
    });
    setSaved(nextSaved);
  };

  return (
    <Link
      href={`/books/${id}`}
      className={`group flex flex-col ${className}`}
    >
      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-3.5 bg-[#f4efe6]">
        <Image
          src={cover || "/images/books/echo-of-silence.jpeg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 16vw"
        />
        <button
          type="button"
          aria-label={saved ? "Hapus dari Library" : "Simpan ke Library"}
          title={saved ? "Tersimpan di Library" : "Simpan ke Library"}
          onClick={handleBookmarkClick}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${
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
      <h3 className="text-sm font-semibold text-[#1c1917] leading-snug line-clamp-2">
        {title}
      </h3>
      <p className="text-xs text-[#79716b] mt-1 truncate">{author}</p>
      {rating !== undefined && <Rating value={rating} className="mt-1.5" />}
    </Link>
  );
}
