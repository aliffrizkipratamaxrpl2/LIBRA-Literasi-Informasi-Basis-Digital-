"use client";

import { useEffect, useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar, Footer, PageContainer } from "@/components/layout";
import BookCard from "@/components/books/BookCard";
import { getBooks, getCategories } from "@/lib/api";
import { allCatalogBooks } from "@/data/mockBooks";
import type { Book } from "@/types";
import { Search, X, ChevronDown, Check } from "lucide-react";

interface FilterState {
  categories: string[];
  format: string[];
  language: string[];
  ratingRange: string[];
  publicationYear: string[];
}

const defaultBrowseBooks: Book[] = allCatalogBooks.map((b) => ({
  id: b.id,
  title: b.title,
  author: b.author,
  rating: b.rating,
  category: b.categories[0],
  cover: b.cover,
}));

const staticFilterOptions = {
  categories: [
    "Fiction",
    "Technology",
    "Romance",
    "Science",
    "History",
    "Art",
    "Self-Development",
  ],
  format: ["eBook", "Audiobook", "PDF"],
  language: ["English", "Spanish", "French"],
  ratingRange: [
    { label: "4.5 ★ & above", value: "4.5" },
    { label: "4.0 ★ & above", value: "4.0" },
    { label: "3.5 ★ & above", value: "3.5" },
  ],
  publicationYear: [
    { label: "2024 Releases", value: "2024" },
    { label: "2020 - 2023", value: "2020-2023" },
    { label: "Before 2020", value: "before-2020" },
  ],
};

function BrowseContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");
  const initialQuery = searchParams.get("q") || "";

  const [allBooks, setAllBooks] = useState<Book[]>(defaultBrowseBooks);
  const [categoriesList, setCategoriesList] = useState<string[]>(
    staticFilterOptions.categories
  );
  const [searchQuery, setSearchQuery] = useState(() => initialQuery);
  const [filters, setFilters] = useState<FilterState>(() => ({
    categories: initialCategory ? [initialCategory] : [],
    format: [],
    language: [],
    ratingRange: [],
    publicationYear: [],
  }));
  const [sortBy, setSortBy] = useState("Popularity");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const ITEMS_PER_PAGE = 8;

  // Load books & categories from backend
  useEffect(() => {
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
        setCategoriesList(apiCats.map((c) => c.category));
      }
      setIsLoading(false);
    }
    loadData();
  }, []);

  const toggleFilter = (type: keyof FilterState, value: string) => {
    setCurrentPage(1);
    setFilters((prev) => {
      const current = prev[type];
      const next = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      return { ...prev, [type]: next };
    });
  };

  const resetFilters = () => {
    setFilters({
      categories: [],
      format: [],
      language: [],
      ratingRange: [],
      publicationYear: [],
    });
    setSearchQuery("");
    setCurrentPage(1);
  };

  // Filter & Sort books
  const filteredAndSortedBooks = useMemo(() => {
    let result = [...allBooks];

    // 1. Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          (b.category && b.category.toLowerCase().includes(q))
      );
    }

    // 2. Category filter
    if (filters.categories.length > 0) {
      result = result.filter((b) => {
        if (!b.category) return true;
        return filters.categories.some((cat) =>
          b.category?.toLowerCase().includes(cat.toLowerCase())
        );
      });
    }

    // 3. Rating filter
    if (filters.ratingRange.length > 0) {
      const minRating = Math.min(...filters.ratingRange.map(Number));
      result = result.filter((b) => (b.rating ?? 4.8) >= minRating);
    }

    // 4. Sorting
    if (sortBy === "Rating (High to Low)") {
      result.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    } else if (sortBy === "Title (A-Z)") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "Newest Releases") {
      result.reverse();
    }

    return result;
  }, [allBooks, searchQuery, filters, sortBy]);

  // Pagination calculation
  const totalResults = filteredAndSortedBooks.length;
  const totalPages = Math.max(1, Math.ceil(totalResults / ITEMS_PER_PAGE));
  const paginatedBooks = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedBooks.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAndSortedBooks, currentPage]);

  return (
    <main className="flex-1 py-10">
      <PageContainer>
        {/* Top Search Input */}
        <div className="relative mb-6">
          <div className="flex items-center w-full h-14 px-5 rounded-full border border-[#e6e0d6] bg-white shadow-xs focus-within:border-[#8c695b] transition-all">
            <Search size={20} className="text-[#79716b] shrink-0 mr-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search books, authors, categories, or quotes..."
              className="w-full text-base bg-transparent text-[#1c1917] placeholder:text-[#a8a29e] focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setCurrentPage(1);
                }}
                className="p-1 rounded-full text-[#79716b] hover:text-[#1c1917] hover:bg-[#f4efe6] transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Results subtitle */}
        <p className="text-sm text-[#79716b] mb-8">
          Showing <span className="font-semibold text-[#1c1917]">{totalResults}</span>{" "}
          {totalResults === 1 ? "result" : "results"} for{" "}
          <span className="font-semibold text-[#1c1917]">
            &ldquo;{searchQuery || (filters.categories.length ? filters.categories.join(", ") : "All Books")}&rdquo;
          </span>
        </p>

        {/* 2-Column Main Layout: Sidebar Filters + Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10 items-start">
          {/* Sidebar Filters */}
          <aside className="space-y-8 bg-white lg:bg-transparent p-6 lg:p-0 rounded-2xl border lg:border-none border-[#e6e0d6]">
            <div className="flex items-center justify-between pb-4 border-b border-[#e6e0d6]">
              <h2 className="text-base font-bold text-[#1c1917]">Filters</h2>
              <button
                onClick={resetFilters}
                className="text-xs font-semibold text-[#8c695b] hover:text-[#7b594b] transition-colors"
              >
                Reset All
              </button>
            </div>

            {/* Categories */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1c1917]">
                Categories
              </h3>
              <div className="space-y-2.5">
                {categoriesList.map((cat) => {
                  const isChecked = filters.categories.includes(cat);
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => toggleFilter("categories", cat)}
                      className="flex items-center gap-2.5 text-sm text-[#79716b] hover:text-[#1c1917] cursor-pointer select-none text-left w-full transition-colors"
                    >
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center border transition-colors shrink-0 ${
                          isChecked
                            ? "bg-[#8c695b] border-[#8c695b] text-white"
                            : "border-[#d4cfc6] bg-white"
                        }`}
                      >
                        {isChecked && <Check size={11} strokeWidth={3} />}
                      </div>
                      <span className={isChecked ? "font-medium text-[#1c1917]" : ""}>
                        {cat}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Format */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1c1917]">
                Format
              </h3>
              <div className="space-y-2.5">
                {staticFilterOptions.format.map((fmt) => {
                  const isChecked = filters.format.includes(fmt);
                  return (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => toggleFilter("format", fmt)}
                      className="flex items-center gap-2.5 text-sm text-[#79716b] hover:text-[#1c1917] cursor-pointer select-none text-left w-full transition-colors"
                    >
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center border transition-colors shrink-0 ${
                          isChecked
                            ? "bg-[#8c695b] border-[#8c695b] text-white"
                            : "border-[#d4cfc6] bg-white"
                        }`}
                      >
                        {isChecked && <Check size={11} strokeWidth={3} />}
                      </div>
                      <span className={isChecked ? "font-medium text-[#1c1917]" : ""}>
                        {fmt}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Language */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1c1917]">
                Language
              </h3>
              <div className="space-y-2.5">
                {staticFilterOptions.language.map((lang) => {
                  const isChecked = filters.language.includes(lang);
                  return (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => toggleFilter("language", lang)}
                      className="flex items-center gap-2.5 text-sm text-[#79716b] hover:text-[#1c1917] cursor-pointer select-none text-left w-full transition-colors"
                    >
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center border transition-colors shrink-0 ${
                          isChecked
                            ? "bg-[#8c695b] border-[#8c695b] text-white"
                            : "border-[#d4cfc6] bg-white"
                        }`}
                      >
                        {isChecked && <Check size={11} strokeWidth={3} />}
                      </div>
                      <span className={isChecked ? "font-medium text-[#1c1917]" : ""}>
                        {lang}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Rating Range */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1c1917]">
                Rating Range
              </h3>
              <div className="space-y-2.5">
                {staticFilterOptions.ratingRange.map((rating) => {
                  const isChecked = filters.ratingRange.includes(rating.value);
                  return (
                    <button
                      key={rating.value}
                      type="button"
                      onClick={() => toggleFilter("ratingRange", rating.value)}
                      className="flex items-center gap-2.5 text-sm text-[#79716b] hover:text-[#1c1917] cursor-pointer select-none text-left w-full transition-colors"
                    >
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center border transition-colors shrink-0 ${
                          isChecked
                            ? "bg-[#8c695b] border-[#8c695b] text-white"
                            : "border-[#d4cfc6] bg-white"
                        }`}
                      >
                        {isChecked && <Check size={11} strokeWidth={3} />}
                      </div>
                      <span className={isChecked ? "font-medium text-[#1c1917]" : ""}>
                        {rating.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Publication Year */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1c1917]">
                Publication Year
              </h3>
              <div className="space-y-2.5">
                {staticFilterOptions.publicationYear.map((year) => {
                  const isChecked = filters.publicationYear.includes(year.value);
                  return (
                    <button
                      key={year.value}
                      type="button"
                      onClick={() => toggleFilter("publicationYear", year.value)}
                      className="flex items-center gap-2.5 text-sm text-[#79716b] hover:text-[#1c1917] cursor-pointer select-none text-left w-full transition-colors"
                    >
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center border transition-colors shrink-0 ${
                          isChecked
                            ? "bg-[#8c695b] border-[#8c695b] text-white"
                            : "border-[#d4cfc6] bg-white"
                        }`}
                      >
                        {isChecked && <Check size={11} strokeWidth={3} />}
                      </div>
                      <span className={isChecked ? "font-medium text-[#1c1917]" : ""}>
                        {year.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Right Side: Toolbar + Grid or Empty State + Pagination */}
          <div className="space-y-8">
            {/* Sorting Toolbar */}
            <div className="flex items-center justify-between pb-4 border-b border-[#e6e0d6]">
              <p className="text-sm text-[#79716b]">
                Sorted by:{" "}
                <span className="font-semibold text-[#1c1917]">{sortBy}</span>
              </p>

              <div className="relative">
                <button
                  onClick={() => setShowSortMenu(!showSortMenu)}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border border-[#e6e0d6] bg-white text-[#1c1917] hover:bg-[#f4efe6] transition-colors"
                >
                  <span>{sortBy}</span>
                  <ChevronDown size={14} />
                </button>

                {showSortMenu && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl border border-[#e6e0d6] bg-white shadow-lg py-1.5 z-20">
                    {[
                      "Popularity",
                      "Rating (High to Low)",
                      "Newest Releases",
                      "Title (A-Z)",
                    ].map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setSortBy(option);
                          setShowSortMenu(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-xs transition-colors ${
                          sortBy === option
                            ? "bg-[#f4efe6] font-semibold text-[#8c695b]"
                            : "text-[#1c1917] hover:bg-[#faf9f7]"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Dynamic Results Grid or Empty State */}
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse bg-[#f4efe6] rounded-2xl aspect-[3/4]"
                  />
                ))}
              </div>
            ) : paginatedBooks.length > 0 ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {paginatedBooks.map((book) => (
                    <BookCard
                      key={book.id}
                      book={book}
                      showCategoryBadge
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 pt-6">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      className="px-4 py-2 text-xs font-medium rounded-full border border-[#e6e0d6] bg-white text-[#79716b] hover:text-[#1c1917] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-8 h-8 rounded-full text-xs font-semibold transition-colors ${
                            currentPage === page
                              ? "bg-[#8c695b] text-white"
                              : "border border-[#e6e0d6] bg-white text-[#79716b] hover:text-[#1c1917]"
                          }`}
                        >
                          {page}
                        </button>
                      )
                    )}

                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      className="px-4 py-2 text-xs font-medium rounded-full border border-[#e6e0d6] bg-white text-[#79716b] hover:text-[#1c1917] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              /* REAL EMPTY STATE */
              <div className="max-w-xl mx-auto rounded-3xl border border-[#e6e0d6] bg-white p-10 text-center shadow-xs my-8">
                <div className="w-16 h-16 rounded-full bg-[#f4efe6] flex items-center justify-center text-[#8c695b] mx-auto mb-6">
                  <Search size={24} />
                </div>

                <h3 className="text-xl font-bold text-[#1c1917] mb-2">
                  No results found
                </h3>
                <p className="text-sm text-[#79716b] leading-relaxed mb-6">
                  We couldn&apos;t find any books matching your current search
                  parameters. Try clearing some filters or using different
                  keywords.
                </p>

                <div className="rounded-2xl bg-[#f4efe6] p-5 text-left mb-7">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1c1917] mb-2">
                    Suggestions:
                  </h4>
                  <ul className="text-xs text-[#79716b] space-y-1.5">
                    <li>• Check spelling of title or author name.</li>
                    <li>
                      • Broaden categories (e.g. choose &ldquo;Fiction&rdquo; or reset filters).
                    </li>
                  </ul>
                </div>

                <button
                  onClick={resetFilters}
                  className="px-7 py-2.5 text-sm font-medium bg-[#8c695b] text-white rounded-full hover:bg-[#7b594b] transition-colors shadow-sm"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </PageContainer>
    </main>
  );
}

export default function BrowsePage() {
  return (
    <>
      <Navbar variant="authenticated" />
      <Suspense
        fallback={
          <div className="flex-1 py-20 text-center text-[#79716b] text-sm">
            Loading catalog...
          </div>
        }
      >
        <BrowseContent />
      </Suspense>
      <Footer />
    </>
  );
}
