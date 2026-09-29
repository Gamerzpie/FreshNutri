import React from 'react';
import { useApp } from '../context/AppContext';
import { allArticles } from '../data/articles';
import { ArticleCard } from '../components/ArticleCard';
import { Newspaper, ArrowRight } from 'lucide-react';

export const FoodNewsView: React.FC = () => {
  const { navigate } = useApp();

  const newsArticles = allArticles.filter(
    (a) =>
      a.category === 'Food News' ||
      a.category === 'Food Trends' ||
      a.tags.includes('Sustainability') ||
      a.tags.includes('Regenerative Farming')
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="border-b border-stone-200 pb-6">
        <span className="text-xs uppercase tracking-wider text-emerald-800 font-semibold block mb-1">
          Industry Reporting
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-stone-900">
          Food News & Sustainable Agriculture
        </h1>
        <p className="mt-2 text-stone-600 text-sm max-w-2xl leading-relaxed">
          In-depth investigations into regenerative soil science, ocean seafood management, regulatory sodium targets, and the modern consumer grocery landscape.
        </p>
      </div>

      {/* Featured Lead News */}
      {newsArticles.length > 0 && (
        <section>
          <ArticleCard article={newsArticles[0]} variant="lead" />
        </section>
      )}

      {/* Grid of news articles */}
      <section className="space-y-6">
        <h2 className="font-serif text-2xl font-semibold text-stone-900 border-b border-stone-200 pb-2">
          Investigative Reporting & Field Notes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsArticles.slice(1).map((art) => (
            <ArticleCard key={art.id} article={art} />
          ))}
        </div>
      </section>
    </div>
  );
};
