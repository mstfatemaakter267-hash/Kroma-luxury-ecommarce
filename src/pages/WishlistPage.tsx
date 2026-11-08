import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { ProductCard } from '../components/product/ProductCard';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { EmptyState } from '../components/common/EmptyState';
import { Button } from '../components/common/Button';

export const WishlistPage: React.FC = () => {
  const navigate = useNavigate();
  const { wishlistProducts, clearWishlist } = useWishlist();
  const { addToCart, setIsCartOpen } = useCart();
  const { showToast } = useToast();

  const handleMoveAllToCart = () => {
    wishlistProducts.forEach((product) => {
      addToCart(product, 1, product.colors[0]?.name, product.sizes?.[0], false);
    });
    showToast(`Moved ${wishlistProducts.length} saved curations to your shopping bag`, 'success');
    setIsCartOpen(true);
  };

  if (wishlistProducts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Breadcrumb items={[{ label: 'Wishlist' }]} className="mb-8" />
        <EmptyState
          icon={<Heart className="w-8 h-8" />}
          title="Your Wishlist is Empty"
          description="Save exceptional design curations, horological instruments, and leathercraft to review or acquire later."
          actionLabel="Explore Collections"
          onAction={() => navigate('/shop')}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumb
        items={[
          { label: 'Store', path: '/shop' },
          { label: 'Saved Curations' }
        ]}
        className="mb-6"
      />

      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 mb-8 border-b border-stone-200 gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-stone-500 block mb-1">
            Private Archive
          </span>
          <h1 className="text-3xl font-bold font-display text-stone-900 tracking-tight">
            Saved Curations ({wishlistProducts.length})
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={handleMoveAllToCart}
            variant="primary"
            size="sm"
            leftIcon={<ShoppingBag className="w-4 h-4" />}
          >
            Move All to Bag
          </Button>
          <button
            type="button"
            onClick={clearWishlist}
            className="text-xs font-semibold text-stone-500 hover:text-rose-600 transition-colors inline-flex items-center gap-1 cursor-pointer px-2 py-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
