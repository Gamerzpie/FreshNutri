import React from 'react';
import { useApp } from '../context/AppContext';
import { lifestyleCategories } from '../data/categories';
import { allArticles } from '../data/articles';
import { ArticleCard } from '../components/ArticleCard';
import { ArrowRight, Compass, Sun, Moon, Heart } from 'lucide-react';

export const HealthyLifestyleView: React.FC = () => {
  const { navigate } = useApp();

  const lifestyleArticles = allArticles.filter(
    (a) =>
      a.category === 'Healthy Lifestyle' ||
      a.category === 'Seasonal Food' ||
      a.category === 'Cooking Tips'
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header */}
      <div className="border-b border-stone-200 pb-6">
        <span className="text-xs uppercase tracking-wider text-emerald-800 font-semibold block mb-1">
          Mindful Living
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-stone-900">
          The Healthy Living Journal
        </h1>
        <p className="mt-2 text-stone-600 text-sm max-w-2xl leading-relaxed">
          Culinary rituals, circadian meal timing, restful sleep habits, pantry organization, and sustainable low-waste cooking principles.
        </p>
      </div>

      {/* 10 Lifestyle Categories Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl font-semibold text-stone-900">
            Everyday Rhythms & Mindful Habits
          </h2>
          <span className="text-xs text-stone-500 font-mono">10 Lifestyle Pillars</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {lifestyleCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => navigate('category', { slug: cat.slug })}
              className="p-4 bg-white border border-stone-200 hover:border-emerald-700 rounded-xl text-left transition-all group flex flex-col justify-between min-h-[140px]"
            >
              <div>
                <span className="font-serif text-sm font-semibold text-stone-900 group-hover:text-emerald-800 transition-colors block">
                  {cat.name}
                </span>
                <span className="text-[11px] text-stone-500 line-clamp-3 mt-1.5 leading-relaxed">
                  {cat.description}
                </span>
              </div>
              <span className="text-[11px] font-semibold text-emerald-800 flex items-center gap-1 mt-3">
                Explore Guide <ArrowRight className="w-3 h-3" />
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Lifestyle Articles Grid */}
      <section className="space-y-6 pt-4 border-t border-stone-200">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl font-semibold text-stone-900">
            Recent Editorial Features
          </h2>
          <button
            onClick={() => navigate('articles')}
            className="text-xs font-semibold text-stone-700 hover:text-stone-900 flex items-center gap-1"
          >
            All Articles <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lifestyleArticles.map((art) => (
            <ArticleCard key={art.id} article={art} />
          ))}
        </div>
      </section>
    </div>
  );
};
