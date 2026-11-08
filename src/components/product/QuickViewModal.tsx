import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, ShoppingBag, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { RatingStars } from '../common/RatingStars';
import { Button } from '../common/Button';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  React.useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]?.name || '');
      setSelectedSize(product.sizes?.[0] || '');
      setQuantity(1);
    }
  }, [product]);

  if (!product) return null;

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize, true);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200 z-10 max-h-[90vh] flex flex-col md:flex-row"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-stone-700 shadow-xs transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: Product Image */}
          <div className="md:w-1/2 bg-stone-100 flex items-center justify-center p-6 relative">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-72 md:h-full max-h-[420px] object-cover rounded-xl"
            />
            {product.isNew && (
              <span className="absolute top-6 left-6 text-[11px] font-semibold tracking-wider uppercase text-stone-900 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md shadow-xs">
                New Atelier
              </span>
            )}
          </div>

          {/* Right: Details & Buying options */}
          <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center gap-2 text-xs text-stone-500 uppercase tracking-wider mb-1">
                <span>{product.brand}</span>
                <span>·</span>
                <span>{product.category}</span>
              </div>

              <h3 className="text-xl md:text-2xl font-bold font-display text-stone-900 leading-tight">
                {product.name}
              </h3>

              <div className="flex items-baseline gap-2.5 mt-2 mb-3">
                <span className="text-xl font-bold text-stone-900 tabular-nums">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-stone-400 line-through tabular-nums">
                    ${product.originalPrice}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="text-xs text-emerald-700 font-semibold">
                    Save ${product.originalPrice - product.price}
                  </span>
                )}
              </div>

              <RatingStars rating={product.rating} reviewCount={product.reviewCount} className="mb-4" />

              <p className="text-xs text-stone-600 leading-relaxed mb-6 line-clamp-3">
                {product.description}
              </p>

              {/* Color picker */}
              {product.colors.length > 0 && (
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="font-semibold text-stone-700 uppercase tracking-wider">Finish / Color:</span>
                    <span className="text-stone-500">{selectedColor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                          selectedColor === color.name
                            ? 'ring-2 ring-stone-900 ring-offset-2'
                            : 'hover:scale-105'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      >
                        {selectedColor === color.name && (
                          <Check className={`w-3.5 h-3.5 ${color.hex === '#FFFFFF' || color.hex === '#F5F5F0' ? 'text-stone-900' : 'text-white'}`} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size selector if apparel / leather */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-5">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="font-semibold text-stone-700 uppercase tracking-wider">Select Size:</span>
                    <span className="text-stone-500 font-medium">{selectedSize}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                          selectedSize === size
                            ? 'bg-stone-900 text-white border-stone-900'
                            : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity selector */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xs font-semibold text-stone-700 uppercase tracking-wider">Quantity:</span>
                <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-2.5 py-1 text-xs text-stone-600 hover:bg-stone-200 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-semibold tabular-nums text-stone-900">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
                    className="px-2.5 py-1 text-xs text-stone-600 hover:bg-stone-200 cursor-pointer"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-stone-400">
                  {product.stockCount} available
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2.5 pt-4 border-t border-stone-100">
              <div className="flex gap-2">
                <Button
                  onClick={handleAddToCart}
                  variant="primary"
                  size="md"
                  fullWidth
                  leftIcon={<ShoppingBag className="w-4 h-4" />}
                >
                  Add to Bag · ${(product.price * quantity).toLocaleString()}
                </Button>
                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3 rounded-xl border transition-colors cursor-pointer ${
                    isFavorited
                      ? 'border-rose-300 bg-rose-50 text-rose-600'
                      : 'border-stone-200 text-stone-600 hover:bg-stone-100'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-600' : ''}`} />
                </button>
              </div>

              <div className="text-center">
                <Link
                  to={`/product/${product.id}`}
                  onClick={onClose}
                  className="text-xs font-medium text-stone-600 hover:text-stone-900 inline-flex items-center gap-1 hover:underline"
                >
                  View full specifications & customer reviews <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
