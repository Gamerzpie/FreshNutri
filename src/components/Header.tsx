import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Bookmark, Mail, Menu, X, ArrowRight, Sparkles, ExternalLink } from 'lucide-react';
import { SMARTLINK_URL } from './AdUnits';

export const Header: React.FC = () => {
  const { currentRoute, navigate, savedRecipeIds, openSearch, openNewsletter } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Recipes', route: 'recipes' },
    { label: 'Health & BP Diets', route: 'health-diets' },
    { label: 'Nutrition', route: 'nutrition' },
    { label: 'Meal Plans', route: 'meal-plans' },
    { label: 'Food News', route: 'food-news' },
    { label: 'Healthy Lifestyle', route: 'healthy-lifestyle' },
  ];

  const handleNavClick = (route: string) => {
    navigate(route);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      {/* Top Utility Announcement Ribbon */}
      <div className="bg-stone-900 text-stone-200 text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-medium text-emerald-400">Spring Issue 2026</span>
            <span aria-hidden="true" className="text-stone-500">·</span>
            <span>Science-Backed Nutrition & Test-Kitchen Tested Recipes</span>
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <a
              href={SMARTLINK_URL}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 transition-colors"
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Partner Deals 🔥</span>
            </a>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => navigate('health-diets', { slug: 'hypertension-dash-diet' })}
              className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              DASH Diet
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => navigate('about')}
              className="hover:text-stone-200 transition-colors"
            >
              Our Testing Process
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Bar (Strict 3-Zone Contract) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Single Text Element Brand Wordmark */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => handleNavClick('home')}
            className="group text-left focus:outline-none"
            aria-label="FreshNutri Home"
          >
            <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-stone-900 group-hover:text-emerald-800 transition-colors">
              FreshNutri
            </span>
          </button>
        </div>

        {/* Zone 2: 4-6 Clean Text Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-700">
          {navLinks.map((item) => {
            const isActive = currentRoute === item.route;
            return (
              <button
                key={item.route}
                onClick={() => handleNavClick(item.route)}
                className={`relative py-1 transition-colors hover:text-stone-900 ${
                  isActive ? 'text-stone-950 font-semibold' : 'text-stone-600'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-700 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions (Search, Saved, Newsletter) */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={openSearch}
            className="flex items-center gap-2 px-3 py-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors text-sm"
            aria-label="Search recipes and articles"
          >
            <Search className="w-4 h-4 text-stone-600" />
            <span className="hidden sm:inline text-xs text-stone-500 font-medium">Search</span>
          </button>

          <button
            onClick={() => handleNavClick('saved')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-colors ${
              currentRoute === 'saved'
                ? 'bg-emerald-50 text-emerald-800 font-medium'
                : 'text-stone-700 hover:bg-stone-100'
            }`}
            aria-label={`Saved recipes: ${savedRecipeIds.length}`}
          >
            <Bookmark className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">Saved</span>
            {savedRecipeIds.length > 0 && (
              <span className="ml-0.5 text-xs font-mono font-medium text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded-full tabular-nums">
                {savedRecipeIds.length}
              </span>
            )}
          </button>

          <button
            onClick={openNewsletter}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors whitespace-nowrap shadow-sm"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Newsletter</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-700 hover:text-stone-900 rounded-lg focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF9F5] border-b border-stone-200 px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-stone-200">
            {navLinks.map((item) => (
              <button
                key={item.route}
                onClick={() => handleNavClick(item.route)}
                className={`text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  currentRoute === item.route
                    ? 'bg-emerald-50 text-emerald-900 font-semibold'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-2 pt-1">
            <button
              onClick={() => {
                openSearch();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between w-full px-3 py-2.5 text-sm text-stone-700 bg-white border border-stone-200 rounded-lg"
            >
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4 text-stone-500" />
                Search recipes, ingredients, topics...
              </span>
              <ArrowRight className="w-4 h-4 text-stone-400" />
            </button>

            <button
              onClick={() => {
                openNewsletter();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-stone-900 text-white text-sm font-medium rounded-lg"
            >
              <Mail className="w-4 h-4" />
              Subscribe to Weekly Magazine
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
