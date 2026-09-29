import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { allRecipes } from '../data/recipes';
import { allArticles } from '../data/articles';
import { allMealPlans } from '../data/mealPlans';
import { recipeCategories } from '../data/categories';
import { allConditionDiets } from '../data/conditionDiets';
import { RecipeCard } from './RecipeCard';
import { ArticleCard } from './ArticleCard';
import { MealPlanCard } from './MealPlanCard';
import { Search, X, SlidersHorizontal, ArrowRight, Sparkles, HeartPulse } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, closeSearch, navigate } = useApp();
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'recipes' | 'articles' | 'mealPlans' | 'ingredients'>('all');
  const [sortBy, setSortBy] = useState<'relevance' | 'rating' | 'quickest' | 'calories'>('relevance');
  const [selectedDiet, setSelectedDiet] = useState<string>('all');

  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSearchOpen]);

  // Suggested popular searches
  const suggestions = [
    'DASH Blood Pressure',
    'Type 2 Diabetes',
    'Wild Salmon',
    'High-Protein',
    'Low-Sodium',
    'Kidney Health',
    'Gut Microbiome',
    '30-Minute Dinner',
  ];

  // Filtering results
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();

    const conditionDiets = allConditionDiets.filter((d) => {
      if (!q) return false;
      return (
        d.conditionName.toLowerCase().includes(q) ||
        d.dietProtocolName.toLowerCase().includes(q) ||
        d.shortBadge.toLowerCase().includes(q) ||
        d.targetAudience.toLowerCase().includes(q) ||
        (q === 'bp' && d.id === 'diet-bp-hypertension')
      );
    });

    let recipes = allRecipes.filter((r) => {
      const matchText =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.shortDescription.toLowerCase().includes(q) ||
        r.cuisine.toLowerCase().includes(q) ||
        r.cookingMethod.toLowerCase().includes(q) ||
        r.mainIngredient.toLowerCase().includes(q) ||
        r.mealType.some((m) => m.toLowerCase().includes(q)) ||
        r.dietaryTags.some((d) => d.toLowerCase().includes(q)) ||
        r.ingredients.some((ing) => ing.name.toLowerCase().includes(q));

      const matchDiet = selectedDiet === 'all' || r.dietaryTags.some((d) => d.toLowerCase() === selectedDiet.toLowerCase());

      return matchText && matchDiet;
    });

    // Sorting recipes
    if (sortBy === 'rating') {
      recipes.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'quickest') {
      recipes.sort((a, b) => a.totalTime - b.totalTime);
    } else if (sortBy === 'calories') {
      recipes.sort((a, b) => a.nutrition.calories - b.nutrition.calories);
    }

    const articles = allArticles.filter((a) => {
      if (!q) return true;
      return (
        a.title.toLowerCase().includes(q) ||
        a.subtitle.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q))
      );
    });

    const mealPlans = allMealPlans.filter((m) => {
      if (!q) return true;
      return (
        m.title.toLowerCase().includes(q) ||
        m.subtitle.toLowerCase().includes(q) ||
        m.dietType.toLowerCase().includes(q) ||
        m.tags.some((t) => t.toLowerCase().includes(q))
      );
    });

    // Ingredient matches
    const ingredientMatches = q
      ? allRecipes.filter((r) =>
          r.ingredients.some((ing) => ing.name.toLowerCase().includes(q))
        )
      : [];

    return {
      conditionDiets,
      recipes,
      articles,
      mealPlans,
      ingredientMatches,
      totalCount: conditionDiets.length + recipes.length + articles.length + mealPlans.length,
    };
  }, [query, sortBy, selectedDiet]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex justify-center p-3 sm:p-6 lg:p-10 animate-fade-in">
      <div className="bg-[#FAF9F5] w-full max-w-5xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 bg-white border-b border-stone-200">
          <div className="flex items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search recipes, ingredients, meal plans, or nutrition science..."
                className="w-full pl-12 pr-10 py-3.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:border-emerald-600 focus:bg-white transition-all"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              onClick={closeSearch}
              className="p-2.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition-colors"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Filter Bar */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-100">
            {/* Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto py-1">
              {[
                { id: 'all', label: `All (${results.totalCount})` },
                { id: 'recipes', label: `Recipes (${results.recipes.length})` },
                { id: 'articles', label: `Articles (${results.articles.length})` },
                { id: 'mealPlans', label: `Meal Plans (${results.mealPlans.length})` },
                { id: 'ingredients', label: `By Ingredient (${results.ingredientMatches.length})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-stone-900 text-white'
                      : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Sorting & Dietary Selectors */}
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5 text-stone-500">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1 text-stone-700 focus:outline-none"
                >
                  <option value="relevance">Relevance</option>
                  <option value="rating">Highest Rated</option>
                  <option value="quickest">Quickest</option>
                  <option value="calories">Lowest Calorie</option>
                </select>
              </div>

              <select
                value={selectedDiet}
                onChange={(e) => setSelectedDiet(e.target.value)}
                className="bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1 text-stone-700 focus:outline-none"
              >
                <option value="all">All Diets</option>
                <option value="high-protein">High-Protein</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="gluten-free">Gluten-Free</option>
                <option value="heart-healthy">Heart-Healthy</option>
              </select>
            </div>
          </div>
        </div>

        {/* Search Results Area */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-8">
          {/* Empty Search Suggestions State */}
          {!query && (
            <div className="py-8 text-center max-w-2xl mx-auto">
              <Sparkles className="w-8 h-8 text-emerald-700 mx-auto mb-3" />
              <h3 className="font-serif text-xl font-semibold text-stone-900">
                What are you inspired to cook today?
              </h3>
              <p className="text-xs text-stone-500 mt-1.5 mb-6">
                Explore our test-kitchen recipes, clinical nutrition essays, and complete 7-day meal plans.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2">
                {suggestions.map((item) => (
                  <button
                    key={item}
                    onClick={() => setQuery(item)}
                    className="px-3.5 py-1.5 text-xs text-stone-700 bg-white border border-stone-200 hover:border-emerald-600 hover:text-emerald-800 rounded-full transition-colors shadow-2xs"
                  >
                    {item}
                  </button>
                ))}
              </div>

              {/* Browse Categories Quick Grid */}
              <div className="mt-10 text-left">
                <span className="text-xs uppercase tracking-wider text-stone-400 font-semibold block mb-3">
                  Popular Categories
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {recipeCategories.slice(0, 8).map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        navigate('category', { slug: cat.slug });
                        closeSearch();
                      }}
                      className="p-3 bg-white border border-stone-200 hover:border-emerald-700 rounded-xl text-left transition-colors group"
                    >
                      <span className="block text-xs font-semibold text-stone-900 group-hover:text-emerald-800">
                        {cat.name}
                      </span>
                      <span className="text-[11px] text-stone-400 mt-0.5 flex items-center gap-0.5">
                        Browse <ArrowRight className="w-3 h-3" />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* If there are results */}
          {query && results.totalCount === 0 && (
            <div className="py-16 text-center">
              <p className="font-serif text-lg text-stone-700">
                No matching results found for "{query}".
              </p>
              <p className="text-xs text-stone-500 mt-1">
                Try searching for broader terms like "salmon", "salad", "gut", or "vegetarian".
              </p>
            </div>
          )}

          {/* Clinical Diets Matches */}
          {results.conditionDiets.length > 0 && (
            <div className="bg-emerald-950 text-white rounded-xl p-4 sm:p-5 space-y-3 border border-emerald-800">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest font-mono">
                <HeartPulse className="w-4 h-4" />
                <span>Clinical Nutrition Protocol Matches</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {results.conditionDiets.map((diet) => (
                  <button
                    key={diet.id}
                    onClick={() => {
                      navigate('health-diets', { slug: diet.slug });
                      closeSearch();
                    }}
                    className="p-3 bg-emerald-900/60 hover:bg-emerald-900 border border-emerald-700/60 rounded-lg text-left transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <span className="text-[10px] font-mono uppercase text-emerald-400 block">{diet.conditionName}</span>
                      <span className="font-serif text-sm font-semibold text-white group-hover:text-emerald-200">{diet.dietProtocolName}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Recipes Section */}
          {(activeTab === 'all' || activeTab === 'recipes') && results.recipes.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-xl font-semibold text-stone-900">
                  Recipes ({results.recipes.length})
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {results.recipes.slice(0, 6).map((recipe) => (
                  <div key={recipe.id} onClick={closeSearch}>
                    <RecipeCard recipe={recipe} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Articles Section */}
          {(activeTab === 'all' || activeTab === 'articles') && results.articles.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-xl font-semibold text-stone-900">
                  Articles & Guides ({results.articles.length})
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {results.articles.slice(0, 6).map((article) => (
                  <div key={article.id} onClick={closeSearch}>
                    <ArticleCard article={article} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Meal Plans Section */}
          {(activeTab === 'all' || activeTab === 'mealPlans') && results.mealPlans.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-xl font-semibold text-stone-900">
                  7-Day Meal Plans ({results.mealPlans.length})
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {results.mealPlans.slice(0, 3).map((plan) => (
                  <div key={plan.id} onClick={closeSearch}>
                    <MealPlanCard plan={plan} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Ingredients Section */}
          {activeTab === 'ingredients' && (
            <div>
              <div className="mb-4">
                <h3 className="font-serif text-xl font-semibold text-stone-900">
                  Recipes containing "{query}" ({results.ingredientMatches.length})
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {results.ingredientMatches.map((recipe) => (
                  <div key={recipe.id} onClick={closeSearch}>
                    <RecipeCard recipe={recipe} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
