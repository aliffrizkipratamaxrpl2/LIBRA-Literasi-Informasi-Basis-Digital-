"use client";

import Image from "next/image";
import Link from "next/link";
import { Bookmark } from "lucide-react";
import Rating from "./Rating";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  rating?: number;
  cover: string;
  className?: string;
}

export default function BookCard({
  id,
  title,
  author,
  rating,
  cover,
  className = "",
}: BookCardProps) {
  return (
    <Link
      href={`/books/${id}`}
      className={`group flex flex-col ${className}`}
    >
      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-3.5">
        <Image
          src={cover}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 16vw"
        />
        <button
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => e.preventDefault()}
        >
          <Bookmark size={14} className="text-[#1c1917]" />
        </button>
      </div>
      <h3 className="text-sm font-semibold text-[#1c1917] leading-snug line-clamp-2">
        {title}
      </h3>
      <p className="text-xs text-[#79716b] mt-1">{author}</p>
      {rating !== undefined && <Rating value={rating} className="mt-1.5" />}
    </Link>
  );
}
