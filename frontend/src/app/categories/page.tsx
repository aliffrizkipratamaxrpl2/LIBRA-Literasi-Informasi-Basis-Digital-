"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Navbar, Footer, PageContainer } from "@/components/layout";
import BookCard from "@/components/books/BookCard";
import SectionHeader from "@/components/navigation/SectionHeader";
import { getCategories } from "@/lib/api";
import {
  BookOpen,
  Heart,
  Eye,
  Sparkles,
  Globe,
  Cpu,
  Compass,
  GraduationCap,
  Brain,
  Activity,
  User,
  Feather,
  LucideIcon,
} from "lucide-react";

interface CategoryItem {
  id?: string | number;
  name: string;
  count: string;
  slug: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

const defaultCategories: CategoryItem[] = [
  {
    name: "Fiction",
    count: "3,240 titles",
    slug: "fiction",
    icon: BookOpen,
    iconBg: "bg-[#faeee9]",
    iconColor: "text-[#c26d57]",
  },
  {
    name: "Romance",
    count: "1,850 titles",
    slug: "romance",
    icon: Heart,
    iconBg: "bg-[#fcf1e5]",
    iconColor: "text-[#d88939]",
  },
  {
    name: "Mystery",
    count: "1,210 titles",
    slug: "mystery",
    icon: Eye,
    iconBg: "bg-[#f1edfb]",
    iconColor: "text-[#7f56d9]",
  },
  {
    name: "Fantasy",
    count: "2,050 titles",
    slug: "fantasy",
    icon: Sparkles,
    iconBg: "bg-[#eaf5ea]",
    iconColor: "text-[#479854]",
  },
  {
    name: "Science",
    count: "980 titles",
    slug: "science",
    icon: Globe,
    iconBg: "bg-[#e8f3fb]",
    iconColor: "text-[#3989c9]",
  },
  {
    name: "Technology",
    count: "1,150 titles",
    slug: "technology",
    icon: Cpu,
    iconBg: "bg-[#eef2f9]",
    iconColor: "text-[#4b6cb7]",
  },
  {
    name: "History",
    count: "1,420 titles",
    slug: "history",
    icon: Compass,
    iconBg: "bg-[#f7efe6]",
    iconColor: "text-[#9d6b41]",
  },
  {
    name: "Education",
    count: "2,300 titles",
    slug: "education",
    icon: GraduationCap,
    iconBg: "bg-[#eaf4f0]",
    iconColor: "text-[#388e6e]",
  },
  {
    name: "Psychology",
    count: "1,670 titles",
    slug: "psychology",
    icon: Brain,
    iconBg: "bg-[#faebee]",
    iconColor: "text-[#ce496b]",
  },
  {
    name: "Self Development",
    count: "2,100 titles",
    slug: "self-development",
    icon: Activity,
    iconBg: "bg-[#fdf4e7]",
    iconColor: "text-[#d48b30]",
  },
  {
    name: "Biography",
    count: "1,340 titles",
    slug: "biography",
    icon: User,
    iconBg: "bg-[#e8f6f3]",
    iconColor: "text-[#2e9c85]",
  },
  {
    name: "Art",
    count: "890 titles",
    slug: "art",
    icon: Feather,
    iconBg: "bg-[#faeef2]",
    iconColor: "text-[#be4d78]",
  },
];

const popularInFiction = [
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
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState<CategoryItem[]>(defaultCategories);

  useEffect(() => {
    async function load() {
      const data = await getCategories();
      if (data && data.length > 0) {
        const mapped: CategoryItem[] = data.map((c, i) => {
          const fallback = defaultCategories[i % defaultCategories.length];
          return {
            id: c.id,
            name: c.category,
            count: fallback.count,
            slug: c.category.toLowerCase().replace(/\s+/g, "-"),
            icon: fallback.icon,
            iconBg: fallback.iconBg,
            iconColor: fallback.iconColor,
          };
        });
        setCategories(mapped);
      }
    }
    load();
  }, []);

  return (
    <>
      <Navbar variant="authenticated" />

      <main className="flex-1 py-12">
        <PageContainer>
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-[#1c1917] tracking-tight">
              Explore your interests across our genres
            </h1>
            <p className="text-sm md:text-base text-[#79716b] mt-3 leading-relaxed">
              Discover carefully compiled collections across major literary,
              scientific, and technical disciplines.
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-24">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={`/browse?category=${cat.slug}`}
                className="group flex flex-col p-6 rounded-2xl border border-[#e6e0d6] bg-white hover:shadow-md hover:border-[#d4cfc6] transition-all"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${cat.iconBg} ${cat.iconColor} flex items-center justify-center mb-5 shrink-0 transition-transform group-hover:scale-105`}
                >
                  <cat.icon size={22} strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1c1917] group-hover:text-[#8c695b] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#79716b] mt-1 font-medium">
                    {cat.count}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Popular in Fiction Section */}
          <div className="pt-8 border-t border-[#e6e0d6]">
            <SectionHeader
              title="Popular in Fiction"
              description="The novels currently captivating our reading community"
              actionLabel="Explore Fiction Genre"
              actionHref="/browse?category=fiction"
            />

            {/* Book Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
              {popularInFiction.map((book) => (
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
