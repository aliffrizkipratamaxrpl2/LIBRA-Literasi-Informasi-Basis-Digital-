"use client";

import { useEffect, useState } from "react";
import { Navbar, Footer, PageContainer } from "@/components/layout";
import BookCard from "@/components/books/BookCard";
import SectionHeader from "@/components/navigation/SectionHeader";
import { getBooks, getCategories } from "@/lib/api";
import type { Book } from "@/types";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Users,
  PenTool,
  Star,
  Sparkles,
  Heart,
  Search,
  FlaskConical,
  Cpu,
  Landmark,
  TrendingUp,
  Palette,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Compass,
  Check,
} from "lucide-react";

const trendingBooks = [
  { id: "echo-of-silence", title: "The Echo of Silence", author: "Marcia Sterling", rating: 4.8, cover: "/images/books/echo-of-silence.jpeg" },
  { id: "beyond-the-grid", title: "Beyond the Grid", author: "Klaus Van Der Meer", rating: 4.9, cover: "/images/books/beyond-the-grid.jpeg" },
  { id: "midsummer-wanderlust", title: "Midsummer Wanderlust", author: "Celia Harlow", rating: 4.6, cover: "/images/books/midsummer-wanderlust.jpeg" },
  { id: "algorithms-of-joy", title: "The Algorithms of Joy", author: "Dr. Arthur Pendelton", rating: 4.7, cover: "/images/books/algorithms-of-joy.jpeg" },
  { id: "contours-of-memory", title: "Contours of Memory", author: "Siddharth Mehta", rating: 4.5, cover: "/images/books/contours-of-memory.jpeg" },
  { id: "echoes-of-renaissance", title: "Echoes of the Renaissance", author: "Elena Rostova", rating: 4.8, cover: "/images/books/echoes-of-renaissance.jpeg" },
];

const recentlyAdded = [
  { id: "algorithms-of-joy", title: "The Algorithms of Joy", author: "Dr. Arthur Pendelton", rating: 4.7, cover: "/images/books/algorithms-of-joy.jpeg" },
  { id: "contours-of-memory", title: "Contours of Memory", author: "Siddharth Mehta", rating: 4.5, cover: "/images/books/contours-of-memory.jpeg" },
  { id: "echoes-of-renaissance", title: "Echoes of the Renaissance", author: "Elena Rostova", rating: 4.8, cover: "/images/books/echoes-of-renaissance.jpeg" },
  { id: "echo-of-silence", title: "The Echo of Silence", author: "Marcia Sterling", rating: 4.8, cover: "/images/books/echo-of-silence.jpeg" },
  { id: "beyond-the-grid", title: "Beyond the Grid", author: "Klaus Van Der Meer", rating: 4.9, cover: "/images/books/beyond-the-grid.jpeg" },
  { id: "midsummer-wanderlust", title: "Midsummer Wanderlust", author: "Celia Harlow", rating: 4.6, cover: "/images/books/midsummer-wanderlust.jpeg" },
];

const categories = [
  { name: "Fiction", count: "3,240", icon: Sparkles },
  { name: "Romance", count: "1,850", icon: Heart },
  { name: "Mystery", count: "1,210", icon: Search },
  { name: "Science", count: "980", icon: FlaskConical },
  { name: "Technology", count: "1,150", icon: Cpu },
  { name: "History", count: "1,420", icon: Landmark },
  { name: "Self-Development", count: "2,100", icon: TrendingUp },
  { name: "Art", count: "890", icon: Palette },
];

const stats = [
  { value: "10K+", label: "E-Books & Audiobooks", icon: BookOpen },
  { value: "50K+", label: "Active Readers", icon: Users },
  { value: "500+", label: "Renowned Authors", icon: PenTool },
  { value: "4.8", label: "App Store Rating", icon: Star },
];

export default function LandingPage() {
  const [trending, setTrending] = useState<Book[]>(trendingBooks);
  const [recent, setRecent] = useState<Book[]>(recentlyAdded);
  const [categoryList, setCategoryList] = useState(categories);

  useEffect(() => {
    async function loadData() {
      const [apiBooks, apiCats] = await Promise.all([getBooks(), getCategories()]);
      if (apiBooks && apiBooks.length > 0) {
        setTrending(apiBooks.slice(0, 6));
        setRecent([...apiBooks].reverse().slice(0, 6));
      }
      if (apiCats && apiCats.length > 0) {
        const mapped = apiCats.map((c, i) => {
          const fallback = categories[i % categories.length];
          return {
            name: c.category,
            count: fallback.count,
            icon: fallback.icon,
          };
        });
        setCategoryList(mapped);
      }
    }
    loadData();
  }, []);
  return (
    <>
      {/* Landing Navbar with Beranda, Tentang Kami, Hubungi Kami, Login, Register */}
      <Navbar variant="landing" />

      <main className="flex-1">
        {/* Hero */}
        <section className="pt-20 pb-24">
          <PageContainer>
            <div className="grid grid-cols-2 gap-16 items-center">
              <div className="space-y-7">
                <h1 className="text-[3.25rem] font-bold leading-[1.12] tracking-tight text-[#1c1917]">
                  Your ultimate gateway to{" "}
                  <span className="text-[#8c695b]">endless stories</span>
                </h1>
                <p className="text-[#79716b] leading-relaxed text-base max-w-lg">
                  Explore a meticulously curated ecosystem of literary
                  masterpieces, textbooks, and contemporary fiction. Perfect for
                  eager students and passionate bibliophiles alike.
                </p>
                <div className="flex items-center gap-4 pt-2">
                  <Link
                    href="/register"
                    className="px-7 py-3 text-sm font-medium bg-[#8c695b] text-white rounded-full hover:bg-[#7b594b] transition-colors shadow-sm"
                  >
                    Start Reading Free
                  </Link>
                  <Link
                    href="/browse"
                    className="px-7 py-3 text-sm font-medium border border-[#e6e0d6] text-[#1c1917] rounded-full hover:bg-[#f4efe6] transition-colors"
                  >
                    Explore Library
                  </Link>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-[#8c695b]/10">
                  <Image
                    src="/images/hero-reading.jpeg"
                    alt="Cozy reading space"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1280px) 50vw, 600px"
                  />
                </div>
              </div>
            </div>
          </PageContainer>
        </section>

        {/* Stats */}
        <section className="py-10 bg-[#f4efe6]">
          <PageContainer>
            <div className="grid grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#8c695b] shadow-sm">
                    <stat.icon size={20} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#1c1917]">
                      {stat.value}
                      {stat.label === "App Store Rating" && (
                        <Star
                          size={16}
                          className="inline ml-1 mb-1 fill-[#e59934] text-[#e59934]"
                        />
                      )}
                    </p>
                    <p className="text-xs text-[#79716b]">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </PageContainer>
        </section>

        {/* Trending Books */}
        <section className="py-20">
          <PageContainer>
            <SectionHeader
              title="Trending Books"
              description="The books capturing minds and leading discussions this week"
              actionLabel="View All"
              actionHref="/browse"
            />
            <div className="grid grid-cols-6 gap-6">
              {trending.map((book) => (
                <BookCard
                  key={book.id}
                  id={book.id}
                  title={book.title}
                  author={book.author}
                  rating={book.rating ?? 4.8}
                  cover={book.cover || "/images/books/echo-of-silence.jpeg"}
                />
              ))}
            </div>
          </PageContainer>
        </section>

        {/* Browse by Category */}
        <section className="py-20">
          <PageContainer>
            <SectionHeader
              title="Browse by Category"
              description="Explore your interest across our vast catalog of genres"
              actionLabel=""
            />
            <div className="grid grid-cols-4 gap-5">
              {categoryList.map((cat) => (
                <Link
                  key={cat.name}
                  href="/categories"
                  className="group flex items-center gap-4 p-5 rounded-2xl border border-[#e6e0d6] bg-white hover:shadow-md hover:border-[#d4cfc6] transition-all"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#f4efe6] flex items-center justify-center text-[#8c695b] shrink-0">
                    <cat.icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#1c1917]">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-[#79716b] mt-0.5">
                      {cat.count} titles
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </PageContainer>
        </section>

        {/* Recently Added */}
        <section className="py-20">
          <PageContainer>
            <SectionHeader
              title="Recently Added"
              description="Fresh arrivals added to our growing catalog today"
              actionLabel="View All"
              actionHref="/browse"
            />
            <div className="grid grid-cols-6 gap-6">
              {recent.map((book, i) => (
                <BookCard
                  key={`${book.id}-${i}`}
                  id={book.id}
                  title={book.title}
                  author={book.author}
                  rating={book.rating ?? 4.8}
                  cover={book.cover || "/images/books/echo-of-silence.jpeg"}
                />
              ))}
            </div>
          </PageContainer>
        </section>

        {/* Section: About Us */}
        <section id="about-us" className="py-24 bg-[#f4efe6] border-y border-[#e6e0d6]">
          <PageContainer>
            <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8c695b]">
                About Us
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1c1917] tracking-tight">
                Cultivating a Modern Digital Reading Sanctuary
              </h2>
              <p className="text-base text-[#79716b] leading-relaxed">
                LIBRA is an editorial digital sanctuary blending classical book craftsmanship with seamless modern technology for lifelong readers and learners worldwide.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-3xl border border-[#e6e0d6] space-y-4 shadow-xs">
                <div className="w-12 h-12 rounded-2xl bg-[#f4efe6] flex items-center justify-center text-[#8c695b]">
                  <Compass size={22} />
                </div>
                <h3 className="text-lg font-bold text-[#1c1917]">Rigorous Curation</h3>
                <p className="text-sm text-[#79716b] leading-relaxed">
                  Every novel, science treatise, and philosophical essay is hand-selected under exacting editorial standards to deliver timeless value.
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-[#e6e0d6] space-y-4 shadow-xs">
                <div className="w-12 h-12 rounded-2xl bg-[#f4efe6] flex items-center justify-center text-[#8c695b]">
                  <Sparkles size={22} />
                </div>
                <h3 className="text-lg font-bold text-[#1c1917]">Cozy Reader Experience</h3>
                <p className="text-sm text-[#79716b] leading-relaxed">
                  Distraction-free reading with warm Sepia and Dark modes, elegant Serif typography, and instant cross-device synchronization.
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-[#e6e0d6] space-y-4 shadow-xs">
                <div className="w-12 h-12 rounded-2xl bg-[#f4efe6] flex items-center justify-center text-[#8c695b]">
                  <ShieldCheck size={22} />
                </div>
                <h3 className="text-lg font-bold text-[#1c1917]">Open & Inclusive Access</h3>
                <p className="text-sm text-[#79716b] leading-relaxed">
                  Offering hundreds of complimentary masterworks for students and communities to keep digital literacy universally accessible.
                </p>
              </div>
            </div>
          </PageContainer>
        </section>

        {/* Section: Pricing Plans */}
        <section id="pricing-plans" className="py-24 bg-white border-b border-[#e6e0d6]">
          <PageContainer>
            <div className="max-w-2xl mx-auto text-center space-y-3.5 mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8c695b]">
                Subscription Options
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1c1917] tracking-tight">
                Choose the Reading Plan That Fits You
              </h2>
              <p className="text-sm md:text-base text-[#79716b] leading-relaxed">
                Unlock thousands of literary masterpieces and premium digital reader tools. Sign in or create an account to begin.
              </p>
            </div>

            {/* 3 Pricing Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
              {/* Free Plan */}
              <div className="bg-[#f9f6ef] rounded-3xl border border-[#e6e0d6] p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-[#1c1917]">Free</h3>
                    <div className="flex items-baseline gap-1 mt-3">
                      <span className="text-4xl font-bold text-[#1c1917]">$0</span>
                      <span className="text-xs text-[#79716b]">/month</span>
                    </div>
                    <p className="text-xs text-[#79716b] mt-3 leading-relaxed">
                      Explore classic literature and basic community logs at zero cost.
                    </p>
                  </div>

                  <div className="border-t border-[#e6e0d6]" />

                  <ul className="space-y-3.5 text-xs text-[#1c1917]">
                    {[
                      "Access to 500+ free digital books",
                      "Standard reader customization tools",
                      "Active device sync (1 device maximum)",
                      "Ad-supported reading experience",
                      "Standard community forum access",
                    ].map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check
                          size={15}
                          className="text-[#8c695b] shrink-0 mt-0.5"
                          strokeWidth={2.5}
                        />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8 space-y-2">
                  <Link
                    href="/register"
                    className="w-full py-3 px-6 text-xs font-semibold rounded-full border border-[#8c695b] text-[#8c695b] hover:bg-[#f4efe6] transition-colors flex items-center justify-center text-center"
                  >
                    Get Started Free
                  </Link>
                  <p className="text-[11px] text-[#79716b] text-center">
                    Already have an account?{" "}
                    <Link href="/login" className="text-[#8c695b] font-semibold hover:underline">
                      Log In
                    </Link>
                  </p>
                </div>
              </div>

              {/* Reader Plan (Featured / Most Popular) */}
              <div className="bg-[#f9f6ef] rounded-3xl border-2 border-[#8c695b] p-8 flex flex-col justify-between shadow-md relative">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-[#1c1917]">Reader</h3>
                    <span className="px-3 py-1 rounded-full bg-[#f4efe6] text-[#8c695b] text-[10px] font-bold tracking-wider uppercase border border-[#8c695b]/20">
                      MOST POPULAR
                    </span>
                  </div>

                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-[#1c1917]">
                        $9.99
                      </span>
                      <span className="text-xs text-[#79716b]">/month</span>
                    </div>
                    <p className="text-xs text-[#79716b] mt-3 leading-relaxed">
                      Unlimited catalog access, offline mode, and integrated audiobooks.
                    </p>
                  </div>

                  <div className="border-t border-[#e6e0d6]" />

                  <ul className="space-y-3.5 text-xs text-[#1c1917]">
                    {[
                      "Verified reader badge",
                      "Custom username background accent",
                      "Unlimited catalog access (10K+ titles)",
                      "Completely ad-free reading environment",
                      "Sync up to 3 devices simultaneously",
                      "Offline reading with local downloads",
                      "Full annotations, notes, and highlights",
                      "Integrated high-fidelity audiobooks",
                      "Exclusive reading themes",
                      "Personalized book recommendations",
                      "Priority access to new release collections",
                    ].map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check
                          size={15}
                          className="text-[#8c695b] shrink-0 mt-0.5"
                          strokeWidth={2.5}
                        />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8 space-y-2">
                  <Link
                    href="/register"
                    className="w-full py-3 px-6 text-xs font-semibold rounded-full bg-[#8c695b] text-white hover:bg-[#7b594b] transition-colors shadow-sm flex items-center justify-center text-center"
                  >
                    Start 14-Day Free Trial
                  </Link>
                  <p className="text-[11px] text-[#79716b] text-center">
                    Already subscribed?{" "}
                    <Link href="/login" className="text-[#8c695b] font-semibold hover:underline">
                      Log In
                    </Link>
                  </p>
                </div>
              </div>

              {/* Premium Plan */}
              <div className="bg-[#f9f6ef] rounded-3xl border border-[#e6e0d6] p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-[#1c1917]">Premium</h3>
                    <div className="flex items-baseline gap-1 mt-3">
                      <span className="text-4xl font-bold text-[#1c1917]">
                        $19.99
                      </span>
                      <span className="text-xs text-[#79716b]">/month</span>
                    </div>
                    <p className="text-xs text-[#79716b] mt-3 leading-relaxed">
                      The complete literary sanctuary designed for avid bibliophiles & families.
                    </p>
                  </div>

                  <div className="border-t border-[#e6e0d6]" />

                  <ul className="space-y-3.5 text-xs text-[#1c1917]">
                    {[
                      "All benefits from Reader plan",
                      "Custom avatar photo border color",
                      "Customizable profile banner",
                      "Unlimited simultaneous device sync",
                      "Early access to exclusive editions",
                      "Priority support SLA for Premium users",
                      "Family account sharing (up to 5 members)",
                      "Personalized monthly curated spotlight",
                      "Exclusive Premium book collection",
                      "Exclusive Premium profile badge",
                      "Limitless, completely ad-free experience",
                    ].map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check
                          size={15}
                          className="text-[#8c695b] shrink-0 mt-0.5"
                          strokeWidth={2.5}
                        />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8 space-y-2">
                  <Link
                    href="/register"
                    className="w-full py-3 px-6 text-xs font-semibold rounded-full border border-[#8c695b] text-[#8c695b] hover:bg-[#f4efe6] transition-colors flex items-center justify-center text-center"
                  >
                    Start 14-Day Free Trial
                  </Link>
                  <p className="text-[11px] text-[#79716b] text-center">
                    Already have an account?{" "}
                    <Link href="/login" className="text-[#8c695b] font-semibold hover:underline">
                      Log In
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </PageContainer>
        </section>

        {/* Section: Contact Us */}
        <section id="contact-us" className="py-24">
          <PageContainer>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[#8c695b]">
                  Contact Us
                </span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1c1917] tracking-tight">
                  Have questions or feedback for LIBRA?
                </h2>
                <p className="text-sm text-[#79716b] leading-relaxed">
                  We love hearing your reading reflections, curation recommendations, or academic partnership inquiries.
                </p>

                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-4 text-sm text-[#1c1917]">
                    <div className="w-10 h-10 rounded-xl bg-[#f4efe6] flex items-center justify-center text-[#8c695b] shrink-0">
                      <Mail size={18} />
                    </div>
                    <span>support@libra-library.com</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-[#1c1917]">
                    <div className="w-10 h-10 rounded-xl bg-[#f4efe6] flex items-center justify-center text-[#8c695b] shrink-0">
                      <Phone size={18} />
                    </div>
                    <span>+1 (617) 555-0198</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-[#1c1917]">
                    <div className="w-10 h-10 rounded-xl bg-[#f4efe6] flex items-center justify-center text-[#8c695b] shrink-0">
                      <MapPin size={18} />
                    </div>
                    <span>Boston & Global Digital Sanctuary</span>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#e6e0d6] shadow-xs">
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#1c1917] mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 text-sm rounded-xl border border-[#e6e0d6] bg-[#f9f6ef] text-[#1c1917] focus:outline-none focus:border-[#8c695b] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#1c1917] mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="name@email.com"
                      className="w-full px-4 py-3 text-sm rounded-xl border border-[#e6e0d6] bg-[#f9f6ef] text-[#1c1917] focus:outline-none focus:border-[#8c695b] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#1c1917] mb-2">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Write your note or question here..."
                      className="w-full px-4 py-3 text-sm rounded-xl border border-[#e6e0d6] bg-[#f9f6ef] text-[#1c1917] focus:outline-none focus:border-[#8c695b] transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 px-6 text-sm font-semibold bg-[#8c695b] text-white rounded-full hover:bg-[#7b594b] transition-colors shadow-sm cursor-pointer"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </PageContainer>
        </section>
      </main>

      <Footer />
    </>
  );
}
