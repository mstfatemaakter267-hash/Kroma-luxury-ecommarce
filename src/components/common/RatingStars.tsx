import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
  className?: string;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  reviewCount,
  size = 'md',
  showCount = true,
  className = ''
}) => {
  const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.4;

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center text-amber-500" aria-label={`Rating: ${rating} out of 5 stars`}>
        {[...Array(5)].map((_, i) => {
          const isFilled = i < fullStars;
          const isHalf = i === fullStars && hasHalf;
          return (
            <Star
              key={i}
              className={`${iconSize} ${
                isFilled
                  ? 'fill-amber-500 text-amber-500'
                  : isHalf
                  ? 'fill-amber-500/50 text-amber-500'
                  : 'text-stone-300 dark:text-stone-600'
              }`}
            />
          );
        })}
      </div>
      {showCount && (
        <span className="text-xs text-stone-500 dark:text-stone-400 font-medium tabular-nums">
          {rating.toFixed(1)} {reviewCount !== undefined && `(${reviewCount})`}
        </span>
      )}
    </div>
  );
};
