import React, { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(() => {
    try {
      return sessionStorage.getItem('kroma_hide_banner') !== 'true';
    } catch {
      return true;
    }
  });

  const handleDismiss = () => {
    setIsVisible(false);
    try {
      sessionStorage.setItem('kroma_hide_banner', 'true');
    } catch (e) {
      console.error(e);
    }
  };

  if (!isVisible) return null;

  return (
    <aside aria-label="Announcement" className="bg-stone-900 text-stone-300 text-xs py-2 px-4 border-b border-stone-800 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 text-center truncate flex items-center justify-center gap-2">
          <span className="font-medium text-stone-200">Autumn / Winter Atelier Release</span>
          <span className="text-stone-600">·</span>
          <span className="hidden sm:inline">Complimentary express courier over $300</span>
          <span className="hidden sm:inline text-stone-600">·</span>
          <a
            href="/kroma-luxury-ecommerce.zip"
            download="kroma-luxury-ecommerce.zip"
            className="inline-flex items-center gap-1 font-semibold text-white bg-stone-800 hover:bg-stone-700 px-2.5 py-0.5 rounded transition-colors text-[11px]"
          >
            📦 Download Project .ZIP (3.6 MB)
          </a>
        </div>
        <button
          onClick={handleDismiss}
          className="text-stone-400 hover:text-white p-0.5 rounded transition-colors shrink-0 cursor-pointer"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
