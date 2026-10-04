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

        {/* Section: Tentang Kami */}
        <section id="tentang-kami" className="py-24 bg-[#f4efe6] border-y border-[#e6e0d6]">
          <PageContainer>
            <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8c695b]">
                Tentang Kami
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1c1917] tracking-tight">
                Membangun Budaya Literasi Informasi Berbasis Digital
              </h2>
              <p className="text-base text-[#79716b] leading-relaxed">
                LIBRA hadir sebagai ruang perpustakaan digital premium yang menggabungkan keindahan estetika buku klasik dengan kemudahan teknologi modern untuk seluruh pembaca dan pembelajar seumur hidup.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-3xl border border-[#e6e0d6] space-y-4 shadow-xs">
                <div className="w-12 h-12 rounded-2xl bg-[#f4efe6] flex items-center justify-center text-[#8c695b]">
                  <Compass size={22} />
                </div>
                <h3 className="text-lg font-bold text-[#1c1917]">Kurasi Berkualitas</h3>
                <p className="text-sm text-[#79716b] leading-relaxed">
                  Setiap karya sastra, buku sains, dan teks akademis dipilih dengan standar kurasi ketat untuk memberikan wawasan bernilai tinggi.
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-[#e6e0d6] space-y-4 shadow-xs">
                <div className="w-12 h-12 rounded-2xl bg-[#f4efe6] flex items-center justify-center text-[#8c695b]">
                  <Sparkles size={22} />
                </div>
                <h3 className="text-lg font-bold text-[#1c1917]">Pengalaman Cozy Reader</h3>
                <p className="text-sm text-[#79716b] leading-relaxed">
                  Membaca bebas distraksi dengan pilihan tema Sepia, Dark, tipografi Serif elegan, dan sinkronisasi lintas perangkat aktif.
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-[#e6e0d6] space-y-4 shadow-xs">
                <div className="w-12 h-12 rounded-2xl bg-[#f4efe6] flex items-center justify-center text-[#8c695b]">
                  <ShieldCheck size={22} />
                </div>
                <h3 className="text-lg font-bold text-[#1c1917]">Akses Terbuka & Inklusif</h3>
                <p className="text-sm text-[#79716b] leading-relaxed">
                  Menyediakan ribuan judul bebas biaya bagi pelajar dan komunitas agar literasi digital dapat diakses merata di mana saja.
                </p>
              </div>
            </div>
          </PageContainer>
        </section>

        {/* Section: Detail Paket Harga */}
        <section id="paket-harga" className="py-24 bg-white border-b border-[#e6e0d6]">
          <PageContainer>
            <div className="max-w-2xl mx-auto text-center space-y-3.5 mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8c695b]">
                Pilihan Berlangganan
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1c1917] tracking-tight">
                Pilih Paket Membaca Sesuai Kebutuhan Anda
              </h2>
              <p className="text-sm md:text-base text-[#79716b] leading-relaxed">
                Nikmati akses ribuan karya sastra dan fitur pembaca digital premium. Masuk atau daftarkan akun Anda untuk mulai membaca.
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
                      <span className="text-xs text-[#79716b]">/bulan</span>
                    </div>
                    <p className="text-xs text-[#79716b] mt-3 leading-relaxed">
                      Jelajahi literatur klasik dan fitur komunitas dasar tanpa biaya.
                    </p>
                  </div>

                  <div className="border-t border-[#e6e0d6]" />

                  <ul className="space-y-3.5 text-xs text-[#1c1917]">
                    {[
                      "Akses ke 500+ buku digital pilihan",
                      "Kustomisasi standar tampilan pembaca",
                      "Sinkronisasi 1 perangkat aktif",
                      "Akses forum diskusi komunitas",
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
                    Daftar Akun Gratis
                  </Link>
                  <p className="text-[11px] text-[#79716b] text-center">
                    Sudah punya akun?{" "}
                    <Link href="/login" className="text-[#8c695b] font-semibold hover:underline">
                      Login
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
                      PALING POPULER
                    </span>
                  </div>

                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-[#1c1917]">
                        $9.99
                      </span>
                      <span className="text-xs text-[#79716b]">/bulan</span>
                    </div>
                    <p className="text-xs text-[#79716b] mt-3 leading-relaxed">
                      Akses tak terbatas ke seluruh katalog buku, mode offline, dan audiobook.
                    </p>
                  </div>

                  <div className="border-t border-[#e6e0d6]" />

                  <ul className="space-y-3.5 text-xs text-[#1c1917]">
                    {[
                      "Akses tak terbatas (10.000+ judul)",
                      "Bebas iklan sepenuhnya",
                      "Sinkronisasi hingga 3 perangkat",
                      "Download offline untuk membaca di mana saja",
                      "Anotasi lengkap, highlight & catatan",
                      "Integrasi audiobook berkualitas tinggi",
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
                    Mulai Uji Coba 14 Hari
                  </Link>
                  <p className="text-[11px] text-[#79716b] text-center">
                    Sudah berlangganan?{" "}
                    <Link href="/login" className="text-[#8c695b] font-semibold hover:underline">
                      Login
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
                      <span className="text-xs text-[#79716b]">/bulan</span>
                    </div>
                    <p className="text-xs text-[#79716b] mt-3 leading-relaxed">
                      Pengalaman membaca terlengkap untuk penikmat literatur sejati & keluarga.
                    </p>
                  </div>

                  <div className="border-t border-[#e6e0d6]" />

                  <ul className="space-y-3.5 text-xs text-[#1c1917]">
                    {[
                      "Semua fitur pada paket Reader",
                      "Sinkronisasi perangkat tanpa batas",
                      "Akses awal ke edisi & kurasi terbaru",
                      "Dukungan prioritas tim LIBRA",
                      "Paket akun keluarga (hingga 5 anggota)",
                      "Kurasi bulanan personalisasi",
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
                    Mulai Uji Coba 14 Hari
                  </Link>
                  <p className="text-[11px] text-[#79716b] text-center">
                    Sudah punya akun?{" "}
                    <Link href="/login" className="text-[#8c695b] font-semibold hover:underline">
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </PageContainer>
        </section>

        {/* Section: Hubungi Kami */}
        <section id="hubungi-kami" className="py-24">
          <PageContainer>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[#8c695b]">
                  Hubungi Kami
                </span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1c1917] tracking-tight">
                  Punya pertanyaan atau masukan untuk LIBRA?
                </h2>
                <p className="text-sm text-[#79716b] leading-relaxed">
                  Kami senang mendengar pengalaman membaca Anda, saran kurasi buku baru, atau kerja sama institusi pendidikan.
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
                    <span>+62 (021) 555-0198</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-[#1c1917]">
                    <div className="w-10 h-10 rounded-xl bg-[#f4efe6] flex items-center justify-center text-[#8c695b] shrink-0">
                      <MapPin size={18} />
                    </div>
                    <span>Jakarta & Boston, Global Digital Sanctuary</span>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#e6e0d6] shadow-xs">
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#1c1917] mb-2">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan nama Anda"
                      className="w-full px-4 py-3 text-sm rounded-xl border border-[#e6e0d6] bg-[#f9f6ef] text-[#1c1917] focus:outline-none focus:border-[#8c695b] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#1c1917] mb-2">
                      Alamat Email
                    </label>
                    <input
                      type="email"
                      placeholder="nama@email.com"
                      className="w-full px-4 py-3 text-sm rounded-xl border border-[#e6e0d6] bg-[#f9f6ef] text-[#1c1917] focus:outline-none focus:border-[#8c695b] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#1c1917] mb-2">
                      Pesan
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tulis pesan atau pertanyaan Anda di sini..."
                      className="w-full px-4 py-3 text-sm rounded-xl border border-[#e6e0d6] bg-[#f9f6ef] text-[#1c1917] focus:outline-none focus:border-[#8c695b] transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 px-6 text-sm font-semibold bg-[#8c695b] text-white rounded-full hover:bg-[#7b594b] transition-colors shadow-sm"
                  >
                    Kirim Pesan
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
