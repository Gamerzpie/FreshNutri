import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { allMealPlans, getMealPlanById } from '../data/mealPlans';
import { authors } from '../data/authors';
import { setPageSEO, buildMealPlanSchema } from '../utils/seo';
import {
  Calendar,
  Clock,
  Flame,
  Check,
  Printer,
  Copy,
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  ListOrdered,
  Utensils,
} from 'lucide-react';

export const MealPlanDetailView: React.FC = () => {
  const { routeParams, goBack, navigate, showToast } = useApp();
  const slug = routeParams.slug || routeParams.id;
  const plan = getMealPlanById(slug) || allMealPlans[0];
  const author = authors.find((a) => a.id === plan.authorId);

  // Sync title, HowTo Schema, and scroll to top
  useEffect(() => {
    if (plan) {
      setPageSEO({
        title: `${plan.title} (7-Day Protocol) | FreshNutri Meal Plans`,
        description: plan.description,
        keywords: [
          ...plan.tags,
          plan.dietType,
          '7-day meal plan',
          'eatingwell meal plans alternative',
          'skinnytaste meal plan alternative',
          'healthy grocery checklist',
          'structured meal prep plan',
          'mediterranean diet meal plan',
        ].join(', '),
        canonicalPath: `/#/meal-plan/${plan.slug}`,
        ogImage: plan.heroImage,
        ogType: 'article',
        schema: buildMealPlanSchema(plan, author?.name || 'FreshNutri Test Kitchen'),
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [plan?.id]);

  const planIndex = useMemo(() => {
    return allMealPlans.findIndex((p) => p.id === plan.id);
  }, [plan.id]);

  const prevPlan = planIndex > 0 ? allMealPlans[planIndex - 1] : allMealPlans[allMealPlans.length - 1];
  const nextPlan = planIndex < allMealPlans.length - 1 ? allMealPlans[planIndex + 1] : allMealPlans[0];

  // Active day tab state (1 to 7)
  const [activeDayNumber, setActiveDayNumber] = useState<number>(1);

  // Interactive shopping list checking state
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleItemCheck = (key: string) => {
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyShoppingList = () => {
    let text = `GROCERY SHOPPING LIST: ${plan.title}\n\n`;
    plan.shoppingList.forEach((cat) => {
      text += `[${cat.category.toUpperCase()}]\n`;
      cat.items.forEach((item) => {
        text += `- ${item}\n`;
      });
      text += '\n';
    });
    navigator.clipboard.writeText(text);
    showToast('Grocery shopping list copied to clipboard!', 'success');
  };

  const currentDay = plan.days.find((d) => d.dayNumber === activeDayNumber) || plan.days[0];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Back button & Breadcrumb Bar */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-stone-500 border-b border-stone-200/80 pb-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => navigate('home')}
            className="hover:text-stone-900 transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <button
            onClick={() => navigate('meal-plans')}
            className="hover:text-stone-900 transition-colors font-semibold text-stone-700"
          >
            Meal Plans
          </button>
          <span>/</span>
          <span className="text-emerald-800 font-medium">{plan.dietType}</span>
          <span>/</span>
          <span className="truncate max-w-[200px] text-stone-900 font-semibold" title={plan.title}>
            {plan.title}
          </span>
        </div>

        {/* Meal Plan Pager */}
        <div className="flex items-center gap-2 self-end sm:self-auto font-mono text-[11px]">
          <span className="text-stone-400">
            Plan <strong className="text-stone-800">{planIndex >= 0 ? planIndex + 1 : 1}</strong> of {allMealPlans.length}
          </span>
          <span className="text-stone-300">·</span>
          <button
            onClick={() => navigate('meal-plan', { slug: prevPlan.slug })}
            className="px-2 py-1 bg-white hover:bg-stone-100 border border-stone-200 rounded-md text-stone-700 transition-colors flex items-center gap-1"
            title={`Previous plan: ${prevPlan.title}`}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Prev</span>
          </button>
          <button
            onClick={() => navigate('meal-plan', { slug: nextPlan.slug })}
            className="px-2 py-1 bg-white hover:bg-stone-100 border border-stone-200 rounded-md text-stone-700 transition-colors flex items-center gap-1"
            title={`Next plan: ${nextPlan.title}`}
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Plan Header */}
      <header className="space-y-4">
        <div className="flex items-center gap-2 text-xs text-stone-500 font-mono">
          <span className="text-emerald-800 font-semibold font-sans">{plan.dietType}</span>
          <span aria-hidden="true">·</span>
          <span>7-Day Protocol</span>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums font-sans">{plan.caloriesPerDay} Calories/Day Target</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-medium text-stone-900 tracking-tight leading-[1.18] text-balance">
          {plan.title}
        </h1>

        <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-sans max-w-3xl">
          {plan.description}
        </p>

        {/* Byline & Print/Copy Bar */}
        <div className="pt-3 border-y border-stone-200 py-3 flex flex-wrap items-center justify-between gap-4 text-xs">
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
                Curated by {author?.name || 'FreshNutri Dietitian Team'}
              </span>
              <span className="block text-[11px] text-stone-500">
                {author?.role} · {author?.credentials}
              </span>
            </div>
          </div>

          <div className="no-print flex items-center gap-2">
            <button
              onClick={handleCopyShoppingList}
              className="px-3 py-2 bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Grocery List</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-2 bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Plan</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Visual */}
      <div className="relative aspect-21/9 rounded-2xl overflow-hidden shadow-md bg-stone-100 border border-stone-200">
        <img
          src={plan.heroImage}
          alt={plan.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Batch Preparation Strategy Card */}
      <section className="bg-stone-50 p-6 sm:p-7 rounded-2xl border border-stone-200 space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">
          <ListOrdered className="w-4 h-4" />
          <span>Sunday Batch Prep Strategy</span>
        </div>
        <p className="text-xs text-stone-600">
          Follow these 3 time-saving kitchen rituals before Monday morning:
        </p>
        <ul className="space-y-2 text-xs sm:text-sm text-stone-700 list-disc list-inside">
          {plan.prepNotes.map((note, idx) => (
            <li key={idx} className="leading-relaxed">
              {note}
            </li>
          ))}
        </ul>
      </section>

      {/* 7-Day Interactive Day View */}
      <section className="space-y-6">
        <div className="border-b border-stone-200 pb-3 flex items-center justify-between">
          <h2 className="font-serif text-2xl font-semibold text-stone-900">
            7-Day Meal Calendar
          </h2>
          <span className="text-xs text-stone-500 font-mono">
            {currentDay.dayName} Target: {currentDay.dailyCalories} kcal · {currentDay.dailyProtein}g protein · {currentDay.dailyFiber}g fiber
          </span>
        </div>

        {/* Day Tabs (1 to 7) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {plan.days.map((d) => (
            <button
              key={d.dayNumber}
              onClick={() => setActiveDayNumber(d.dayNumber)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex flex-col items-center gap-0.5 min-w-[90px] border ${
                activeDayNumber === d.dayNumber
                  ? 'bg-stone-900 border-stone-900 text-white shadow-sm'
                  : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
            >
              <span className="text-[10px] uppercase tracking-wider opacity-80">
                Day {d.dayNumber}
              </span>
              <span>{d.dayName}</span>
            </button>
          ))}
        </div>

        {/* Active Day Meal Breakdown Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Breakfast */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center justify-between text-xs text-stone-500 font-semibold uppercase tracking-wider mb-2">
                <span className="text-emerald-800">Breakfast</span>
                <span className="font-mono tabular-nums">{currentDay.breakfast.calories} kcal</span>
              </div>
              <h3 className="font-serif text-base font-semibold text-stone-900 leading-snug">
                {currentDay.breakfast.title}
              </h3>
              <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                {currentDay.breakfast.description}
              </p>
            </div>

            {currentDay.breakfast.recipeId && (
              <div className="mt-4 pt-3 border-t border-stone-100">
                <button
                  onClick={() => navigate('recipe', { slug: currentDay.breakfast.recipeId! })}
                  className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
                >
                  View Full Recipe <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          {/* Lunch */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center justify-between text-xs text-stone-500 font-semibold uppercase tracking-wider mb-2">
                <span className="text-emerald-800">Lunch</span>
                <span className="font-mono tabular-nums">{currentDay.lunch.calories} kcal</span>
              </div>
              <h3 className="font-serif text-base font-semibold text-stone-900 leading-snug">
                {currentDay.lunch.title}
              </h3>
              <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                {currentDay.lunch.description}
              </p>
            </div>

            {currentDay.lunch.recipeId && (
              <div className="mt-4 pt-3 border-t border-stone-100">
                <button
                  onClick={() => navigate('recipe', { slug: currentDay.lunch.recipeId! })}
                  className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
                >
                  View Full Recipe <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          {/* Dinner */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center justify-between text-xs text-stone-500 font-semibold uppercase tracking-wider mb-2">
                <span className="text-emerald-800">Dinner</span>
                <span className="font-mono tabular-nums">{currentDay.dinner.calories} kcal</span>
              </div>
              <h3 className="font-serif text-base font-semibold text-stone-900 leading-snug">
                {currentDay.dinner.title}
              </h3>
              <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                {currentDay.dinner.description}
              </p>
            </div>

            {currentDay.dinner.recipeId && (
              <div className="mt-4 pt-3 border-t border-stone-100">
                <button
                  onClick={() => navigate('recipe', { slug: currentDay.dinner.recipeId! })}
                  className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
                >
                  View Full Recipe <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Snacks Strip */}
        <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-stone-800 font-semibold uppercase tracking-wider">
            <Utensils className="w-4 h-4 text-emerald-800" />
            <span>Recommended Snacks:</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-stone-700">
            {currentDay.snacks.map((snack, idx) => (
              <div key={idx} className="flex items-center gap-1.5 font-medium">
                <span>{snack.title}</span>
                <span className="font-mono text-stone-400 tabular-nums">({snack.calories} kcal)</span>
                {idx < currentDay.snacks.length - 1 && <span className="text-stone-300">·</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categorized Grocery Shopping List with Interactive Checking */}
      <section className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-emerald-800" />
              <h2 className="font-serif text-2xl font-semibold text-stone-900">
                Complete Weekly Grocery List
              </h2>
            </div>
            <p className="text-xs text-stone-500 mt-1">
              Organized by supermarket aisle. Check off items as you shop.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyShoppingList}
              className="px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy List</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plan.shoppingList.map((category) => (
            <div key={category.category} className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900 pb-1 border-b border-stone-200">
                {category.category}
              </h3>
              <ul className="space-y-2">
                {category.items.map((item, idx) => {
                  const key = `${category.category}-${idx}`;
                  const isChecked = !!checkedItems[key];
                  return (
                    <li
                      key={idx}
                      onClick={() => toggleItemCheck(key)}
                      className={`text-xs flex items-start gap-2.5 cursor-pointer p-1 rounded transition-colors ${
                        isChecked ? 'text-stone-400 line-through' : 'text-stone-800 hover:text-stone-950'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
                          isChecked
                            ? 'bg-emerald-700 border-emerald-700 text-white'
                            : 'border-stone-300 bg-white'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3" />}
                      </div>
                      <span className="leading-snug">{item}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Dedicated Meal Plan Page Navigator */}
      <section className="no-print pt-6 border-t-2 border-stone-200 space-y-4">
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono uppercase tracking-wider text-stone-500 font-semibold">
            Meal Plan Protocol Navigation · Plan {planIndex >= 0 ? planIndex + 1 : 1} of {allMealPlans.length}
          </span>
          <button
            onClick={() => navigate('meal-plans')}
            className="text-emerald-800 hover:text-emerald-950 font-semibold flex items-center gap-1 transition-colors"
          >
            <span>All Meal Plans</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Previous Plan Card */}
          <div
            onClick={() => navigate('meal-plan', { slug: prevPlan.slug })}
            className="group cursor-pointer p-4 bg-white hover:bg-stone-50 rounded-2xl border border-stone-200 transition-all hover:border-emerald-700 flex items-center gap-4"
          >
            <img
              src={prevPlan.heroImage}
              alt=""
              className="w-16 h-16 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform"
            />
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block mb-0.5 flex items-center gap-1">
                <ChevronLeft className="w-3 h-3 text-emerald-700" />
                <span>Previous Meal Plan</span>
              </span>
              <h4 className="font-serif text-sm font-semibold text-stone-900 group-hover:text-emerald-900 transition-colors line-clamp-1">
                {prevPlan.title}
              </h4>
              <span className="text-[11px] text-stone-500 font-mono">
                {prevPlan.dietType} · 7-Day Protocol
              </span>
            </div>
          </div>

          {/* Next Plan Card */}
          <div
            onClick={() => navigate('meal-plan', { slug: nextPlan.slug })}
            className="group cursor-pointer p-4 bg-white hover:bg-stone-50 rounded-2xl border border-stone-200 transition-all hover:border-emerald-700 flex items-center gap-4 text-right sm:flex-row-reverse"
          >
            <img
              src={nextPlan.heroImage}
              alt=""
              className="w-16 h-16 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform"
            />
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block mb-0.5 flex items-center justify-end gap-1">
                <span>Next Meal Plan</span>
                <ChevronRight className="w-3 h-3 text-emerald-700" />
              </span>
              <h4 className="font-serif text-sm font-semibold text-stone-900 group-hover:text-emerald-900 transition-colors line-clamp-1">
                {nextPlan.title}
              </h4>
              <span className="text-[11px] text-stone-500 font-mono">
                {nextPlan.dietType} · 7-Day Protocol
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
