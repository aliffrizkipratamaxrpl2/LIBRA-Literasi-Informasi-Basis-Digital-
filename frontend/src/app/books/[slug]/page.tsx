"use client";

import { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar, Footer, PageContainer } from "@/components/layout";
import BookCard from "@/components/books/BookCard";
import Rating from "@/components/books/Rating";
import SectionHeader from "@/components/navigation/SectionHeader";
import { getBooks } from "@/lib/api";
import { findDetailedBook, detailedBooksDatabase, DetailedBook } from "@/data/mockBooks";
import { isBookSaved, toggleSaveBook, subscribeSavedBooks } from "@/lib/savedBooks";
import type { Book } from "@/types";
import { Headphones, BookOpen, Bookmark, Star } from "lucide-react";

export default function BookDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  // Initialize with fallback or matched mock book
  const fallbackBook = findDetailedBook(slug) || detailedBooksDatabase["designing-the-humane"];
  const [book, setBook] = useState<DetailedBook>(fallbackBook);
  const [relatedBooks, setRelatedBooks] = useState<Book[]>([]);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Listen for real-time save updates
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const bookId = book.id || slug;
      setIsSaved(isBookSaved(bookId));
    });

    const unsubscribe = subscribeSavedBooks(() => {
      const bookId = book.id || slug;
      setIsSaved(isBookSaved(bookId));
    });

    return () => {
      cancelAnimationFrame(frame);
      unsubscribe();
    };
  }, [book.id, slug]);

  useEffect(() => {
    async function loadBookData() {
      setIsLoading(true);

      // 1. Check local catalog first
      const localMatch = findDetailedBook(slug);
      let activeBook: DetailedBook = localMatch || {
        ...detailedBooksDatabase["designing-the-humane"],
        id: slug,
        title: decodeURIComponent(slug).replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      };

      // 2. Fetch from backend API to overlay live data
      const apiBooks = await getBooks();
      if (apiBooks && apiBooks.length > 0) {
        const backendMatch = apiBooks.find(
          (b) =>
            String(b.id) === String(slug) ||
            b.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug.toLowerCase() ||
            slug.toLowerCase().includes(b.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"))
        );

        if (backendMatch) {
          activeBook = {
            id: String(backendMatch.id),
            title: backendMatch.title,
            author: backendMatch.author,
            publishedYear: activeBook.publishedYear || "2024",
            rating: backendMatch.rating ?? activeBook.rating ?? 4.8,
            categories: backendMatch.category
              ? [backendMatch.category]
              : activeBook.categories || ["Literature"],
            cover: backendMatch.cover || activeBook.cover,
            synopsis:
              backendMatch.synopsis ||
              activeBook.synopsis ||
              `A remarkable work by ${backendMatch.author}, exploring deep perspectives on literature, technology, and storytelling.`,
            audiobookDuration: activeBook.audiobookDuration || "8h 15m narration",
            details: {
              ...activeBook.details,
              publisher: activeBook.details.publisher || "LIBRA Digital Press",
            },
            reviews: activeBook.reviews,
          };
        }

        // Set related books from other backend or catalog books
        const others = apiBooks.filter((b) => String(b.id) !== String(activeBook.id)).slice(0, 4);
        setRelatedBooks(others);
      } else {
        // Fallback related books
        const mockOthers = Object.values(detailedBooksDatabase)
          .filter((b) => b.id !== activeBook.id)
          .slice(0, 4)
          .map((b) => ({
            id: b.id,
            title: b.title,
            author: b.author,
            rating: b.rating,
            cover: b.cover,
            category: b.categories[0],
          }));
        setRelatedBooks(mockOthers);
      }

      setBook(activeBook);
      setIsSaved(isBookSaved(activeBook.id || slug));
      setIsLoading(false);
    }

    loadBookData();
  }, [slug]);

  const handleToggleSave = () => {
    const nextSaved = toggleSaveBook({
      id: book.id || slug,
      title: book.title,
      author: book.author,
      rating: book.rating,
      cover: book.cover,
      category: book.categories[0],
    });
    setIsSaved(nextSaved);
  };

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
                  src={book.cover || "/images/books/echo-of-silence.jpeg"}
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
                      " This comprehensive edition brings together full historical documentation, comparative sketches, and interviews with contemporary vanguard authors."
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
                  href={`/read/${book.id || slug}`}
                  className="flex items-center gap-2 px-8 py-3.5 text-xs font-semibold bg-[#8c695b] text-white rounded-full hover:bg-[#7b594b] transition-colors shadow-sm"
                >
                  <BookOpen size={15} />
                  <span>Read Now</span>
                </Link>

                <button
                  onClick={handleToggleSave}
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
              {(book.reviews || detailedBooksDatabase["designing-the-humane"].reviews || []).map(
                (review) => (
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
                )
              )}
            </div>
          </div>

          {/* Section: Related Books */}
          <div className="pt-8 border-t border-[#e6e0d6]">
            <SectionHeader
              title="Related Books"
              description="More titles recommended by the LIBRA editorial staff"
              actionLabel="View All"
              actionHref="/browse"
            />

            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse bg-[#f4efe6] rounded-2xl aspect-[3/4]"
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {relatedBooks.map((b) => (
                  <BookCard
                    key={b.id}
                    book={b}
                  />
                ))}
              </div>
            )}
          </div>
        </PageContainer>
      </main>

      <Footer />
    </>
  );
}
