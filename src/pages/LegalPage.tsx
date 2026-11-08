import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Breadcrumb } from '../components/common/Breadcrumb';

export const LegalPage: React.FC = () => {
  const location = useLocation();
  const isPrivacy = location.pathname.includes('privacy');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumb
        items={[
          { label: 'Atelier', path: '/about' },
          { label: isPrivacy ? 'Privacy Policy' : 'Terms of Service' }
        ]}
        className="mb-8"
      />

      <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-12 shadow-xs">
        <div className="flex items-center gap-4 border-b border-stone-200 pb-6 mb-8">
          <Link
            to="/privacy"
            className={`text-xs font-semibold uppercase tracking-wider pb-1 border-b-2 transition-colors ${
              isPrivacy
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-400 hover:text-stone-700'
            }`}
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms"
            className={`text-xs font-semibold uppercase tracking-wider pb-1 border-b-2 transition-colors ${
              !isPrivacy
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-400 hover:text-stone-700'
            }`}
          >
            Terms of Service
          </Link>
        </div>

        {isPrivacy ? (
          <article className="prose prose-stone max-w-none text-xs text-stone-600 leading-relaxed space-y-6">
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-stone-900 tracking-tight">
              Privacy & Data Stewardship Protocol
            </h1>
            <p className="text-stone-500">
              Effective Date: November 2026 · Registered under European GDPR & Global Data Protection Standards
            </p>

            <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              1. Fundamental Privacy Philosophy
            </h2>
            <p>
              Kroma Atelier operates under strict data minimization rules. We do not sell, license, or monetize collector browsing data, search queries, or transaction records to third-party advertising networks.
            </p>

            <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              2. Data Collected Solely for Order Fulfillment
            </h2>
            <p>
              When an acquisition is placed, we retain only the necessary contact details, delivery destination coordinates, and serialized piece ownership registrations required to dispatch physical goods, issue calibration certificates, and maintain lifetime warranty logs.
            </p>

            <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              3. Payment Tokenization & Security
            </h2>
            <p>
              Payment credentials are never stored directly on our servers. All credit card processing utilizes PCI-DSS Level 1 tokenized pipelines with end-to-end 256-bit encryption.
            </p>
          </article>
        ) : (
          <article className="prose prose-stone max-w-none text-xs text-stone-600 leading-relaxed space-y-6">
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-stone-900 tracking-tight">
              Terms of Acquisition & Atelier Governance
            </h1>
            <p className="text-stone-500">
              Effective Date: November 2026 · Kroma Atelier International Inc.
            </p>

            <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              1. Authenticity & Individual Serialization
            </h2>
            <p>
              Every manufactured timepiece, sculpted furniture edition, and leather article leaves the studio with an engraved or laser-marked serial number recorded in our master ledger. This certificate is transferable upon change of ownership.
            </p>

            <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              2. Evaluation Period & Returns
            </h2>
            <p>
              Purchasers enjoy a 30-calendar-day evaluation window beginning upon confirmed courier delivery. Returned pieces must remain in original, unblemished condition with documentation and wooden packaging intact.
            </p>

            <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              3. Lifetime Craftsmanship Pledges
            </h2>
            <p>
              We warranty the structural craftsmanship and joinery of our furniture, the stitching of our leather goods, and the mechanical movements of our horology against structural factory defects for the lifetimes of their respective registered owners.
            </p>
          </article>
        )}
      </div>
    </div>
  );
};
