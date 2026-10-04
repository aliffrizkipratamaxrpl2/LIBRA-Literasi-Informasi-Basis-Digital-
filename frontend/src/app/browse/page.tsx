"use client";

import { useState } from "react";
import { Navbar, Footer, PageContainer } from "@/components/layout";
import BookCard from "@/components/books/BookCard";
import { Search, X, ChevronDown, Check } from "lucide-react";

interface FilterState {
  categories: string[];
  format: string[];
  language: string[];
  ratingRange: string[];
  publicationYear: string[];
}

const initialFilters: FilterState = {
  categories: ["Technology", "Design & Art"],
  format: ["eBook", "PDF"],
  language: ["English"],
  ratingRange: ["4.5"],
  publicationYear: ["2020-2023"],
};

const filterOptions = {
  categories: ["Fiction", "Technology", "Design & Art", "Science", "History"],
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

const browseBooks = [
  {
    id: "echo-of-silence",
    title: "The Echo of Silence",
    author: "Marcia Sterling",
    rating: 4.8,
    cover: "/images/books/echo-of-silence.jpeg",
  },
  {
    id: "beyond-the-grid",
    title: "Beyond the Grid",
    author: "Klaus Van Der Meer",
    rating: 4.9,
    cover: "/images/books/beyond-the-grid.jpeg",
  },
  {
    id: "midsummer-wanderlust",
    title: "Midsummer Wanderlust",
    author: "Celia Harlow",
    rating: 4.6,
    cover: "/images/books/midsummer-wanderlust.jpeg",
  },
  {
    id: "algorithms-of-joy",
    title: "The Algorithms of Joy",
    author: "Dr. Arthur Pendelton",
    rating: 4.7,
    cover: "/images/books/algorithms-of-joy.jpeg",
  },
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

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState("Design History and Systems");
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [sortBy, setSortBy] = useState("Popularity");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleFilter = (
    type: keyof FilterState,
    value: string
  ) => {
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
  };

  return (
    <>
      <Navbar variant="authenticated" />

      <main className="flex-1 py-10">
        <PageContainer>
          {/* Top Search Input */}
          <div className="relative mb-6">
            <div className="flex items-center w-full h-14 px-5 rounded-full border border-[#e6e0d6] bg-white shadow-xs focus-within:border-[#8c695b] transition-all">
              <Search size={20} className="text-[#79716b] shrink-0 mr-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search books, authors, categories, or quotes..."
                className="w-full text-base bg-transparent text-[#1c1917] placeholder:text-[#a8a29e] focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="p-1 rounded-full text-[#79716b] hover:text-[#1c1917] hover:bg-[#f4efe6] transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Results subtitle */}
          <p className="text-sm text-[#79716b] mb-8">
            Showing 8 results for{" "}
            <span className="font-semibold text-[#1c1917]">
              &ldquo;{searchQuery || "All Books"}&rdquo;
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
                  {filterOptions.categories.map((cat) => {
                    const isChecked = filters.categories.includes(cat);
                    return (
                      <label
                        key={cat}
                        className="flex items-center gap-2.5 text-sm text-[#79716b] hover:text-[#1c1917] cursor-pointer select-none"
                      >
                        <div
                          onClick={() => toggleFilter("categories", cat)}
                          className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                            isChecked
                              ? "bg-[#8c695b] border-[#8c695b] text-white"
                              : "border-[#d4cfc6] bg-white"
                          }`}
                        >
                          {isChecked && <Check size={11} strokeWidth={3} />}
                        </div>
                        <span>{cat}</span>
                      </label>
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
                  {filterOptions.format.map((fmt) => {
                    const isChecked = filters.format.includes(fmt);
                    return (
                      <label
                        key={fmt}
                        className="flex items-center gap-2.5 text-sm text-[#79716b] hover:text-[#1c1917] cursor-pointer select-none"
                      >
                        <div
                          onClick={() => toggleFilter("format", fmt)}
                          className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                            isChecked
                              ? "bg-[#8c695b] border-[#8c695b] text-white"
                              : "border-[#d4cfc6] bg-white"
                          }`}
                        >
                          {isChecked && <Check size={11} strokeWidth={3} />}
                        </div>
                        <span>{fmt}</span>
                      </label>
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
                  {filterOptions.language.map((lang) => {
                    const isChecked = filters.language.includes(lang);
                    return (
                      <label
                        key={lang}
                        className="flex items-center gap-2.5 text-sm text-[#79716b] hover:text-[#1c1917] cursor-pointer select-none"
                      >
                        <div
                          onClick={() => toggleFilter("language", lang)}
                          className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                            isChecked
                              ? "bg-[#8c695b] border-[#8c695b] text-white"
                              : "border-[#d4cfc6] bg-white"
                          }`}
                        >
                          {isChecked && <Check size={11} strokeWidth={3} />}
                        </div>
                        <span>{lang}</span>
                      </label>
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
                  {filterOptions.ratingRange.map((rating) => {
                    const isChecked = filters.ratingRange.includes(rating.value);
                    return (
                      <label
                        key={rating.value}
                        className="flex items-center gap-2.5 text-sm text-[#79716b] hover:text-[#1c1917] cursor-pointer select-none"
                      >
                        <div
                          onClick={() => toggleFilter("ratingRange", rating.value)}
                          className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                            isChecked
                              ? "bg-[#8c695b] border-[#8c695b] text-white"
                              : "border-[#d4cfc6] bg-white"
                          }`}
                        >
                          {isChecked && <Check size={11} strokeWidth={3} />}
                        </div>
                        <span>{rating.label}</span>
                      </label>
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
                  {filterOptions.publicationYear.map((year) => {
                    const isChecked = filters.publicationYear.includes(year.value);
                    return (
                      <label
                        key={year.value}
                        className="flex items-center gap-2.5 text-sm text-[#79716b] hover:text-[#1c1917] cursor-pointer select-none"
                      >
                        <div
                          onClick={() => toggleFilter("publicationYear", year.value)}
                          className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                            isChecked
                              ? "bg-[#8c695b] border-[#8c695b] text-white"
                              : "border-[#d4cfc6] bg-white"
                          }`}
                        >
                          {isChecked && <Check size={11} strokeWidth={3} />}
                        </div>
                        <span>{year.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </aside>

            {/* Right Side: Toolbar + Grid + Pagination */}
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
                    <div className="absolute right-0 mt-2 w-44 rounded-xl border border-[#e6e0d6] bg-white shadow-lg py-1.5 z-20">
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

              {/* Book Grid: 4 columns */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {browseBooks.map((book) => (
                  <BookCard key={book.id} {...book} />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center gap-2 pt-6">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="px-4 py-2 text-xs font-medium rounded-full border border-[#e6e0d6] bg-white text-[#79716b] hover:text-[#1c1917] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>

                {[1, 2, 3].map((page) => (
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
                ))}

                <span className="text-xs text-[#79716b] px-1">...</span>

                <button
                  onClick={() => setCurrentPage(8)}
                  className={`w-8 h-8 rounded-full text-xs font-semibold transition-colors ${
                    currentPage === 8
                      ? "bg-[#8c695b] text-white"
                      : "border border-[#e6e0d6] bg-white text-[#79716b] hover:text-[#1c1917]"
                  }`}
                >
                  8
                </button>

                <button
                  disabled={currentPage === 8}
                  onClick={() => setCurrentPage((p) => Math.min(8, p + 1))}
                  className="px-4 py-2 text-xs font-medium rounded-full border border-[#e6e0d6] bg-white text-[#79716b] hover:text-[#1c1917] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* EMPTY STATE DEMONSTRATION SECTION */}
          <div className="mt-28 pt-16 border-t border-[#e6e0d6]">
            <p className="text-center text-xs font-bold tracking-widest uppercase text-[#a8a29e] mb-10">
              Empty State Demonstration
            </p>

            <div className="max-w-xl mx-auto rounded-3xl border border-[#e6e0d6] bg-white p-10 text-center shadow-xs">
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
                    • Broaden categories (e.g. check &ldquo;Fiction&rdquo; instead of
                    &ldquo;Techno-thriller&rdquo;).
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
          </div>
        </PageContainer>
      </main>

      <Footer />
    </>
  );
}
