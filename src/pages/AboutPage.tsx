import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Sparkles, ShieldCheck, Hammer, ArrowRight } from 'lucide-react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Button } from '../components/common/Button';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumb items={[{ label: 'The Atelier' }]} className="mb-8" />

      {/* Hero Header */}
      <div className="max-w-3xl mb-16">
        <span className="text-xs font-semibold uppercase tracking-widest text-stone-500 block mb-2">
          Design Constitution
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold font-display text-stone-900 tracking-tight leading-tight">
          We build objects designed to outlive the century.
        </h1>
        <p className="text-base sm:text-lg text-stone-600 mt-4 leading-relaxed font-normal">
          Founded on the principle that true luxury is not ephemeral novelty, but uncompromising material integrity, ergonomic honesty, and enduring mechanical precision.
        </p>
      </div>

      {/* Editorial Image Showcase */}
      <div className="relative aspect-[21/9] rounded-3xl overflow-hidden mb-20 border border-stone-200">
        <img
          src="/src/assets/images/hero_luxe_living_1794158466677.jpg"
          alt="Kroma Architectural Design Studio"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-stone-900/30" />
        <div className="absolute bottom-6 left-6 text-white text-xs font-mono uppercase tracking-wider">
          Studio 01 · Milan Architectural Workshop
        </div>
      </div>

      {/* Core Principles Grid */}
      <div className="mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-stone-500 block mb-2">
            The Three Tenets
          </span>
          <h2 className="text-3xl font-bold font-display text-stone-900">
            Our Architectural Discipline
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-800">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold font-display text-stone-900">01. Subtractive Elegance</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Every detail that does not contribute to ergonomic comfort, tactile pleasure, or mechanical structural stability is relentlessly removed.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-800">
              <Hammer className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold font-display text-stone-900">02. Honest Materiality</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Grade 5 titanium remains uncoated; Tuscan leather is vegetable-tanned with tree bark; solid Danish oak is finished only in breathable organic oils.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-800">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold font-display text-stone-900">03. Generational Provenance</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Our pieces carry individual serialized registration numbers, calibration certificates, and a pledge of lifetime repairability.
            </p>
          </div>
        </div>
      </div>

      {/* Showrooms & Studios */}
      <div id="sustainability" className="bg-stone-900 rounded-3xl p-8 sm:p-14 text-white shadow-xl">
        <div className="max-w-2xl mb-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-stone-400 block mb-2">
            Physical Ateliers
          </span>
          <h2 className="text-3xl font-bold font-display text-white">
            Experience the Pieces in Person
          </h2>
          <p className="text-sm text-stone-300 mt-2 leading-relaxed">
            By private consultation only. Handle the weight of our chronographs and test our architectural seating in curated, acoustically tuned gallery spaces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-stone-800 text-xs">
          <div>
            <h4 className="font-semibold text-white text-sm mb-1">Milan Studio</h4>
            <p className="text-stone-400">Via San Marco 42<br />Brera Design District<br />20121 Milano, Italy</p>
          </div>
          <div>
            <h4 className="font-semibold text-white text-sm mb-1">Tokyo Gallery</h4>
            <p className="text-stone-400">5-7-22 Minami-Aoyama<br />Minato City<br />Tokyo 107-0062, Japan</p>
          </div>
          <div>
            <h4 className="font-semibold text-white text-sm mb-1">Copenhagen Workshop</h4>
            <p className="text-stone-400">Bredgade 68<br />Indre By<br />1260 København K, Denmark</p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-stone-800 flex justify-between items-center">
          <span className="text-xs text-stone-400">Interested in private acquisition or custom commissions?</span>
          <Link to="/contact">
            <Button variant="secondary" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Reserve Consultation
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
