"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Navbar, Footer, PageContainer } from "@/components/layout";
import { getPlans } from "@/lib/api";
import type { BackendPlan } from "@/types";
import { Check, Plus, Minus } from "lucide-react";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface PlanCardData {
  id: string | number;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

const defaultPlans: PlanCardData[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    period: "/month",
    description: "Discover classic literature and explore basic community logs.",
    features: [
      "Access to 500+ free digital books",
      "Standard reader customization tools",
      "Active device sync (1 device maximum)",
      "Ad-supported reading experience",
      "Standard community forum access",
    ],
    cta: "Get Started Free",
    popular: false,
  },
  {
    id: "reader",
    name: "Reader",
    price: 9.99,
    period: "/month",
    description: "Unlimited catalog access, offline mode, and integrated audiobooks.",
    features: [
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
    ],
    cta: "Start 14-Day Free Trial",
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: 19.99,
    period: "/month",
    description: "The complete literary sanctuary designed for avid bibliophiles & families.",
    features: [
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
    ],
    cta: "Start 14-Day Free Trial",
    popular: false,
  },
];

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
    feature: "Book Catalog Access",
    free: "500+ digital titles",
    reader: "10,000+ titles (Unlimited)",
    premium: "10,000+ titles + Exclusive Vault",
    highlightReader: true,
  },
  {
    feature: "Ad-Free Experience",
    free: "No (Ad-supported)",
    reader: "Yes (100% Ad-free)",
    premium: "Yes (100% Ad-free)",
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
    feature: "Device Synchronization",
    free: "1 device",
    reader: "Up to 3 devices",
    premium: "Unlimited devices",
    highlightReader: true,
  },
  {
    feature: "Annotations, Notes & Highlights",
    free: "Standard",
    reader: "Full suite",
    premium: "Full suite",
    highlightReader: true,
  },
  {
    feature: "Integrated Audiobooks",
    free: "No",
    reader: "Yes",
    premium: "Yes",
    highlightReader: true,
  },
  {
    feature: "Exclusive Reading Themes",
    free: "Standard",
    reader: "Yes",
    premium: "Yes",
    highlightReader: true,
  },
  {
    feature: "Book Recommendations",
    free: "Standard",
    reader: "Personalized",
    premium: "Monthly exclusive curation",
    highlightReader: true,
  },
  {
    feature: "Profile Styling & Badges",
    free: "No",
    reader: "Verified badge & username accent",
    premium: "Photo border, custom banner & Premium badge",
    highlightReader: true,
  },
  {
    feature: "Family Account Sharing",
    free: "No",
    reader: "No",
    premium: "Up to 5 members",
    highlightReader: false,
  },
  {
    feature: "Customer Support",
    free: "Community forum",
    reader: "Standard email",
    premium: "Priority SLA Support",
    highlightReader: false,
  },
];

export default function PricingPage() {
  const [plans, setPlans] = useState<PlanCardData[]>(defaultPlans);
  const [openFaq, setOpenFaq] = useState<string | null>("faq-1");

  useEffect(() => {
    async function load() {
      const data: BackendPlan[] | null = await getPlans();
      if (data && data.length > 0) {
        const mapped: PlanCardData[] = data.map((p, i) => {
          const fallback = defaultPlans[i % defaultPlans.length];
          return {
            id: p.id,
            name: p.plan,
            price: Number(p.price),
            period: `/${p.cycle || "month"}`,
            description: p.descriptions || fallback.description,
            features: fallback.features,
            cta: fallback.cta,
            popular: p.plan.toLowerCase().includes("reader") || fallback.popular,
          };
        });
        setPlans(mapped);
      }
    }
    load();
  }, []);

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

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-28 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`bg-white rounded-3xl p-8 flex flex-col justify-between transition-all ${
                  plan.popular
                    ? "border-2 border-[#8c695b] shadow-md relative"
                    : "border border-[#e6e0d6] shadow-xs hover:shadow-md"
                }`}
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-[#1c1917]">
                      {plan.name}
                    </h3>
                    {plan.popular && (
                      <span className="px-3 py-1 rounded-full bg-[#f4efe6] text-[#8c695b] text-[10px] font-bold tracking-wider uppercase border border-[#8c695b]/20">
                        MOST POPULAR
                      </span>
                    )}
                  </div>

                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-[#1c1917]">
                        ${plan.price === 0 ? "0" : plan.price.toFixed(2)}
                      </span>
                      <span className="text-xs text-[#79716b]">
                        {plan.period}
                      </span>
                    </div>
                    <p className="text-xs text-[#79716b] mt-3 leading-relaxed">
                      {plan.description}
                    </p>
                  </div>

                  <div className="border-t border-[#e6e0d6]" />

                  <ul className="space-y-3.5 text-xs text-[#1c1917]">
                    {plan.features.map((feat, i) => (
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
                    className={`w-full py-3 px-6 text-xs font-semibold rounded-full transition-colors flex items-center justify-center text-center ${
                      plan.popular
                        ? "bg-[#8c695b] text-white hover:bg-[#7b594b] shadow-sm"
                        : "border border-[#8c695b] text-[#8c695b] hover:bg-[#f4efe6]"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </div>
            ))}
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
