import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { allArticles } from '../data/articles';
import { ArticleCard } from '../components/ArticleCard';
import { ArticleCategory } from '../types';
import { setPageSEO } from '../utils/seo';
import { Search, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';

export const ArticleListingView: React.FC = () => {
  const { routeParams, customArticles } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>(
    routeParams.sub || 'all'
  );
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 9;

  // Set document title and rich editorial SEO
  useEffect(() => {
    setPageSEO({
      title: 'Nutrition & Healthy Eating Articles | FreshNutri Magazine',
      description: 'Evidence-based nutrition guides, whole-food cooking techniques, and clinical dietitian articles. The verified editorial alternative to EatingWell and Food52.',
      keywords: 'nutrition articles, healthy eating guide, evidence based diet, cooking tips, eatingwell alternative, whole food nutrition magazine',
      canonicalPath: '/#/articles',
      ogType: 'website',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Nutrition & Healthy Eating Articles | FreshNutri Magazine',
        description: 'Evidence-based nutrition guides and whole-food cooking techniques.',
        url: `${window.location.origin}/#/articles`,
      },
    });
  }, []);

  // Combine standard and custom articles
  const allAvailableArticles = useMemo(() => {
    return [...allArticles, ...customArticles];
  }, [customArticles]);

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

  // Reset to page 1 on filter or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, search]);

  const filteredArticles = useMemo(() => {
    return allAvailableArticles.filter((art) => {
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
  }, [allAvailableArticles, selectedCategory, search]);

  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / itemsPerPage));
  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredArticles.slice(start, start + itemsPerPage);
  }, [filteredArticles, currentPage, itemsPerPage]);

  const handlePageChange = (pg: number) => {
    setCurrentPage(pg);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const leadArticle = currentPage === 1 ? paginatedArticles[0] : null;
  const secondaryArticles = currentPage === 1 ? paginatedArticles.slice(1) : paginatedArticles;

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

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
            selectedCategory === 'all'
              ? 'bg-stone-900 text-white'
              : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
          }`}
        >
          All Topics ({allAvailableArticles.length})
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

      {/* Lead Article Feature (Page 1 only) */}
      {leadArticle && (
        <section>
          <ArticleCard article={leadArticle} variant="lead" />
        </section>
      )}

      {/* Remaining Articles Grid */}
      {secondaryArticles.length > 0 ? (
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-stone-200 pb-2">
            <h2 className="font-serif text-2xl font-semibold text-stone-900">
              {currentPage === 1 ? 'More Editorial Articles' : `Articles (Page ${currentPage} of ${totalPages})`}
            </h2>
            <span className="text-xs text-stone-500 font-mono">
              Showing {(currentPage - 1) * itemsPerPage + 1}–
              {Math.min(currentPage * itemsPerPage, filteredArticles.length)} of {filteredArticles.length}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {secondaryArticles.map((art) => (
              <ArticleCard key={art.id} article={art} />
            ))}
          </div>

          {/* Numbered Pagination Bar */}
          {totalPages > 1 && (
            <div className="pt-4 flex items-center justify-between border-t border-stone-200">
              <span className="text-xs text-stone-500 font-mono">
                Page {currentPage} of {totalPages}
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage <= 1}
                  className="px-3 py-1.5 rounded-lg border border-stone-300 text-xs font-semibold flex items-center gap-1 transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-stone-100 text-stone-700"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Prev</span>
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                  <button
                    key={pg}
                    onClick={() => handlePageChange(pg)}
                    className={`w-8 h-8 rounded-lg text-xs font-mono font-semibold transition-all ${
                      pg === currentPage
                        ? 'bg-stone-900 text-white'
                        : 'bg-white border border-stone-200 hover:bg-stone-100 text-stone-700'
                    }`}
                  >
                    {pg}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                  className="px-3 py-1.5 rounded-lg border border-stone-300 text-xs font-semibold flex items-center gap-1 transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-stone-100 text-stone-700"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
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
