"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Star,
  Quote,
} from "lucide-react";
import { getProfile, loginUser } from "@/lib/api";
import { displayNameFromEmail, saveSession, writeDisplayProfile } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const trimmedEmail = email.trim();
    const result = await loginUser(trimmedEmail, password);

    if (!result.success || !result.token) {
      setError(result.error ?? "Login failed. Please try again.");
      setIsLoading(false);
      return;
    }

    const profileResult = await getProfile(result.token);
    const user = profileResult.user;

    saveSession(result.token, user, rememberMe);
    writeDisplayProfile({
      fullName:
        user?.username || displayNameFromEmail(user?.email ?? trimmedEmail),
      email: user?.email ?? trimmedEmail,
    });

    router.push("/home");
  };

  const handleSocialLogin = () => {
    setError(
      "Social sign-in is not available yet. Please sign in with your email and password."
    );
  };

  return (
    <div className="min-h-screen bg-[#f9f6ef] flex flex-col lg:flex-row">
      {/* Left Column: Form & Brand Area */}
      <div className="flex-1 flex flex-col justify-between p-6 sm:p-10 lg:p-14 max-w-xl mx-auto w-full">
        {/* Top: Logo & Back Link */}
        <div className="flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-[#8c695b] flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
              <BookOpen size={19} strokeWidth={2.2} />
            </div>
            <div>
              <span className="text-xl font-bold tracking-wider text-[#1c1917] block leading-none">
                LIBRA
              </span>
              <span className="text-[10px] text-[#8c695b] font-medium tracking-widest uppercase mt-0.5 block">
                Digital Sanctuary
              </span>
            </div>
          </Link>

          <Link
            href="/"
            className="text-xs font-semibold text-[#79716b] hover:text-[#1c1917] px-3.5 py-1.5 rounded-full border border-[#e6e0d6] bg-white transition-colors"
          >
            &larr; Home
          </Link>
        </div>

        {/* Center: Auth Form Card */}
        <div className="py-8 max-w-md w-full mx-auto">
          {/* Header */}
          <div className="mb-7">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f4efe6] text-[#8c695b] text-[11px] font-bold tracking-wider uppercase border border-[#8c695b]/20 mb-3">
              <Sparkles size={12} />
              <span>Reader Portal</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1c1917] tracking-tight">
              Welcome back, reader
            </h1>
            <p className="text-xs sm:text-sm text-[#79716b] mt-2 leading-relaxed">
              Step back into your quiet digital sanctuary. Your bookmarks, annotations, and reading progress are waiting for you.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div
                role="alert"
                className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-600"
              >
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-wider text-[#1c1917] mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-4 py-3 text-sm rounded-2xl border border-[#e6e0d6] bg-white text-[#1c1917] placeholder:text-[#a8a29e] focus:outline-none focus:border-[#8c695b] focus:ring-2 focus:ring-[#8c695b]/10 transition-all shadow-2xs"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#1c1917]"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs font-medium text-[#8c695b] hover:text-[#7b594b] transition-colors"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 text-sm rounded-2xl border border-[#e6e0d6] bg-white text-[#1c1917] placeholder:text-[#a8a29e] focus:outline-none focus:border-[#8c695b] focus:ring-2 focus:ring-[#8c695b]/10 transition-all shadow-2xs pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#79716b] hover:text-[#1c1917] transition-colors p-1"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2.5 text-xs text-[#79716b] select-none cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-[#d4cfc6] text-[#8c695b] focus:ring-[#8c695b] accent-[#8c695b]"
                />
                <span>Remember me on this device</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 text-sm font-semibold bg-[#8c695b] text-white rounded-full hover:bg-[#7b594b] transition-all shadow-sm flex items-center justify-center gap-2 group mt-2 disabled:opacity-60 cursor-pointer"
            >
              <span>{isLoading ? "Opening Bookshelf..." : "Sign In to Library"}</span>
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#e6e0d6]" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-[#f9f6ef] px-4 text-[#a8a29e] uppercase tracking-wider font-semibold">
                or continue with
              </span>
            </div>
          </div>

          {/* Social Sign In Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleSocialLogin}
              className="flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-2xl border border-[#e6e0d6] bg-white text-xs font-semibold text-[#1c1917] hover:bg-[#f4efe6] transition-all shadow-2xs"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"
                />
              </svg>
              <span>Google</span>
            </button>

            <button
              type="button"
              onClick={handleSocialLogin}
              className="flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-2xl border border-[#e6e0d6] bg-white text-xs font-semibold text-[#1c1917] hover:bg-[#f4efe6] transition-all shadow-2xs"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.87c.68-.82 1.13-1.97.98-3.12-1 .04-2.18.66-2.88 1.48-.61.71-1.14 1.88-.99 3 1.11.09 2.21-.54 2.89-1.36z" />
              </svg>
              <span>Apple</span>
            </button>
          </div>

          <p className="text-center text-xs text-[#79716b] mt-7">
            Don&apos;t have a reader account yet?{" "}
            <Link
              href="/register"
              className="font-bold text-[#8c695b] hover:text-[#7b594b] transition-colors underline"
            >
              Sign Up Free
            </Link>
          </p>
        </div>

        {/* Bottom: Guarantee & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#a8a29e] pt-4 border-t border-[#e6e0d6]/60">
          <div className="flex items-center gap-1.5 text-[11px] text-[#79716b]">
            <ShieldCheck size={14} className="text-[#8c695b]" />
            <span>End-to-End Session Encryption</span>
          </div>
          <span className="text-[11px]">© 2026 LIBRA Inc. All rights reserved.</span>
        </div>
      </div>

      {/* Right Column: Editorial Visual Showcase */}
      <div className="hidden lg:flex flex-1 p-10 xl:p-14 bg-[#f4efe6] border-l border-[#e6e0d6] items-center justify-center relative overflow-hidden">
        {/* Soft decorative background circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#8c695b]/5 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#8c695b]/5 blur-3xl" />

        <div className="max-w-lg w-full space-y-6 relative z-10">
          {/* Main Visual Image with Badge */}
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-[#8c695b]/15 border border-white/60">
            <Image
              src="/images/hero-reading.jpeg"
              alt="Cozy reading corner"
              fill
              className="object-cover"
              priority
              sizes="600px"
            />
            {/* Floating Rating Pill */}
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 shadow-md border border-[#e6e0d6]/80">
              <div className="flex items-center gap-0.5 text-[#e59934]">
                <Star size={14} className="fill-[#e59934]" />
                <span className="text-xs font-bold text-[#1c1917] ml-1">4.9 / 5.0</span>
              </div>
              <span className="text-[#a8a29e] text-xs">&bull;</span>
              <span className="text-[11px] font-medium text-[#79716b]">50K+ Active Readers</span>
            </div>
          </div>

          {/* Curator Note Card */}
          <div className="bg-white rounded-3xl p-7 border border-[#e6e0d6] shadow-xs space-y-3 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#8c695b]">
                <Quote size={18} className="fill-[#8c695b]/20" />
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  Curator&apos;s Note
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-[#a8a29e] font-semibold">
                October 2026 Edition
              </span>
            </div>

            <p className="text-sm italic font-serif text-[#1c1917] leading-relaxed">
              &ldquo;Reading is not merely turning printed folios; it is an intentional space to slow down, reflect, and uncover clarity amidst the noise of the modern world.&rdquo;
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-[#eee9e0]">
              <p className="text-xs font-bold text-[#1c1917]">
                LIBRA Editorial & Curation Board
              </p>
              <span className="text-[11px] text-[#8c695b] font-medium">
                Boston & Global
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
