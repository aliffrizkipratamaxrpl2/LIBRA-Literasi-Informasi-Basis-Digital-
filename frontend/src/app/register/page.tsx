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
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Compass,
} from "lucide-react";
import { getProfile, loginUser, registerUser } from "@/lib/api";
import { saveSession, writeDisplayProfile } from "@/lib/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError(null);
    if (!file) {
      setAvatar(null);
      return;
    }
    if (!file.type.startsWith("image/")) {
      setError("Profile photo must be an image file.");
      e.target.value = "";
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError("Profile photo must be smaller than 2 MB.");
      e.target.value = "";
      return;
    }
    setAvatar(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    const formData = new FormData();
    formData.append("username", trimmedName);
    formData.append("email", trimmedEmail);
    formData.append("pass", password);
    if (avatar) {
      formData.append("img", avatar);
    } else {
      formData.append("img", "/images/avatar.jpeg");
    }

    const result = await  registerUser(formData);
    if (!result.success) {
      setError(result.error ?? "Registration failed. Please try again.");
      setIsLoading(false);
      return;
    }

    const loginResult = await loginUser(trimmedEmail, password);
    if (!loginResult.success || !loginResult.token) {
      router.push("/login");
      return;
    }

    const profileResult = await getProfile(loginResult.token);
    const user = profileResult.user;

    saveSession(loginResult.token, user, true);
    writeDisplayProfile({ fullName: trimmedName, email: trimmedEmail });

    router.push("/home");
  };

  const handleSocialRegister = () => {
    setError(
      "Social sign-up is not available yet. Please create your account with email and password."
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

        {/* Center: Register Form Card */}
        <div className="py-6 max-w-md w-full mx-auto">
          {/* Header */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f4efe6] text-[#8c695b] text-[11px] font-bold tracking-wider uppercase border border-[#8c695b]/20 mb-3">
              <Sparkles size={12} />
              <span>Free Account Registration</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1c1917] tracking-tight">
              Begin your reading journey
            </h1>
            <p className="text-xs sm:text-sm text-[#79716b] mt-2 leading-relaxed">
              Join thousands of passionate readers. Explore curated classics, enjoy tranquil reading modes, and track your yearly reading goals.
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
              <div className="flex justify-between items-center mb-1.5">
                <label
                  htmlFor="name"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#1c1917]"
                >
                  Full Name / Username
                </label>
                <span className="text-[10px] text-[#a8a29e] font-medium">
                  {name.length}/15 Characters
                </span>
              </div>
              <input
                id="name"
                type="text"
                maxLength={15}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Khall Myaw"
                className="w-full px-4 py-3 text-sm rounded-2xl border border-[#e6e0d6] bg-white text-[#1c1917] placeholder:text-[#a8a29e] focus:outline-none focus:border-[#8c695b] focus:ring-2 focus:ring-[#8c695b]/10 transition-all shadow-2xs"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-wider text-[#1c1917] mb-1.5"
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
              <label
                htmlFor="password"
                className="block text-xs font-semibold uppercase tracking-wider text-[#1c1917] mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  minLength={6}
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

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="avatar"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#1c1917]"
                >
                  Profile Photo
                </label>
                <span className="text-[10px] text-[#a8a29e] font-medium">
                  Optional &bull; Max 2 MB
                </span>
              </div>
              <input
                id="avatar"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleAvatarChange}
                className="w-full text-xs text-[#79716b] file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#f4efe6] file:text-[#8c695b] hover:file:bg-[#ebe3d7] cursor-pointer"
              />
              {avatar && (
                <p className="text-[11px] text-[#8c695b] mt-1.5 font-medium">
                  Selected: {avatar.name}
                </p>
              )}
            </div>

            <div className="flex items-start gap-2.5 pt-1">
              <input
                id="agreeTerms"
                type="checkbox"
                required
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded border-[#d4cfc6] text-[#8c695b] focus:ring-[#8c695b] accent-[#8c695b]"
              />
              <label
                htmlFor="agreeTerms"
                className="text-xs text-[#79716b] select-none cursor-pointer leading-relaxed"
              >
                I agree to the{" "}
                <span className="text-[#1c1917] font-semibold underline">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-[#1c1917] font-semibold underline">
                  Privacy Policy
                </span>
                .
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 text-sm font-semibold bg-[#8c695b] text-white rounded-full hover:bg-[#7b594b] transition-all shadow-sm flex items-center justify-center gap-2 group mt-2 disabled:opacity-60 cursor-pointer"
            >
              <span>{isLoading ? "Creating Account..." : "Create Free Account"}</span>
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
                or sign up with
              </span>
            </div>
          </div>

          {/* Social Sign Up Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleSocialRegister}
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
              onClick={handleSocialRegister}
              className="flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-2xl border border-[#e6e0d6] bg-white text-xs font-semibold text-[#1c1917] hover:bg-[#f4efe6] transition-all shadow-2xs"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.87c.68-.82 1.13-1.97.98-3.12-1 .04-2.18.66-2.88 1.48-.61.71-1.14 1.88-.99 3 1.11.09 2.21-.54 2.89-1.36z" />
              </svg>
              <span>Apple</span>
            </button>
          </div>

          <p className="text-center text-xs text-[#79716b] mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-[#8c695b] hover:text-[#7b594b] transition-colors underline"
            >
              Sign In
            </Link>
          </p>
        </div>

        {/* Bottom: Security & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#a8a29e] pt-4 border-t border-[#e6e0d6]/60">
          <div className="flex items-center gap-1.5 text-[11px] text-[#79716b]">
            <ShieldCheck size={14} className="text-[#8c695b]" />
            <span>Guaranteed Data & Privacy Protection</span>
          </div>
          <span className="text-[11px]">© 2026 LIBRA Inc. All rights reserved.</span>
        </div>
      </div>

      {/* Right Column: Visual Feature Showcase */}
      <div className="hidden lg:flex flex-1 p-10 xl:p-14 bg-[#f4efe6] border-l border-[#e6e0d6] items-center justify-center relative overflow-hidden">
        {/* Soft decorative background circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#8c695b]/5 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#8c695b]/5 blur-3xl" />

        <div className="max-w-md w-full space-y-6 relative z-10">
          {/* Visual Hero Showcase */}
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-[#8c695b]/15 border border-white/60">
            <Image
              src="/images/hero-reading.jpeg"
              alt="Cozy reading space"
              fill
              className="object-cover"
              priority
              sizes="600px"
            />
            {/* Floating Explore Pill */}
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 shadow-md border border-[#e6e0d6]/80">
              <Compass size={14} className="text-[#8c695b]" />
              <span className="text-[11px] font-semibold text-[#1c1917]">
                Curated Collection of 10,000+ Titles
              </span>
            </div>
          </div>

          {/* Feature Highlights Card */}
          <div className="bg-white rounded-3xl p-7 border border-[#e6e0d6] space-y-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#eee9e0]">
              <h3 className="text-sm font-bold text-[#1c1917]">
                Included in your Free membership:
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-[#f4efe6] text-[#8c695b] text-[10px] font-bold uppercase tracking-wider">
                FREE FOREVER
              </span>
            </div>

            <ul className="space-y-3">
              {[
                "Direct access to 500+ curated digital titles",
                "Full reader personalization (Sepia, Serif, Dark modes)",
                "Automatic synchronization across 1 active device",
                "Personal shelf, reading streak, and note taking tools",
                "Standard access to the community discussion board",
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-xs text-[#79716b]">
                  <CheckCircle2
                    size={16}
                    className="text-[#8c695b] shrink-0 mt-0.5"
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
