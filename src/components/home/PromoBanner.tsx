import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Award } from 'lucide-react';
import { Button } from '../common/Button';

export const PromoBanner: React.FC = () => {
  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-stone-900 rounded-3xl overflow-hidden text-white shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          {/* Image side */}
          <div className="lg:col-span-6 relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-[480px]">
            <img
              src="/src/assets/images/product_minimal_watch_1794158467476.jpg"
              alt="Atelier Chronograph titanium mechanical watch"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-stone-900/60 hidden lg:block" />
          </div>

          {/* Copy side */}
          <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-stone-400">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Atelier Spotlight</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight leading-tight">
              Grade 5 Titanium. Swiss Caliber. Designed for a Lifetime.
            </h2>

            <p className="text-sm text-stone-300 leading-relaxed font-normal">
              The Atelier Chronograph 01 represents our core philosophy: eliminating visual noise until only mechanical integrity, tactile weight, and flawless legibility remain.
            </p>

            <div className="grid grid-cols-2 gap-4 py-2 border-y border-stone-800 text-xs">
              <div>
                <span className="text-stone-400 block mb-0.5">Weight & Balance</span>
                <span className="font-semibold text-white">41mm Titanium / 78g</span>
              </div>
              <div>
                <span className="text-stone-400 block mb-0.5">Power Reserve</span>
                <span className="font-semibold text-white">40-Hour Automatic</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link to="/product/prod-01">
                <Button variant="secondary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Acquire Piece · $890
                </Button>
              </Link>
              <div className="flex items-center gap-1.5 text-xs text-stone-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>5-Year Atelier Mechanical Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
