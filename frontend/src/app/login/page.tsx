"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen, Eye, EyeOff, ArrowRight, Sparkles } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/home");
  };

  return (
    <div className="min-h-screen bg-[#f9f6ef] flex">
      {/* Left Column: Form */}
      <div className="flex-1 flex flex-col justify-between p-8 sm:p-12 lg:p-16 max-w-2xl mx-auto w-full">
        {/* Top: Logo */}
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#8c695b] flex items-center justify-center text-white shadow-sm">
              <BookOpen size={18} strokeWidth={2.2} />
            </div>
            <span className="text-xl font-bold tracking-wider text-[#1c1917]">
              LIBRA
            </span>
          </Link>
        </div>

        {/* Center: Auth Form */}
        <div className="py-10 max-w-md w-full mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-serif font-bold text-[#1c1917] tracking-tight">
              Welcome back, reader
            </h1>
            <p className="text-sm text-[#79716b] mt-2 leading-relaxed">
              Step back into your quiet digital sanctuary. Your bookmarks and
              highlights are waiting.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
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
                className="w-full px-4 py-3 text-sm rounded-xl border border-[#e6e0d6] bg-white text-[#1c1917] placeholder:text-[#a8a29e] focus:outline-none focus:border-[#8c695b] transition-colors"
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
                  className="w-full px-4 py-3 text-sm rounded-xl border border-[#e6e0d6] bg-white text-[#1c1917] placeholder:text-[#a8a29e] focus:outline-none focus:border-[#8c695b] transition-colors pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#79716b] hover:text-[#1c1917] transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                id="rememberMe"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-[#d4cfc6] text-[#8c695b] focus:ring-[#8c695b]"
              />
              <label
                htmlFor="rememberMe"
                className="text-xs text-[#79716b] select-none cursor-pointer"
              >
                Remember me on this device
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 text-sm font-semibold bg-[#8c695b] text-white rounded-full hover:bg-[#7b594b] transition-all shadow-sm flex items-center justify-center gap-2 group mt-2"
            >
              <span>Sign In to Library</span>
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-7">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#e6e0d6]" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-[#f9f6ef] px-4 text-[#a8a29e]">
                or continue with
              </span>
            </div>
          </div>

          {/* Social Sign In Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => router.push("/home")}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-[#e6e0d6] bg-white text-xs font-medium text-[#1c1917] hover:bg-[#f4efe6] transition-colors"
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
              onClick={() => router.push("/home")}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-[#e6e0d6] bg-white text-xs font-medium text-[#1c1917] hover:bg-[#f4efe6] transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.87c.68-.82 1.13-1.97.98-3.12-1 .04-2.18.66-2.88 1.48-.61.71-1.14 1.88-.99 3 1.11.09 2.21-.54 2.89-1.36z" />
              </svg>
              <span>Apple</span>
            </button>
          </div>

          <p className="text-center text-xs text-[#79716b] mt-8">
            Don&apos;t have an account yet?{" "}
            <Link
              href="/register"
              className="font-semibold text-[#8c695b] hover:text-[#7b594b] transition-colors underline"
            >
              Get Started Free
            </Link>
          </p>
        </div>

        {/* Bottom: Copyright */}
        <div className="text-xs text-[#a8a29e] text-center lg:text-left">
          © 2026 Readly Inc. All rights reserved.
        </div>
      </div>

      {/* Right Column: Editorial Visual Showcase (hidden on small screen) */}
      <div className="hidden lg:flex flex-1 p-8 bg-[#f4efe6] border-l border-[#e6e0d6] items-center justify-center">
        <div className="max-w-lg w-full space-y-6">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl shadow-[#8c695b]/10">
            <Image
              src="/images/hero-reading.jpeg"
              alt="Cozy reading corner"
              fill
              className="object-cover"
              priority
              sizes="600px"
            />
          </div>

          {/* Quote Card */}
          <div className="bg-white rounded-2xl p-6 border border-[#e6e0d6] shadow-xs">
            <div className="flex items-center gap-2 text-[#8c695b] mb-3">
              <Sparkles size={16} />
              <span className="text-xs font-bold uppercase tracking-wider">
                Curator&apos;s Note
              </span>
            </div>
            <p className="text-sm italic font-serif text-[#1c1917] leading-relaxed">
              &ldquo;A room without books is like a body without a soul. Step
              in, breathe, and lose yourself in a world woven of words.&rdquo;
            </p>
            <p className="text-xs text-[#79716b] mt-3 font-medium">
              — LIBRA Editorial Team
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
