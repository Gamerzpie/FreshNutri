import React, { useState, useEffect, useCallback } from 'react';
import { Recipe } from '../types';
import { useApp } from '../context/AppContext';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Star,
  Bookmark,
  ArrowRight,
  Flame,
  Pause,
  Play,
  Camera,
  ChefHat
} from 'lucide-react';

interface RecipeSlideshowProps {
  recipes: Recipe[];
  autoPlayInterval?: number;
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1600&q=80';

export const RecipeSlideshow: React.FC<RecipeSlideshowProps> = ({
  recipes,
  autoPlayInterval = 5000,
}) => {
  const { navigate, isRecipeSaved, toggleSaveRecipe } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [imageError, setImageError] = useState<Record<string, boolean>>({});
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const slides = recipes.length > 0 ? recipes : [];
  const currentRecipe = slides[currentIndex] || slides[0];

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Autoplay timer
  useEffect(() => {
    if (!isPlaying || slides.length <= 1) return;

    const timer = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [isPlaying, autoPlayInterval, slides.length, nextSlide, currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) nextSlide();
    if (distance < -50) prevSlide();
  };

  if (!currentRecipe) return null;

  const isSaved = isRecipeSaved(currentRecipe.id);

  // Resolved picture URL with fallback
  const currentImageUrl = imageError[currentRecipe.id]
    ? FALLBACK_IMAGE
    : currentRecipe.heroImage || FALLBACK_IMAGE;

  const slideBadges = [
    'Test Kitchen Pick',
    'Quick 22-Min Favorite',
    'Anti-Inflammatory Spotlight',
    'High-Protein Essential',
    'DASH & Heart-Healthy',
    'One-Pot Comfort',
    'Fresh & Elegant Crudo',
    'Fiber-Rich Skillet',
  ];
  const activeBadge = slideBadges[currentIndex % slideBadges.length];

  return (
    <div
      className="relative bg-white rounded-3xl border border-stone-200/90 shadow-lg overflow-hidden"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="Recipe Picture Slideshow"
    >
      {/* Top Header Ribbon */}
      <div className="px-5 sm:px-8 py-3.5 bg-[#FAF9F5] border-b border-stone-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Camera className="w-4 h-4 text-emerald-700" />
          <span className="text-xs font-bold uppercase tracking-wider text-stone-900 font-mono">
            Featured Recipe Gallery Slideshow
          </span>
          <span className="text-stone-300">·</span>
          <span className="text-xs font-mono text-emerald-800 font-semibold">
            Picture {currentIndex + 1} of {slides.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Autoplay Play/Pause */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-2.5 py-1 text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 rounded-md transition-colors text-xs flex items-center gap-1.5"
            title={isPlaying ? 'Pause auto-slide' : 'Resume auto-slide'}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span className="text-[11px] font-mono hidden sm:inline">Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-700" />
                <span className="text-[11px] font-mono hidden sm:inline text-emerald-800">Play</span>
              </>
            )}
          </button>

          {/* Prev/Next buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full border border-stone-300 hover:border-stone-900 bg-white hover:bg-stone-100 text-stone-700 hover:text-stone-950 transition-all shadow-2xs"
              aria-label="Previous recipe picture"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full border border-stone-300 hover:border-stone-900 bg-white hover:bg-stone-100 text-stone-700 hover:text-stone-950 transition-all shadow-2xs"
              aria-label="Next recipe picture"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Slide: Picture and Narrative */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
        {/* Dominant Hero Picture (Mobile: Top, Desktop: Right 7 columns) */}
        <div
          onClick={() => navigate('recipe', { slug: currentRecipe.slug })}
          className="order-1 lg:order-2 lg:col-span-7 relative group cursor-pointer overflow-hidden bg-stone-900 min-h-[340px] sm:min-h-[420px] lg:min-h-[480px]"
        >
          {/* Main Recipe Picture */}
          <img
            key={currentRecipe.id}
            src={currentImageUrl}
            alt={currentRecipe.title}
            onError={() => setImageError((prev) => ({ ...prev, [currentRecipe.id]: true }))}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="eager"
          />

          {/* Subtle gradient vignette for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-black/20 pointer-events-none" />

          {/* Floating Picture Badges */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-3 py-1.5 bg-black/60 backdrop-blur-md text-white text-xs font-semibold rounded-full border border-white/20 flex items-center gap-1.5 shadow-sm">
              <Camera className="w-3.5 h-3.5 text-emerald-400" />
              <span>Full HD Photography</span>
            </span>
          </div>

          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-stone-900 border border-stone-200 shadow-md flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-amber-600" />
            <span>Ready in {currentRecipe.totalTime} mins</span>
          </div>

          {/* On-Image Title Bar for Mobile */}
          <div className="absolute bottom-4 left-4 right-4 text-white lg:hidden">
            <span className="text-xs uppercase tracking-wider text-emerald-300 font-semibold block mb-1 drop-shadow">
              {currentRecipe.cuisine} · {activeBadge}
            </span>
            <h4 className="font-serif text-xl sm:text-2xl font-medium drop-shadow-md leading-snug">
              {currentRecipe.title}
            </h4>
          </div>
        </div>

        {/* Left Column: Editorial Details, Nutrition & Actions (Mobile: Bottom, Desktop: Left 5 columns) */}
        <div className="order-2 lg:order-1 lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6 bg-white z-10">
          <div className="space-y-4">
            {/* Category / Badge */}
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold rounded-full flex items-center gap-1.5">
                <ChefHat className="w-3.5 h-3.5 text-emerald-700" />
                <span>{activeBadge}</span>
              </span>
              <span className="text-stone-300">·</span>
              <span className="text-xs text-stone-500 font-mono">
                {currentRecipe.cuisine} Cuisine
              </span>
            </div>

            {/* Title */}
            <h3
              onClick={() => navigate('recipe', { slug: currentRecipe.slug })}
              className="font-serif text-2xl sm:text-3xl font-semibold text-stone-900 hover:text-emerald-800 transition-colors cursor-pointer leading-tight tracking-tight"
            >
              {currentRecipe.title}
            </h3>

            {/* Narrative description */}
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
              {currentRecipe.shortDescription}
            </p>

            {/* Dietary Tags */}
            <div className="text-xs text-stone-500 flex flex-wrap items-center gap-2 pt-1 font-medium">
              {currentRecipe.dietaryTags.slice(0, 4).map((tag, idx) => (
                <React.Fragment key={tag}>
                  {idx > 0 && <span aria-hidden="true" className="text-stone-300">·</span>}
                  <span className="hover:text-stone-800 transition-colors">{tag}</span>
                </React.Fragment>
              ))}
            </div>

            {/* Nutrition Highlights Grid */}
            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 grid grid-cols-4 gap-2 text-center text-xs">
              <div>
                <span className="block font-mono text-stone-400 text-[10px] uppercase">Calories</span>
                <span className="font-serif font-bold text-stone-900 text-sm">{currentRecipe.nutrition.calories}</span>
              </div>
              <div>
                <span className="block font-mono text-stone-400 text-[10px] uppercase">Protein</span>
                <span className="font-serif font-bold text-emerald-900 text-sm">{currentRecipe.nutrition.protein}g</span>
              </div>
              <div>
                <span className="block font-mono text-stone-400 text-[10px] uppercase">Fiber</span>
                <span className="font-serif font-bold text-stone-900 text-sm">{currentRecipe.nutrition.fiber}g</span>
              </div>
              <div>
                <span className="block font-mono text-stone-400 text-[10px] uppercase">Sodium</span>
                <span className="font-serif font-bold text-stone-900 text-sm">{currentRecipe.nutrition.sodium}mg</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => navigate('recipe', { slug: currentRecipe.slug })}
                className="px-5 py-3 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-2 shadow-sm"
              >
                <span>View Recipe & Photos</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => toggleSaveRecipe(currentRecipe.id)}
                className={`p-3 rounded-xl border transition-all ${
                  isSaved
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                    : 'bg-white border-stone-300 hover:border-stone-900 text-stone-600 hover:text-stone-900'
                }`}
                title={isSaved ? 'Recipe saved' : 'Save recipe'}
                aria-label={isSaved ? 'Recipe saved' : 'Save recipe'}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-emerald-800' : ''}`} />
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-stone-500">
              <Clock className="w-4 h-4 text-stone-400" />
              <span>{currentRecipe.totalTime}m</span>
              <span className="text-stone-300">·</span>
              <span className="flex items-center gap-1 text-amber-600 font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{currentRecipe.rating}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Picture Thumbnail Strip: All 8 recipe pictures visible for 1-click jump */}
      <div className="p-3 sm:px-6 bg-[#FAF9F5] border-t border-stone-200">
        <div className="flex items-center justify-between gap-3 mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 font-mono flex items-center gap-1.5">
            <span>Click any picture to jump:</span>
          </span>
          <div className="flex items-center gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentIndex
                    ? 'w-6 bg-emerald-700'
                    : 'w-1.5 bg-stone-300 hover:bg-stone-400'
                }`}
                aria-label={`Jump to picture ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-thin">
          {slides.map((recipe, idx) => {
            const isActive = idx === currentIndex;
            const thumbImg = imageError[recipe.id]
              ? FALLBACK_IMAGE
              : recipe.heroImage || FALLBACK_IMAGE;

            return (
              <button
                key={recipe.id}
                onClick={() => setCurrentIndex(idx)}
                className={`group flex items-center gap-2 p-1.5 rounded-xl border transition-all shrink-0 text-left ${
                  isActive
                    ? 'bg-white border-emerald-700 shadow-sm ring-2 ring-emerald-600/30'
                    : 'bg-stone-100/60 border-stone-200 hover:bg-white hover:border-stone-400 opacity-75 hover:opacity-100'
                }`}
              >
                {/* Visual Picture Thumbnail */}
                <div className="w-14 h-12 rounded-lg overflow-hidden bg-stone-200 shrink-0 relative">
                  <img
                    src={thumbImg}
                    alt={recipe.title}
                    onError={() => setImageError((prev) => ({ ...prev, [recipe.id]: true }))}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {isActive && (
                    <div className="absolute inset-0 border-2 border-emerald-600 rounded-lg pointer-events-none" />
                  )}
                </div>

                <div className="max-w-[130px] pr-1 hidden sm:block">
                  <span className="block text-[10px] font-mono text-emerald-800 uppercase tracking-wider">
                    {recipe.cuisine}
                  </span>
                  <span
                    className={`block text-xs font-serif truncate ${
                      isActive ? 'font-bold text-stone-950' : 'text-stone-700 font-medium'
                    }`}
                  >
                    {recipe.title}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
