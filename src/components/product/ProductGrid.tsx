import React from 'react';
import { motion } from 'motion/react';
import { PackageOpen } from 'lucide-react';
import { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { EmptyState } from '../common/EmptyState';

interface ProductGridProps {
  products: Product[];
  onResetFilters?: () => void;
  columns?: 2 | 3 | 4;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onResetFilters,
  columns = 3
}) => {
  if (products.length === 0) {
    return (
      <EmptyState
        icon={<PackageOpen className="w-8 h-8" />}
        title="No Curations Match Your Filter"
        description="Try adjusting your category, price range, or clearing current active filters to explore our full atelier collection."
        actionLabel={onResetFilters ? 'Reset All Filters' : undefined}
        onAction={onResetFilters}
      />
    );
  }

  const columnClass =
    columns === 4
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      : columns === 2
      ? 'grid-cols-1 sm:grid-cols-2'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

  return (
    <div className={`grid gap-6 ${columnClass}`}>
      {products.map((product, idx) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: Math.min(idx * 0.05, 0.3), ease: [0.16, 1, 0.3, 1] }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </div>
  );
};
