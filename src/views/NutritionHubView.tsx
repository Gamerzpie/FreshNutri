import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { nutritionCategories } from '../data/categories';
import { allArticles } from '../data/articles';
import { allRecipes } from '../data/recipes';
import { ArticleCard } from '../components/ArticleCard';
import { RecipeCard } from '../components/RecipeCard';
import { setPageSEO } from '../utils/seo';
import { ArrowRight, ShieldCheck, HeartPulse, Sparkles, BookOpen } from 'lucide-react';

export const NutritionHubView: React.FC = () => {
  const { navigate } = useApp();

  useEffect(() => {
    setPageSEO({
      title: 'Evidence-Based Nutrition Science & Diet Guides | FreshNutri',
      description: 'Rigorous dietary reporting reviewed by registered dietitians. Translating clinical randomized trials into practical daily meals and healthy protocols.',
      keywords: 'nutrition science, evidence based nutrition, clinical diet protocols, dietitian approved guides, eatingwell alternative, food as medicine',
      canonicalPath: '/#/nutrition',
      ogType: 'website',
    });
  }, []);

  const nutritionArticles = allArticles.filter(
    (a) =>
      a.category === 'Nutrition' ||
      a.category === 'Healthy Eating' ||
      a.category === 'Expert Advice'
  );

  const nutrientDenseRecipes = allRecipes.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Editorial Header */}
      <div className="border-b border-stone-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-emerald-800 font-semibold block mb-1">
            Clinical Nutrition & Research
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-stone-900">
            Evidence-Based Nutrition Science
          </h1>
          <p className="mt-2 text-stone-600 text-sm max-w-2xl leading-relaxed">
            Rigorous dietary reporting reviewed by registered dietitians and medical physicians. Translating randomized controlled trials into vibrant everyday meals.
          </p>
        </div>

        <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl flex items-center gap-2.5 text-xs text-emerald-950 font-medium">
          <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
          <span>Reviewed by Medical Advisory Board</span>
        </div>
      </div>

      {/* Clinical Diets & Disease Protocols Spotlight Card */}
      <section className="bg-gradient-to-br from-emerald-950 to-stone-900 text-white rounded-2xl p-6 sm:p-8 space-y-6 shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest">
              <HeartPulse className="w-4 h-4 text-emerald-400" />
              <span>Clinical Nutrition & Disease Management</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-semibold text-white leading-tight">
              Diets for High Blood Pressure & Chronic Health Conditions
            </h2>
            <p className="text-emerald-100/80 text-sm leading-relaxed">
              Explore 8 rigorous dietary protocols tailored for hypertension (DASH), Type 2 Diabetes, hyperlipidemia, early-stage renal disease (CKD), IBS, and gout—including our interactive blood pressure sodium calculator.
            </p>
          </div>

          <button
            onClick={() => navigate('health-diets', { slug: 'hypertension-dash-diet' })}
            className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-semibold text-xs rounded-xl transition-all flex items-center gap-2 self-start lg:self-center shrink-0 shadow-sm"
          >
            <span>Explore DASH & Clinical Protocols</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-emerald-900/60">
          <button
            onClick={() => navigate('health-diets', { slug: 'hypertension-dash-diet' })}
            className="p-3 bg-emerald-900/40 hover:bg-emerald-900/80 border border-emerald-800 rounded-xl text-left transition-colors"
          >
            <span className="text-[10px] uppercase font-mono text-emerald-400 block">Hypertension</span>
            <span className="font-serif text-xs font-semibold text-white">DASH Protocol</span>
          </button>
          <button
            onClick={() => navigate('health-diets', { slug: 'type-2-diabetes-blood-sugar' })}
            className="p-3 bg-emerald-900/40 hover:bg-emerald-900/80 border border-emerald-800 rounded-xl text-left transition-colors"
          >
            <span className="text-[10px] uppercase font-mono text-emerald-400 block">Type 2 Diabetes</span>
            <span className="font-serif text-xs font-semibold text-white">Glycemic Balance</span>
          </button>
          <button
            onClick={() => navigate('health-diets', { slug: 'chronic-kidney-disease-renal-nutrition' })}
            className="p-3 bg-emerald-900/40 hover:bg-emerald-900/80 border border-emerald-800 rounded-xl text-left transition-colors"
          >
            <span className="text-[10px] uppercase font-mono text-emerald-400 block">Renal / CKD</span>
            <span className="font-serif text-xs font-semibold text-white">PLADO Protocol</span>
          </button>
          <button
            onClick={() => navigate('health-diets', { slug: 'irritable-bowel-ibs-low-fodmap' })}
            className="p-3 bg-emerald-900/40 hover:bg-emerald-900/80 border border-emerald-800 rounded-xl text-left transition-colors"
          >
            <span className="text-[10px] uppercase font-mono text-emerald-400 block">Gut & IBS</span>
            <span className="font-serif text-xs font-semibold text-white">Low-FODMAP</span>
          </button>
        </div>
      </section>

      {/* 10 Nutrition Science Categories Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl font-semibold text-stone-900">
            Pillars of Human Nutrition
          </h2>
          <span className="text-xs text-stone-500 font-mono">10 Specialized Disciplines</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {nutritionCategories.map((cat) => (
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
                Explore Science <ArrowRight className="w-3 h-3" />
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Lead Nutrition Essays */}
      <section className="space-y-6 pt-4">
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <h2 className="font-serif text-2xl font-semibold text-stone-900">
            Featured Clinical Guides
          </h2>
          <button
            onClick={() => navigate('articles')}
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
          >
            All Articles <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <ArticleCard article={nutritionArticles[0]} variant="lead" />
          </div>
          <div className="lg:col-span-5 flex flex-col gap-5 justify-between">
            {nutritionArticles.slice(1, 3).map((art) => (
              <ArticleCard key={art.id} article={art} variant="horizontal" />
            ))}
          </div>
        </div>
      </section>

      {/* Nutrient-Dense Culinary Pairings */}
      <section className="space-y-6 pt-4 border-t border-stone-200">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider text-emerald-800 font-semibold block mb-0.5">
              Science on the Plate
            </span>
            <h2 className="font-serif text-2xl font-semibold text-stone-900">
              Dietitian-Approved Whole-Food Recipes
            </h2>
          </div>
          <button
            onClick={() => navigate('recipes')}
            className="text-xs font-semibold text-stone-700 hover:text-stone-900 flex items-center gap-1"
          >
            View Recipes <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {nutrientDenseRecipes.map((r) => (
            <RecipeCard key={r.id} recipe={r} />
          ))}
        </div>
      </section>
    </div>
  );
};
