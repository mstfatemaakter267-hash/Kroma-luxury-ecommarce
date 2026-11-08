import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';
import { HERO_IMAGE } from '../../data/products';
import { Button } from '../common/Button';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-stone-100 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-stone-500">
              <Compass className="w-3.5 h-3.5 text-stone-700" />
              <span>Autumn / Winter 2026 Collection</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-stone-900 tracking-tight leading-[1.1] text-balance">
              Design objects crafted to outlive the century.
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl font-normal">
              An architectural curation of titanium mechanical horology, Tuscan vegetable-tanned leatherware, and sculpted solid oak living furniture.
            </p>

            {/* Unboxed trust markers */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-stone-500 pt-1">
              <span>Grade 5 Titanium</span>
              <span className="text-stone-300">·</span>
              <span>Tuscan Vacchetta</span>
              <span className="text-stone-300">·</span>
              <span>Solid Danish White Oak</span>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link to="/shop">
                <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Explore Full Catalog
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg">
                  The Atelier Philosophy
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Hero Image Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[16/10] sm:aspect-[16/11] rounded-3xl overflow-hidden shadow-2xl border border-stone-200/80">
              <img
                src={HERO_IMAGE}
                alt="Nordic Wave Chaise Lounge in sunlit architectural gallery room"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent pointer-events-none" />

              {/* Floating Featured Callout Card */}
              <div className="absolute bottom-5 left-5 right-5 sm:right-auto sm:max-w-xs bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/60">
                <div className="flex items-center justify-between text-[11px] text-stone-500 uppercase tracking-wider mb-1">
                  <span>Featured Centerpiece</span>
                  <span className="text-emerald-700 font-semibold">Available</span>
                </div>
                <div className="text-sm font-semibold text-stone-900">
                  Nordic Wave Chaise Lounge
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100">
                  <span className="text-xs font-bold text-stone-900 tabular-nums">$1,850</span>
                  <Link
                    to="/product/prod-04"
                    className="text-xs font-semibold text-stone-900 hover:text-stone-700 inline-flex items-center gap-1"
                  >
                    View Piece <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
