import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, ArrowUpDown } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { FilterState, SortOption, Product } from '../types';
import { ProductGrid } from '../components/product/ProductGrid';
import { FilterSidebar } from '../components/product/FilterSidebar';
import { SortDropdown } from '../components/product/SortDropdown';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Button } from '../components/common/Button';

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [displayedCount, setDisplayedCount] = useState(9);

  // Initialize filters from URL query params
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';
  const initialSort = (searchParams.get('sort') as SortOption) || 'featured';

  const [sortOption, setSortOption] = useState<SortOption>(initialSort);
  const [filters, setFilters] = useState<FilterState>({
    category: initialCategory,
    brand: [],
    priceRange: [50, 2500],
    rating: null,
    inStockOnly: false,
    searchQuery: initialSearch
  });

  // Keep state in sync with URL changes
  useEffect(() => {
    const cat = searchParams.get('category') || 'all';
    const s = searchParams.get('search') || '';
    const sort = (searchParams.get('sort') as SortOption) || 'featured';
    setFilters((prev) => ({
      ...prev,
      category: cat,
      searchQuery: s
    }));
    setSortOption(sort);
  }, [searchParams]);

  const handleFilterChange = (updated: Partial<FilterState>) => {
    setFilters((prev) => {
      const next = { ...prev, ...updated };
      // Update URL search params
      const params = new URLSearchParams(searchParams);
      if (updated.category) {
        if (updated.category === 'all') params.delete('category');
        else params.set('category', updated.category);
      }
      if (updated.searchQuery !== undefined) {
        if (!updated.searchQuery) params.delete('search');
        else params.set('search', updated.searchQuery);
      }
      setSearchParams(params, { replace: true });
      return next;
    });
  };

  const handleResetFilters = () => {
    setFilters({
      category: 'all',
      brand: [],
      priceRange: [50, 2500],
      rating: null,
      inStockOnly: false,
      searchQuery: ''
    });
    setSearchParams({}, { replace: true });
  };

  // Filter & Sort Logic
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Search query
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Category
    if (filters.category !== 'all') {
      result = result.filter((p) => p.category === filters.category);
    }

    // Brands
    if (filters.brand.length > 0) {
      result = result.filter((p) => filters.brand.includes(p.brand));
    }

    // Price range
    result = result.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Rating
    if (filters.rating) {
      result = result.filter((p) => p.rating >= filters.rating!);
    }

    // In stock
    if (filters.inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    // Sorting
    switch (sortOption) {
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        break;
    }

    return result;
  }, [filters, sortOption]);

  const activeCategoryObject = CATEGORIES.find((c) => c.id === filters.category);
  const currentCategoryTitle = activeCategoryObject ? activeCategoryObject.name : 'All Curations';

  const visibleProducts = filteredAndSortedProducts.slice(0, displayedCount);
  const hasMore = displayedCount < filteredAndSortedProducts.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumb items={[{ label: 'Store', path: '/shop' }, { label: currentCategoryTitle }]} className="mb-6" />

      {/* Header with Title & Summary */}
      <div className="border-b border-stone-200 pb-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-stone-500 block mb-1">
              Atelier Catalog
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold font-display text-stone-900 tracking-tight">
              {currentCategoryTitle}
            </h1>
            <p className="text-sm text-stone-600 mt-2 max-w-xl">
              {activeCategoryObject?.description || 'Curated collection of architecturally refined design objects.'}
            </p>
          </div>

          <div className="text-xs font-medium text-stone-500 tabular-nums">
            Showing <strong className="text-stone-900 font-semibold">{visibleProducts.length}</strong> of{' '}
            <strong className="text-stone-900 font-semibold">{filteredAndSortedProducts.length}</strong> curated items
          </div>
        </div>

        {/* Active search filter prompt if any */}
        {filters.searchQuery && (
          <div className="flex items-center gap-2 mt-4 text-xs bg-stone-100 py-1.5 px-3 rounded-lg w-fit text-stone-800">
            <span>Filtering for query &ldquo;<strong>{filters.searchQuery}</strong>&rdquo;</span>
            <button
              type="button"
              onClick={() => handleFilterChange({ searchQuery: '' })}
              className="text-stone-500 hover:text-stone-900 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Main Catalog Layout */}
      <div className="flex gap-8 items-start">
        {/* Desktop Filter Sidebar */}
        <FilterSidebar
          filters={filters}
          onChange={handleFilterChange}
          onReset={handleResetFilters}
        />

        {/* Product Catalog Column */}
        <div className="flex-1 w-full">
          {/* Controls Bar: Mobile filter button + Sort selector */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-stone-100">
            <button
              type="button"
              onClick={() => setIsMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3.5 py-2 text-xs font-semibold border border-stone-300 rounded-xl bg-white hover:bg-stone-50 cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-stone-700" />
              <span>Filters ({filters.brand.length + (filters.category !== 'all' ? 1 : 0) + (filters.rating ? 1 : 0)})</span>
            </button>

            <div className="ml-auto">
              <SortDropdown value={sortOption} onChange={(val) => setSortOption(val)} />
            </div>
          </div>

          {/* Product Grid */}
          <ProductGrid
            products={visibleProducts}
            onResetFilters={handleResetFilters}
            columns={3}
          />

          {/* Load More Button if applicable */}
          {hasMore && (
            <div className="text-center mt-12 pt-6 border-t border-stone-200">
              <Button
                variant="outline"
                size="md"
                onClick={() => setDisplayedCount((c) => c + 6)}
              >
                Load Remaining Curations ({filteredAndSortedProducts.length - displayedCount} more)
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Modal Drawer */}
      <FilterSidebar
        filters={filters}
        onChange={handleFilterChange}
        onReset={handleResetFilters}
        isMobileOpen={isMobileFiltersOpen}
        onMobileClose={() => setIsMobileFiltersOpen(false)}
      />
    </div>
  );
};
