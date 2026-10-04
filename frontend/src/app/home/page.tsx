"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar, Footer, PageContainer } from "@/components/layout";
import BookCard from "@/components/books/BookCard";
import SectionHeader from "@/components/navigation/SectionHeader";
import { Search, Flame } from "lucide-react";

const categories = [
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

const recommendedBooks = [
  {
    id: "lessons-of-time",
    title: "Lessons of Time",
    author: "Prof. Alistair Finch",
    rating: 4.9,
    cover: "/images/books/lessons-of-time.jpeg",
  },
  {
    id: "whispers-of-kyoto",
    title: "Whispers of Kyoto",
    author: "Sayuri Haruki",
    rating: 4.8,
    cover: "/images/books/whispers-of-kyoto.jpeg",
  },
  {
    id: "designing-the-humane",
    title: "Designing the Humane",
    author: "Clementine Dupont",
    rating: 4.7,
    cover: "/images/books/organic-forms.jpeg",
  },
  {
    id: "cozy-cabin-guide",
    title: "The Cozy Cabin Guide",
    author: "Arthur Wood",
    rating: 4.6,
    cover: "/images/books/cozy-cabin-guide.jpeg",
  },
];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

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

          {/* Search Bar */}
          <div className="relative mb-5">
            <div className="flex items-center w-full h-14 px-5 rounded-full border border-[#e6e0d6] bg-white shadow-xs focus-within:border-[#8c695b] transition-all">
              <Search size={19} className="text-[#79716b] shrink-0 mr-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search books, authors, categories, or quotes..."
                className="w-full text-sm bg-transparent text-[#1c1917] placeholder:text-[#a8a29e] focus:outline-none"
              />
            </div>
          </div>

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

          {/* Main 2-Column Dashboard Grid: Left Content (68%) + Right Widget (32%) */}
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
                  title="Recommended For You"
                  actionLabel="View All"
                  actionHref="/browse"
                />
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                  {recommendedBooks.map((book) => (
                    <BookCard key={book.id} {...book} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Reading Stats Widget Card */}
            <div className="bg-white rounded-3xl border border-[#e6e0d6] p-7 space-y-7 shadow-xs">
              <h2 className="text-base font-bold text-[#1c1917]">
                Your October Reading Stats
              </h2>

              {/* 4 Stat Tiles (2x2) */}
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
