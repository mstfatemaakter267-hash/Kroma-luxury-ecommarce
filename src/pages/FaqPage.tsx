import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Search, ShieldCheck } from 'lucide-react';
import { Breadcrumb } from '../components/common/Breadcrumb';

interface FAQItem {
  q: string;
  a: string;
  category: 'shipping' | 'returns' | 'warranty' | 'care';
}

const FAQS: FAQItem[] = [
  {
    category: 'shipping',
    q: 'How does Kroma handle courier dispatch and international duties?',
    a: 'Every curation is dispatched via carbon-neutral priority express courier (DHL Express or FedEx International Priority) in reinforced museum-grade packaging. For destinations in North America, the European Union, Japan, and the UK, all import duties and taxes are prepaid by Kroma at checkout with zero unexpected customs charges upon delivery.'
  },
  {
    category: 'shipping',
    q: 'What is the qualifying threshold for complimentary delivery?',
    a: 'Orders totaling $300 or greater qualify automatically for complimentary insured express courier worldwide. Orders below this threshold are assessed a flat $25 courier fulfillment fee.'
  },
  {
    category: 'returns',
    q: 'What is the 30-Day Evaluation Period policy?',
    a: 'We believe you must experience an architectural object within your own living space to understand its balance, light reflection, and acoustic response. You have 30 calendar days from delivery to evaluate your piece. If you wish to exchange or return it, our concierge will arrange a complimentary courier pickup at your residence.'
  },
  {
    category: 'returns',
    q: 'Are custom commissions or sized apparel items eligible for return?',
    a: 'Ready-to-wear apparel, leather goods, and standard timepieces are 100% eligible for return or size exchange in original unblemished condition. Bespoke monogrammed items and custom upholstered lounge chairs are individually inspected on a case-by-case evaluation.'
  },
  {
    category: 'warranty',
    q: 'What warranty is provided with Kroma mechanical timepieces?',
    a: 'All Horos Atelier mechanical timepieces include a 5-year comprehensive mechanical movement warranty. If the caliber deviates outside of factory calibration (-4 to +6 seconds/day), our master watchmakers in Geneva or Tokyo will service, regulate, and recalibrate your timepiece with complimentary insured transit.'
  },
  {
    category: 'warranty',
    q: 'How are certificates of authenticity verified?',
    a: 'Each piece is laser-engraved or serialized with an individual registration code matching a physical foil-embossed certificate included in the wooden presentation box. This registration can be accessed and transferred anytime through the Collector Portal.'
  },
  {
    category: 'care',
    q: 'How should Tuscan vegetable-tanned leather be treated over time?',
    a: 'Our leather is drum-steeped in natural chestnut and mimosa tannins without synthetic plastic coatings. It breathes and darkens gently into a warm caramel patina. We recommend an annual buffing with natural beeswax cream. Avoid sustained exposure to driving rain or hot radiators.'
  },
  {
    category: 'care',
    q: 'How do I care for solid white oak and organic boucle textiles?',
    a: 'Solid Danish white oak should be cleaned with a slightly dampened lint-free cloth and treated every few years with organic natural hardwax oil. Bouclé upholstery has been treated with an invisible hydrophobic plant-based barrier; simply blot liquids with a dry cotton towel.'
  }
];

export const FaqPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [search, setSearch] = useState('');

  const filtered = FAQS.filter((f) => {
    const matchesCategory = activeCategory === 'all' || f.category === activeCategory;
    const matchesSearch =
      search.trim() === '' ||
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumb items={[{ label: 'Client Care', path: '/contact' }, { label: 'Frequently Asked Questions' }]} className="mb-8" />

      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-semibold uppercase tracking-widest text-stone-500 block mb-2">
          Atelier Knowledge Base
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold font-display text-stone-900 tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-stone-600 mt-2">
          Clear answers on courier dispatch, evaluation returns, calibrations, and material care.
        </p>

        {/* Search Input */}
        <div className="relative mt-6 max-w-md mx-auto">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions (e.g. shipping, returns, leather, warranty)..."
            className="w-full text-xs bg-white border border-stone-200 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-stone-900"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex justify-center gap-1.5 p-1 bg-stone-100 rounded-xl max-w-md mx-auto mb-10 overflow-x-auto">
        {[
          { id: 'all', label: 'All Topics' },
          { id: 'shipping', label: 'Shipping' },
          { id: 'returns', label: 'Returns' },
          { id: 'warranty', label: 'Warranty' },
          { id: 'care', label: 'Care' }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveCategory(tab.id)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeCategory === tab.id
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-xs text-stone-500 bg-white rounded-2xl border border-stone-200">
            No FAQ entries matched your search query. Try another keyword or reach out directly to the concierge.
          </div>
        ) : (
          filtered.map((item, idx) => {
            const isOpen = expandedIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-stone-200/80 shadow-xs overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setExpandedIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-stone-50/50 transition-colors"
                >
                  <span className="text-sm font-semibold text-stone-900 leading-snug">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-stone-900' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-stone-600 leading-relaxed border-t border-stone-100">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
