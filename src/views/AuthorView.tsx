import React from 'react';
import { useApp } from '../context/AppContext';
import { authors } from '../data/authors';
import { allRecipes } from '../data/recipes';
import { allArticles } from '../data/articles';
import { RecipeCard } from '../components/RecipeCard';
import { ArticleCard } from '../components/ArticleCard';
import { ArrowLeft, Award, BookOpen, ChefHat, Instagram, Twitter, Linkedin } from 'lucide-react';

export const AuthorView: React.FC = () => {
  const { routeParams, goBack } = useApp();
  const authorId = routeParams.id || 'author-1';
  const author = authors.find((a) => a.id === authorId) || authors[0];

  const authorRecipes = allRecipes.filter((r) => r.authorId === author.id);
  const authorArticles = allArticles.filter((a) => a.authorId === author.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Back button */}
      <div>
        <button
          onClick={goBack}
          className="flex items-center gap-1.5 text-xs text-stone-600 hover:text-stone-900 transition-colors font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>
      </div>

      {/* Author Profile Marquee */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-10 shadow-2xs">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
          <img
            src={author.avatar}
            alt={author.name}
            className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover shadow-md border-2 border-stone-100 shrink-0"
          />

          <div className="space-y-3 text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="text-xs uppercase tracking-widest text-emerald-800 font-bold font-sans">
                {author.role}
              </span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span className="text-xs font-mono font-medium text-stone-600">
                {author.credentials}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-900">
              {author.name}
            </h1>

            <p className="text-sm text-stone-600 leading-relaxed max-w-2xl">
              {author.bio}
            </p>

            {/* Socials & Credentials */}
            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-stone-500">
              <span className="flex items-center gap-1.5 text-emerald-900 font-medium">
                <Award className="w-4 h-4 text-emerald-700" />
                Verified Test-Kitchen Author
              </span>
              {author.socials?.instagram && (
                <span className="flex items-center gap-1 hover:text-stone-900 cursor-pointer">
                  <Instagram className="w-3.5 h-3.5" /> {author.socials.instagram}
                </span>
              )}
              {author.socials?.twitter && (
                <span className="flex items-center gap-1 hover:text-stone-900 cursor-pointer">
                  <Twitter className="w-3.5 h-3.5" /> {author.socials.twitter}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Authored Recipes */}
      {authorRecipes.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <div className="flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-emerald-800" />
              <h2 className="font-serif text-2xl font-semibold text-stone-900">
                Tested Recipes by {author.name}
              </h2>
            </div>
            <span className="text-xs text-stone-500 font-mono">
              {authorRecipes.length} recipes
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {authorRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </section>
      )}

      {/* Authored Articles */}
      {authorArticles.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-800" />
              <h2 className="font-serif text-2xl font-semibold text-stone-900">
                Articles & Essays by {author.name}
              </h2>
            </div>
            <span className="text-xs text-stone-500 font-mono">
              {authorArticles.length} articles
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {authorArticles.map((art) => (
              <ArticleCard key={art.id} article={art} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
