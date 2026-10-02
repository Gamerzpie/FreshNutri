import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { allRecipes, getFeaturedRecipes, getTrendingRecipes, getQuickRecipes, getHighProteinRecipes } from '../data/recipes';
import { allArticles, getFeaturedArticles, getTrendingArticles } from '../data/articles';
import { allMealPlans } from '../data/mealPlans';
import { recipeCategories } from '../data/categories';
import { RecipeCard } from '../components/RecipeCard';
import { ArticleCard } from '../components/ArticleCard';
import { MealPlanCard } from '../components/MealPlanCard';
import { RecipeSlideshow } from '../components/RecipeSlideshow';
import { Banner320x50, BannerRow, SmartlinkCard } from '../components/AdUnits';
import { setPageSEO, defaultKeywords } from '../utils/seo';
import { ArrowRight, Flame, Clock, Sparkles, BookOpen, ChefHat, Calendar, HeartPulse, ShieldCheck, CheckCircle2, Zap } from 'lucide-react';

export const HomeView: React.FC = () => {
  const { navigate, openNewsletter } = useApp();

  useEffect(() => {
    setPageSEO({
      title: 'FreshNutri – Healthy Recipes, Nutrition & Editorial Food Magazine',
      description: 'Discover healthy recipes, science-backed nutrition, curated 7-day meal plans, and mindful lifestyle guides from the editors of FreshNutri. The dietitian-verified whole-food alternative to Allrecipes, NYT Cooking, and EatingWell.',
      keywords: defaultKeywords,
      canonicalPath: '/',
      ogType: 'website',
    });
  }, []);

  const featuredRecipes = getFeaturedRecipes();
  const trendingRecipes = getTrendingRecipes();
  const quickRecipes = getQuickRecipes();
  const highProteinRecipes = getHighProteinRecipes();
  const featuredArticles = getFeaturedArticles();
  const trendingArticles = getTrendingArticles();

  // Hero Story
  const heroRecipe = allRecipes[0]; // Mediterranean Grain Bowl
  const recipeOfTheDay = allRecipes[1]; // Pan-Seared Wild Salmon
  const leadArticle = featuredArticles[0] || allArticles[0];
  const spotlightMealPlan = allMealPlans[0];

  // Curated slideshow recipes showcasing vivid photography and culinary variety
  const slideshowRecipeIds = [
    'rec-1', // Mediterranean Grain Bowl with Crispy Spiced Chickpeas
    'rec-2', // Pan-Seared Wild Salmon with Meyer Lemon & Asparagus
    'rec-57', // Pan-Poached Turmeric Halibut in Lemongrass Coconut Broth
    'rec-55', // Korean Bibimbap Quinoa Bowl with Crispy Sesame Tempeh
    'rec-43', // Cast-Iron Baked Shakshuka with Jammy Eggs
    'rec-60', // Moroccan Spiced Turkey & Chickpea Tagine
    'rec-63', // Wild Salmon Crudo with Yuzu Ponzu
    'rec-58', // Smoky Black Bean & Sweet Potato Enchilada Skillet
  ];
  const slideshowRecipes = slideshowRecipeIds
    .map((id) => allRecipes.find((r) => r.id === id))
    .filter((r): r is (typeof allRecipes)[0] => Boolean(r));

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Large Editorial Front-Page Hero */}
      <section className="relative bg-[#F4F1EA] border-b border-stone-200/90 pt-8 pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Lead Narrative */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-widest">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-600" />
                <span>Spring Editorial Spotlight</span>
                <span aria-hidden="true" className="text-stone-400">·</span>
                <span>Test Kitchen Pick</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-5xl font-medium text-stone-900 tracking-tight leading-[1.15] text-balance">
                The New Mediterranean Table: Vibrant Plants, Healthy Lipids & Lasting Energy
              </h1>

              <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-xl">
                How centering your week around cold-pressed olive oil, crispy spiced legumes, and prebiotic whole grains nourishes both the microbiome and cardiovascular longevity.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => navigate('recipe', { slug: heroRecipe.slug })}
                  className="px-5 py-3 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 shadow-sm"
                >
                  <span>Explore Featured Recipe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => navigate('category', { slug: 'mediterranean' })}
                  className="px-4 py-3 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 text-xs font-semibold rounded-lg transition-colors"
                >
                  The Mediterranean Collection
                </button>
              </div>

              {/* Zero-Pill Quiet Nutrition Highlights */}
              <div className="pt-4 border-t border-stone-200/80 flex items-center gap-4 text-xs text-stone-500 font-mono">
                <span>{heroRecipe.totalTime} mins prep & cook</span>
                <span aria-hidden="true">·</span>
                <span>{heroRecipe.nutrition.protein}g protein</span>
                <span aria-hidden="true">·</span>
                <span>{heroRecipe.nutrition.fiber}g fiber</span>
              </div>
            </div>

            {/* Hero Visual */}
            <div
              onClick={() => navigate('recipe', { slug: heroRecipe.slug })}
              className="lg:col-span-6 cursor-pointer group relative overflow-hidden rounded-2xl shadow-xl border border-stone-300/80 aspect-16/10"
            >
              <img
                src={heroRecipe.heroImage}
                alt={heroRecipe.title}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs uppercase tracking-wider text-emerald-300 font-semibold block mb-1">
                  Recipe of the Week
                </span>
                <h2 className="font-serif text-xl sm:text-2xl font-medium leading-snug">
                  {heroRecipe.title}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ad BEFORE Slide Show */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BannerRow />
      </div>

      {/* Featured Recipe Showcase Slideshow */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 pb-2 border-b border-stone-200">
          <div>
            <span className="text-xs uppercase tracking-wider text-emerald-800 font-semibold font-mono block mb-1">
              Curated Culinary Carousel
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-stone-900">
              Featured Test-Kitchen Recipes
            </h2>
          </div>
          <p className="text-xs text-stone-500 max-w-md">
            Hand-selected by our editorial nutritionists. Auto-rotating showcase with complete macronutrient profiles, cooking timers, and dietary indicators.
          </p>
        </div>

        <RecipeSlideshow recipes={slideshowRecipes} autoPlayInterval={5000} />
      </section>

      {/* Hero Sponsored Ad Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BannerRow />
      </div>

      {/* 2. Recipe of the Day & Quick Category Rail */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Recipe of the Day Card */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-2xl border border-stone-200/90 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-600" />
                  Recipe of the Day
                </span>
                <span className="text-xs font-mono text-stone-400">
                  {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </div>

              <div
                onClick={() => navigate('recipe', { slug: recipeOfTheDay.slug })}
                className="cursor-pointer group aspect-16/10 rounded-xl overflow-hidden bg-stone-100 relative mb-4"
              >
                <img
                  src={recipeOfTheDay.heroImage}
                  alt={recipeOfTheDay.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                />
              </div>

              <h3
                onClick={() => navigate('recipe', { slug: recipeOfTheDay.slug })}
                className="font-serif text-2xl font-semibold text-stone-900 hover:text-emerald-800 cursor-pointer transition-colors leading-snug"
              >
                {recipeOfTheDay.title}
              </h3>

              <p className="mt-2 text-xs text-stone-600 leading-relaxed line-clamp-2">
                {recipeOfTheDay.shortDescription}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-stone-500 font-mono">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  <span>{recipeOfTheDay.totalTime} mins</span>
                </span>
                <span aria-hidden="true">·</span>
                <span>{recipeOfTheDay.nutrition.protein}g protein</span>
              </div>

              <button
                onClick={() => navigate('recipe', { slug: recipeOfTheDay.slug })}
                className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
              >
                <span>Cook Today</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Ad AFTER Recipe of the Day */}
            <div className="mt-4 pt-3 border-t border-stone-100 flex justify-center">
              <Banner320x50 label="Recipe of the Day Sponsor" className="my-0 scale-95 origin-center" />
            </div>
          </div>

          {/* Editorial Category Landing Rail */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-2xl font-semibold text-stone-900">
                  Explore by Course & Category
                </h2>
                <button
                  onClick={() => navigate('recipes')}
                  className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
                >
                  All 18 Categories <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {recipeCategories.slice(0, 6).map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => navigate('category', { slug: cat.slug })}
                    className="p-3.5 bg-white border border-stone-200/90 rounded-xl text-left hover:border-emerald-700 transition-all group flex flex-col justify-between min-h-[90px]"
                  >
                    <div>
                      <span className="block font-serif text-sm font-semibold text-stone-900 group-hover:text-emerald-800 transition-colors">
                        {cat.name}
                      </span>
                      <span className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                        {cat.description}
                      </span>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-700 flex items-center gap-0.5 mt-2">
                      View Recipes <ArrowRight className="w-2.5 h-2.5" />
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Editorial Note */}
            <div className="mt-5 p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/80 flex items-start gap-3">
              <ChefHat className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
              <div className="text-xs text-emerald-950">
                <strong className="font-semibold block mb-0.5">The FreshNutri Test-Kitchen Guarantee:</strong>
                Every recipe is prepared up to 4 times by our culinary nutrition team to calibrate cooking temperatures, sodium, and flavor balance.
              </div>
            </div>

            {/* Ad AFTER Explore by Course and Category */}
            <div className="mt-4 pt-3 border-t border-stone-200 flex justify-center">
              <Banner320x50 label="Culinary Course & Category Deals" className="my-0 scale-95 origin-center" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Partner Deals Promo Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SmartlinkCard
          variant="emerald"
          label="Featured Nutrition & Kitchen Essentials"
          subtext="Exclusive deals on dietitian-recommended blenders, cast iron skillets, organic olive oil, and clean protein powders."
          buttonText="Explore Partner Discounts"
        />
      </section>

      {/* 3. Trending Recipes (4-Card Recipe Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6 pb-2 border-b border-stone-200">
          <div>
            <span className="text-xs uppercase tracking-wider text-emerald-800 font-semibold block mb-1">
              Reader Favorites
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-stone-900">
              Trending Healthy Recipes
            </h2>
          </div>
          <button
            onClick={() => navigate('recipes')}
            className="text-xs font-semibold text-stone-700 hover:text-stone-950 flex items-center gap-1"
          >
            Browse Recipe Database <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingRecipes.slice(0, 4).map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>

      {/* Ad AFTER Trending Healthy Recipes */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6 space-y-4">
        <BannerRow />
        <SmartlinkCard
          variant="amber"
          label="Trending Partner Discounts & Tested Kitchen Tools"
          subtext="Special pricing on high-powered blenders, stainless steel cookware sets, and organic pantry subscriptions."
          buttonText="Claim Trending Offers"
        />
      </div>

      {/* 4. Large Editorial Feature (Lead Essay + Side Articles) */}
      <section className="bg-white border-y border-stone-200/80 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs uppercase tracking-wider text-emerald-800 font-semibold block mb-1">
                Clinical Nutrition & Editorial Desk
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-stone-900">
                Latest Evidence-Based Guidance
              </h2>
            </div>
            <button
              onClick={() => navigate('nutrition')}
              className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
            >
              All Nutrition Articles <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Dominant Lead Article */}
            <div className="lg:col-span-7">
              <ArticleCard article={leadArticle} variant="lead" />
            </div>

            {/* 2 Stacked Horizontal Articles */}
            <div className="lg:col-span-5 flex flex-col gap-5 justify-between">
              {featuredArticles.slice(1, 3).map((art) => (
                <ArticleCard key={art.id} article={art} variant="horizontal" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ad AFTER Latest Evidence Based Guidance */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
        <BannerRow />
      </div>

      {/* 5. Quick & Easy Weeknight Dinners (Under 30 Minutes) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6 pb-2 border-b border-stone-200">
          <div>
            <span className="text-xs uppercase tracking-wider text-emerald-800 font-semibold block mb-1">
              Busy Weeknights
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-stone-900">
              Quick & Easy: Table-Ready in 30 Mins
            </h2>
          </div>
          <button
            onClick={() => navigate('recipes')}
            className="text-xs font-semibold text-stone-700 hover:text-stone-950 flex items-center gap-1"
          >
            See All 30-Min Meals <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickRecipes.slice(0, 4).map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>

      {/* Ad AFTER Busy Weeknights */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
        <BannerRow />
      </div>

      {/* 6. Spotlight 7-Day Meal Plan (Two-Column Feature) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF7F0] rounded-2xl border border-stone-300/80 p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">
                <Calendar className="w-4 h-4" />
                <span>Featured Weekly Meal Plan</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl font-semibold text-stone-900 leading-snug">
                {spotlightMealPlan.title}
              </h2>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {spotlightMealPlan.description}
              </p>

              <div className="pt-2 flex flex-wrap gap-2 text-xs text-stone-600">
                {spotlightMealPlan.tags.map((t) => (
                  <span key={t} className="px-2.5 py-1 bg-white border border-stone-200 rounded-md font-medium">
                    {t}
                  </span>
                ))}
              </div>

              <div className="pt-4 flex items-center gap-4">
                <button
                  onClick={() => navigate('meal-plan', { slug: spotlightMealPlan.slug })}
                  className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-2"
                >
                  <span>View 7-Day Calendar & Grocery List</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => navigate('meal-plans')}
                  className="text-xs font-semibold text-stone-700 hover:text-stone-900 underline"
                >
                  Browse all 10 plans
                </button>
              </div>
            </div>

            <div
              onClick={() => navigate('meal-plan', { slug: spotlightMealPlan.slug })}
              className="lg:col-span-6 cursor-pointer group aspect-16/10 rounded-xl overflow-hidden shadow-md bg-stone-100"
            >
              <img
                src={spotlightMealPlan.heroImage}
                alt={spotlightMealPlan.title}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Special Deals Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SmartlinkCard
          variant="amber"
          label="Weekly Grocery & Organic Meal-Prep Discounts"
          subtext="Exclusive partner coupons for organic produce delivery, wild seafood boxes, and grass-fed meat subscriptions."
          buttonText="Claim Grocery Deals"
        />
      </section>

      {/* Clinical Diets & Blood Pressure Management Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 text-white rounded-2xl p-6 sm:p-10 space-y-8 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-stone-800 pb-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest font-mono">
                <HeartPulse className="w-4 h-4" />
                <span>Medical Nutrition Therapy Desk</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-semibold text-white leading-tight">
                Diets for Blood Pressure, Diabetes & Chronic Health
              </h2>
              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                Evidence-based dietary protocols reviewed by registered dietitians. Discover targeted nutritional therapy for hypertension (DASH), Type 2 Diabetes, kidney health (CKD), cholesterol, and gut disorders.
              </p>
            </div>

            <button
              onClick={() => navigate('health-diets')}
              className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 self-start lg:self-center shrink-0"
            >
              <span>Explore All 8 Clinical Diets</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => navigate('health-diets', { slug: 'hypertension-dash-diet' })}
              className="p-5 bg-stone-800/80 hover:bg-stone-800 border border-stone-700 hover:border-emerald-500 rounded-xl text-left transition-all group flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-semibold text-emerald-400 uppercase block">Hypertension & BP</span>
                <h3 className="font-serif text-base font-semibold text-white group-hover:text-emerald-300 transition-colors">
                  The DASH Diet Protocol
                </h3>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Lower systolic pressure with calibrated sodium (&lt;1,500mg), high potassium, and dietary nitrates.
                </p>
              </div>
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1 mt-4">
                View BP Protocol <ArrowRight className="w-3 h-3" />
              </span>
            </button>

            <button
              onClick={() => navigate('health-diets', { slug: 'type-2-diabetes-blood-sugar' })}
              className="p-5 bg-stone-800/80 hover:bg-stone-800 border border-stone-700 hover:border-emerald-500 rounded-xl text-left transition-all group flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-semibold text-emerald-400 uppercase block">Glycemic Control</span>
                <h3 className="font-serif text-base font-semibold text-white group-hover:text-emerald-300 transition-colors">
                  Type 2 Diabetes Protocol
                </h3>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Blunt post-meal glucose spikes by 70% through soluble fiber sequencing and resistant starch.
                </p>
              </div>
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1 mt-4">
                View Diabetes Protocol <ArrowRight className="w-3 h-3" />
              </span>
            </button>

            <button
              onClick={() => navigate('health-diets', { slug: 'hyperlipidemia-cardiovascular-health' })}
              className="p-5 bg-stone-800/80 hover:bg-stone-800 border border-stone-700 hover:border-emerald-500 rounded-xl text-left transition-all group flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-semibold text-emerald-400 uppercase block">Arterial Health</span>
                <h3 className="font-serif text-base font-semibold text-white group-hover:text-emerald-300 transition-colors">
                  High Cholesterol & ApoB
                </h3>
                <p className="text-xs text-stone-400 leading-relaxed">
                  The Portfolio Diet: plant stanols, oat beta-glucan, and raw nuts clinically shown to reduce LDL-C.
                </p>
              </div>
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1 mt-4">
                View Lipid Protocol <ArrowRight className="w-3 h-3" />
              </span>
            </button>

            <button
              onClick={() => navigate('health-diets', { slug: 'chronic-kidney-disease-renal-nutrition' })}
              className="p-5 bg-stone-800/80 hover:bg-stone-800 border border-stone-700 hover:border-emerald-500 rounded-xl text-left transition-all group flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-semibold text-emerald-400 uppercase block">Renal Preservation</span>
                <h3 className="font-serif text-base font-semibold text-white group-hover:text-emerald-300 transition-colors">
                  Kidney Disease (CKD)
                </h3>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Plant-dominant renal protocol: low inorganic phosphate, moderate plant protein, and kidney protection.
                </p>
              </div>
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1 mt-4">
                View Renal Protocol <ArrowRight className="w-3 h-3" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Ad AFTER Medical Nutrition */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
        <BannerRow />
      </div>

      {/* 7. High-Protein & Vegetarian Culinary Split */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* High-Protein Section */}
          <div>
            <div className="flex items-center justify-between mb-5 pb-2 border-b border-stone-200">
              <div>
                <span className="text-xs uppercase tracking-wider text-emerald-800 font-semibold block mb-0.5">
                  Satiety & Muscle Health
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-stone-900">
                  High-Protein Dinners (25g+)
                </h3>
              </div>
              <button
                onClick={() => navigate('category', { slug: 'high-protein' })}
                className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
              >
                More <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highProteinRecipes.slice(0, 2).map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>

            {/* Ad AFTER Safety & Muscle Health */}
            <div className="mt-4 flex justify-center">
              <Banner320x50 label="High-Protein Nutrition Partner" className="my-0 scale-95 origin-center" />
            </div>
          </div>

          {/* Plant-Forward Vegetarian Section */}
          <div>
            <div className="flex items-center justify-between mb-5 pb-2 border-b border-stone-200">
              <div>
                <span className="text-xs uppercase tracking-wider text-emerald-800 font-semibold block mb-0.5">
                  Plant Abundance
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-stone-900">
                  Satisfying Vegetarian Mains
                </h3>
              </div>
              <button
                onClick={() => navigate('category', { slug: 'vegetarian' })}
                className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
              >
                More <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {allRecipes.filter((r) => r.dietaryTags.includes('Vegetarian')).slice(0, 2).map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>

            {/* Ad AFTER Plant Abundance */}
            <div className="mt-4 flex justify-center">
              <Banner320x50 label="Plant-Based Living Sponsor" className="my-0 scale-95 origin-center" />
            </div>
          </div>
        </div>
      </section>

      {/* Culinary Partner Banner Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BannerRow />
      </div>

      {/* 8. Magazine Section: Healthy Lifestyle & Food News */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6 pb-2 border-b border-stone-200">
          <div>
            <span className="text-xs uppercase tracking-wider text-emerald-800 font-semibold block mb-1">
              Mindful Living & Industry Trends
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-stone-900">
              Healthy Lifestyle & Food News
            </h2>
          </div>
          <button
            onClick={() => navigate('healthy-lifestyle')}
            className="text-xs font-semibold text-stone-700 hover:text-stone-950 flex items-center gap-1"
          >
            All Lifestyle Features <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingArticles.slice(0, 3).map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* Ad AFTER Mindful Living */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6 space-y-4">
        <BannerRow />
        <SmartlinkCard
          variant="amber"
          label="Mindful Wellness & Organic Lifestyle Deals"
          subtext="Exclusive member perks on sustainable kitchenware, herbal teas, and adaptogenic supplements."
          buttonText="Explore Wellness Deals"
        />
      </div>

      {/* 8.5 Competitor Alternative & Editorial Credibility Section (Google SEO Comparison) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-12 space-y-8 shadow-2xs">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest text-emerald-800 font-semibold font-mono block mb-1.5">
              The Modern Cooking Experience
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-900 tracking-tight">
              Why Mindful Cooks Choose FreshNutri Over Traditional Recipe Sites
            </h2>
            <p className="mt-2.5 text-stone-600 text-sm sm:text-base leading-relaxed">
              Tired of cluttered, paywalled, or unverified recipe websites like Allrecipes, NYT Cooking, EatingWell, and Skinnytaste? FreshNutri delivers a calm, 100% free test-kitchen alternative built for whole-food nutrition and culinary precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Comparison Card 1: vs Allrecipes */}
            <div className="p-5 bg-stone-50/80 rounded-2xl border border-stone-200/90 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-800 font-bold uppercase tracking-wider">VS ALLRECIPES</span>
                <span className="text-stone-400">Verified 3x</span>
              </div>
              <h3 className="font-serif text-base font-semibold text-stone-900">
                Dietitian-Calibrated, Not Unverified Submissions
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Unlike crowdsourced directories filled with unverified home submissions and intrusive popups, every FreshNutri recipe is tested up to 4 times on real home stoves with certified USDA macros.
              </p>
              <div className="pt-1 flex items-center gap-1.5 text-[11px] text-emerald-800 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Zero fluff or unvetted recipes</span>
              </div>
            </div>

            {/* Comparison Card 2: vs NYT Cooking */}
            <div className="p-5 bg-stone-50/80 rounded-2xl border border-stone-200/90 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-800 font-bold uppercase tracking-wider">VS NYT COOKING</span>
                <span className="text-stone-400">100% Free</span>
              </div>
              <h3 className="font-serif text-base font-semibold text-stone-900">
                Chef-Quality Flavor Without Paywalls
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Enjoy world-class culinary standards, artisanal grain bowls, slow-simmered broths, and pan-seared wild seafood without being blocked by monthly subscription barriers or forced logins.
              </p>
              <div className="pt-1 flex items-center gap-1.5 text-[11px] text-emerald-800 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>No paywalls or subscription fees</span>
              </div>
            </div>

            {/* Comparison Card 3: vs EatingWell */}
            <div className="p-5 bg-stone-50/80 rounded-2xl border border-stone-200/90 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-800 font-bold uppercase tracking-wider">VS EATINGWELL</span>
                <span className="text-stone-400">Dynamic Live</span>
              </div>
              <h3 className="font-serif text-base font-semibold text-stone-900">
                Live Macro Recalculation as You Scale
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Traditional sites show fixed nutrition tables. On FreshNutri, scale your dinner from 2 to 8 servings and our USDA-backed calculator recalculates calories, protein, and minerals in real time.
              </p>
              <div className="pt-1 flex items-center gap-1.5 text-[11px] text-emerald-800 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Dynamic real-time nutrition</span>
              </div>
            </div>

            {/* Comparison Card 4: vs Skinnytaste & Yummly */}
            <div className="p-5 bg-stone-50/80 rounded-2xl border border-stone-200/90 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-800 font-bold uppercase tracking-wider">VS SKINNYTASTE</span>
                <span className="text-stone-400">Full 7-Day</span>
              </div>
              <h3 className="font-serif text-base font-semibold text-stone-900">
                Structured 7-Day Protocols & Grocery Lists
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Go beyond single low-calorie dishes with complete weekly clinical plans (Mediterranean, Anti-Inflammatory, High-Protein) complete with printable categorized shopping checklists.
              </p>
              <div className="pt-1 flex items-center gap-1.5 text-[11px] text-emerald-800 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Printable smart shopping checklists</span>
              </div>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-stone-200">
            <span className="text-xs text-stone-500 font-mono">
              Tested on induction, gas, and conventional electric kitchen equipment.
            </span>
            <button
              onClick={() => navigate('about')}
              className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1.5 transition-colors"
            >
              <span>Explore our full test-kitchen methodology</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Ad AFTER Modern Cooking Experience */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6 space-y-4">
        <BannerRow />
        <SmartlinkCard
          variant="dark"
          label="Tested Kitchenware, Gadgets & Dietitian Discounts"
          subtext="Discover top-rated non-toxic cookware, Japanese steel knives, high-speed blenders, and USDA organic food partners."
          buttonText="Explore All Offers"
        />
      </div>

      {/* 9. Newsletter Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 text-white rounded-2xl p-8 sm:p-12 border border-stone-800 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="font-serif text-3xl sm:text-4xl font-medium block">
              Elevate Your Everyday Table
            </span>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Join over 250,000 mindful home cooks who rely on FreshNutri for reliable test-kitchen recipes, 7-day grocery lists, and clinical nutrition without the fad diets.
            </p>
            <div className="pt-2">
              <button
                onClick={openNewsletter}
                className="px-6 py-3 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-2 shadow-sm"
              >
                <span>Subscribe to FreshNutri Weekly</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
