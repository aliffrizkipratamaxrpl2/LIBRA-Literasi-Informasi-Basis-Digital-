"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar, Footer, PageContainer } from "@/components/layout";
import BookCard from "@/components/books/BookCard";
import { LayoutGrid, List, CheckCircle2 } from "lucide-react";

type LibraryTab = "All" | "Currently Reading" | "Saved" | "Completed";
type ViewMode = "grid" | "list";

const currentlyReadingBooks = [
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
  {
    id: "midsummer-wanderlust",
    title: "The Midsummer Wanderlust",
    author: "Celia Harlow",
    progress: 82,
    cover: "/images/books/midsummer-wanderlust.jpeg",
  },
];

const savedBooks = [
  {
    id: "echo-of-silence",
    title: "The Echo of Silence",
    author: "Marcia Sterling",
    rating: 4.8,
    cover: "/images/books/echo-of-silence.jpeg",
  },
  {
    id: "algorithms-of-joy",
    title: "The Algorithms of Joy",
    author: "Dr. Arthur Pendelton",
    rating: 4.7,
    cover: "/images/books/algorithms-of-joy.jpeg",
  },
];

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState<LibraryTab>("Currently Reading");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const showCurrentlyReading =
    activeTab === "All" || activeTab === "Currently Reading";
  const showSaved = activeTab === "All" || activeTab === "Saved";
  const showCompleted = activeTab === "All" || activeTab === "Completed";

  return (
    <>
      <Navbar variant="authenticated" />

      <main className="flex-1 py-12">
        <PageContainer>
          {/* Header & Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-[#1c1917] tracking-tight">
                My Library
              </h1>
              <p className="text-sm text-[#79716b] mt-1.5">
                Manage and track your reading journey, bookmarks, and completions.
              </p>
            </div>

            {/* View Mode Segmented Controls */}
            <div className="inline-flex p-1 rounded-full bg-white border border-[#e6e0d6] shadow-2xs self-start sm:self-auto">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-full transition-all ${
                  viewMode === "grid"
                    ? "bg-[#6b564b] text-white shadow-xs"
                    : "text-[#79716b] hover:text-[#1c1917]"
                }`}
              >
                <LayoutGrid size={13} />
                <span>Grid View</span>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-full transition-all ${
                  viewMode === "list"
                    ? "bg-[#6b564b] text-white shadow-xs"
                    : "text-[#79716b] hover:text-[#1c1917]"
                }`}
              >
                <List size={13} />
                <span>List View</span>
              </button>
            </div>
          </div>

          {/* Filter Tabs Pills */}
          <div className="flex items-center gap-2.5 pb-6 border-b border-[#e6e0d6] mb-12 overflow-x-auto no-scrollbar">
            {(["All", "Currently Reading", "Saved", "Completed"] as LibraryTab[]).map(
              (tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-2 text-xs font-medium rounded-full transition-all shrink-0 ${
                      isActive
                        ? "bg-[#6b564b] text-white shadow-xs"
                        : "bg-white border border-[#e6e0d6] text-[#1c1917] hover:bg-[#f4efe6]"
                    }`}
                  >
                    {tab}
                  </button>
                );
              }
            )}
          </div>

          {/* Section: Currently Reading */}
          {showCurrentlyReading && (
            <section className="mb-16">
              <h2 className="text-xl font-bold text-[#1c1917] tracking-tight mb-6">
                Currently Reading ({currentlyReadingBooks.length})
              </h2>

              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {currentlyReadingBooks.map((book) => (
                    <div
                      key={book.id}
                      className="group p-5 rounded-3xl border border-[#e6e0d6] bg-white hover:shadow-md hover:border-[#d4cfc6] transition-all flex gap-4 items-center"
                    >
                      <div className="relative w-20 h-28 rounded-xl overflow-hidden shrink-0 shadow-xs">
                        <Image
                          src={book.cover}
                          alt={book.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="100px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-[#1c1917] truncate">
                          {book.title}
                        </h3>
                        <p className="text-xs text-[#79716b] mt-0.5 truncate">
                          {book.author}
                        </p>

                        <div className="mt-4">
                          <div className="w-full h-1.5 rounded-full bg-[#f4efe6] overflow-hidden">
                            <div
                              className="h-full bg-[#8c695b] rounded-full transition-all duration-500"
                              style={{ width: `${book.progress}%` }}
                            />
                          </div>
                          <div className="flex items-center justify-between text-xs mt-2">
                            <span className="text-[#79716b] font-medium text-[11px]">
                              {book.progress}% completed
                            </span>
                            <Link
                              href={`/read/${book.id}`}
                              className="text-xs font-semibold text-[#8c695b] hover:text-[#7b594b] transition-colors inline-flex items-center gap-1"
                            >
                              <span>Resume</span>
                              <span>&rarr;</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3 bg-white rounded-3xl border border-[#e6e0d6] p-4 divide-y divide-[#eee9e0]">
                  {currentlyReadingBooks.map((book) => (
                    <div
                      key={book.id}
                      className="pt-3 first:pt-0 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative w-10 h-14 rounded-md overflow-hidden shrink-0">
                          <Image
                            src={book.cover}
                            alt={book.title}
                            fill
                            className="object-cover"
                            sizes="50px"
                          />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-[#1c1917] truncate">
                            {book.title}
                          </h4>
                          <p className="text-[11px] text-[#79716b] truncate">
                            {book.author}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 shrink-0">
                        <div className="w-32 hidden sm:block">
                          <div className="w-full h-1.5 rounded-full bg-[#f4efe6] overflow-hidden">
                            <div
                              className="h-full bg-[#8c695b] rounded-full"
                              style={{ width: `${book.progress}%` }}
                            />
                          </div>
                          <span className="text-[10px] text-[#79716b] mt-0.5 block text-right">
                            {book.progress}%
                          </span>
                        </div>
                        <Link
                          href={`/read/${book.id}`}
                          className="text-xs font-semibold text-[#8c695b] hover:underline"
                        >
                          Resume &rarr;
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Section: Saved E-Books */}
          {showSaved && (
            <section className="mb-16">
              <h2 className="text-xl font-bold text-[#1c1917] tracking-tight mb-6">
                Saved E-Books ({savedBooks.length})
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
                {savedBooks.map((book) => (
                  <BookCard key={book.id} {...book} />
                ))}
              </div>
            </section>
          )}

          {/* Section: Completed Empty State */}
          {showCompleted && (
            <section className="pt-8">
              <div className="max-w-4xl mx-auto rounded-3xl border border-[#e6e0d6] bg-white p-12 md:p-16 text-center shadow-xs">
                <div className="w-14 h-14 rounded-full bg-[#f4efe6] flex items-center justify-center text-[#8c695b] mx-auto mb-6">
                  <CheckCircle2 size={24} strokeWidth={1.75} />
                </div>

                <h3 className="text-xl font-bold text-[#1c1917] mb-2">
                  No completed books yet
                </h3>
                <p className="text-xs md:text-sm text-[#79716b] max-w-md mx-auto leading-relaxed mb-8">
                  Start reading and tracking your process. Once you reach the
                  last page of any book, it will appear here.
                </p>

                <Link
                  href="/browse"
                  className="inline-flex px-8 py-3 text-xs font-semibold bg-[#8c695b] text-white rounded-full hover:bg-[#7b594b] transition-colors shadow-sm"
                >
                  Browse Library Books
                </Link>
              </div>
            </section>
          )}
        </PageContainer>
      </main>

      <Footer />
    </>
  );
}
