import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  Star,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Share2
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product, ProductReview } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { RatingStars } from '../components/common/RatingStars';
import { Button } from '../components/common/Button';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { ProductCard } from '../components/product/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const product = PRODUCTS.find((p) => p.id === id);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'shipping' | 'care'>('specs');

  // Customer reviews state
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]?.name || '');
      setSelectedSize(product.sizes?.[0] || '');
      setQuantity(1);
      setSelectedImageIndex(0);
      setReviews(product.reviews || []);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold font-display text-stone-900 mb-2">Curated Item Not Found</h2>
        <p className="text-stone-500 mb-6">The requested piece may have retired or moved to the private archive.</p>
        <Link to="/shop">
          <Button variant="primary">Return to Catalog</Button>
        </Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize, true);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedSize, false);
    navigate('/checkout');
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: product.name,
          text: product.tagline,
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        showToast('Product link copied to clipboard', 'info');
      }
    } catch {
      // User cancelled or clipboard fallback
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) {
      showToast('Please provide your name and review appraisal', 'error');
      return;
    }

    const newRev: ProductReview = {
      id: `rev-${Date.now()}`,
      userName: newReviewAuthor.trim(),
      rating: newReviewRating,
      date: 'Just now',
      title: newReviewTitle.trim() || 'Exceptional craftsmanship',
      comment: newReviewComment.trim(),
      verified: true
    };

    setReviews([newRev, ...reviews]);
    setNewReviewAuthor('');
    setNewReviewTitle('');
    setNewReviewComment('');
    setIsReviewFormOpen(false);
    showToast('Your appraisal has been published', 'success');
  };

  // Related products from same category or brand
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.brand === product.brand)
  ).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: 'Catalog', path: '/shop' },
          { label: product.category.toUpperCase(), path: `/shop?category=${product.category}` },
          { label: product.name }
        ]}
        className="mb-8"
      />

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
        {/* Gallery Column (Sticky left on desktop) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Hero Photo Container */}
          <div className="relative aspect-[4/3] bg-stone-100 rounded-3xl overflow-hidden border border-stone-200/80 shadow-xs">
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-300"
            />
            {product.isNew && (
              <span className="absolute top-4 left-4 text-xs font-semibold uppercase tracking-wider text-stone-900 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-md shadow-xs">
                New Atelier Edition
              </span>
            )}
            <button
              type="button"
              onClick={handleShare}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-stone-900 shadow-xs transition-colors cursor-pointer"
              title="Share piece"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Thumbnails row */}
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedImageIndex(i)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer bg-stone-100 ${
                    selectedImageIndex === i
                      ? 'border-stone-900 ring-2 ring-stone-900/10'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Contiguous Purchase Module Column (Sticky right on desktop) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          <div>
            <div className="flex items-center justify-between gap-2 text-xs font-semibold text-stone-500 uppercase tracking-widest mb-1.5">
              <span>{product.brand}</span>
              <span className="text-emerald-700 font-semibold lowercase">
                {product.stockCount} left in atelier
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold font-display text-stone-900 leading-tight">
              {product.name}
            </h1>

            <p className="text-sm text-stone-500 mt-1 leading-relaxed">
              {product.tagline}
            </p>

            <div className="flex items-center gap-3 mt-3">
              <RatingStars rating={product.rating} reviewCount={reviews.length || product.reviewCount} />
              <span className="text-stone-300">·</span>
              <a href="#reviews" className="text-xs text-stone-500 hover:text-stone-900 underline underline-offset-2">
                Read Appraisals
              </a>
            </div>

            {/* Price Box */}
            <div className="flex items-baseline gap-3 mt-4 pt-4 border-t border-stone-200">
              <span className="text-3xl font-bold text-stone-900 tabular-nums">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-base text-stone-400 line-through tabular-nums">
                  ${product.originalPrice}
                </span>
              )}
              {product.originalPrice && (
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                  Save ${product.originalPrice - product.price}
                </span>
              )}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            {product.description}
          </p>

          {/* Color Finish Picker */}
          {product.colors.length > 0 && (
            <div>
              <div className="flex justify-between text-xs mb-2.5">
                <span className="font-semibold text-stone-800 uppercase tracking-wider">
                  Finish / Material:
                </span>
                <span className="font-medium text-stone-600">{selectedColor}</span>
              </div>
              <div className="flex items-center gap-2.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedColor(c.name)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                      selectedColor === c.name
                        ? 'ring-2 ring-stone-900 ring-offset-2 scale-105'
                        : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  >
                    {selectedColor === c.name && (
                      <Check
                        className={`w-4 h-4 ${
                          c.hex === '#FFFFFF' || c.hex === '#F5F5F0' || c.hex === '#EBEAE5'
                            ? 'text-stone-900'
                            : 'text-white'
                        }`}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Picker */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <div className="flex justify-between text-xs mb-2.5">
                <span className="font-semibold text-stone-800 uppercase tracking-wider">
                  Select Size:
                </span>
                <span className="font-medium text-stone-600">{selectedSize}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSize(s)}
                    className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                      selectedSize === s
                        ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                        : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Stepper */}
          <div className="flex items-center gap-4 pt-1">
            <span className="text-xs font-semibold text-stone-800 uppercase tracking-wider">
              Quantity:
            </span>
            <div className="flex items-center border border-stone-300 rounded-xl bg-stone-50 overflow-hidden">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-1.5 text-xs text-stone-700 hover:bg-stone-200 cursor-pointer"
              >
                -
              </button>
              <span className="px-3 text-xs font-semibold tabular-nums text-stone-900">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
                className="px-3 py-1.5 text-xs text-stone-700 hover:bg-stone-200 cursor-pointer"
              >
                +
              </button>
            </div>
            <span className="text-xs text-stone-400">
              Total: ${(product.price * quantity).toLocaleString()}
            </span>
          </div>

          {/* Primary Action Buttons */}
          <div className="space-y-2.5 pt-4 border-t border-stone-200">
            <div className="flex gap-3">
              <Button
                onClick={handleAddToCart}
                variant="primary"
                size="lg"
                fullWidth
                leftIcon={<ShoppingBag className="w-4 h-4" />}
              >
                Add to Bag · ${(product.price * quantity).toLocaleString()}
              </Button>

              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className={`p-3.5 rounded-xl border transition-colors cursor-pointer shrink-0 ${
                  isFavorited
                    ? 'border-rose-300 bg-rose-50 text-rose-600'
                    : 'border-stone-200 text-stone-600 hover:bg-stone-100'
                }`}
                aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-rose-600' : ''}`} />
              </button>
            </div>

            <Button
              onClick={handleBuyNow}
              variant="outline"
              size="md"
              fullWidth
            >
              Instant Express Checkout
            </Button>
          </div>

          {/* Trust Value Badges */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-stone-100 text-stone-600 text-[11px]">
            <div className="flex flex-col items-center text-center p-2 rounded-lg bg-stone-50">
              <Truck className="w-4 h-4 text-stone-700 mb-1" />
              <span>Complimentary insured courier</span>
            </div>
            <div className="flex flex-col items-center text-center p-2 rounded-lg bg-stone-50">
              <RotateCcw className="w-4 h-4 text-stone-700 mb-1" />
              <span>30-day effortless evaluation</span>
            </div>
            <div className="flex flex-col items-center text-center p-2 rounded-lg bg-stone-50">
              <ShieldCheck className="w-4 h-4 text-stone-700 mb-1" />
              <span>Lifetime atelier warranty</span>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications & Craftsmanship Tabs */}
      <div className="border-t border-stone-200 pt-12 mb-20">
        <div className="flex items-center gap-6 border-b border-stone-200 mb-8">
          <button
            type="button"
            onClick={() => setActiveTab('specs')}
            className={`pb-3 text-sm font-semibold transition-colors cursor-pointer border-b-2 ${
              activeTab === 'specs'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-400 hover:text-stone-700'
            }`}
          >
            Atelier Specifications
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('shipping')}
            className={`pb-3 text-sm font-semibold transition-colors cursor-pointer border-b-2 ${
              activeTab === 'shipping'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-400 hover:text-stone-700'
            }`}
          >
            Fulfillment & Delivery
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('care')}
            className={`pb-3 text-sm font-semibold transition-colors cursor-pointer border-b-2 ${
              activeTab === 'care'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-400 hover:text-stone-700'
            }`}
          >
            Material Care & Longevity
          </button>
        </div>

        {activeTab === 'specs' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-base font-semibold text-stone-900 mb-4">Technical Breakdown</h3>
              <dl className="divide-y divide-stone-100 text-xs">
                {Object.entries(product.specifications).map(([key, val]) => (
                  <div key={key} className="py-2.5 flex justify-between">
                    <dt className="text-stone-500 font-medium">{key}</dt>
                    <dd className="text-stone-900 font-semibold text-right">{val}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h3 className="text-base font-semibold text-stone-900 mb-4">Key Distinctions</h3>
              <ul className="space-y-2.5 text-xs text-stone-600">
                {product.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-stone-900 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'shipping' && (
          <div className="max-w-2xl space-y-4 text-xs text-stone-600 leading-relaxed">
            <h3 className="text-base font-semibold text-stone-900">White-Glove Fulfillment Protocol</h3>
            <p>
              Each curation is hand-inspected, serialized, and sealed in museum-grade protective packaging at our central dispatch atelier.
            </p>
            <ul className="space-y-2 pt-2">
              <li><strong>Domestic Delivery:</strong> 1-3 business days via carbon-neutral priority courier.</li>
              <li><strong>International Courier:</strong> 3-5 business days with direct duty and tax calculation.</li>
              <li><strong>Evaluation Window:</strong> 30 calendar days to evaluate the piece in your own home with no restocking penalty.</li>
            </ul>
          </div>
        )}

        {activeTab === 'care' && (
          <div className="max-w-2xl space-y-4 text-xs text-stone-600 leading-relaxed">
            <h3 className="text-base font-semibold text-stone-900">Living Material Preservation</h3>
            <p>
              Our objects are engineered to develop beauty through continuous use. Avoid abrasive chemical solvents or high heat exposure. Natural leathers benefit from an annual buffing with pure beeswax balm; titanium can be gently rinsed with warm demineralized water.
            </p>
          </div>
        )}
      </div>

      {/* Customer Reviews & Appraisals Section */}
      <section id="reviews" className="border-t border-stone-200 pt-12 mb-20 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold font-display text-stone-900 tracking-tight">
              Collector Appraisals ({reviews.length})
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <RatingStars rating={product.rating} reviewCount={reviews.length} />
              <span className="text-xs text-stone-500 font-medium">100% verified purchasers</span>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsReviewFormOpen(!isReviewFormOpen)}
          >
            {isReviewFormOpen ? 'Close Form' : 'Submit an Appraisal'}
          </Button>
        </div>

        {/* Review Form Drawer/Accordion */}
        {isReviewFormOpen && (
          <form
            onSubmit={handleReviewSubmit}
            className="bg-stone-100 p-6 rounded-2xl border border-stone-200 mb-8 max-w-xl space-y-4"
          >
            <h3 className="text-sm font-semibold text-stone-900">Record Your Appraisal</h3>
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                Your Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewReviewRating(star)}
                    className="p-1 cursor-pointer"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        star <= newReviewRating
                          ? 'fill-amber-500 text-amber-500'
                          : 'text-stone-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  placeholder="e.g. Marcus Vance"
                  className="w-full text-xs bg-white border border-stone-300 rounded-xl px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                  Summary Headline
                </label>
                <input
                  type="text"
                  value={newReviewTitle}
                  onChange={(e) => setNewReviewTitle(e.target.value)}
                  placeholder="e.g. Masterclass in titanium"
                  className="w-full text-xs bg-white border border-stone-300 rounded-xl px-3 py-2"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                Appraisal Details
              </label>
              <textarea
                required
                rows={3}
                value={newReviewComment}
                onChange={(e) => setNewReviewComment(e.target.value)}
                placeholder="Share your thoughts on the weight, tactile feel, finish, and durability..."
                className="w-full text-xs bg-white border border-stone-300 rounded-xl px-3 py-2"
              />
            </div>

            <Button type="submit" variant="primary" size="sm">
              Publish Appraisal
            </Button>
          </form>
        )}

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.length === 0 ? (
            <div className="p-8 text-center text-xs text-stone-500 bg-stone-50 rounded-2xl">
              Be the first collector to publish an appraisal for this curation.
            </div>
          ) : (
            reviews.map((rev) => (
              <div key={rev.id} className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-stone-900">{rev.userName}</span>
                    {rev.verified && (
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        Verified Acquisition
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-stone-400">{rev.date}</span>
                </div>
                <div className="flex items-center gap-1 text-amber-500 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < rev.rating ? 'fill-amber-500' : 'text-stone-200'
                      }`}
                    />
                  ))}
                </div>
                {rev.title && (
                  <h4 className="text-xs font-semibold text-stone-800 mb-1">{rev.title}</h4>
                )}
                <p className="text-xs text-stone-600 leading-relaxed">{rev.comment}</p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-stone-200 pt-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-stone-500 block mb-1">
                Complementary Curations
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-900 tracking-tight">
                Pairs Architecturally With
              </h2>
            </div>
            <Link to="/shop" className="text-xs font-semibold text-stone-900 hover:text-stone-600 inline-flex items-center gap-1">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
