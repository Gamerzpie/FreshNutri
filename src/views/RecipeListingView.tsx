import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { allRecipes } from '../data/recipes';
import { RecipeCard } from '../components/RecipeCard';
import { setPageSEO } from '../utils/seo';
import {
  DifficultyLevel,
  Cuisine,
  CookingMethod,
  DietaryTag,
  Season,
} from '../types';
import {
  Search,
  SlidersHorizontal,
  X,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from 'lucide-react';

export const RecipeListingView: React.FC = () => {
  const { routeParams, customRecipes } = useApp();

  // Combine standard and custom recipes
  const allAvailableRecipes = useMemo(() => {
    return [...allRecipes, ...customRecipes];
  }, [customRecipes]);

  // Filter States
  const [search, setSearch] = useState('');
  const [selectedMealType, setSelectedMealType] = useState<string>(
    routeParams.sub || 'all'
  );
  const [selectedCuisine, setSelectedCuisine] = useState<string>('all');
  const [selectedMethod, setSelectedMethod] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedDiet, setSelectedDiet] = useState<string>('all');
  const [selectedSeason, setSelectedSeason] = useState<string>('all');
  const [maxTime, setMaxTime] = useState<number>(60);
  const [minProtein, setMinProtein] = useState<number>(0);
  const [maxCalories, setMaxCalories] = useState<number>(700);
  const [sortBy, setSortBy] = useState<'rating' | 'newest' | 'quickest' | 'calories'>('rating');

  // Pagination States
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(12);

  // Set document title and rich catalog SEO
  useEffect(() => {
    setPageSEO({
      title: 'Searchable Healthy Recipes Directory | FreshNutri Kitchen',
      description: 'Explore whole-food, chef-tested healthy recipes with live macro nutrition calculations. The clutter-free, verified alternative to Allrecipes and EatingWell.',
      keywords: [
        'all healthy recipes',
        'recipe database',
        'allrecipes alternative',
        'clean eating recipes',
        'nyt cooking alternative recipes',
        'dietitian tested dinners',
        'macro friendly recipes',
        'whole food recipe catalog',
      ].join(', '),
      canonicalPath: '/#/recipes',
      ogType: 'website',
    });
  }, []);

  // Reset to Page 1 when any filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    selectedMealType,
    selectedCuisine,
    selectedMethod,
    selectedDifficulty,
    selectedDiet,
    selectedSeason,
    maxTime,
    minProtein,
    maxCalories,
    sortBy,
    itemsPerPage,
  ]);

  // Mobile filter drawer state
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Available options
  const mealTypes = [
    'All',
    'Breakfast',
    'Lunch',
    'Dinner',
    'Salads',
    'Soups',
    'Main Dishes',
    'Side Dishes',
    'Appetizers',
    'Desserts',
    'Snacks',
    'Smoothies',
    'Baking',
    'Pasta',
    'Rice & Grains',
    'Seafood',
    'Chicken',
    'Beef',
    'Vegetarian',
    'Vegan',
  ];

  const cuisines: Cuisine[] = [
    'Mediterranean',
    'Asian',
    'Mexican',
    'Italian',
    'American',
    'Middle Eastern',
    'Indian',
    'French',
    'Global Fusion',
  ];

  const methods: CookingMethod[] = [
    'One-Pot',
    'Baking',
    'Air Fryer',
    'Grilling',
    'Slow Cooker',
    'No-Cook',
    'Stovetop',
    'Sheet Pan',
    'Roasting',
  ];

  const diets: DietaryTag[] = [
    'High-Protein',
    'Heart-Healthy',
    'DASH (Low-Sodium)',
    'Diabetes-Friendly',
    'Kidney-Friendly',
    'Low-Cholesterol',
    'Anti-Inflammatory',
    'Low-FODMAP',
    'Low-Purine (Gout)',
    'Vegetarian',
    'Vegan',
    'Gluten-Free',
    'Dairy-Free',
    'Low-Carb',
  ];

  const seasons: Season[] = ['Spring', 'Summer', 'Fall', 'Winter', 'Year-Round'];

  // Reset all filters
  const resetFilters = () => {
    setSearch('');
    setSelectedMealType('all');
    setSelectedCuisine('all');
    setSelectedMethod('all');
    setSelectedDifficulty('all');
    setSelectedDiet('all');
    setSelectedSeason('all');
    setMaxTime(60);
    setMinProtein(0);
    setMaxCalories(700);
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedMealType !== 'all') count++;
    if (selectedCuisine !== 'all') count++;
    if (selectedMethod !== 'all') count++;
    if (selectedDifficulty !== 'all') count++;
    if (selectedDiet !== 'all') count++;
    if (selectedSeason !== 'all') count++;
    if (maxTime < 60) count++;
    if (minProtein > 0) count++;
    if (maxCalories < 700) count++;
    if (search.trim()) count++;
    return count;
  }, [
    selectedMealType,
    selectedCuisine,
    selectedMethod,
    selectedDifficulty,
    selectedDiet,
    selectedSeason,
    maxTime,
    minProtein,
    maxCalories,
    search,
  ]);

  // Filtered & sorted recipe list
  const filteredRecipes = useMemo(() => {
    let list = allAvailableRecipes.filter((r) => {
      // Search text
      if (search.trim()) {
        const q = search.toLowerCase();
        const matches =
          r.title.toLowerCase().includes(q) ||
          r.shortDescription.toLowerCase().includes(q) ||
          r.mainIngredient.toLowerCase().includes(q) ||
          r.ingredients.some((ing) => ing.name.toLowerCase().includes(q));
        if (!matches) return false;
      }

      // Meal type
      if (
        selectedMealType !== 'all' &&
        !r.mealType.some(
          (m) => m.toLowerCase() === selectedMealType.toLowerCase()
        )
      ) {
        return false;
      }

      // Cuisine
      if (
        selectedCuisine !== 'all' &&
        r.cuisine.toLowerCase() !== selectedCuisine.toLowerCase()
      ) {
        return false;
      }

      // Cooking method
      if (
        selectedMethod !== 'all' &&
        r.cookingMethod.toLowerCase() !== selectedMethod.toLowerCase()
      ) {
        return false;
      }

      // Difficulty
      if (
        selectedDifficulty !== 'all' &&
        r.difficulty.toLowerCase() !== selectedDifficulty.toLowerCase()
      ) {
        return false;
      }

      // Diet
      if (
        selectedDiet !== 'all' &&
        !r.dietaryTags.some(
          (d) => d.toLowerCase() === selectedDiet.toLowerCase()
        )
      ) {
        return false;
      }

      // Season
      if (
        selectedSeason !== 'all' &&
        r.seasonal.toLowerCase() !== selectedSeason.toLowerCase() &&
        r.seasonal !== 'Year-Round'
      ) {
        return false;
      }

      // Sliders
      if (r.totalTime > maxTime) return false;
      if (r.nutrition.protein < minProtein) return false;
      if (r.nutrition.calories > maxCalories) return false;

      return true;
    });

    // Sorting
    if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'quickest') {
      list.sort((a, b) => a.totalTime - b.totalTime);
    } else if (sortBy === 'calories') {
      list.sort((a, b) => a.nutrition.calories - b.nutrition.calories);
    } else if (sortBy === 'newest') {
      list.sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    }

    return list;
  }, [
    allAvailableRecipes,
    search,
    selectedMealType,
    selectedCuisine,
    selectedMethod,
    selectedDifficulty,
    selectedDiet,
    selectedSeason,
    maxTime,
    minProtein,
    maxCalories,
    sortBy,
  ]);

  // Pagination Calculations
  const totalPages = Math.max(1, Math.ceil(filteredRecipes.length / itemsPerPage));

  const paginatedRecipes = useMemo(() => {
    if (itemsPerPage >= 999) return filteredRecipes;
    const start = (currentPage - 1) * itemsPerPage;
    return filteredRecipes.slice(start, start + itemsPerPage);
  }, [filteredRecipes, currentPage, itemsPerPage]);

  const handlePageChange = (newPage: number) => {
    const pageNum = Math.max(1, Math.min(newPage, totalPages));
    setCurrentPage(pageNum);
    const catalogHeader = document.getElementById('recipe-catalog-header');
    if (catalogHeader) {
      catalogHeader.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div id="recipe-catalog-header" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="border-b border-stone-200 pb-6">
        <span className="text-xs uppercase tracking-wider text-emerald-800 font-semibold block mb-1">
          Recipe Database
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-900">
          Searchable Healthy Recipes
        </h1>
        <p className="mt-2 text-stone-600 text-sm max-w-2xl">
          Discover {allRecipes.length} whole-food recipes tested in our test kitchen. Filter simultaneously by meal type, cuisine, cooking method, dietary preferences, and nutritional targets.
        </p>
      </div>

      {/* Main Container with Sidebar Filters & Recipe Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar Filter (Desktop) */}
        <aside className="hidden lg:block lg:col-span-3 bg-white p-6 rounded-2xl border border-stone-200 space-y-6 shadow-2xs sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-stone-500" />
              Filter Recipes
            </span>
            {activeFilterCount > 0 && (
              <button
                onClick={resetFilters}
                className="text-xs text-emerald-800 hover:text-emerald-950 font-medium flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                Reset ({activeFilterCount})
              </button>
            )}
          </div>

          {/* Meal Type */}
          <div>
            <label className="block text-xs font-semibold text-stone-900 mb-2">
              Meal Type / Course
            </label>
            <select
              value={selectedMealType}
              onChange={(e) => setSelectedMealType(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 text-stone-800 text-xs rounded-lg p-2.5 focus:outline-none focus:border-emerald-600"
            >
              {mealTypes.map((m) => (
                <option key={m} value={m.toLowerCase()}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* Dietary Preference */}
          <div>
            <label className="block text-xs font-semibold text-stone-900 mb-2">
              Dietary Preference
            </label>
            <select
              value={selectedDiet}
              onChange={(e) => setSelectedDiet(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 text-stone-800 text-xs rounded-lg p-2.5 focus:outline-none focus:border-emerald-600"
            >
              <option value="all">All Dietary Preferences</option>
              {diets.map((d) => (
                <option key={d} value={d.toLowerCase()}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Cuisine */}
          <div>
            <label className="block text-xs font-semibold text-stone-900 mb-2">
              Cuisine
            </label>
            <select
              value={selectedCuisine}
              onChange={(e) => setSelectedCuisine(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 text-stone-800 text-xs rounded-lg p-2.5 focus:outline-none focus:border-emerald-600"
            >
              <option value="all">All Cuisines</option>
              {cuisines.map((c) => (
                <option key={c} value={c.toLowerCase()}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Cooking Method */}
          <div>
            <label className="block text-xs font-semibold text-stone-900 mb-2">
              Cooking Method
            </label>
            <select
              value={selectedMethod}
              onChange={(e) => setSelectedMethod(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 text-stone-800 text-xs rounded-lg p-2.5 focus:outline-none focus:border-emerald-600"
            >
              <option value="all">All Cooking Methods</option>
              {methods.map((m) => (
                <option key={m} value={m.toLowerCase()}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-xs font-semibold text-stone-900 mb-2">
              Difficulty
            </label>
            <div className="grid grid-cols-3 gap-1 bg-stone-100 p-1 rounded-lg">
              {['all', 'Easy', 'Medium'].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSelectedDifficulty(lvl.toLowerCase())}
                  className={`py-1 text-xs font-medium rounded transition-colors ${
                    selectedDifficulty === lvl.toLowerCase()
                      ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {lvl === 'all' ? 'All' : lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Range Sliders for Nutrition & Time */}
          <div className="pt-4 border-t border-stone-200 space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-stone-800">Max Total Time</span>
                <span className="font-mono text-stone-500 tabular-nums">
                  {maxTime === 60 ? 'Any' : `< ${maxTime} mins`}
                </span>
              </div>
              <input
                type="range"
                min="15"
                max="60"
                step="5"
                value={maxTime}
                onChange={(e) => setMaxTime(Number(e.target.value))}
                className="w-full accent-emerald-800 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-stone-800">Min Protein</span>
                <span className="font-mono text-stone-500 tabular-nums">
                  {minProtein === 0 ? 'Any' : `> ${minProtein}g`}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                step="5"
                value={minProtein}
                onChange={(e) => setMinProtein(Number(e.target.value))}
                className="w-full accent-emerald-800 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-stone-800">Max Calories</span>
                <span className="font-mono text-stone-500 tabular-nums">
                  {maxCalories === 700 ? 'Any' : `< ${maxCalories} kcal`}
                </span>
              </div>
              <input
                type="range"
                min="250"
                max="700"
                step="25"
                value={maxCalories}
                onChange={(e) => setMaxCalories(Number(e.target.value))}
                className="w-full accent-emerald-800 cursor-pointer"
              />
            </div>
          </div>
        </aside>

        {/* Right Recipe Grid & Search Controls */}
        <div className="lg:col-span-9 space-y-6">
          {/* Top Control Bar: Search input, Sort selector, Mobile filter trigger */}
          <div className="bg-white p-4 rounded-xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Filter by keyword or ingredient..."
                className="w-full pl-9 pr-8 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-emerald-600"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center justify-between w-full sm:w-auto gap-3">
              {/* Mobile Filter Toggle Button */}
              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="lg:hidden px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium rounded-lg flex items-center gap-1.5"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}</span>
              </button>

              <div className="flex items-center gap-2 text-xs text-stone-600">
                <span className="hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-stone-50 border border-stone-200 text-stone-800 rounded-lg px-2.5 py-1.5 focus:outline-none text-xs"
                >
                  <option value="rating">Highest Rated</option>
                  <option value="quickest">Quickest</option>
                  <option value="calories">Lowest Calorie</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Filter Chips / Pills (Interactive Button Controls) */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="text-stone-500 font-medium">Active Filters:</span>
              {selectedMealType !== 'all' && (
                <button
                  onClick={() => setSelectedMealType('all')}
                  className="px-2.5 py-1 bg-white border border-stone-300 rounded-md text-stone-800 hover:bg-stone-100 flex items-center gap-1"
                >
                  Meal: {selectedMealType} <X className="w-3 h-3 text-stone-400" />
                </button>
              )}
              {selectedDiet !== 'all' && (
                <button
                  onClick={() => setSelectedDiet('all')}
                  className="px-2.5 py-1 bg-white border border-stone-300 rounded-md text-stone-800 hover:bg-stone-100 flex items-center gap-1"
                >
                  Diet: {selectedDiet} <X className="w-3 h-3 text-stone-400" />
                </button>
              )}
              {selectedCuisine !== 'all' && (
                <button
                  onClick={() => setSelectedCuisine('all')}
                  className="px-2.5 py-1 bg-white border border-stone-300 rounded-md text-stone-800 hover:bg-stone-100 flex items-center gap-1"
                >
                  Cuisine: {selectedCuisine} <X className="w-3 h-3 text-stone-400" />
                </button>
              )}
              {minProtein > 0 && (
                <button
                  onClick={() => setMinProtein(0)}
                  className="px-2.5 py-1 bg-white border border-stone-300 rounded-md text-stone-800 hover:bg-stone-100 flex items-center gap-1"
                >
                  Protein: &gt;{minProtein}g <X className="w-3 h-3 text-stone-400" />
                </button>
              )}
              <button
                onClick={resetFilters}
                className="text-xs text-red-600 hover:underline ml-1"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Recipe Count & Pagination Header Indicator */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-stone-500 border-b border-stone-200 pb-3">
            <div>
              <span>
                Showing{' '}
                <strong className="text-stone-900 font-mono tabular-nums">
                  {filteredRecipes.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}–
                  {Math.min(currentPage * itemsPerPage, filteredRecipes.length)}
                </strong>{' '}
                of{' '}
                <strong className="text-stone-900 font-mono tabular-nums">
                  {filteredRecipes.length}
                </strong>{' '}
                recipes
              </span>
              {totalPages > 1 && (
                <span className="text-stone-400 font-mono ml-2">
                  (Page {currentPage} of {totalPages})
                </span>
              )}
            </div>

            {/* Per-Page Selector */}
            <div className="flex items-center gap-1.5 self-end sm:self-auto font-mono text-[11px]">
              <span className="text-stone-400">Per page:</span>
              {[12, 24, 48].map((size) => (
                <button
                  key={size}
                  onClick={() => setItemsPerPage(size)}
                  className={`px-2 py-0.5 rounded-md transition-colors ${
                    itemsPerPage === size
                      ? 'bg-stone-900 text-white font-bold'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {size}
                </button>
              ))}
              <button
                onClick={() => setItemsPerPage(9999)}
                className={`px-2 py-0.5 rounded-md transition-colors ${
                  itemsPerPage === 9999
                    ? 'bg-stone-900 text-white font-bold'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                All
              </button>
            </div>
          </div>

          {/* Recipe Grid */}
          {filteredRecipes.length > 0 ? (
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedRecipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>

              {/* Numbered Pagination Navigation Bar */}
              {totalPages > 1 && (
                <div className="p-4 bg-white rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
                  <div className="text-xs text-stone-500 font-mono">
                    Page <strong className="text-stone-900 font-bold">{currentPage}</strong> of{' '}
                    <strong className="text-stone-900 font-bold">{totalPages}</strong>
                  </div>

                  {/* Page Buttons Strip */}
                  <div className="flex items-center gap-1.5 flex-wrap justify-center">
                    {/* Previous Button */}
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage <= 1}
                      className="px-3 py-1.5 rounded-lg border border-stone-300 text-xs font-semibold flex items-center gap-1 transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-stone-100 hover:border-stone-400 text-stone-700"
                      aria-label="Previous Page"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Previous</span>
                    </button>

                    {/* Numeric Pages */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => {
                      // Smart ellipsis for many pages
                      if (
                        totalPages > 8 &&
                        pg !== 1 &&
                        pg !== totalPages &&
                        Math.abs(pg - currentPage) > 2
                      ) {
                        if (pg === 2 || pg === totalPages - 1) {
                          return (
                            <span key={pg} className="px-1 text-stone-400 font-mono">
                              …
                            </span>
                          );
                        }
                        return null;
                      }

                      const isActive = pg === currentPage;
                      return (
                        <button
                          key={pg}
                          onClick={() => handlePageChange(pg)}
                          className={`w-8 h-8 rounded-lg text-xs font-mono font-semibold transition-all ${
                            isActive
                              ? 'bg-stone-900 border border-stone-900 text-white shadow-2xs'
                              : 'bg-white border border-stone-200 hover:bg-stone-100 hover:border-stone-400 text-stone-700'
                          }`}
                          aria-label={`Go to page ${pg}`}
                        >
                          {pg}
                        </button>
                      );
                    })}

                    {/* Next Button */}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage >= totalPages}
                      className="px-3 py-1.5 rounded-lg border border-stone-300 text-xs font-semibold flex items-center gap-1 transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-stone-100 hover:border-stone-400 text-stone-700"
                      aria-label="Next Page"
                    >
                      <span className="hidden sm:inline">Next</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Fast Jump Indicator */}
                  <div className="text-[11px] font-mono text-stone-400">
                    Use &larr; / &rarr; to browse
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="py-16 text-center bg-white rounded-2xl border border-stone-200 p-8">
              <p className="font-serif text-lg text-stone-800">
                No recipes match your selected filters.
              </p>
              <p className="text-xs text-stone-500 mt-1 mb-4">
                Try widening your search or clearing one of your dietary constraints.
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-stone-800"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
