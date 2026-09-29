import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { allArticles } from '../data/articles';
import { ArticleCard } from '../components/ArticleCard';
import { ArticleCategory } from '../types';
import { Search, BookOpen } from 'lucide-react';

export const ArticleListingView: React.FC = () => {
  const { routeParams } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>(
    routeParams.sub || 'all'
  );
  const [search, setSearch] = useState('');

  const categories: ArticleCategory[] = [
    'Nutrition',
    'Healthy Eating',
    'Food News',
    'Cooking Tips',
    'Kitchen Tips',
    'Ingredients',
    'Healthy Lifestyle',
    'Meal Planning',
    'Food Trends',
    'Seasonal Food',
    'Expert Advice',
  ];

  const filteredArticles = useMemo(() => {
    return allArticles.filter((art) => {
      if (
        selectedCategory !== 'all' &&
        art.category.toLowerCase() !== selectedCategory.toLowerCase()
      ) {
        return false;
      }
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          art.title.toLowerCase().includes(q) ||
          art.subtitle.toLowerCase().includes(q) ||
          art.tags.some((t) => t.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [selectedCategory, search]);

  const leadArticle = filteredArticles[0];
  const secondaryArticles = filteredArticles.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="border-b border-stone-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-emerald-800 font-semibold block mb-1">
            Editorial Magazine
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-900">
            Health, Nutrition & Culinary Life
          </h1>
          <p className="mt-2 text-stone-600 text-sm max-w-xl">
            Original reporting from our test kitchen chefs, registered dietitians, and food journalists.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles..."
            className="w-full pl-9 pr-3.5 py-2 bg-white border border-stone-200 rounded-lg text-xs text-stone-800 focus:outline-none focus:border-emerald-600"
          />
        </div>
      </div>

      {/* Category Filter Pills (Functional interactive buttons) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
            selectedCategory === 'all'
              ? 'bg-stone-900 text-white'
              : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
          }`}
        >
          All Topics ({allArticles.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat.toLowerCase())}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              selectedCategory === cat.toLowerCase()
                ? 'bg-stone-900 text-white'
                : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Lead Article Feature */}
      {leadArticle && (
        <section>
          <ArticleCard article={leadArticle} variant="lead" />
        </section>
      )}

      {/* Remaining Articles Grid */}
      {secondaryArticles.length > 0 ? (
        <section className="space-y-6">
          <h2 className="font-serif text-2xl font-semibold text-stone-900 border-b border-stone-200 pb-2">
            More Editorial Articles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {secondaryArticles.map((art) => (
              <ArticleCard key={art.id} article={art} />
            ))}
          </div>
        </section>
      ) : (
        !leadArticle && (
          <div className="py-16 text-center bg-white rounded-xl border border-stone-200 p-8">
            <BookOpen className="w-8 h-8 text-stone-400 mx-auto mb-2" />
            <p className="font-serif text-lg text-stone-800">No articles match your criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearch('');
              }}
              className="mt-4 px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        )
      )}
    </div>
  );
};
