import React from "react";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}

export default function PageContainer({
  children,
  className = "",
  size = "default",
}: PageContainerProps) {
  const maxW =
    size === "narrow"
      ? "max-w-4xl"
      : size === "wide"
      ? "max-w-7xl"
      : "max-w-[1200px]";

  return (
    <div
      className={`w-full mx-auto px-6 ${maxW} ${className}`}
    >
      {children}
    </div>
  );
}
