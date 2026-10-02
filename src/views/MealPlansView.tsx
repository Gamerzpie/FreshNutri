import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { allMealPlans } from '../data/mealPlans';
import { MealPlanCard } from '../components/MealPlanCard';
import { setPageSEO } from '../utils/seo';
import { Calendar, Search } from 'lucide-react';

export const MealPlansView: React.FC = () => {
  const [selectedDiet, setSelectedDiet] = useState<string>('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    setPageSEO({
      title: '7-Day Healthy Meal Plans with Grocery Lists | FreshNutri',
      description: 'Structured 7-day whole-food meal plans designed by registered dietitians with printable grocery checklists. Mediterranean, high-protein, and anti-inflammatory plans.',
      keywords: '7-day meal plans, healthy grocery list, weekly meal planning, mediterranean diet plan, high protein meal plan, eatingwell meal plans alternative, structured diet plans',
      canonicalPath: '/#/meal-plans',
      ogType: 'website',
    });
  }, []);

  const diets = [
    'All',
    'Mediterranean',
    'High-Protein',
    'Vegetarian',
    'Heart-Healthy',
    'Anti-Inflammatory',
    'Quick & Easy',
    'Meal-Prep',
    'Budget-Friendly',
    'Family-Friendly',
    'Blood Sugar Balance',
  ];

  const filteredPlans = useMemo(() => {
    return allMealPlans.filter((p) => {
      if (
        selectedDiet !== 'all' &&
        p.dietType.toLowerCase() !== selectedDiet.toLowerCase()
      ) {
        return false;
      }
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [selectedDiet, search]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header Deck */}
      <div className="border-b border-stone-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-emerald-800 font-semibold block mb-1">
            Weekly Planners
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-900">
            7-Day Curated Meal Plans
          </h1>
          <p className="mt-2 text-stone-600 text-sm max-w-xl">
            Complete seven-day dinner and meal frameworks with daily nutrition totals, batch-prep checklists, and categorized grocery lists.
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search meal plans..."
            className="w-full pl-9 pr-3.5 py-2 bg-white border border-stone-200 rounded-lg text-xs text-stone-800 focus:outline-none focus:border-emerald-600"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {diets.map((d) => (
          <button
            key={d}
            onClick={() => setSelectedDiet(d.toLowerCase())}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              selectedDiet === d.toLowerCase()
                ? 'bg-stone-900 text-white'
                : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
            }`}
          >
            {d} {d === 'All' ? `(${allMealPlans.length})` : ''}
          </button>
        ))}
      </div>

      {/* Meal Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPlans.map((plan) => (
          <MealPlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
};
