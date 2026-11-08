import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight } from 'lucide-react';
import { Button } from '../components/common/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <div className="w-16 h-16 rounded-3xl bg-stone-100 flex items-center justify-center text-stone-700 mx-auto mb-6">
        <Compass className="w-8 h-8" />
      </div>
      <span className="text-xs font-semibold uppercase tracking-widest text-stone-400 block mb-2">
        Error 404 · Uncharted Route
      </span>
      <h1 className="text-3xl sm:text-4xl font-bold font-display text-stone-900 tracking-tight mb-3">
        Page Not Located
      </h1>
      <p className="text-sm text-stone-600 leading-relaxed mb-8">
        The curation or archive pathway you were seeking may have moved to a new collection or retired from circulation.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link to="/">
          <Button variant="primary" size="md">
            Return to Storefront
          </Button>
        </Link>
        <Link to="/shop">
          <Button variant="outline" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Browse Active Catalog
          </Button>
        </Link>
      </div>
    </div>
  );
};
