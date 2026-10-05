import Link from "next/link";
import React from "react";

interface SectionHeaderProps {
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}

export default function SectionHeader({
  title,
  description,
  actionLabel = "View All",
  actionHref = "/browse",
}: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between mb-10">
      <div>
        <h2 className="text-2xl font-bold text-[#1c1917] tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="text-sm text-[#79716b] mt-1.5">{description}</p>
        )}
      </div>
      {actionLabel && (
        <Link
          href={actionHref}
          className="text-sm font-medium text-[#8c695b] hover:text-[#7b594b] transition-colors flex items-center gap-1"
        >
          {actionLabel}
          <span className="text-xs">→</span>
        </Link>
      )}
    </div>
  );
}
