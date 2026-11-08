import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  CreditCard,
  Truck,
  ArrowRight,
  Package,
  Lock,
  Download,
  ShoppingBag
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Breadcrumb } from '../components/common/Breadcrumb';

interface FormData {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  deliveryMethod: 'standard' | 'express';
  paymentMethod: 'card' | 'apple-pay' | 'cod';
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
  cardHolder: string;
}

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, cartSubtotal, cartDiscount, cartShipping, cartTotal, clearCart } = useCart();
  const { showToast } = useToast();

  const [formData, setFormData] = useState<FormData>({
    email: 'alexander.wright@design.co',
    phone: '+1 (555) 234-5678',
    firstName: 'Alexander',
    lastName: 'Wright',
    address: '425 Via San Marco, Apt 4B',
    city: 'Milan',
    postalCode: '20121',
    country: 'Italy',
    deliveryMethod: 'standard',
    paymentMethod: 'card',
    cardNumber: '•••• •••• •••• 4242',
    cardExpiry: '12/28',
    cardCvc: '888',
    cardHolder: 'ALEXANDER WRIGHT'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState('');

  // Shipping cost adjustment based on delivery option
  const deliveryExtra = formData.deliveryMethod === 'express' ? 35 : 0;
  const finalShipping = cartShipping + deliveryExtra;
  const finalTotal = cartTotal + deliveryExtra;

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.email || !formData.email.includes('@')) {
      errs.email = 'Valid email is required for tracking notifications';
    }
    if (!formData.firstName.trim()) errs.firstName = 'First name is required';
    if (!formData.lastName.trim()) errs.lastName = 'Last name is required';
    if (!formData.address.trim()) errs.address = 'Delivery address is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.postalCode.trim()) errs.postalCode = 'Postal code is required';

    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber.trim()) errs.cardNumber = 'Card number required';
      if (!formData.cardExpiry.trim()) errs.cardExpiry = 'Expiry required';
      if (!formData.cardCvc.trim()) errs.cardCvc = 'CVC required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast('Please complete all required shipping fields', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const orderId = `KR-${Math.floor(100000 + Math.random() * 900000)}`;
      setConfirmedOrderId(orderId);
      setIsSubmitting(false);
      setIsOrderPlaced(true);
      clearCart();
      showToast(`Order ${orderId} confirmed successfully`, 'success');
    }, 1200);
  };

  // If order is placed, show confirmation screen
  if (isOrderPlaced) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 sm:py-20">
        <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-12 shadow-sm text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="text-xs font-semibold text-emerald-800 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
            Payment & Allocation Confirmed
          </span>

          <h1 className="text-3xl sm:text-4xl font-bold font-display text-stone-900 mt-4 mb-2">
            Thank you, {formData.firstName}.
          </h1>
          <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed mb-6">
            Your acquisition has been registered with the master atelier. We have dispatched confirmation details and your serialized authenticity receipt to <strong>{formData.email}</strong>.
          </p>

          <div className="bg-stone-50 rounded-2xl p-6 border border-stone-100 text-left max-w-lg mx-auto mb-8 space-y-3 text-xs">
            <div className="flex justify-between pb-3 border-b border-stone-200">
              <span className="text-stone-500 font-medium">Order Number:</span>
              <span className="font-mono font-bold text-stone-900">{confirmedOrderId}</span>
            </div>
            <div className="flex justify-between pb-3 border-b border-stone-200">
              <span className="text-stone-500 font-medium">Estimated Arrival:</span>
              <span className="font-semibold text-stone-900">
                {formData.deliveryMethod === 'express' ? 'Nov 11 - Nov 13, 2026' : 'Nov 14 - Nov 18, 2026'}
              </span>
            </div>
            <div className="flex justify-between pb-3 border-b border-stone-200">
              <span className="text-stone-500 font-medium">Dispatch Destination:</span>
              <span className="font-medium text-stone-900 text-right">
                {formData.address}, {formData.city} {formData.postalCode}, {formData.country}
              </span>
            </div>
            <div className="flex justify-between text-sm font-bold text-stone-900 pt-1">
              <span>Total Settled:</span>
              <span className="tabular-nums">${finalTotal.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/shop">
              <Button variant="primary" size="md">
                Return to Atelier Catalog
              </Button>
            </Link>
            <Button
              variant="outline"
              size="md"
              onClick={() => showToast('Authenticity Certificate PDF downloaded', 'info')}
              leftIcon={<Download className="w-4 h-4" />}
            >
              Download Serialized Certificate
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // If user navigates to checkout directly with 0 items
  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold font-display text-stone-900 mb-2">No Items to Checkout</h2>
        <p className="text-stone-500 text-sm mb-6">Your shopping bag is currently empty.</p>
        <Link to="/shop">
          <Button variant="primary">Explore Curations</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumb
        items={[
          { label: 'Bag', path: '/cart' },
          { label: 'Secure Checkout' }
        ]}
        className="mb-8"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Customer Info & Shipping Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-8">
          {/* Section 1: Contact Information */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <h2 className="text-base font-bold font-display text-stone-900">
                1. Collector Contact Information
              </h2>
              <span className="text-xs text-stone-400">Step 1 of 3</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Email Address for Tracking"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                error={errors.email}
              />
              <Input
                label="Direct Mobile Phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          {/* Section 2: Shipping Destination */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <h2 className="text-base font-bold font-display text-stone-900">
                2. Shipping & Delivery Address
              </h2>
              <span className="text-xs text-stone-400">Step 2 of 3</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="First Name"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                error={errors.firstName}
              />
              <Input
                label="Last Name"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                error={errors.lastName}
              />
            </div>

            <Input
              label="Street Address / Suite / Apartment"
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              error={errors.address}
            />

            <div className="grid grid-cols-3 gap-4">
              <Input
                label="City"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                error={errors.city}
              />
              <Input
                label="Postal Code"
                required
                value={formData.postalCode}
                onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                error={errors.postalCode}
              />
              <Input
                label="Country"
                required
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              />
            </div>

            {/* Delivery speed picker */}
            <div className="pt-4 border-t border-stone-100 space-y-2">
              <span className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                Courier Service Level
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                    formData.deliveryMethod === 'standard'
                      ? 'border-stone-900 bg-stone-50/50'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      checked={formData.deliveryMethod === 'standard'}
                      onChange={() => setFormData({ ...formData, deliveryMethod: 'standard' })}
                      className="text-stone-900 focus:ring-stone-900"
                    />
                    <div>
                      <div className="text-xs font-semibold text-stone-900">Standard Insured Courier</div>
                      <div className="text-[11px] text-stone-500">3-5 business days</div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-stone-900 tabular-nums">
                    {cartShipping === 0 ? 'Free' : `$${cartShipping}`}
                  </span>
                </label>

                <label
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                    formData.deliveryMethod === 'express'
                      ? 'border-stone-900 bg-stone-50/50'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      checked={formData.deliveryMethod === 'express'}
                      onChange={() => setFormData({ ...formData, deliveryMethod: 'express' })}
                      className="text-stone-900 focus:ring-stone-900"
                    />
                    <div>
                      <div className="text-xs font-semibold text-stone-900">Priority Air Courier</div>
                      <div className="text-[11px] text-stone-500">1-2 business days with tracking</div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-stone-900 tabular-nums">
                    +${deliveryExtra}
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Section 3: Payment Method */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <h2 className="text-base font-bold font-display text-stone-900 flex items-center gap-2">
                <Lock className="w-4 h-4 text-stone-700" />
                <span>3. Payment Settlement</span>
              </h2>
              <span className="text-xs text-stone-400">Step 3 of 3</span>
            </div>

            {/* Payment method selector tabs */}
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                  formData.paymentMethod === 'card'
                    ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                    : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                }`}
              >
                Credit Card
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, paymentMethod: 'apple-pay' })}
                className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                  formData.paymentMethod === 'apple-pay'
                    ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                    : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                }`}
              >
                Apple / Google Pay
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                  formData.paymentMethod === 'cod'
                    ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                    : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                }`}
              >
                Cash on Delivery
              </button>
            </div>

            {formData.paymentMethod === 'card' && (
              <div className="space-y-4 pt-2">
                <Input
                  label="Card Number"
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                  error={errors.cardNumber}
                  leftIcon={<CreditCard className="w-4 h-4" />}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Expiration Date"
                    placeholder="MM/YY"
                    value={formData.cardExpiry}
                    onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                    error={errors.cardExpiry}
                  />
                  <Input
                    label="Security CVC"
                    placeholder="3 or 4 digits"
                    value={formData.cardCvc}
                    onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                    error={errors.cardCvc}
                  />
                </div>
                <Input
                  label="Cardholder Full Name"
                  value={formData.cardHolder}
                  onChange={(e) => setFormData({ ...formData, cardHolder: e.target.value })}
                />
              </div>
            )}

            {formData.paymentMethod === 'apple-pay' && (
              <div className="p-6 bg-stone-50 rounded-xl text-center space-y-2 border border-stone-200">
                <p className="text-xs text-stone-600 font-medium">
                  Instant biometric checkout will trigger upon clicking &ldquo;Place Order&rdquo;.
                </p>
                <div className="text-[11px] text-stone-400">
                  Touch ID / Face ID encrypted token authentication
                </div>
              </div>
            )}

            {formData.paymentMethod === 'cod' && (
              <div className="p-6 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-1">
                <p className="font-semibold">Cash on Delivery Verification Protocol</p>
                <p className="text-amber-800 leading-relaxed">
                  You will inspect your packaged curation upon courier handover and settle via cash or contactless POS. Please ensure the exact sum of <strong>${finalTotal.toLocaleString()}</strong> is ready upon arrival.
                </p>
              </div>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isSubmitting}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Authorize & Place Order · ${finalTotal.toLocaleString()}
          </Button>
        </form>

        {/* Right: Order Summary Sidebar */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-6 lg:sticky lg:top-24">
          <h2 className="text-lg font-bold font-display text-stone-900 pb-3 border-b border-stone-100">
            Order Review ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} Pieces)
          </h2>

          <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
            {cartItems.map((item, idx) => (
              <div key={idx} className="flex gap-3 text-xs">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded-xl bg-stone-100 border border-stone-200 shrink-0"
                />
                <div className="flex-1">
                  <div className="font-semibold text-stone-900 line-clamp-1">{item.product.name}</div>
                  <div className="text-stone-500 text-[11px] mt-0.5">
                    Qty: {item.quantity} · {item.selectedColor || 'Standard'}
                  </div>
                  <div className="font-semibold text-stone-900 tabular-nums mt-1">
                    ${(item.product.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2.5 pt-4 border-t border-stone-100 text-xs text-stone-600">
            <div className="flex justify-between">
              <span>Items Subtotal</span>
              <span className="font-semibold text-stone-900 tabular-nums">${cartSubtotal.toLocaleString()}</span>
            </div>
            {cartDiscount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Applied Privilege Discount</span>
                <span className="font-bold tabular-nums">-${cartDiscount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Courier Delivery</span>
              <span className="font-semibold text-stone-900 tabular-nums">
                {finalShipping === 0 ? 'Complimentary' : `$${finalShipping}`}
              </span>
            </div>
            <div className="flex justify-between text-base font-bold text-stone-900 pt-3 border-t border-stone-200">
              <span>Final Settlement</span>
              <span className="text-xl tabular-nums">${finalTotal.toLocaleString()}</span>
            </div>
          </div>

          <div className="pt-2 text-[11px] text-stone-400 space-y-1.5 border-t border-stone-100">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Direct dispatch with certificate of calibration</span>
            </div>
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-stone-500" />
              <span>30-day museum-grade return protection</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
