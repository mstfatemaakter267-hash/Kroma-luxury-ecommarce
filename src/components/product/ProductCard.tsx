import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye, Check } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { RatingStars } from '../common/RatingStars';
import { QuickViewModal } from './QuickViewModal';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className = '' }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, product.colors[0]?.name, product.sizes?.[0], true);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  return (
    <>
      <div
        className={`group flex flex-col bg-white rounded-2xl overflow-hidden border border-stone-200/80 hover:border-stone-300 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 ${className}`}
      >
        {/* Card Image Container */}
        <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
          <Link to={`/product/${product.id}`} className="block w-full h-full">
            <img
              src={product.images[0]}
              alt={product.name}
              referrerPolicy="no-referrer"
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 bg-stone-200 animate-pulse" />
            )}
          </Link>

          {/* Single subtle editorial tag if applicable */}
          {product.isNew ? (
            <span className="absolute top-3 left-3 text-[10px] font-semibold tracking-wider uppercase text-stone-900 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded shadow-xs">
              New Arrival
            </span>
          ) : product.isBestSeller ? (
            <span className="absolute top-3 left-3 text-[10px] font-semibold tracking-wider uppercase text-stone-900 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded shadow-xs">
              Atelier Classic
            </span>
          ) : null}

          {/* Wishlist button */}
          <button
            type="button"
            onClick={handleWishlistClick}
            className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 shadow-xs cursor-pointer ${
              isFavorited
                ? 'bg-rose-50 text-rose-600 scale-105'
                : 'bg-white/90 text-stone-600 hover:text-stone-900 hover:bg-white hover:scale-110'
            }`}
            aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-600' : ''}`} />
          </button>

          {/* Quick Action Overlay on hover */}
          <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              type="button"
              onClick={handleQuickAdd}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl shadow-md transition-all cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Quick Add</span>
            </button>
            <button
              type="button"
              onClick={handleQuickViewClick}
              className="p-2 bg-white/95 hover:bg-white text-stone-700 hover:text-stone-900 rounded-xl shadow-md transition-all cursor-pointer"
              title="Quick inspect"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Card Body & Metadata */}
        <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
          <div>
            {/* Unboxed clean metadata line */}
            <div className="flex items-center gap-2 text-xs text-stone-400 font-medium mb-1.5 uppercase tracking-wider">
              <span>{product.brand}</span>
              <span>·</span>
              <span>{product.category}</span>
            </div>

            <Link to={`/product/${product.id}`} className="group-hover:text-stone-700 transition-colors">
              <h3 className="text-base font-semibold text-stone-900 line-clamp-1 leading-snug">
                {product.name}
              </h3>
            </Link>

            <p className="text-xs text-stone-500 line-clamp-1 mt-1 leading-relaxed">
              {product.tagline}
            </p>
          </div>

          <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-stone-900 tabular-nums">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-stone-400 line-through tabular-nums">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            <RatingStars rating={product.rating} reviewCount={product.reviewCount} size="sm" />
          </div>

          {/* Color swatch indicators */}
          {product.colors.length > 1 && (
            <div className="flex items-center gap-1 pt-0.5">
              {product.colors.slice(0, 4).map((c) => (
                <span
                  key={c.name}
                  className="w-2.5 h-2.5 rounded-full border border-stone-300"
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-[10px] text-stone-400 font-medium">+{product.colors.length - 4}</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal product={isQuickViewOpen ? product : null} onClose={() => setIsQuickViewOpen(false)} />
    </>
  );
};
