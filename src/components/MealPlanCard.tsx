import React, { useState } from 'react';
import { MealPlan } from '../types';
import { useApp } from '../context/AppContext';
import { Calendar, Flame, ArrowRight, Utensils } from 'lucide-react';

interface MealPlanCardProps {
  plan: MealPlan;
}

export const MealPlanCard: React.FC<MealPlanCardProps> = ({ plan }) => {
  const { navigate } = useApp();
  const [imgError, setImgError] = useState(false);

  return (
    <article
      onClick={() => navigate('meal-plan', { slug: plan.slug || plan.id })}
      className="group cursor-pointer bg-white rounded-xl border border-stone-200/90 overflow-hidden hover:border-stone-300 transition-all duration-200 flex flex-col h-full"
    >
      <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
        {!imgError ? (
          <img
            src={plan.heroImage}
            alt={plan.title}
            onError={() => setImgError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100 text-stone-400 p-4 text-center">
            <Utensils className="w-6 h-6 mb-1 text-stone-300" />
            <span className="text-xs font-serif italic text-stone-500">{plan.title}</span>
          </div>
        )}

        <div className="absolute top-3 left-3 bg-stone-900/85 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-md flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" />
          <span>7-Day Plan</span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-2 font-medium">
            <span className="text-emerald-800">{plan.dietType}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span className="tabular-nums font-mono">{plan.caloriesPerDay} cal/day</span>
            </span>
          </div>

          <h3 className="font-serif text-lg font-semibold text-stone-900 group-hover:text-emerald-800 transition-colors leading-snug">
            {plan.title}
          </h3>

          <p className="mt-2 text-xs text-stone-600 line-clamp-2 leading-relaxed">
            {plan.subtitle}
          </p>

          <div className="mt-3 flex flex-wrap gap-x-2 gap-y-1 text-[11px] text-stone-500">
            {plan.tags.slice(0, 3).map((tag, i) => (
              <span key={tag}>
                {tag}{i < Math.min(plan.tags.length - 1, 2) ? ' ·' : ''}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between">
          <span className="text-xs text-stone-500">Includes grocery list & prep</span>
          <span className="text-xs font-semibold text-stone-900 group-hover:text-emerald-700 flex items-center gap-1">
            Explore Plan <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </article>
  );
};
