import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/common/Button';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { EmptyState } from '../components/common/EmptyState';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
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

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput.trim()) {
      applyPromoCode(promoInput.trim());
      setPromoInput('');
    }
  };

  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Breadcrumb items={[{ label: 'Shopping Bag' }]} className="mb-8" />
        <EmptyState
          icon={<ShoppingBag className="w-8 h-8" />}
          title="Your Shopping Bag is Empty"
          description="You haven't added any architectural curations to your bag yet. Explore our portfolio of titanium timepieces, leather goods, and interior objects."
          actionLabel="Explore Atelier Catalog"
          onAction={() => navigate('/shop')}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumb items={[{ label: 'Store', path: '/shop' }, { label: 'Shopping Bag' }]} className="mb-6" />

      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 mb-8 border-b border-stone-200 gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-stone-500 block mb-1">
            Order Review
          </span>
          <h1 className="text-3xl font-bold font-display text-stone-900 tracking-tight">
            Shopping Bag ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} Items)
          </h1>
        </div>

        <button
          type="button"
          onClick={clearCart}
          className="text-xs font-semibold text-stone-500 hover:text-rose-600 transition-colors inline-flex items-center gap-1 cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Entire Bag</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Cart Items Table/List */}
        <div className="lg:col-span-8 space-y-4">
          {/* Free shipping banner */}
          <div className="bg-stone-100 p-4 rounded-2xl border border-stone-200">
            <div className="flex items-center justify-between text-xs font-medium text-stone-700 mb-2">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-stone-900" />
                {amountNeededForFreeShipping > 0 ? (
                  <span>
                    Add <strong className="text-stone-900 font-semibold tabular-nums">${amountNeededForFreeShipping}</strong> more for complimentary courier
                  </span>
                ) : (
                  <span className="text-emerald-800 font-semibold">
                    Complimentary express courier shipping unlocked
                  </span>
                )}
              </span>
              <span className="font-semibold text-stone-900 tabular-nums">
                {freeShippingProgress}%
              </span>
            </div>
            <div className="w-full bg-stone-200 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-stone-900 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items Container */}
          <div className="bg-white rounded-2xl border border-stone-200 divide-y divide-stone-100 overflow-hidden shadow-xs">
            {cartItems.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}-${idx}`}
                className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
              >
                <div className="flex items-center gap-4">
                  <Link to={`/product/${item.product.id}`} className="shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl bg-stone-100 border border-stone-200"
                    />
                  </Link>

                  <div>
                    <span className="text-xs text-stone-400 font-medium uppercase tracking-wider block">
                      {item.product.brand}
                    </span>
                    <Link
                      to={`/product/${item.product.id}`}
                      className="text-base font-semibold text-stone-900 hover:text-stone-600 transition-colors block"
                    >
                      {item.product.name}
                    </Link>

                    <div className="flex items-center gap-2 text-xs text-stone-500 mt-1">
                      {item.selectedColor && <span>Finish: {item.selectedColor}</span>}
                      {item.selectedColor && item.selectedSize && <span>·</span>}
                      {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                    </div>

                    <div className="text-xs text-stone-600 font-semibold tabular-nums mt-1">
                      ${item.product.price} each
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto sm:gap-6 self-stretch sm:self-center pt-3 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-stone-300 rounded-xl bg-stone-50 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedColor, item.selectedSize)}
                      className="px-3 py-1.5 text-xs text-stone-700 hover:bg-stone-200 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-semibold tabular-nums text-stone-900">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedColor, item.selectedSize)}
                      className="px-3 py-1.5 text-xs text-stone-700 hover:bg-stone-200 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Line Total */}
                  <div className="text-right">
                    <div className="text-base font-bold text-stone-900 tabular-nums">
                      ${(item.product.price * item.quantity).toLocaleString()}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.product.id, item.selectedColor, item.selectedSize)}
                      className="text-xs text-stone-400 hover:text-rose-600 transition-colors mt-0.5"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 flex justify-between items-center text-xs">
            <Link
              to="/shop"
              className="text-stone-600 hover:text-stone-900 font-semibold inline-flex items-center gap-1"
            >
              ← Continue Curating More Pieces
            </Link>
          </div>
        </div>

        {/* Right: Order Summary Card */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-6">
          <h2 className="text-lg font-bold font-display text-stone-900 pb-3 border-b border-stone-100">
            Order Summary
          </h2>

          {/* Promo code form */}
          <div>
            <span className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
              Privilege Promo Code
            </span>
            {appliedPromo ? (
              <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-3.5 py-2.5 rounded-xl">
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
                  placeholder="Code (e.g. KROMA10)"
                  className="flex-1 text-xs bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-stone-900 uppercase"
                />
                <Button type="submit" variant="secondary" size="sm">
                  Apply
                </Button>
              </form>
            )}
            {promoError && (
              <p className="text-xs text-red-600 mt-1 font-medium">{promoError}</p>
            )}
          </div>

          {/* Breakdown list */}
          <div className="space-y-3 text-xs text-stone-600 pt-3 border-t border-stone-100">
            <div className="flex justify-between">
              <span>Items Subtotal</span>
              <span className="font-semibold text-stone-900 tabular-nums">${cartSubtotal.toLocaleString()}</span>
            </div>

            {cartDiscount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Privilege Discount</span>
                <span className="font-bold tabular-nums">-${cartDiscount.toLocaleString()}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Insured Carbon-Neutral Courier</span>
              <span className="font-semibold text-stone-900 tabular-nums">
                {cartShipping === 0 ? 'Complimentary ($0)' : `$${cartShipping}`}
              </span>
            </div>

            <div className="flex justify-between text-stone-400">
              <span>Duties & Local Taxes</span>
              <span>Calculated at Checkout</span>
            </div>

            <div className="flex justify-between text-base font-bold text-stone-900 pt-3 border-t border-stone-200">
              <span>Estimated Total</span>
              <span className="text-xl tabular-nums">${cartTotal.toLocaleString()}</span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <Button
              onClick={() => navigate('/checkout')}
              variant="primary"
              size="lg"
              fullWidth
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Proceed to Checkout
            </Button>

            <div className="space-y-2 text-[11px] text-stone-500 pt-2 border-t border-stone-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-stone-400 shrink-0" />
                <span>Verified 256-Bit SSL Encrypted Protocol</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-stone-400 shrink-0" />
                <span>30-Day Hassle-Free Returns Included</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
