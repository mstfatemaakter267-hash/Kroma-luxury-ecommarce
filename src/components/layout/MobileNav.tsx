import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, User, Heart, ShoppingBag, PhoneCall, HelpCircle, FileText } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount, setIsCartOpen } = useCart();
  const { wishlistIds } = useWishlist();
  const location = useLocation();

  const handleLinkClick = () => {
    onClose();
  };

  const navCategories = [
    { label: 'All Curations', path: '/shop' },
    { label: 'Timepieces', path: '/shop?category=watches' },
    { label: 'Leather Goods', path: '/shop?category=leather' },
    { label: 'Acoustics & Audio', path: '/shop?category=audio' },
    { label: 'Furniture & Living', path: '/shop?category=furniture' },
    { label: 'Atelier Apparel', path: '/shop?category=apparel' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs"
          />

          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-y-0 left-0 w-full max-w-xs bg-white shadow-2xl flex flex-col h-full border-r border-stone-200"
          >
            {/* Header */}
            <div className="p-5 border-b border-stone-100 flex items-center justify-between">
              <Link to="/" onClick={handleLinkClick} className="text-xl font-bold font-display text-stone-900 tracking-tight">
                KROMA
              </Link>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {/* Account Quick Status */}
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
                {isAuthenticated ? (
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-stone-400 uppercase font-semibold">Signed In</div>
                      <div className="text-sm font-semibold text-stone-900">{user?.name}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        onClose();
                      }}
                      className="text-xs font-semibold text-rose-600 hover:text-rose-800"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-stone-900">Collector Account</div>
                      <div className="text-xs text-stone-500">Sign in for order tracking</div>
                    </div>
                    <Link
                      to="/auth"
                      onClick={handleLinkClick}
                      className="text-xs font-semibold px-3 py-1.5 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors"
                    >
                      Sign In
                    </Link>
                  </div>
                )}
              </div>

              {/* Navigation links */}
              <div>
                <div className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">
                  Collections
                </div>
                <div className="space-y-1">
                  {navCategories.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={handleLinkClick}
                      className="flex items-center justify-between p-2.5 rounded-xl text-sm font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition-colors"
                    >
                      <span>{item.label}</span>
                      <ArrowRight className="w-4 h-4 text-stone-400" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Secondary links */}
              <div>
                <div className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">
                  Atelier & Support
                </div>
                <div className="space-y-1 text-sm">
                  <Link
                    to="/about"
                    onClick={handleLinkClick}
                    className="flex items-center gap-3 p-2 text-stone-600 hover:text-stone-900"
                  >
                    <FileText className="w-4 h-4 text-stone-400" />
                    <span>About Kroma</span>
                  </Link>
                  <Link
                    to="/contact"
                    onClick={handleLinkClick}
                    className="flex items-center gap-3 p-2 text-stone-600 hover:text-stone-900"
                  >
                    <PhoneCall className="w-4 h-4 text-stone-400" />
                    <span>Client Services & Concierge</span>
                  </Link>
                  <Link
                    to="/faq"
                    onClick={handleLinkClick}
                    className="flex items-center gap-3 p-2 text-stone-600 hover:text-stone-900"
                  >
                    <HelpCircle className="w-4 h-4 text-stone-400" />
                    <span>Shipping, Care & FAQs</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Actions Footer */}
            <div className="p-4 border-t border-stone-100 bg-stone-50 flex items-center justify-around">
              <Link
                to="/wishlist"
                onClick={handleLinkClick}
                className="flex flex-col items-center gap-1 text-stone-600 hover:text-stone-900"
              >
                <div className="relative">
                  <Heart className="w-5 h-5" />
                  {wishlistIds.length > 0 && (
                    <span className="absolute -top-1 -right-2 bg-stone-900 text-white rounded-full text-[9px] w-4 h-4 flex items-center justify-center font-bold">
                      {wishlistIds.length}
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-medium">Wishlist</span>
              </Link>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  setIsCartOpen(true);
                }}
                className="flex flex-col items-center gap-1 text-stone-600 hover:text-stone-900"
              >
                <div className="relative">
                  <ShoppingBag className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-2 bg-stone-900 text-white rounded-full text-[9px] w-4 h-4 flex items-center justify-center font-bold">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-medium">Bag</span>
              </button>

              <Link
                to="/auth"
                onClick={handleLinkClick}
                className="flex flex-col items-center gap-1 text-stone-600 hover:text-stone-900"
              >
                <User className="w-5 h-5" />
                <span className="text-[11px] font-medium">Account</span>
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
