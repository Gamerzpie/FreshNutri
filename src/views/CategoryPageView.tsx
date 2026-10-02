import React, { useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { recipeCategories, nutritionCategories, lifestyleCategories } from '../data/categories';
import { allRecipes } from '../data/recipes';
import { allArticles } from '../data/articles';
import { RecipeCard } from '../components/RecipeCard';
import { ArticleCard } from '../components/ArticleCard';
import { setPageSEO } from '../utils/seo';
import { ArrowLeft, ArrowRight, Compass } from 'lucide-react';

export const CategoryPageView: React.FC = () => {
  const { routeParams, goBack, navigate } = useApp();
  const slug = routeParams.slug || 'breakfast';

  // Find category in any of the three groups
  const category = useMemo(() => {
    const all = [...recipeCategories, ...nutritionCategories, ...lifestyleCategories];
    return all.find((c) => c.slug === slug || c.id === slug) || recipeCategories[0];
  }, [slug]);

  // Sync title and SEO
  useEffect(() => {
    if (category) {
      setPageSEO({
        title: `${category.name} Recipes & Articles | FreshNutri`,
        description: `${category.description} Explore dietitian-tested recipes and evidence-based nutritional guidance for ${category.name}.`,
        keywords: `${category.name}, ${category.name} recipes, healthy ${category.name}, easy whole food meals, FreshNutri category`,
        canonicalPath: `/#/category/${category.slug}`,
        ogType: 'website',
        schema: {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `${category.name} Recipes & Articles`,
          description: category.description,
          url: `${window.location.origin}/#/category/${category.slug}`,
        },
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [category?.id]);

  // Matching recipes
  const matchingRecipes = useMemo(() => {
    const s = slug.toLowerCase();
    return allRecipes.filter((r) => {
      return (
        r.mealType.some((m) => m.toLowerCase().includes(s)) ||
        r.cuisine.toLowerCase().includes(s) ||
        r.dietaryTags.some((d) => d.toLowerCase().includes(s)) ||
        r.mainIngredient.toLowerCase().includes(s)
      );
    });
  }, [slug]);

  // Matching articles
  const matchingArticles = useMemo(() => {
    const s = slug.toLowerCase();
    return allArticles.filter((a) => {
      return (
        a.category.toLowerCase().includes(s) ||
        a.tags.some((t) => t.toLowerCase().includes(s)) ||
        a.title.toLowerCase().includes(s)
      );
    });
  }, [slug]);

  // Related categories
  const relatedCategories = useMemo(() => {
    const pool =
      category.type === 'recipe'
        ? recipeCategories
        : category.type === 'nutrition'
        ? nutritionCategories
        : lifestyleCategories;
    return pool.filter((c) => c.id !== category.id).slice(0, 4);
  }, [category]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between text-xs text-stone-500">
        <button
          onClick={goBack}
          className="flex items-center gap-1.5 text-stone-600 hover:text-stone-900 transition-colors font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-1.5 text-xs text-stone-500">
          <button onClick={() => navigate('home')} className="hover:text-stone-900 transition-colors">
            Home
          </button>
          <span>/</span>
          <button onClick={() => navigate(category.type === 'recipe' ? 'recipes' : 'articles')} className="hover:text-stone-900 transition-colors font-medium">
            {category.type === 'recipe' ? 'Recipes' : 'Articles'}
          </button>
          <span>/</span>
          <span className="text-emerald-800 font-semibold">{category.name}</span>
        </div>
      </div>

      {/* Category Hero Banner */}
      <section className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10">
          <div className="lg:col-span-7 space-y-3">
            <span className="text-xs uppercase tracking-widest text-emerald-800 font-semibold font-sans">
              Editorial Collection · {category.type.toUpperCase()}
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-stone-900">
              {category.name}
            </h1>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-sans max-w-xl">
              {category.description}
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs text-stone-500 font-mono">
              <span>{matchingRecipes.length} Tested Recipes</span>
              <span aria-hidden="true">·</span>
              <span>{matchingArticles.length} Editorial Articles</span>
            </div>
          </div>

          <div className="lg:col-span-5 aspect-16/10 rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
            <img
              src={category.heroImage}
              alt={category.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Matching Recipes Grid */}
      {matchingRecipes.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <h2 className="font-serif text-2xl font-semibold text-stone-900">
              Recipes in {category.name}
            </h2>
            <span className="text-xs text-stone-500 font-mono">
              {matchingRecipes.length} recipes
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchingRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </section>
      )}

      {/* Matching Articles Grid */}
      {matchingArticles.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <h2 className="font-serif text-2xl font-semibold text-stone-900">
              Editorial Coverage & Nutrition Science
            </h2>
            <span className="text-xs text-stone-500 font-mono">
              {matchingArticles.length} articles
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchingArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* Fallback if sparse */}
      {matchingRecipes.length === 0 && matchingArticles.length === 0 && (
        <div className="py-16 text-center bg-white rounded-xl border border-stone-200 p-8 space-y-3">
          <Compass className="w-8 h-8 text-stone-400 mx-auto" />
          <h3 className="font-serif text-xl font-semibold text-stone-900">
            New seasonal recipes coming soon to this collection!
          </h3>
          <p className="text-xs text-stone-500">
            Browse our full recipe database while our test kitchen finalizes new recipes for {category.name}.
          </p>
          <button
            onClick={() => navigate('recipes')}
            className="px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded-lg"
          >
            Explore Recipe Database
          </button>
        </div>
      )}

      {/* Related Categories Grid */}
      <section className="pt-6 border-t border-stone-200 space-y-4">
        <h3 className="font-serif text-xl font-semibold text-stone-900">
          Related Editorial Collections
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {relatedCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => navigate('category', { slug: cat.slug })}
              className="p-4 bg-white border border-stone-200 hover:border-emerald-700 rounded-xl text-left transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="block font-serif text-sm font-semibold text-stone-900 group-hover:text-emerald-800 transition-colors">
                  {cat.name}
                </span>
                <span className="text-[11px] text-stone-500 line-clamp-2 mt-1">
                  {cat.description}
                </span>
              </div>
              <span className="text-[11px] font-semibold text-emerald-800 flex items-center gap-1 mt-3">
                Explore <ArrowRight className="w-3 h-3" />
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};
