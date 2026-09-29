import React, { useState } from 'react';
import { Recipe } from '../types';
import { useApp } from '../context/AppContext';
import { Clock, Star, Bookmark, ChefHat, ArrowUpRight } from 'lucide-react';

interface RecipeCardProps {
  recipe: Recipe;
  layout?: 'standard' | 'compact' | 'horizontal';
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, layout = 'standard' }) => {
  const { navigate, isRecipeSaved, toggleSaveRecipe } = useApp();
  const saved = isRecipeSaved(recipe.id);
  const [imgError, setImgError] = useState(false);

  const handleCardClick = () => {
    navigate('recipe', { slug: recipe.slug || recipe.id });
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSaveRecipe(recipe.id);
  };

  if (layout === 'horizontal') {
    return (
      <article
        onClick={handleCardClick}
        className="group cursor-pointer bg-white rounded-xl border border-stone-200/90 overflow-hidden hover:border-stone-300 transition-all duration-200 flex flex-col sm:flex-row"
      >
        <div className="relative sm:w-2/5 aspect-4/3 sm:aspect-auto overflow-hidden bg-stone-100 shrink-0">
          {!imgError ? (
            <img
              src={recipe.heroImage}
              alt={recipe.title}
              onError={() => setImgError(true)}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100 text-stone-400 p-4 text-center">
              <ChefHat className="w-8 h-8 mb-1 text-stone-300" />
              <span className="text-xs font-serif italic text-stone-500">{recipe.title}</span>
            </div>
          )}
        </div>

        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            {/* Zero-Pill Unboxed Metadata */}
            <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
              <span className="font-medium text-emerald-800">{recipe.mealType[0] || 'Recipe'}</span>
              <span aria-hidden="true">·</span>
              <span>{recipe.cuisine}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-stone-400" />
                <span className="tabular-nums">{recipe.totalTime} mins</span>
              </span>
            </div>

            <h3 className="font-serif text-lg font-semibold text-stone-900 group-hover:text-emerald-800 transition-colors line-clamp-2 leading-snug">
              {recipe.title}
            </h3>

            <p className="mt-2 text-xs text-stone-600 line-clamp-2 leading-relaxed">
              {recipe.shortDescription}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-stone-700">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-medium tabular-nums">{recipe.rating.toFixed(1)}</span>
              <span className="text-stone-400">({recipe.reviewsCount})</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveClick}
                className={`p-1.5 rounded-lg transition-colors ${
                  saved
                    ? 'text-emerald-700 bg-emerald-50'
                    : 'text-stone-400 hover:text-stone-700 hover:bg-stone-100'
                }`}
                title={saved ? 'Remove from saved' : 'Save recipe'}
                aria-label="Save recipe"
              >
                <Bookmark className={`w-4 h-4 ${saved ? 'fill-emerald-700' : ''}`} />
              </button>
              <span className="text-xs font-semibold text-stone-900 group-hover:text-emerald-700 flex items-center gap-0.5">
                View <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      onClick={handleCardClick}
      className="group cursor-pointer bg-white rounded-xl border border-stone-200/90 overflow-hidden hover:border-stone-300 transition-all duration-200 flex flex-col h-full"
    >
      {/* Recipe Photo */}
      <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
        {!imgError ? (
          <img
            src={recipe.heroImage}
            alt={recipe.title}
            onError={() => setImgError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100 text-stone-400 p-4 text-center">
            <ChefHat className="w-8 h-8 mb-1 text-stone-300" />
            <span className="text-xs font-serif italic text-stone-500">{recipe.title}</span>
          </div>
        )}

        {/* Save Bookmark Button */}
        <button
          onClick={handleSaveClick}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md shadow-sm transition-all ${
            saved
              ? 'bg-emerald-800 text-white'
              : 'bg-white/90 text-stone-700 hover:bg-white hover:text-stone-900'
          }`}
          title={saved ? 'Remove from saved' : 'Save recipe'}
          aria-label="Save recipe"
        >
          <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
        </button>

        {recipe.quickAndEasy && (
          <div className="absolute bottom-3 left-3 bg-stone-900/80 backdrop-blur-sm text-stone-100 text-[11px] font-medium px-2.5 py-0.5 rounded-md">
            Under 30 mins
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Zero-Pill Unboxed Text Metadata */}
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
            <span className="font-medium text-emerald-800">{recipe.mealType[0] || 'Recipe'}</span>
            <span aria-hidden="true">·</span>
            <span>{recipe.cuisine}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{recipe.difficulty}</span>
          </div>

          <h3 className="font-serif text-base sm:text-lg font-semibold text-stone-900 group-hover:text-emerald-800 transition-colors line-clamp-2 leading-snug">
            {recipe.title}
          </h3>

          <p className="mt-2 text-xs text-stone-600 line-clamp-2 leading-relaxed">
            {recipe.shortDescription}
          </p>

          {/* Clean Dietary Sub-text */}
          {recipe.dietaryTags.length > 0 && (
            <div className="mt-3 flex items-center gap-1.5 text-[11px] text-stone-500 truncate">
              {recipe.dietaryTags.slice(0, 3).map((tag, idx) => (
                <React.Fragment key={tag}>
                  <span>{tag}</span>
                  {idx < Math.min(recipe.dietaryTags.length - 1, 2) && (
                    <span aria-hidden="true" className="text-stone-300">/</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>

        {/* Footer Metrics */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-stone-400" />
            <span className="tabular-nums font-medium">{recipe.totalTime} mins</span>
          </div>

          <div className="flex items-center gap-1 text-stone-800">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-semibold tabular-nums">{recipe.rating.toFixed(1)}</span>
            <span className="text-stone-400">({recipe.reviewsCount})</span>
          </div>
        </div>
      </div>
    </article>
  );
};
