"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar, Footer, PageContainer } from "@/components/layout";
import BookCard from "@/components/books/BookCard";
import Rating from "@/components/books/Rating";
import { Headphones, BookOpen, Bookmark, Star } from "lucide-react";

interface BookDetailData {
  title: string;
  author: string;
  publishedYear: string;
  rating: number;
  categories: string[];
  cover: string;
  synopsis: string;
  audiobookDuration: string;
  details: {
    pages: string;
    language: string;
    publisher: string;
    publishedDate: string;
    isbn: string;
    format: string;
  };
}

const defaultBook: BookDetailData = {
  title: "Designing the Humane",
  author: "Clementine Dupont",
  publishedYear: "2021",
  rating: 4.8,
  categories: ["Design", "Technology", "Non-Fiction"],
  cover: "/images/books/design-systems.jpeg",
  synopsis:
    "An outstanding study on industrial and aesthetic design choices that have reshaped our interface with life over centuries. From original typographies and editorial grid alignments, to industrial machinery and modern digital components, Dupont showcases how \"humanity\" is encoded directly into physical and interactive artifacts.",
  audiobookDuration: "8h 45m narration",
  details: {
    pages: "340 pages",
    language: "English",
    publisher: "Cozy Craft Press",
    publishedDate: "October 12, 2021",
    isbn: "978-3-16-148410-0",
    format: "eBook, Hardcover, Audio",
  },
};

const reviews = [
  {
    id: "1",
    name: "Ikan Cupang",
    avatar: "/images/avatars/ikan-cupang.jpeg",
    time: "2 weeks ago",
    rating: 5,
    text: "Genuinely changed the way I think about everyday interfaces. Dupont writes with extreme clarity and elegance. The cozy book design perfectly mirrors her philosophy.",
  },
  {
    id: "2",
    name: "Mie Ayam",
    avatar: "/images/avatars/mie-ayam.jpeg",
    time: "1 month ago",
    rating: 4,
    text: "A very insightful exploration of how aesthetic crafts shape human communities. I particularly loved the chapters on modern typographies and spatial grid architectures.",
  },
];

const relatedBooks = [
  {
    id: "contours-of-memory",
    title: "Contours of Memory",
    author: "Siddharth Mehta",
    rating: 4.5,
    cover: "/images/books/contours-of-memory.jpeg",
  },
  {
    id: "echoes-of-renaissance",
    title: "Echoes of the Renaissance",
    author: "Elena Rostova",
    rating: 4.8,
    cover: "/images/books/echoes-of-renaissance.jpeg",
  },
  {
    id: "design-systems",
    title: "Design Systems",
    author: "Clementine Dupont",
    rating: 4.9,
    cover: "/images/books/design-systems.jpeg",
  },
  {
    id: "cozy-cabin",
    title: "Cozy Cabin Living",
    author: "Arthur Wood",
    rating: 4.7,
    cover: "/images/books/cozy-cabin.jpeg",
  },
];

export default function BookDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [isSaved, setIsSaved] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const book = defaultBook;

  return (
    <>
      <Navbar variant="authenticated" />

      <main className="flex-1 py-12">
        <PageContainer>
          {/* Main Book Detail Hero: Left Cover (340px) + Right Details */}
          <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-12 lg:gap-16 items-start mb-24">
            {/* Left Column: Big Book Cover + Audiobook Banner */}
            <div className="space-y-5 max-w-sm mx-auto lg:max-w-none w-full">
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl shadow-[#8c695b]/15 border border-[#e6e0d6]">
                <Image
                  src={book.cover}
                  alt={book.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="340px"
                />
              </div>

              {/* Audiobook Available Pill Card */}
              <div className="flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-2xl bg-white border border-[#e6e0d6] text-xs font-semibold text-[#1c1917] shadow-2xs">
                <Headphones size={16} className="text-[#8c695b]" />
                <span>Audiobook Available</span>
                <span className="text-[#79716b] font-normal">&bull;</span>
                <span className="text-[#79716b] font-normal">
                  {book.audiobookDuration}
                </span>
              </div>
            </div>

            {/* Right Column: Book Metadata, Synopsis, 6 Box Details, Actions */}
            <div className="space-y-8">
              {/* Categories + Title + Author + Rating */}
              <div className="space-y-3.5">
                <div className="flex flex-wrap items-center gap-2">
                  {book.categories.map((cat) => (
                    <span
                      key={cat}
                      className="px-3 py-1 rounded-full bg-[#f4efe6] text-xs font-semibold text-[#8c695b]"
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                <h1 className="text-3xl sm:text-4xl font-bold text-[#1c1917] tracking-tight">
                  {book.title}
                </h1>

                <div className="flex flex-wrap items-center gap-2 text-sm text-[#79716b]">
                  <span className="font-semibold text-[#8c695b]">
                    {book.author}
                  </span>
                  <span>&bull;</span>
                  <span>Published in {book.publishedYear}</span>
                </div>

                <div className="pt-1">
                  <Rating value={book.rating} />
                </div>
              </div>

              {/* Synopsis */}
              <div className="space-y-2 pt-2 border-t border-[#eee9e0]">
                <h2 className="text-sm font-bold text-[#1c1917]">Synopsis</h2>
                <p className="text-xs sm:text-sm text-[#79716b] leading-relaxed">
                  {isExpanded
                    ? book.synopsis +
                      " This comprehensive edition brings together full historical documentation, comparative sketches, and interviews with contemporary vanguard designers."
                    : book.synopsis}
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="ml-1.5 font-bold text-[#1c1917] hover:text-[#8c695b] transition-colors"
                  >
                    {isExpanded ? "Read Less" : "Read More..."}
                  </button>
                </p>
              </div>

              {/* Book Details (6 Box Grid: 3 cols x 2 rows) */}
              <div className="space-y-3 pt-2">
                <h2 className="text-sm font-bold text-[#1c1917]">
                  Book Details
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                  <div className="bg-white rounded-2xl border border-[#e6e0d6] p-4 shadow-2xs">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#a8a29e]">
                      PAGES
                    </p>
                    <p className="text-xs font-bold text-[#1c1917] mt-1">
                      {book.details.pages}
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl border border-[#e6e0d6] p-4 shadow-2xs">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#a8a29e]">
                      LANGUAGE
                    </p>
                    <p className="text-xs font-bold text-[#1c1917] mt-1">
                      {book.details.language}
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl border border-[#e6e0d6] p-4 shadow-2xs">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#a8a29e]">
                      PUBLISHER
                    </p>
                    <p className="text-xs font-bold text-[#1c1917] mt-1">
                      {book.details.publisher}
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl border border-[#e6e0d6] p-4 shadow-2xs">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#a8a29e]">
                      PUBLISHED DATE
                    </p>
                    <p className="text-xs font-bold text-[#1c1917] mt-1">
                      {book.details.publishedDate}
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl border border-[#e6e0d6] p-4 shadow-2xs">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#a8a29e]">
                      ISBN
                    </p>
                    <p className="text-xs font-bold text-[#1c1917] mt-1">
                      {book.details.isbn}
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl border border-[#e6e0d6] p-4 shadow-2xs">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#a8a29e]">
                      FORMAT
                    </p>
                    <p className="text-xs font-bold text-[#1c1917] mt-1">
                      {book.details.format}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <Link
                  href={`/read/${slug || "designing-the-humane"}`}
                  className="flex items-center gap-2 px-8 py-3.5 text-xs font-semibold bg-[#8c695b] text-white rounded-full hover:bg-[#7b594b] transition-colors shadow-sm"
                >
                  <BookOpen size={15} />
                  <span>Read Now</span>
                </Link>

                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className={`flex items-center gap-2 px-7 py-3.5 text-xs font-semibold rounded-full border transition-all ${
                    isSaved
                      ? "bg-[#f4efe6] border-[#8c695b] text-[#8c695b]"
                      : "border-[#e6e0d6] bg-white text-[#1c1917] hover:bg-[#f4efe6]"
                  }`}
                >
                  <Bookmark
                    size={15}
                    className={isSaved ? "fill-[#8c695b]" : ""}
                  />
                  <span>{isSaved ? "Saved to Library" : "Save to Library"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Section: Community Reviews */}
          <div className="mb-24 pt-12 border-t border-[#e6e0d6]">
            <h2 className="text-2xl font-bold text-[#1c1917] tracking-tight mb-8">
              Community Reviews
            </h2>

            <div className="space-y-6">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white rounded-3xl border border-[#e6e0d6] p-6 sm:p-7 shadow-xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[#e6e0d6] shrink-0">
                        <Image
                          src={review.avatar}
                          alt={review.name}
                          fill
                          className="object-cover"
                          sizes="50px"
                        />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-[#1c1917]">
                          {review.name}
                        </h3>
                        <p className="text-[11px] text-[#a8a29e] mt-0.5">
                          {review.time}
                        </p>
                      </div>
                    </div>

                    {/* Review Rating Stars */}
                    <div className="flex items-center gap-1">
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={13}
                            className={
                              star <= review.rating
                                ? "fill-[#e59934] text-[#e59934]"
                                : "fill-transparent text-[#d4cfc6]"
                            }
                          />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-[#1c1917] ml-1">
                        {review.rating}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#79716b] leading-relaxed pt-1">
                    {review.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Related Books */}
          <div className="pt-8 border-t border-[#e6e0d6]">
            <h2 className="text-2xl font-bold text-[#1c1917] tracking-tight mb-8">
              Related Books
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {relatedBooks.map((book) => (
                <BookCard key={book.id} {...book} />
              ))}
            </div>
          </div>
        </PageContainer>
      </main>

      <Footer />
    </>
  );
}
