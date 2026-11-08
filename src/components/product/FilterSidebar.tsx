import React from 'react';
import { X, RotateCcw, Check, Star } from 'lucide-react';
import { CATEGORIES, BRANDS } from '../../data/products';
import { FilterState } from '../../types';

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (updated: Partial<FilterState>) => void;
  onReset: () => void;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onChange,
  onReset,
  isMobileOpen,
  onMobileClose
}) => {
  const handleCategoryClick = (catId: string) => {
    onChange({ category: catId });
  };

  const handleBrandToggle = (brand: string) => {
    const exists = filters.brand.includes(brand);
    const updated = exists
      ? filters.brand.filter((b) => b !== brand)
      : [...filters.brand, brand];
    onChange({ brand: updated });
  };

  const handleRatingClick = (rating: number) => {
    if (filters.rating === rating) {
      onChange({ rating: null });
    } else {
      onChange({ rating });
    }
  };

  const content = (
    <div className="space-y-7">
      {/* Header with Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-200">
        <h3 className="text-sm font-bold text-stone-900 tracking-tight uppercase">Filters</h3>
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-semibold text-stone-500 hover:text-stone-900 inline-flex items-center gap-1 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Category Section */}
      <div>
        <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-3">
          Category
        </h4>
        <div className="space-y-1">
          {CATEGORIES.map((cat) => {
            const isSelected = filters.category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryClick(cat.id)}
                className={`w-full flex items-center justify-between text-xs px-2.5 py-1.5 rounded-lg transition-colors text-left cursor-pointer ${
                  isSelected
                    ? 'bg-stone-900 text-white font-semibold'
                    : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`tabular-nums ${isSelected ? 'text-stone-300' : 'text-stone-400'}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
            Price Range
          </h4>
          <span className="text-xs font-semibold text-stone-900 tabular-nums">
            ${filters.priceRange[0]} - ${filters.priceRange[1]}
          </span>
        </div>
        <input
          type="range"
          min="50"
          max="2500"
          step="50"
          value={filters.priceRange[1]}
          onChange={(e) => onChange({ priceRange: [filters.priceRange[0], parseInt(e.target.value, 10)] })}
          className="w-full accent-stone-900 cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-stone-400 mt-1 font-mono">
          <span>$50</span>
          <span>$2,500+</span>
        </div>
      </div>

      {/* Brands Filter */}
      <div>
        <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-3">
          Atelier / Brand
        </h4>
        <div className="space-y-2">
          {BRANDS.map((brand) => {
            const checked = filters.brand.includes(brand);
            return (
              <label
                key={brand}
                className="flex items-center gap-2.5 text-xs text-stone-700 hover:text-stone-900 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleBrandToggle(brand)}
                  className="rounded border-stone-300 text-stone-900 focus:ring-stone-900 w-4 h-4"
                />
                <span className={checked ? 'font-semibold text-stone-900' : ''}>{brand}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Customer Rating */}
      <div>
        <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-3">
          Minimum Rating
        </h4>
        <div className="space-y-1.5">
          {[4.9, 4.8, 4.7].map((r) => {
            const isSelected = filters.rating === r;
            return (
              <button
                key={r}
                type="button"
                onClick={() => handleRatingClick(r)}
                className={`w-full flex items-center justify-between text-xs px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  isSelected ? 'bg-stone-100 font-semibold text-stone-900' : 'text-stone-600 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{r} Stars & Above</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-stone-900" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Stock Availability */}
      <div className="pt-2 border-t border-stone-200">
        <label className="flex items-center justify-between text-xs text-stone-800 cursor-pointer select-none">
          <span className="font-medium">In Stock Only</span>
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onChange({ inStockOnly: e.target.checked })}
            className="rounded border-stone-300 text-stone-900 focus:ring-stone-900 w-4 h-4"
          />
        </label>
      </div>
    </div>
  );

  // Desktop sidebar
  if (!isMobileOpen) {
    return <aside className="w-64 shrink-0 hidden lg:block pr-6">{content}</aside>;
  }

  // Mobile drawer modal
  return (
    <div className="fixed inset-0 z-50 flex lg:hidden">
      <div
        className="fixed inset-0 bg-stone-900/50 backdrop-blur-xs"
        onClick={onMobileClose}
      />
      <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-6">
            <span className="text-base font-bold font-display text-stone-900">Filter Curations</span>
            <button
              type="button"
              onClick={onMobileClose}
              className="p-1 rounded-lg text-stone-400 hover:text-stone-900 hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {content}
        </div>
        <div className="pt-6 mt-6 border-t border-stone-200">
          <button
            type="button"
            onClick={onMobileClose}
            className="w-full py-3 bg-stone-900 text-white rounded-xl text-xs font-semibold uppercase tracking-wider"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};
