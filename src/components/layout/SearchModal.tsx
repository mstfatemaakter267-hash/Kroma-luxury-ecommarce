import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowRight, Clock } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { Product } from '../../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_SEARCHES = ['Chronograph', 'Leather Weekender', 'Studio Headphones', 'Oak Lounge Chair', 'Merino Wool', 'Alabaster Lamp'];

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const clean = query.toLowerCase().trim();
    const matches = PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(clean) ||
        p.brand.toLowerCase().includes(clean) ||
        p.category.toLowerCase().includes(clean) ||
        p.description.toLowerCase().includes(clean)
    );
    setResults(matches);
  }, [query]);

  const handleSelectProduct = (productId: string) => {
    onClose();
    navigate(`/product/${productId}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden z-10"
          >
            <form onSubmit={handleSearchSubmit} className="relative flex items-center border-b border-stone-100 p-4">
              <Search className="w-5 h-5 text-stone-400 shrink-0 ml-1" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search watches, leatherware, acoustics, furniture..."
                className="w-full text-base bg-transparent border-none px-4 py-1 text-stone-900 placeholder:text-stone-400 focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="p-1 text-stone-400 hover:text-stone-700 mr-2"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="text-xs uppercase tracking-wider font-semibold text-stone-500 hover:text-stone-900 px-2.5 py-1 rounded-md bg-stone-100 hover:bg-stone-200 transition-colors"
              >
                ESC
              </button>
            </form>

            <div className="max-h-[60vh] overflow-y-auto p-4">
              {query.trim() === '' ? (
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Popular Curations</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {POPULAR_SEARCHES.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => setQuery(tag)}
                        className="text-xs font-medium px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-900 transition-colors cursor-pointer"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>

                  <div className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">
                    Trending Right Now
                  </div>
                  <div className="space-y-2">
                    {PRODUCTS.filter((p) => p.isTrending).slice(0, 3).map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleSelectProduct(product.id)}
                        className="flex items-center justify-between p-2 rounded-xl hover:bg-stone-50 transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-lg bg-stone-100 border border-stone-200"
                          />
                          <div>
                            <div className="text-xs text-stone-400 font-medium">{product.brand}</div>
                            <div className="text-sm font-semibold text-stone-900 group-hover:text-stone-600 transition-colors">
                              {product.name}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm font-semibold tabular-nums text-stone-900">
                          ${product.price}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : results.length > 0 ? (
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">
                    Found {results.length} result{results.length > 1 ? 's' : ''}
                  </div>
                  {results.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSelectProduct(product.id)}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-stone-50 transition-colors cursor-pointer group border border-transparent hover:border-stone-100"
                    >
                      <div className="flex items-center gap-3.5">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-14 h-14 object-cover rounded-xl bg-stone-100 border border-stone-200"
                        />
                        <div>
                          <div className="text-xs text-stone-500">{product.brand} · {product.category}</div>
                          <div className="text-sm font-semibold text-stone-900 group-hover:text-stone-600 transition-colors">
                            {product.name}
                          </div>
                          <div className="text-xs text-stone-400 line-clamp-1">{product.tagline}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold tabular-nums text-stone-900">
                          ${product.price}
                        </div>
                        <span className="text-xs text-stone-400 flex items-center justify-end gap-1 group-hover:text-stone-900 transition-colors">
                          View <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  ))}
                  <div className="pt-3 border-t border-stone-100 text-center">
                    <button
                      type="button"
                      onClick={handleSearchSubmit}
                      className="text-xs font-semibold text-stone-700 hover:text-stone-900 inline-flex items-center gap-1.5"
                    >
                      View all {results.length} results in store <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-stone-600 font-medium">No results found for &ldquo;{query}&rdquo;</p>
                  <p className="text-xs text-stone-400 mt-1">Try searching for &ldquo;watch&rdquo;, &ldquo;bag&rdquo;, &ldquo;audio&rdquo;, or &ldquo;chair&rdquo;</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
