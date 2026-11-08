import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../../data/products';

export const CategoryBento: React.FC = () => {
  const categoryTiles = [
    {
      id: 'watches',
      title: 'Mechanical Horology',
      subtitle: 'Grade 5 titanium chronographs & flyer GMT movements',
      image: '/src/assets/images/product_minimal_watch_1794158467476.jpg',
      itemCount: '2 Models',
      className: 'lg:col-span-7'
    },
    {
      id: 'leather',
      title: 'Tuscan Leather Goods',
      subtitle: 'Full-grain vegetable-tanned weekender duffles & cardfolds',
      image: '/src/assets/images/product_leather_bag_1794158467710.jpg',
      itemCount: '3 Curations',
      className: 'lg:col-span-5'
    },
    {
      id: 'audio',
      title: 'Studio Acoustics',
      subtitle: 'Beryllium planar monitors & architectural soundbars',
      image: '/src/assets/images/product_audio_headphones_1794158468186.jpg',
      itemCount: '2 Systems',
      className: 'lg:col-span-5'
    },
    {
      id: 'apparel',
      title: 'Atelier Apparel',
      subtitle: 'Double-faced virgin merino wool & Normandy flax linen',
      image: '/src/assets/images/category_apparel_minimal_1794158469006.jpg',
      itemCount: '2 Silhouettes',
      className: 'lg:col-span-7'
    }
  ];

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-stone-500 block mb-2">
            Curated Disciplines
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-stone-900 tracking-tight">
            Explore by Material & Medium
          </h2>
        </div>
        <Link
          to="/shop"
          className="text-sm font-semibold text-stone-900 hover:text-stone-600 inline-flex items-center gap-1.5 transition-colors whitespace-nowrap"
        >
          View All Departments <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {categoryTiles.map((tile) => (
          <Link
            key={tile.id}
            to={`/shop?category=${tile.id}`}
            className={`group relative rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] ${tile.className}`}
          >
            <img
              src={tile.image}
              alt={tile.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/30 to-transparent" />

            {/* Content overlay */}
            <div className="absolute inset-x-6 bottom-6 flex items-end justify-between">
              <div>
                <span className="text-[11px] font-medium text-stone-300 uppercase tracking-wider block mb-1">
                  {tile.itemCount}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-white group-hover:translate-x-1 transition-transform duration-200">
                  {tile.title}
                </h3>
                <p className="text-xs text-stone-300 max-w-sm mt-1 line-clamp-1">
                  {tile.subtitle}
                </p>
              </div>

              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-stone-900 transition-all duration-300 shrink-0 shadow-xs">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
