"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { BookOpen, Search } from "lucide-react";
import PageContainer from "./PageContainer";

interface NavbarProps {
  variant?: "landing" | "public" | "authenticated";
}

export default function Navbar({ variant = "public" }: NavbarProps) {
  const pathname = usePathname();
  const isAuthed = variant === "authenticated";

  const landingLinks = [
    { href: "/", label: "Home" },
    { href: "#about-us", label: "About Us" },
    { href: "#pricing-plans", label: "Pricing" },
    { href: "#contact-us", label: "Contact" },
  ];

  const appLinks = [
    { href: "/home", label: "Home" },
    { href: "/browse", label: "Browse" },
    { href: "/categories", label: "Categories" },
    { href: "/pricing", label: "Pricing" },
  ];

  const links = variant === "landing" ? landingLinks : appLinks;

  const handleLogoClick = (e: React.MouseEvent) => {
    if (isAuthed) {
      // Stay on the authenticated dashboard / do not navigate away to public landing
      if (pathname === "/home") {
        e.preventDefault();
      }
    }
  };

  return (
    <header className="w-full bg-[#f9f6ef] border-b border-[#eee9e0] sticky top-0 z-50">
      <PageContainer className="flex items-center justify-between h-20">
        {/* Logo */}
        <Link
          href={isAuthed ? "/home" : "/"}
          onClick={handleLogoClick}
          className="flex items-center gap-2.5"
        >
          <div className="w-9 h-9 rounded-xl bg-[#8c695b] flex items-center justify-center text-white shadow-sm">
            <BookOpen size={18} strokeWidth={2.2} />
          </div>
          <span className="text-xl font-bold tracking-wider text-[#1c1917]">
            LIBRA
          </span>
        </Link>

        {/* Nav Links */}
        <nav className="flex items-center gap-9">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm tracking-wide transition-colors ${
                  isActive
                    ? "text-[#1c1917] font-semibold"
                    : "text-[#79716b] hover:text-[#1c1917]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Auth / User Actions */}
        <div className="flex items-center gap-6">
          {variant !== "landing" && (
            <Link
              href="/browse"
              aria-label="Search Catalog"
              title="Search Catalog"
              className="text-[#1c1917] hover:text-[#8c695b] transition-colors p-1"
            >
              <Search size={19} />
            </Link>
          )}

          {isAuthed ? (
            <div className="flex items-center gap-4">
              <Link
                href="/library"
                className="text-sm font-medium text-[#79716b] hover:text-[#1c1917]"
              >
                My Library
              </Link>
              <Link
                href="/profile"
                className="w-8 h-8 rounded-full overflow-hidden border border-[#e6e0d6] flex items-center justify-center"
              >
                <Image
                  src="/images/avatar.jpeg"
                  alt="Profile"
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </Link>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-semibold text-[#1c1917] hover:text-[#8c695b] transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="text-sm font-medium bg-[#8c695b] text-white px-5 py-2.5 rounded-full hover:bg-[#7b594b] transition-colors shadow-sm"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </PageContainer>
    </header>
  );
}
