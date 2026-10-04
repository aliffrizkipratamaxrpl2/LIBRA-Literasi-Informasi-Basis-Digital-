"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar, Footer, PageContainer } from "@/components/layout";
import { Check, Plus, Minus } from "lucide-react";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    id: "faq-1",
    question: "Can I switch plans or cancel at any time?",
    answer:
      "Yes, you can upgrade, downgrade, or cancel your plan easily through your profile preference page. If you cancel, you will maintain access to your tier benefits until the current monthly billing period concludes.",
  },
  {
    id: "faq-2",
    question: "How do offline downloads work?",
    answer:
      "Offline downloads are stored securely within your device's local cache. You can download complete books and audiobooks on up to 3 devices simultaneously and read anytime without an internet connection.",
  },
  {
    id: "faq-3",
    question: "What is your refund policy?",
    answer:
      "We offer a full 14-day money-back guarantee for all paid subscriptions. If you're not completely satisfied with your LIBRA experience, contact our support team for a full refund with no questions asked.",
  },
  {
    id: "faq-4",
    question: "Do you have options for institutions or classrooms?",
    answer:
      "Yes! LIBRA Institutional provides bulk licensing, student reading progress analytics, and curriculum-aligned collections for universities, schools, and literary clubs. Contact our team for customized institutional pricing.",
  },
];

const comparisonRows = [
  {
    feature: "Catalog Size",
    free: "500+ titles",
    reader: "10,000+ titles",
    premium: "10,000+ titles",
    highlightReader: true,
  },
  {
    feature: "Offline Reading",
    free: "No",
    reader: "Yes",
    premium: "Yes",
    highlightReader: true,
  },
  {
    feature: "Simultaneous Devices",
    free: "1 device",
    reader: "3 devices",
    premium: "Unlimited",
    highlightReader: true,
  },
  {
    feature: "Highlighting & Notes",
    free: "No",
    reader: "Yes",
    premium: "Yes",
    highlightReader: true,
  },
  {
    feature: "Audiobooks included",
    free: "No",
    reader: "Standard list",
    premium: "All included",
    highlightReader: true,
  },
  {
    feature: "Priority Curation Logs",
    free: "No",
    reader: "No",
    premium: "Yes",
    highlightReader: false,
  },
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<string | null>("faq-1");

  const toggleFaq = (id: string) => {
    setOpenFaq((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <Navbar variant="authenticated" />

      <main className="flex-1 py-14">
        <PageContainer>
          {/* Header */}
          <div className="max-w-2xl mx-auto text-center space-y-3.5 mb-16">
            <h1 className="text-4xl font-bold text-[#1c1917] tracking-tight">
              Choose Your Reading Plan
            </h1>
            <p className="text-sm md:text-base text-[#79716b] leading-relaxed">
              Unlock endless literary journeys tailored beautifully to your
              reading style and active devices.
            </p>
          </div>

          {/* 3 Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-28 max-w-6xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white rounded-3xl border border-[#e6e0d6] p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-[#1c1917]">Free</h3>
                  <div className="flex items-baseline gap-1 mt-3">
                    <span className="text-4xl font-bold text-[#1c1917]">$0</span>
                    <span className="text-xs text-[#79716b]">/month</span>
                  </div>
                  <p className="text-xs text-[#79716b] mt-3 leading-relaxed">
                    Discover classic literature and explore basic community logs.
                  </p>
                </div>

                <div className="border-t border-[#e6e0d6]" />

                <ul className="space-y-3.5 text-xs text-[#1c1917]">
                  {[
                    "Access to 500+ free digital books",
                    "Standard reader customization tools",
                    "Active device sync (1 device maximum)",
                    "Ad-supported interface log",
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

              <div className="pt-8">
                <Link
                  href="/register"
                  className="w-full py-3 px-6 text-xs font-semibold rounded-full border border-[#8c695b] text-[#8c695b] hover:bg-[#f4efe6] transition-colors flex items-center justify-center text-center"
                >
                  Get Started Free
                </Link>
              </div>
            </div>

            {/* Reader Plan (Featured / Most Popular) */}
            <div className="bg-white rounded-3xl border-2 border-[#8c695b] p-8 flex flex-col justify-between shadow-md relative">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-[#1c1917]">Reader</h3>
                  <span className="px-3 py-1 rounded-full bg-[#f4efe6] text-[#8c695b] text-[10px] font-bold tracking-wider uppercase">
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
                    Dive deep with our complete catalog, offline mode, and
                    audiobooks.
                  </p>
                </div>

                <div className="border-t border-[#e6e0d6]" />

                <ul className="space-y-3.5 text-xs text-[#1c1917]">
                  {[
                    "Unlimited catalog access (10K+ titles)",
                    "Completely ad-free cozy environment",
                    "Sync up to 3 devices simultaneously",
                    "Offline reading with local downloads",
                    "Full annotations, notes, and highlights",
                    "Cozy audiobooks integrated seamlessly",
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

              <div className="pt-8">
                <Link
                  href="/register"
                  className="w-full py-3 px-6 text-xs font-semibold rounded-full bg-[#8c695b] text-white hover:bg-[#7b594b] transition-colors shadow-sm flex items-center justify-center text-center"
                >
                  Start 14-Day Free Trial
                </Link>
              </div>
            </div>

            {/* Premium Plan */}
            <div className="bg-white rounded-3xl border border-[#e6e0d6] p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
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
                    Elegantly designed for ultimate literary enthusiasts and
                    reading logs.
                  </p>
                </div>

                <div className="border-t border-[#e6e0d6]" />

                <ul className="space-y-3.5 text-xs text-[#1c1917]">
                  {[
                    "Everything included in Reader tier",
                    "Sync unlimited devices simultaneously",
                    "Early access to newly curated editions",
                    "Premium priority support SLA",
                    "Seamless digital family logs (5 members)",
                    "Personalized monthly reading spotlight",
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

              <div className="pt-8">
                <Link
                  href="/register"
                  className="w-full py-3 px-6 text-xs font-semibold rounded-full border border-[#8c695b] text-[#8c695b] hover:bg-[#f4efe6] transition-colors flex items-center justify-center text-center"
                >
                  Start 14-Day Free Trial
                </Link>
              </div>
            </div>
          </div>

          {/* Comparison Table Section */}
          <div className="max-w-5xl mx-auto mb-28">
            <h2 className="text-2xl font-bold text-[#1c1917] text-center mb-10 tracking-tight">
              Compare Features
            </h2>

            <div className="bg-white rounded-3xl border border-[#e6e0d6] overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#f4efe6] border-b border-[#e6e0d6]">
                      <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-[#1c1917] w-2/5">
                        Features
                      </th>
                      <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-[#1c1917] text-center w-1/5">
                        Free
                      </th>
                      <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-[#8c695b] text-center w-1/5">
                        Reader
                      </th>
                      <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-[#1c1917] text-center w-1/5">
                        Premium
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#eee9e0] text-xs text-[#1c1917]">
                    {comparisonRows.map((row, i) => (
                      <tr key={i} className="hover:bg-[#faf9f7] transition-colors">
                        <td className="py-4 px-6 font-medium text-[#1c1917]">
                          {row.feature}
                        </td>
                        <td className="py-4 px-6 text-center text-[#79716b]">
                          {row.free}
                        </td>
                        <td className="py-4 px-6 text-center font-bold text-[#1c1917]">
                          {row.reader}
                        </td>
                        <td className="py-4 px-6 text-center text-[#79716b]">
                          {row.premium}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Frequently Asked Questions (FAQ) Section */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-[#1c1917] text-center mb-10 tracking-tight">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {faqs.map((faq) => {
                const isOpen = openFaq === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="bg-white rounded-2xl border border-[#e6e0d6] overflow-hidden transition-all shadow-xs"
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full flex items-center justify-between p-5 sm:p-6 text-left"
                    >
                      <span className="text-sm font-bold text-[#1c1917] pr-4">
                        {faq.question}
                      </span>
                      <div className="w-7 h-7 rounded-full bg-[#f4efe6] flex items-center justify-center text-[#1c1917] shrink-0">
                        {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-xs text-[#79716b] leading-relaxed border-t border-[#f4efe6]">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </PageContainer>
      </main>

      <Footer />
    </>
  );
}
