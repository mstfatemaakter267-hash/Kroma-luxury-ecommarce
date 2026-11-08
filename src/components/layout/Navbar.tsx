import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User as UserIcon, Menu, X, Download } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { SearchModal } from './SearchModal';
import { MobileNav } from './MobileNav';

export const Navbar: React.FC = () => {
  const { cartCount, cartTotal, setIsCartOpen } = useCart();
  const { wishlistIds } = useWishlist();
  const { user, isAuthenticated } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Catalog', path: '/shop' },
    { label: 'Timepieces', path: '/shop?category=watches' },
    { label: 'Leatherware', path: '/shop?category=leather' },
    { label: 'Acoustics & Living', path: '/shop?category=audio' },
    { label: 'Atelier', path: '/about' }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 text-stone-700 hover:text-stone-900 rounded-lg hover:bg-stone-100"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link
              to="/"
              className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 font-display whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
            >
              KROMA
            </Link>
          </div>

          {/* Zone 2: 4–5 single-line clean text nav links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-600">
            {navLinks.map((link) => {
              const isActive = location.pathname + location.search === link.path ||
                (link.path === '/shop' && location.pathname === '/shop' && !location.search);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors hover:text-stone-900 ${
                    isActive ? 'text-stone-900 font-semibold' : ''
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Primary Utility Group */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Search Trigger */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-2 text-stone-600 hover:text-stone-900 rounded-xl hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="Search store"
            >
              <Search className="w-4 h-4" />
              <span className="hidden md:inline text-xs font-medium text-stone-400">Search curations</span>
              <kbd className="hidden md:inline text-[10px] bg-stone-100 border border-stone-200 px-1.5 py-0.5 rounded text-stone-500 font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Wishlist Button */}
            <Link
              to="/wishlist"
              className="relative p-2 text-stone-700 hover:text-stone-900 rounded-xl hover:bg-stone-100 transition-colors"
              aria-label={`Wishlist with ${wishlistIds.length} items`}
            >
              <Heart className="w-5 h-5" />
              {wishlistIds.length > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-stone-900 text-[10px] font-bold text-white tabular-nums">
                  {wishlistIds.length}
                </span>
              )}
            </Link>

            {/* User Account Button */}
            <Link
              to={isAuthenticated ? "/auth?tab=profile" : "/auth"}
              className="p-2 text-stone-700 hover:text-stone-900 rounded-xl hover:bg-stone-100 transition-colors hidden sm:flex items-center gap-2"
              aria-label="User account"
            >
              <UserIcon className="w-5 h-5" />
              {isAuthenticated && (
                <span className="text-xs font-semibold max-w-[80px] truncate text-stone-900">
                  {user?.name.split(' ')[0]}
                </span>
              )}
            </Link>

            {/* Direct Zip Download Button */}
            <a
              href="/kroma-luxury-ecommerce.zip"
              download="kroma-luxury-ecommerce.zip"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              title="Download full project zip archive"
            >
              <Download className="w-3.5 h-3.5" />
              <span>.ZIP</span>
            </a>

            {/* Cart Trigger */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2.5 px-3 py-2 bg-stone-900 text-white hover:bg-stone-800 rounded-xl transition-all shadow-xs ml-1 cursor-pointer"
              aria-label={`Shopping bag with ${cartCount} items totaling $${cartTotal}`}
            >
              <ShoppingBag className="w-4 h-4 text-stone-200" />
              <span className="text-xs font-semibold tabular-nums">
                {cartCount}
              </span>
              <span className="hidden sm:inline text-xs text-stone-300 font-medium">·</span>
              <span className="hidden sm:inline text-xs font-semibold tabular-nums text-stone-200">
                ${cartTotal}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile Drawer Navigation */}
      <MobileNav isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
};
