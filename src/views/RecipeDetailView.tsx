import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { allRecipes, getRecipeById } from '../data/recipes';
import { authors } from '../data/authors';
import { RecipeCard } from '../components/RecipeCard';
import { InteractiveNutritionCalculator } from '../components/InteractiveNutritionCalculator';
import { Banner320x50, SmartlinkCard } from '../components/AdUnits';
import { setPageSEO, buildRecipeSchema } from '../utils/seo';
import {
  Clock,
  Star,
  Bookmark,
  Share2,
  Printer,
  Minus,
  Plus,
  Check,
  ChefHat,
  Heart,
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  FolderPlus,
  Compass,
} from 'lucide-react';

export const RecipeDetailView: React.FC = () => {
  const { routeParams, goBack, navigate, isRecipeSaved, toggleSaveRecipe, openOrganizeModal, customRecipes, showToast } = useApp();
  const recipeSlug = routeParams.slug || routeParams.id;

  // Combine standard and custom recipes
  const allAvailableRecipes = useMemo(() => {
    return [...allRecipes, ...customRecipes];
  }, [customRecipes]);

  const recipe = useMemo(() => {
    return allAvailableRecipes.find((r) => r.slug === recipeSlug || r.id === recipeSlug) || allRecipes[0];
  }, [allAvailableRecipes, recipeSlug]);

  const recipeIndex = useMemo(() => {
    return allAvailableRecipes.findIndex((r) => r.id === recipe.id);
  }, [allAvailableRecipes, recipe.id]);

  const prevRecipe = recipeIndex > 0 ? allAvailableRecipes[recipeIndex - 1] : allAvailableRecipes[allAvailableRecipes.length - 1];
  const nextRecipe = recipeIndex < allAvailableRecipes.length - 1 ? allAvailableRecipes[recipeIndex + 1] : allAvailableRecipes[0];

  const author = authors.find((a) => a.id === recipe.authorId);
  const saved = isRecipeSaved(recipe.id);

  // Servings adjustment state
  const baseServings = recipe.servings || 4;
  const [servings, setServings] = useState<number>(baseServings);

  // Ingredient check-off state
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});

  // Reset state and update document title & rich Schema.org recipe metadata
  useEffect(() => {
    if (recipe) {
      setServings(recipe.servings || 4);
      setCheckedIngredients({});
      const schema = buildRecipeSchema(recipe, author?.name);
      setPageSEO({
        title: `${recipe.title} Recipe | FreshNutri Kitchen`,
        description: recipe.shortDescription || recipe.intro,
        keywords: [
          ...recipe.dietaryTags,
          recipe.cuisine,
          recipe.mainIngredient,
          'healthy recipe',
          'clean eating',
          'Allrecipes healthy alternative',
          'NYT Cooking free alternative',
          'EatingWell alternative',
          'Skinnytaste alternative',
          'USDA nutrition calculator',
        ].join(', '),
        canonicalPath: `/#/recipe/${recipe.slug}`,
        ogImage: recipe.heroImage,
        ogType: 'article',
        schema,
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [recipe?.id, author?.name]);

  // Dynamic multiplier for ingredient math
  const multiplier = servings / baseServings;

  const toggleIngredientCheck = (idx: number) => {
    setCheckedIngredients((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: recipe.title,
          text: recipe.shortDescription,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Recipe URL copied to clipboard!', 'success');
    }
  };

  // Format ingredient quantities gracefully
  const formatQuantity = (amount: number, mult: number): string => {
    const total = amount * mult;
    if (total === 0) return '';
    // If integer
    if (Math.abs(total - Math.round(total)) < 0.05) {
      return Math.round(total).toString();
    }
    // Simple fractions
    const dec = total % 1;
    const whole = Math.floor(total);
    let frac = '';
    if (Math.abs(dec - 0.25) < 0.05) frac = '¼';
    else if (Math.abs(dec - 0.33) < 0.05) frac = '⅓';
    else if (Math.abs(dec - 0.5) < 0.05) frac = '½';
    else if (Math.abs(dec - 0.66) < 0.05) frac = '⅔';
    else if (Math.abs(dec - 0.75) < 0.05) frac = '¾';

    if (frac) {
      return whole > 0 ? `${whole} ${frac}` : frac;
    }
    return total.toFixed(1).replace(/\.0$/, '');
  };

  // Related recipes
  const relatedRecipes = useMemo(() => {
    return allRecipes
      .filter((r) => r.id !== recipe.id && (r.cuisine === recipe.cuisine || r.mealType.some((m) => recipe.mealType.includes(m))))
      .slice(0, 3);
  }, [recipe]);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Recipe Page Breadcrumb & Dedicated Pager Bar */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-stone-500 border-b border-stone-200/80 pb-3.5">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => navigate('home')}
            className="hover:text-stone-900 transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <button
            onClick={() => navigate('recipes')}
            className="hover:text-stone-900 transition-colors font-semibold text-stone-700"
          >
            All Recipes
          </button>
          <span>/</span>
          <button
            onClick={() => navigate('recipes', { sub: recipe.mealType[0] })}
            className="text-emerald-800 hover:text-emerald-950 font-medium transition-colors"
          >
            {recipe.mealType[0]}
          </button>
          <span>/</span>
          <span className="truncate max-w-[200px] text-stone-900 font-semibold" title={recipe.title}>
            {recipe.title}
          </span>
        </div>

        {/* Recipe Page Pager: Recipe X of Y */}
        <div className="flex items-center gap-2 self-end sm:self-auto font-mono text-[11px]">
          <span className="text-stone-400">
            Recipe <strong className="text-stone-800">{recipeIndex >= 0 ? recipeIndex + 1 : 1}</strong> of {allAvailableRecipes.length}
          </span>
          <span className="text-stone-300">·</span>
          <button
            onClick={() => navigate('recipe', { slug: prevRecipe.slug })}
            className="px-2 py-1 bg-white hover:bg-stone-100 border border-stone-200 rounded-md text-stone-700 transition-colors flex items-center gap-1 shadow-2xs"
            title={`Previous recipe: ${prevRecipe.title}`}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Prev</span>
          </button>
          <button
            onClick={() => navigate('recipe', { slug: nextRecipe.slug })}
            className="px-2 py-1 bg-white hover:bg-stone-100 border border-stone-200 rounded-md text-stone-700 transition-colors flex items-center gap-1 shadow-2xs"
            title={`Next recipe: ${nextRecipe.title}`}
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Title & Header Section */}
      <header className="space-y-4">
        {/* Zero-Pill Quiet Unboxed Metadata */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 font-mono">
          <span className="font-semibold text-emerald-800 font-sans">{recipe.mealType[0]}</span>
          <span aria-hidden="true">·</span>
          <span>{recipe.cuisine}</span>
          <span aria-hidden="true">·</span>
          <span>{recipe.cookingMethod}</span>
          <span aria-hidden="true">·</span>
          <span>{recipe.difficulty}</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-medium text-stone-900 tracking-tight leading-[1.18] text-balance">
          {recipe.title}
        </h1>

        <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-sans">
          {recipe.intro || recipe.shortDescription}
        </p>

        {/* Rating & Author Bylines */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-y border-stone-200 py-3 text-xs">
          <div className="flex items-center gap-3">
            {author && (
              <img
                src={author.avatar}
                alt={author.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            )}
            <div>
              <span className="block font-semibold text-stone-900">
                Recipe by {author?.name || 'FreshNutri Test Kitchen'}
              </span>
              <span className="block text-[11px] text-stone-500">
                {author?.role} · {author?.credentials}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-stone-800 bg-stone-100 px-3 py-1.5 rounded-lg">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="font-bold tabular-nums">{recipe.rating.toFixed(1)}</span>
              <span className="text-stone-500">({recipe.reviewsCount} reviews)</span>
            </div>

            {/* Action Bar (Save, Organize, Share, Print) */}
            <div className="no-print flex items-center gap-1.5">
              <button
                onClick={() => toggleSaveRecipe(recipe.id)}
                className={`p-2 rounded-lg border transition-colors ${
                  saved
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                    : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
                title={saved ? 'Recipe saved' : 'Save recipe'}
                aria-label="Bookmark Recipe"
              >
                <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
              </button>

              <button
                onClick={() => openOrganizeModal(recipe.id)}
                className="px-3 py-2 bg-white border border-stone-200 hover:border-emerald-700 text-stone-700 hover:text-emerald-900 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold"
                title="Organize into Custom Collections"
              >
                <FolderPlus className="w-3.5 h-3.5 text-emerald-700" />
                <span className="hidden sm:inline">Add to Collection</span>
              </button>

              <button
                onClick={handleShare}
                className="p-2 bg-white border border-stone-200 text-stone-600 hover:bg-stone-50 rounded-lg transition-colors"
                title="Share recipe"
                aria-label="Share Recipe"
              >
                <Share2 className="w-4 h-4" />
              </button>

              <button
                onClick={handlePrint}
                className="p-2 bg-white border border-stone-200 text-stone-600 hover:bg-stone-50 rounded-lg transition-colors"
                title="Print recipe"
                aria-label="Print Recipe"
              >
                <Printer className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Large Recipe Photography */}
      <div className="relative aspect-16/10 rounded-2xl overflow-hidden shadow-md bg-stone-100 border border-stone-200">
        <img
          src={recipe.heroImage}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Quick Timing & Nutritional Strip */}
      <div className="bg-white rounded-xl border border-stone-200/90 p-5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center divide-y sm:divide-y-0 sm:divide-x divide-stone-100">
        <div className="py-2">
          <span className="block text-[11px] uppercase tracking-wider text-stone-400 font-semibold">Prep Time</span>
          <span className="font-mono text-base font-bold text-stone-900 tabular-nums">{recipe.prepTime} mins</span>
        </div>
        <div className="py-2">
          <span className="block text-[11px] uppercase tracking-wider text-stone-400 font-semibold">Cook Time</span>
          <span className="font-mono text-base font-bold text-stone-900 tabular-nums">{recipe.cookTime} mins</span>
        </div>
        <div className="py-2">
          <span className="block text-[11px] uppercase tracking-wider text-stone-400 font-semibold">Total Time</span>
          <span className="font-mono text-base font-bold text-emerald-800 tabular-nums">{recipe.totalTime} mins</span>
        </div>
        <div className="py-2">
          <span className="block text-[11px] uppercase tracking-wider text-stone-400 font-semibold">Yield / Servings</span>
          <span className="font-mono text-base font-bold text-stone-900 tabular-nums">{servings} servings</span>
        </div>
      </div>

      {/* Interactive Ingredients Section with Dynamic Servings Control */}
      <section className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-stone-900">
              Ingredients
            </h2>
            <span className="text-xs text-stone-500">
              Click any ingredient to strike it off as you prep
            </span>
          </div>

          {/* Adjustable Servings Control (Math recalculator) */}
          <div className="no-print flex items-center gap-3 bg-stone-50 px-3.5 py-1.5 rounded-xl border border-stone-200">
            <span className="text-xs font-semibold text-stone-700">Adjust Servings:</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setServings((s) => Math.max(1, s - 1))}
                className="w-7 h-7 bg-white hover:bg-stone-200 border border-stone-300 rounded-lg flex items-center justify-center text-stone-800 transition-colors"
                aria-label="Decrease servings"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono text-sm font-bold w-6 text-center tabular-nums text-emerald-900">
                {servings}
              </span>
              <button
                type="button"
                onClick={() => setServings((s) => s + 1)}
                className="w-7 h-7 bg-white hover:bg-stone-200 border border-stone-300 rounded-lg flex items-center justify-center text-stone-800 transition-colors"
                aria-label="Increase servings"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Ingredients Checklist */}
        <ul className="space-y-3">
          {recipe.ingredients.map((ing, idx) => {
            const isChecked = !!checkedIngredients[idx];
            return (
              <li
                key={idx}
                onClick={() => toggleIngredientCheck(idx)}
                className={`flex items-start gap-3 p-2.5 rounded-lg cursor-pointer transition-colors ${
                  isChecked ? 'bg-stone-50 text-stone-400' : 'hover:bg-stone-50/80 text-stone-800'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded mt-0.5 flex items-center justify-center shrink-0 border transition-all ${
                    isChecked
                      ? 'bg-emerald-700 border-emerald-700 text-white'
                      : 'border-stone-300 bg-white'
                  }`}
                >
                  {isChecked && <Check className="w-3.5 h-3.5" />}
                </div>

                <div className="text-sm">
                  <span className={`font-mono font-semibold tabular-nums ${isChecked ? 'line-through' : 'text-stone-900'}`}>
                    {formatQuantity(ing.amount, multiplier)} {ing.unit}
                  </span>{' '}
                  <span className={isChecked ? 'line-through' : 'text-stone-800 font-normal'}>
                    {ing.name}
                  </span>
                  {ing.notes && (
                    <span className="text-xs text-stone-500 italic ml-1">
                      ({ing.notes})
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Mid-Recipe Sponsor & 320x50 Ad Placement */}
      <div className="no-print my-6 space-y-4">
        <Banner320x50 className="py-2" />
        <SmartlinkCard label="Special Partner Offers for Home Chefs" />
      </div>

      {/* Step-by-Step Instructions */}
      <section className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 space-y-6">
        <div className="pb-4 border-b border-stone-200">
          <h2 className="font-serif text-2xl font-semibold text-stone-900">
            Instructions
          </h2>
          <span className="text-xs text-stone-500">
            Follow our tested step-by-step culinary method
          </span>
        </div>

        <ol className="space-y-6">
          {recipe.instructions.map((inst) => (
            <li key={inst.step} className="flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-stone-900 text-white font-mono text-sm font-semibold flex items-center justify-center shrink-0 mt-0.5">
                {inst.step}
              </span>
              <div className="space-y-1.5 flex-1">
                {inst.title && (
                  <h3 className="font-serif text-lg font-semibold text-stone-900">
                    {inst.title}
                  </h3>
                )}
                <p className="text-sm text-stone-700 leading-relaxed">
                  {inst.text}
                </p>
                {inst.tip && (
                  <div className="mt-2 p-3 bg-amber-50/70 border border-amber-200/80 rounded-lg text-xs text-amber-950 font-medium">
                    <strong className="block mb-0.5">Chef's Technique Tip:</strong>
                    {inst.tip}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Interactive Nutrition Calculator Component */}
      <InteractiveNutritionCalculator
        nutrition={recipe.nutrition}
        baseServings={baseServings}
        currentServings={servings}
        onServingsChange={setServings}
        recipeTitle={recipe.title}
      />

      {/* Prominent Medical Disclaimer */}
      <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex items-start gap-3 text-xs text-stone-600">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="font-semibold text-stone-800">Nutritional Disclaimer:</strong> Calculated values are informational estimates based on standard USDA FoodData testing and ingredient variations. FreshNutri does not diagnose, treat, or offer clinical medical advice. Consult your doctor or certified registered dietitian regarding specialized medical dietary needs.
        </p>
      </div>

      {/* Recipe Notes, Substitutions & Storage */}
      {(recipe.recipeNotes || recipe.substitutions || recipe.storageInfo) && (
        <section className="bg-stone-50 p-6 sm:p-8 rounded-2xl border border-stone-200 space-y-5 text-xs text-stone-700">
          {recipe.recipeNotes && (
            <div>
              <h3 className="font-serif text-base font-semibold text-stone-900 mb-1">
                Test Kitchen Notes
              </h3>
              <p className="leading-relaxed">{recipe.recipeNotes}</p>
            </div>
          )}

          {recipe.substitutions && recipe.substitutions.length > 0 && (
            <div>
              <h3 className="font-serif text-base font-semibold text-stone-900 mb-1">
                Substitutions & Adaptations
              </h3>
              <ul className="list-disc list-inside space-y-1 text-stone-600">
                {recipe.substitutions.map((sub, i) => (
                  <li key={i}>{sub}</li>
                ))}
              </ul>
            </div>
          )}

          {recipe.storageInfo && (
            <div>
              <h3 className="font-serif text-base font-semibold text-stone-900 mb-1">
                Storage & Reheating Guide
              </h3>
              <p className="leading-relaxed">{recipe.storageInfo}</p>
            </div>
          )}
        </section>
      )}

      {/* Related Recipes Section */}
      {relatedRecipes.length > 0 && (
        <section className="no-print pt-6 border-t border-stone-200">
          <div className="mb-6">
            <span className="text-xs uppercase tracking-wider text-emerald-800 font-semibold block mb-1">
              You May Also Like
            </span>
            <h2 className="font-serif text-2xl font-semibold text-stone-900">
              Related Test-Kitchen Recipes
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedRecipes.map((r) => (
              <RecipeCard key={r.id} recipe={r} />
            ))}
          </div>
        </section>
      )}

      {/* Dedicated Recipe Page Navigator (Previous & Next Recipe Pages) */}
      <section className="no-print pt-8 border-t-2 border-stone-200 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <span className="font-mono uppercase tracking-wider text-stone-500 font-semibold">
            Recipe Directory Navigation · Page {recipeIndex >= 0 ? recipeIndex + 1 : 1} of {allAvailableRecipes.length}
          </span>
          <button
            onClick={() => navigate('recipes')}
            className="text-emerald-800 hover:text-emerald-950 font-semibold flex items-center gap-1 transition-colors self-start sm:self-auto"
          >
            <span>Browse All {allAvailableRecipes.length} Recipes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Previous Recipe Page Card */}
          <div
            onClick={() => navigate('recipe', { slug: prevRecipe.slug })}
            className="group cursor-pointer p-4 bg-white hover:bg-stone-50 rounded-2xl border border-stone-200 transition-all hover:border-emerald-700 hover:shadow-xs flex items-center gap-4"
          >
            <img
              src={prevRecipe.heroImage}
              alt=""
              className="w-16 h-16 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform"
            />
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block mb-0.5 flex items-center gap-1">
                <ChevronLeft className="w-3 h-3 text-emerald-700" />
                <span>Previous Recipe Page</span>
              </span>
              <h4 className="font-serif text-sm font-semibold text-stone-900 group-hover:text-emerald-900 transition-colors line-clamp-1">
                {prevRecipe.title}
              </h4>
              <span className="text-[11px] text-stone-500 font-mono">
                {prevRecipe.totalTime} mins · {prevRecipe.cuisine}
              </span>
            </div>
          </div>

          {/* Next Recipe Page Card */}
          <div
            onClick={() => navigate('recipe', { slug: nextRecipe.slug })}
            className="group cursor-pointer p-4 bg-white hover:bg-stone-50 rounded-2xl border border-stone-200 transition-all hover:border-emerald-700 hover:shadow-xs flex items-center gap-4 text-right sm:flex-row-reverse"
          >
            <img
              src={nextRecipe.heroImage}
              alt=""
              className="w-16 h-16 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform"
            />
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block mb-0.5 flex items-center justify-end gap-1">
                <span>Next Recipe Page</span>
                <ChevronRight className="w-3 h-3 text-emerald-700" />
              </span>
              <h4 className="font-serif text-sm font-semibold text-stone-900 group-hover:text-emerald-900 transition-colors line-clamp-1">
                {nextRecipe.title}
              </h4>
              <span className="text-[11px] text-stone-500 font-mono">
                {nextRecipe.totalTime} mins · {nextRecipe.cuisine}
              </span>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
};
