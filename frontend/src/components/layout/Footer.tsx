"use client";

import Link from "next/link";
import { BookOpen, Globe, MessageCircle, Users, ArrowRight } from "lucide-react";
import PageContainer from "./PageContainer";

export default function Footer() {
  return (
    <footer className="w-full bg-[#f4efe6] border-t border-[#e6e0d6]">
      <PageContainer className="pt-16 pb-8">
        <div className="grid grid-cols-4 gap-12 mb-14">
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#8c695b] flex items-center justify-center text-white">
                <BookOpen size={16} strokeWidth={2.2} />
              </div>
              <span className="text-lg font-bold tracking-wider text-[#1c1917]">
                LIBRA
              </span>
            </Link>
            <p className="text-sm text-[#79716b] leading-relaxed">
              A premium, cozy space for lifelong learners and modern
              bibliophiles. Immerse yourself in our beautifully crafted digital
              library.
            </p>
            <div className="flex items-center gap-3 pt-1">
              {[Globe, MessageCircle, Users].map((Icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-full border border-[#e6e0d6] bg-white flex items-center justify-center text-[#79716b] hover:text-[#8c695b] hover:border-[#8c695b] transition-colors"
                >
                  <Icon size={15} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-[#1c1917] mb-5">
              Navigation
            </h4>
            <ul className="space-y-3.5">
              {["Home", "Browse", "Categories", "Pricing", "About"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href={
                        item === "Home"
                          ? "/"
                          : `/${item.toLowerCase()}`
                      }
                      className="text-sm text-[#79716b] hover:text-[#1c1917] transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-[#1c1917] mb-5">
              Legal
            </h4>
            <ul className="space-y-3.5">
              {[
                "Terms of Service",
                "Privacy Policy",
                "Cookie Policy",
                "Licensing",
              ].map((item) => (
                <li key={item}>
                  <span className="text-sm text-[#79716b] hover:text-[#1c1917] transition-colors cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-[#1c1917] mb-5">
              Stay Updated
            </h4>
            <p className="text-sm text-[#79716b] leading-relaxed mb-4">
              Receive updates about new releases, curation logs, and literary
              spotlights.
            </p>
            <form
              className="flex items-center gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-2.5 text-sm rounded-full border border-[#e6e0d6] bg-white text-[#1c1917] placeholder:text-[#a8a29e] focus:outline-none focus:border-[#8c695b] transition-colors"
              />
              <button
                type="submit"
                className="w-10 h-10 rounded-full bg-[#8c695b] text-white flex items-center justify-center hover:bg-[#7b594b] transition-colors shrink-0"
              >
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        <div className="pt-6 border-t border-[#e6e0d6] flex items-center justify-between">
          <p className="text-xs text-[#a8a29e]">
            © 2026 Readly Inc. All rights reserved.
          </p>
          <p className="text-xs text-[#a8a29e]">
            Designed elegantly for readers around the world.
          </p>
        </div>
      </PageContainer>
    </footer>
  );
}
