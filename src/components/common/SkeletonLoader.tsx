import React from 'react';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-3 border border-stone-100 animate-pulse">
      <div className="w-full aspect-[4/3] bg-stone-200 rounded-xl mb-4" />
      <div className="h-3 bg-stone-200 rounded w-1/4 mb-2" />
      <div className="h-5 bg-stone-200 rounded w-3/4 mb-2" />
      <div className="h-4 bg-stone-200 rounded w-1/3 mb-4" />
      <div className="h-9 bg-stone-200 rounded-xl w-full" />
    </div>
  );
};

export const ProductGridSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(count)].map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
};
