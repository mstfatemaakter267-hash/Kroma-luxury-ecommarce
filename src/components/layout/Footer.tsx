import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, CheckCircle2, Download } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { showToast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please provide a valid email address', 'error');
      return;
    }
    setIsSubscribed(true);
    showToast('Subscribed to the Kroma Private Gazette', 'success');
    setEmail('');
  };

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Value Proposition Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-stone-800">
          <div className="flex items-start gap-3.5">
            <Truck className="w-5 h-5 text-stone-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-white">Global Express Courier</h3>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Complimentary insured delivery on orders exceeding $300. Carbon-neutral fulfillment.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3.5">
            <RefreshCw className="w-5 h-5 text-stone-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-white">30-Day Evaluation Period</h3>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Experience pieces in your space. Complimentary white-glove return pickups worldwide.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3.5">
            <ShieldCheck className="w-5 h-5 text-stone-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-white">Individually Serialized</h3>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Direct atelier provenance, verified certificates of authenticity, lifetime craftsmanship warranty.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12 border-b border-stone-800">
          {/* Brand & Newsletter Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="text-2xl font-bold font-display text-white tracking-tight inline-block">
              KROMA
            </Link>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              An architectural design atelier curating heirloom timepieces, full-grain leather goods, studio acoustics, and sculptural furniture built to outlive trends.
            </p>

            <div className="pt-2">
              <span className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2">
                Private Gazette & Secret Editions
              </span>
              {isSubscribed ? (
                <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 p-3 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>You are subscribed to private atelier announcements and private sale previews.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 text-xs bg-stone-800 border border-stone-700 rounded-xl px-3.5 py-2.5 text-white placeholder:text-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-400"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-white text-stone-900 hover:bg-stone-100 text-xs font-semibold rounded-xl transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
                  >
                    Join <ArrowRight className="w-3 h-3" />
                  </button>
                </form>
              )}
              <p className="text-[11px] text-stone-500 mt-2">
                Curated monthly digests only. No promotional spam. Unsubscribe at any moment.
              </p>
            </div>
          </div>

          {/* Column 1: Collections */}
          <div>
            <span className="block text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Curations
            </span>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <Link to="/shop" className="hover:text-white transition-colors">
                  Complete Catalog
                </Link>
              </li>
              <li>
                <Link to="/shop?category=watches" className="hover:text-white transition-colors">
                  Titanium Timepieces
                </Link>
              </li>
              <li>
                <Link to="/shop?category=leather" className="hover:text-white transition-colors">
                  Tuscan Leatherware
                </Link>
              </li>
              <li>
                <Link to="/shop?category=audio" className="hover:text-white transition-colors">
                  Studio Acoustics
                </Link>
              </li>
              <li>
                <Link to="/shop?category=furniture" className="hover:text-white transition-colors">
                  Architectural Living
                </Link>
              </li>
              <li>
                <Link to="/shop?category=apparel" className="hover:text-white transition-colors">
                  Virgin Wool Apparel
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Client Services */}
          <div>
            <span className="block text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Client Care
            </span>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Atelier Concierge
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  Delivery & Courier FAQ
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-white transition-colors">
                  Review Shopping Bag
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-white transition-colors">
                  Saved Curations
                </Link>
              </li>
              <li>
                <Link to="/auth" className="hover:text-white transition-colors">
                  Collector Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: The Atelier */}
          <div>
            <span className="block text-xs font-semibold text-white uppercase tracking-wider mb-4">
              The Studio
            </span>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Design Constitution
                </Link>
              </li>
              <li>
                <Link to="/about#sustainability" className="hover:text-white transition-colors">
                  Provenance & Sourcing
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Milan & Kyoto Showrooms
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Kroma Atelier International Inc. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a
              href="/kroma-luxury-ecommerce.zip"
              download="kroma-luxury-ecommerce.zip"
              className="inline-flex items-center gap-1.5 text-stone-300 hover:text-white transition-colors bg-stone-800 hover:bg-stone-700 px-3 py-1.5 rounded-lg font-medium text-[11px]"
              title="Download full project zip archive"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Project .ZIP</span>
            </a>
            <span className="hidden sm:inline text-stone-700">·</span>
            <span className="text-stone-400 font-mono text-[11px]">EUR / USD Multi-Currency</span>
            <span className="hidden sm:inline text-stone-700">·</span>
            <span className="hidden sm:inline">Verified Secure 256-bit SSL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
