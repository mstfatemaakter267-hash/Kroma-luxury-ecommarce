import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, ShoppingBag, Truck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Button } from '../common/Button';

export const CartDrawer: React.FC = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTotal,
    amountNeededForFreeShipping,
    freeShippingThreshold,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    promoError
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const navigate = useNavigate();

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput.trim()) {
      applyPromoCode(promoInput.trim());
      setPromoInput('');
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const handleViewCart = () => {
    setIsCartOpen(false);
    navigate('/cart');
  };

  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-stone-900/50 backdrop-blur-xs"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full border-l border-stone-200"
            >
              {/* Header */}
              <div className="p-5 border-b border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-stone-900" />
                  <h2 className="text-base font-semibold text-stone-900">
                    Shopping Bag ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition-colors"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free shipping banner / progress */}
              <div className="bg-stone-50 px-5 py-3 border-b border-stone-100">
                <div className="flex items-center gap-2 text-xs font-medium text-stone-700 mb-1.5">
                  <Truck className="w-3.5 h-3.5 text-stone-900" />
                  {amountNeededForFreeShipping > 0 ? (
                    <span>
                      Add <strong className="text-stone-900 font-semibold tabular-nums">${amountNeededForFreeShipping}</strong> more for free express courier
                    </span>
                  ) : (
                    <span className="text-emerald-700 font-semibold">
                      Unlocked complimentary express courier shipping
                    </span>
                  )}
                </div>
                <div className="w-full bg-stone-200 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-stone-900 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-16">
                    <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mb-4">
                      <ShoppingBag className="w-7 h-7" />
                    </div>
                    <h3 className="text-base font-semibold text-stone-900 mb-1">Your bag is empty</h3>
                    <p className="text-xs text-stone-500 max-w-xs mb-6">
                      Explore our curated collection of architectural design goods, fine horology, and leathercraft.
                    </p>
                    <Button
                      onClick={() => {
                        setIsCartOpen(false);
                        navigate('/shop');
                      }}
                      variant="primary"
                      size="sm"
                    >
                      Explore Curations
                    </Button>
                  </div>
                ) : (
                  cartItems.map((item, idx) => (
                    <div
                      key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}-${idx}`}
                      className="flex gap-3.5 pb-4 border-b border-stone-100 last:border-b-0"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-xl bg-stone-50 border border-stone-200 shrink-0"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="text-sm font-semibold text-stone-900 leading-snug">
                              {item.product.name}
                            </h4>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.product.id, item.selectedColor, item.selectedSize)}
                              className="text-stone-400 hover:text-rose-600 transition-colors p-0.5"
                              title="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-stone-500 mt-1">
                            {item.selectedColor && <span>{item.selectedColor}</span>}
                            {item.selectedColor && item.selectedSize && <span>·</span>}
                            {item.selectedSize && <span>Size {item.selectedSize}</span>}
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50 overflow-hidden">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedColor, item.selectedSize)}
                              className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-200 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2.5 text-xs font-semibold tabular-nums text-stone-900">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedColor, item.selectedSize)}
                              className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-200 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="text-sm font-semibold tabular-nums text-stone-900">
                            ${item.product.price * item.quantity}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer with calculation & buttons */}
              {cartItems.length > 0 && (
                <div className="p-5 border-t border-stone-100 bg-stone-50/50 space-y-3">
                  {/* Promo code input */}
                  {appliedPromo ? (
                    <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-3 py-2 rounded-xl">
                      <span className="font-medium">{appliedPromo}</span>
                      <button
                        type="button"
                        onClick={removePromoCode}
                        className="text-emerald-700 hover:text-emerald-900 font-semibold"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyPromo} className="flex gap-2">
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder="Promo code (try KROMA10)"
                        className="flex-1 text-xs bg-white border border-stone-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-stone-900"
                      />
                      <Button type="submit" variant="outline" size="sm">
                        Apply
                      </Button>
                    </form>
                  )}
                  {promoError && (
                    <p className="text-[11px] text-red-600 font-medium">{promoError}</p>
                  )}

                  {/* Summary list */}
                  <div className="space-y-1.5 text-xs pt-1 text-stone-600">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-medium text-stone-900 tabular-nums">${cartSubtotal}</span>
                    </div>
                    {cartDiscount > 0 && (
                      <div className="flex justify-between text-emerald-700">
                        <span>Privilege Discount</span>
                        <span className="font-semibold tabular-nums">-${cartDiscount}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Express Courier</span>
                      <span className="font-medium text-stone-900 tabular-nums">
                        {cartShipping === 0 ? 'Complimentary' : `$${cartShipping}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-semibold text-stone-900 pt-2 border-t border-stone-200">
                      <span>Estimated Total</span>
                      <span className="text-base tabular-nums">${cartTotal}</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-1">
                    <Button
                      onClick={handleCheckout}
                      variant="primary"
                      size="md"
                      fullWidth
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                    >
                      Proceed to Checkout
                    </Button>
                    <Button
                      onClick={handleViewCart}
                      variant="outline"
                      size="sm"
                      fullWidth
                    >
                      View Full Bag & Details
                    </Button>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-stone-400" />
                    <span>30-Day Guaranteed Returns & Verified Authenticity</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
