import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { SortOption } from '../../types';

interface SortDropdownProps {
  value: SortOption;
  onChange: (sort: SortOption) => void;
}

export const SortDropdown: React.FC<SortDropdownProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="w-4 h-4 text-stone-500 shrink-0" />
      <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider hidden sm:inline">
        Sort:
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="text-xs font-medium bg-white border border-stone-200 rounded-xl px-3 py-2 text-stone-800 hover:border-stone-300 focus:outline-none focus:ring-1 focus:ring-stone-900 cursor-pointer"
      >
        <option value="featured">Featured Curations</option>
        <option value="newest">New Arrivals</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="rating">Highest Rated</option>
      </select>
    </div>
  );
};
