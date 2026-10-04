"use client";

import { use, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Bookmark,
  Settings2,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type ReaderTheme = "light" | "sepia" | "dark";
type FontOption = "sans" | "serif";
type LineSpacing = "tight" | "comfortable" | "spacious";

export default function ReaderPage({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const { bookId } = use(params);

  // Reader Preferences State
  const [theme, setTheme] = useState<ReaderTheme>("light");
  const [fontFamily, setFontFamily] = useState<FontOption>("serif");
  const [fontSize, setFontSize] = useState<number>(20);
  const [lineSpacing, setLineSpacing] = useState<LineSpacing>("comfortable");
  const [brightness, setBrightness] = useState<number>(80);

  // UI state
  const [showSettings, setShowSettings] = useState<boolean>(true);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(42);
  const totalPages = 318;
  const progressPercent = Math.round((currentPage / totalPages) * 100);

  // Theme styling helpers
  const themeStyles = {
    light: {
      bg: "bg-[#ffffff]",
      pageBg: "bg-[#f9f6ef]",
      sidebarBg: "bg-[#f4efe6]",
      border: "border-[#e6e0d6]",
      text: "text-[#1c1917]",
      textMuted: "text-[#79716b]",
      heading: "text-[#1c1917]",
      footerBg: "bg-[#ffffff]",
    },
    sepia: {
      bg: "bg-[#f4ecd8]",
      pageBg: "bg-[#ece4ce]",
      sidebarBg: "bg-[#e8dfc7]",
      border: "border-[#d9cfb6]",
      text: "text-[#433422]",
      textMuted: "text-[#7d6b55]",
      heading: "text-[#2e2113]",
      footerBg: "bg-[#f4ecd8]",
    },
    dark: {
      bg: "bg-[#141414]",
      pageBg: "bg-[#0d0d0d]",
      sidebarBg: "bg-[#1a1a1a]",
      border: "border-[#2e2e2e]",
      text: "text-[#e0deda]",
      textMuted: "text-[#999690]",
      heading: "text-[#ffffff]",
      footerBg: "bg-[#141414]",
    },
  };

  const currentTheme = themeStyles[theme];

  const lineSpacingClass = {
    tight: "leading-relaxed",
    comfortable: "leading-[2]",
    spacious: "leading-[2.4]",
  }[lineSpacing];

  const fontFamilyClass =
    fontFamily === "serif"
      ? "font-serif tracking-normal"
      : "font-sans tracking-tight";

  return (
    <div
      className={`min-h-screen flex flex-col ${currentTheme.pageBg} transition-colors duration-300`}
      style={{ filter: `brightness(${brightness}%)` }}
    >
      {/* Reader Top Header Bar */}
      <header
        className={`w-full ${currentTheme.bg} ${currentTheme.border} border-b px-6 py-4 flex items-center justify-between sticky top-0 z-40 transition-colors duration-300`}
      >
        {/* Left: Back Arrow + Book Title + Author */}
        <div className="flex items-center gap-4">
          <Link
            href={`/books/${bookId}`}
            className={`w-9 h-9 rounded-full ${currentTheme.border} border flex items-center justify-center ${currentTheme.text} hover:opacity-75 transition-opacity`}
            title="Back to Book Detail"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className={`text-sm font-bold ${currentTheme.heading}`}>
              Beyond the Grid
            </h1>
            <p className={`text-[11px] ${currentTheme.textMuted}`}>
              Klaus Van Der Meer
            </p>
          </div>
        </div>

        {/* Center: Chapter Name in Italic */}
        <div className="hidden md:block">
          <p className={`text-xs italic font-serif ${currentTheme.textMuted}`}>
            Chapter 4: The Silent Algorithm
          </p>
        </div>

        {/* Right: Bookmark + Settings Gear */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${
              isBookmarked ? "text-[#8c695b]" : currentTheme.text
            }`}
            title="Bookmark this page"
          >
            <Bookmark
              size={18}
              className={isBookmarked ? "fill-[#8c695b]" : ""}
            />
          </button>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${
              showSettings ? "text-[#8c695b]" : currentTheme.text
            }`}
            title="Reader Preferences"
          >
            <Settings2 size={18} />
          </button>
        </div>
      </header>

      {/* Main Reading & Preferences Area */}
      <div className="flex-1 flex flex-col lg:flex-row relative">
        {/* Center Reading Pane */}
        <main
          className={`flex-1 ${currentTheme.bg} transition-colors duration-300 py-16 px-6 sm:px-12 md:px-20 lg:px-28 flex justify-center`}
        >
          <div className="max-w-2xl w-full space-y-8">
            {/* Chapter Heading */}
            <h2
              className={`text-3xl sm:text-4xl font-serif font-bold ${currentTheme.heading} tracking-tight`}
            >
              IV. The Silent Algorithm
            </h2>

            {/* Reading Content with Dynamic Font Size & Spacing */}
            <div
              className={`space-y-6 ${currentTheme.text} ${fontFamilyClass} ${lineSpacingClass} transition-all duration-200`}
              style={{ fontSize: `${fontSize}px` }}
            >
              <p>
                The machine did not hum. That was the first thing they
                noticed—or rather, the first thing they failed to notice. For
                generations, we had equated technological supremacy with a
                relentless mechanical orchestration, a industrial rhythm that
                pulsed through the concrete foundations of the city. But the
                architecture Klaus had designed was completely passive, digesting
                complex computational queries with the quiet grace of deep
                water.
              </p>

              <p>
                &ldquo;When you build a system that aligns with human intuition,
                the friction of logic disappears,&rdquo; he had written in his
                early manifestos. Sitting on the simple wooden stool in the
                middle of the clean white testing bay, Arthur realized how
                literal that translation had become. The screens did not flicker
                with the aggressive blue spectrum of old. Instead, they glowed
                with the warm amber of natural linen, adjusting dynamically to
                the afternoon sun that slanted through the high clerestory
                windows.
              </p>

              <p>
                He turned the physical page with a soft rustle, the tactile
                feedback of the digital overlay simulating perfectly the weight
                and texture of a handmade folio. It wasn&apos;t about nostalgia;
                it was about anchors. In a world completely decoupled from
                physical boundaries, keeping the physical mechanics of reading
                was the only way to safeguard concentration.
              </p>
            </div>
          </div>
        </main>

        {/* Right Reader Preferences Panel (Sidebar) */}
        {showSettings && (
          <aside
            className={`w-full lg:w-80 ${currentTheme.sidebarBg} ${currentTheme.border} border-t lg:border-t-0 lg:border-l p-7 space-y-7 shrink-0 transition-colors duration-300 z-20`}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1c1917] dark:text-white">
                READER PREFERENCES
              </h3>
              <button
                onClick={() => setShowSettings(false)}
                className="lg:hidden text-[#79716b]"
              >
                <X size={16} />
              </button>
            </div>

            {/* THEME */}
            <div className="space-y-2.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#79716b]">
                THEME
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setTheme("light")}
                  className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all ${
                    theme === "light"
                      ? "border-[#8c695b] bg-white text-[#1c1917] shadow-xs"
                      : "border-[#e6e0d6] bg-white/70 text-[#79716b]"
                  }`}
                >
                  Light
                </button>
                <button
                  onClick={() => setTheme("sepia")}
                  className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all ${
                    theme === "sepia"
                      ? "border-[#8c695b] bg-[#f4ecd8] text-[#433422] shadow-xs"
                      : "border-[#d9cfb6] bg-[#f4ecd8]/70 text-[#7d6b55]"
                  }`}
                >
                  Sepia
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all ${
                    theme === "dark"
                      ? "border-[#8c695b] bg-[#1c1917] text-white shadow-xs"
                      : "border-[#2e2e2e] bg-[#1c1917]/70 text-[#999690]"
                  }`}
                >
                  Dark
                </button>
              </div>
            </div>

            {/* FONT FAMILY */}
            <div className="space-y-2.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#79716b]">
                FONT FAMILY
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setFontFamily("sans")}
                  className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all ${
                    fontFamily === "sans"
                      ? "bg-[#6b564b] text-white border-[#6b564b]"
                      : "bg-white dark:bg-black/20 border-[#e6e0d6] dark:border-[#2e2e2e] text-[#79716b]"
                  }`}
                >
                  Sans-Serif
                </button>
                <button
                  onClick={() => setFontFamily("serif")}
                  className={`py-2 px-3 text-xs font-serif font-semibold rounded-xl border transition-all ${
                    fontFamily === "serif"
                      ? "bg-[#6b564b] text-white border-[#6b564b]"
                      : "bg-white dark:bg-black/20 border-[#e6e0d6] dark:border-[#2e2e2e] text-[#79716b]"
                  }`}
                >
                  Serif
                </button>
              </div>
            </div>

            {/* FONT SIZE */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#79716b]">
                  FONT SIZE
                </label>
                <span className="text-xs font-bold text-[#1c1917] dark:text-white">
                  {fontSize}px
                </span>
              </div>
              <input
                type="range"
                min={14}
                max={30}
                step={1}
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full h-1.5 bg-[#d4cfc6] rounded-lg appearance-none cursor-pointer accent-[#8c695b]"
              />
            </div>

            {/* LINE SPACING */}
            <div className="space-y-2.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#79716b]">
                LINE SPACING
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["tight", "comfortable", "spacious"] as LineSpacing[]).map(
                  (spacing) => {
                    const isActive = lineSpacing === spacing;
                    return (
                      <button
                        key={spacing}
                        onClick={() => setLineSpacing(spacing)}
                        className={`py-2 px-2 text-xs capitalize font-semibold rounded-xl border transition-all ${
                          isActive
                            ? "bg-[#6b564b] text-white border-[#6b564b]"
                            : "bg-white dark:bg-black/20 border-[#e6e0d6] dark:border-[#2e2e2e] text-[#79716b]"
                        }`}
                      >
                        {spacing}
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            {/* SCREEN BRIGHTNESS */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#79716b]">
                  SCREEN BRIGHTNESS
                </label>
                <span className="text-xs font-bold text-[#1c1917] dark:text-white">
                  {brightness}%
                </span>
              </div>
              <input
                type="range"
                min={30}
                max={100}
                step={5}
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                className="w-full h-1.5 bg-[#d4cfc6] rounded-lg appearance-none cursor-pointer accent-[#8c695b]"
              />
            </div>
          </aside>
        )}
      </div>

      {/* Bottom Progress & Navigation Footer */}
      <footer
        className={`w-full ${currentTheme.footerBg} ${currentTheme.border} border-t relative z-30 transition-colors duration-300`}
      >
        {/* Full width progress indicator line */}
        <div className="w-full h-1 bg-[#e6e0d6] dark:bg-[#2e2e2e] overflow-hidden">
          <div
            className="h-full bg-[#8c695b] transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 10))}
            className={`flex items-center gap-1.5 px-5 py-2 text-xs font-semibold rounded-full border ${currentTheme.border} ${currentTheme.text} hover:bg-black/5 dark:hover:bg-white/5 transition-all`}
          >
            <ChevronLeft size={14} />
            <span>Previous Chapter</span>
          </button>

          <p className={`text-xs ${currentTheme.textMuted} font-medium`}>
            Page {currentPage} of {totalPages} ({progressPercent}% completed)
          </p>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 10))}
            className="flex items-center gap-1.5 px-6 py-2 text-xs font-semibold bg-[#8c695b] text-white rounded-full hover:bg-[#7b594b] transition-all shadow-xs"
          >
            <span>Next Chapter</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </footer>
    </div>
  );
}
