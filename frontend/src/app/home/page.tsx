"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar, Footer, PageContainer } from "@/components/layout";
import BookCard from "@/components/books/BookCard";
import SectionHeader from "@/components/navigation/SectionHeader";
import { getBooks, getCategories } from "@/lib/api";
import { isLoggedIn } from "@/lib/auth";
import { allCatalogBooks } from "@/data/mockBooks";
import type { Book } from "@/types";
import { Search, Flame, X } from "lucide-react";

const defaultCategories = [
  "All",
  "Fiction",
  "Self-Dev",
  "Romance",
  "Technology",
  "History",
  "Science",
  "Art",
];

const continueReadingBooks = [
  {
    id: "contours-of-memory",
    title: "Contours of Memory",
    author: "Siddharth Mehta",
    progress: 64,
    cover: "/images/books/shifting-light.jpeg",
  },
  {
    id: "beyond-the-grid",
    title: "Beyond the Grid",
    author: "Klaus Van Der Meer",
    progress: 28,
    cover: "/images/books/beyond-grid-mockup.jpeg",
  },
];

const defaultRecommendedBooks: Book[] = allCatalogBooks.map((b) => ({
  id: b.id,
  title: b.title,
  author: b.author,
  rating: b.rating,
  category: b.categories[0],
  cover: b.cover,
}));

export default function HomePage() {
  const router = useRouter();
  const [categories, setCategories] = useState<string[]>(defaultCategories);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [allBooks, setAllBooks] = useState<Book[]>(defaultRecommendedBooks);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn()) {
      router.replace("/login");
      return;
    }

    async function loadData() {
      setIsLoading(true);
      const [apiBooks, apiCats] = await Promise.all([
        getBooks(),
        getCategories(),
      ]);

      if (apiBooks && apiBooks.length > 0) {
        setAllBooks(apiBooks);
      }
      if (apiCats && apiCats.length > 0) {
        const uniqueCatNames = Array.from(
          new Set(apiCats.map((c) => c.category))
        ).filter(Boolean);
        setCategories(["All", ...uniqueCatNames]);
      }
      setIsLoading(false);
    }
    loadData();
  }, [router]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/browse?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/browse");
    }
  };

  const displayedBooks = useMemo(() => {
    let list = [...allBooks];

    // Filter by selected category pill
    if (selectedCategory !== "All") {
      list = list.filter((b) =>
        b.category?.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    // Filter by search query if any
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          (b.category && b.category.toLowerCase().includes(q))
      );
    }

    return list.slice(0, 8);
  }, [allBooks, selectedCategory, searchQuery]);

  return (
    <>
      <Navbar variant="authenticated" />

      <main className="flex-1 py-10">
        <PageContainer>
          {/* Top Greeting */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-[#1c1917] tracking-tight">
              Good Morning, Khall
            </h1>
            <p className="text-sm text-[#79716b] mt-1.5">
              Thursday, October 24 &bull; Let&apos;s explore some new literature today.
            </p>
          </div>

          {/* Search Bar Form */}
          <form onSubmit={handleSearchSubmit} className="relative mb-5">
            <div className="flex items-center w-full h-14 px-5 rounded-full border border-[#e6e0d6] bg-white shadow-xs focus-within:border-[#8c695b] focus-within:ring-2 focus-within:ring-[#8c695b]/10 transition-all">
              <button
                type="submit"
                aria-label="Search catalog"
                className="text-[#79716b] hover:text-[#8c695b] shrink-0 mr-3 transition-colors cursor-pointer"
              >
                <Search size={19} />
              </button>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search books, authors, categories, or quotes... (Press Enter to browse)"
                className="w-full text-sm bg-transparent text-[#1c1917] placeholder:text-[#a8a29e] focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="p-1 rounded-full text-[#79716b] hover:text-[#1c1917] hover:bg-[#f4efe6] transition-colors mr-2 cursor-pointer"
                >
                  <X size={16} />
                </button>
              )}
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-semibold rounded-full bg-[#8c695b] text-white hover:bg-[#7b594b] transition-colors shrink-0 cursor-pointer"
              >
                Browse
              </button>
            </div>
          </form>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 mb-10 no-scrollbar">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 text-xs font-medium rounded-full transition-all shrink-0 ${
                    isActive
                      ? "bg-[#6b564b] text-white shadow-xs"
                      : "bg-white border border-[#e6e0d6] text-[#1c1917] hover:bg-[#f4efe6]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Main 2-Column Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-start">
            {/* Left Column: Continue Reading + Recommended */}
            <div className="space-y-12">
              {/* Continue Reading */}
              <div>
                <h2 className="text-2xl font-bold text-[#1c1917] tracking-tight mb-6">
                  Continue Reading
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {continueReadingBooks.map((book) => (
                    <Link
                      key={book.id}
                      href={`/read/${book.id}`}
                      className="group flex items-center gap-4 p-4 rounded-2xl border border-[#e6e0d6] bg-white hover:shadow-md hover:border-[#d4cfc6] transition-all"
                    >
                      <div className="relative w-16 h-22 rounded-xl overflow-hidden shrink-0 shadow-xs">
                        <Image
                          src={book.cover}
                          alt={book.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-[#1c1917] truncate">
                          {book.title}
                        </h3>
                        <p className="text-xs text-[#79716b] mt-0.5 truncate">
                          {book.author}
                        </p>
                        <div className="mt-3">
                          <div className="w-full h-1.5 rounded-full bg-[#f4efe6] overflow-hidden">
                            <div
                              className="h-full bg-[#8c695b] rounded-full transition-all duration-500"
                              style={{ width: `${book.progress}%` }}
                            />
                          </div>
                          <span className="text-[11px] text-[#79716b] mt-1.5 inline-block font-medium">
                            {book.progress}% completed
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Recommended For You */}
              <div>
                <SectionHeader
                  title={
                    selectedCategory === "All"
                      ? "Recommended For You"
                      : `Recommended in ${selectedCategory}`
                  }
                  actionLabel="View All"
                  actionHref={
                    selectedCategory === "All"
                      ? "/browse"
                      : `/browse?category=${encodeURIComponent(selectedCategory)}`
                  }
                />
                {isLoading ? (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="animate-pulse bg-[#f4efe6] rounded-2xl aspect-[3/4]"
                      />
                    ))}
                  </div>
                ) : displayedBooks.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                    {displayedBooks.map((book) => (
                      <BookCard
                        key={book.id}
                        book={book}
                        showCategoryBadge={selectedCategory === "All"}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center bg-white rounded-2xl border border-[#e6e0d6]">
                    <p className="text-xs text-[#79716b]">
                      No recommendations found for &ldquo;{selectedCategory}&rdquo;.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Reading Stats Widget Card */}
            <div className="bg-white rounded-3xl border border-[#e6e0d6] p-7 space-y-7 shadow-xs">
              <h2 className="text-base font-bold text-[#1c1917]">
                Your October Reading Stats
              </h2>

              {/* 4 Stat Tiles */}
              <div className="grid grid-cols-2 gap-3.5">
                <div className="bg-[#f4efe6] rounded-2xl p-4">
                  <p className="text-2xl font-bold text-[#1c1917]">4</p>
                  <p className="text-xs text-[#79716b] mt-1">Books Completed</p>
                </div>
                <div className="bg-[#f4efe6] rounded-2xl p-4">
                  <p className="text-2xl font-bold text-[#1c1917]">1,240</p>
                  <p className="text-xs text-[#79716b] mt-1">Pages Read</p>
                </div>
                <div className="bg-[#f4efe6] rounded-2xl p-4">
                  <div className="flex items-center gap-1.5">
                    <p className="text-2xl font-bold text-[#1c1917]">12 Days</p>
                    <Flame size={16} className="text-[#e59934] fill-[#e59934] shrink-0" />
                  </div>
                  <p className="text-xs text-[#79716b] mt-1">Reading Streak</p>
                </div>
                <div className="bg-[#f4efe6] rounded-2xl p-4">
                  <p className="text-2xl font-bold text-[#1c1917]">18.5h</p>
                  <p className="text-xs text-[#79716b] mt-1">Time Spent</p>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-[#e6e0d6]" />

              {/* Yearly Goal Progress */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#1c1917]">
                    Yearly Goal Progress
                  </span>
                  <span className="text-[#79716b]">18 of 24 books</span>
                </div>

                <div className="w-full h-2.5 rounded-full bg-[#f4efe6] overflow-hidden">
                  <div
                    className="h-full bg-[#8c695b] rounded-full transition-all duration-500"
                    style={{ width: "75%" }}
                  />
                </div>

                <p className="text-xs text-[#79716b] font-medium">
                  75% Completed
                </p>
              </div>
            </div>
          </div>
        </PageContainer>
      </main>

      <Footer />
    </>
  );
}
