import { Star } from "lucide-react";

interface RatingProps {
  value: number;
  className?: string;
  showText?: boolean;
}

export default function Rating({
  value,
  className = "",
  showText = true,
}: RatingProps) {
  const rounded = Math.round(value);

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={13}
            className={
              star <= rounded
                ? "fill-[#e59934] text-[#e59934]"
                : "fill-transparent text-[#d4cfc6]"
            }
          />
        ))}
      </div>
      {showText && (
        <span className="text-xs font-medium text-[#79716b]">{value.toFixed(1)}</span>
      )}
    </div>
  );
}
