import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { allArticles, getArticleById } from '../data/articles';
import { authors } from '../data/authors';
import { allRecipes } from '../data/recipes';
import { RecipeCard } from '../components/RecipeCard';
import { ArticleCard } from '../components/ArticleCard';
import {
  Clock,
  ArrowLeft,
  Share2,
  Bookmark,
  Calendar,
  Sparkles,
  Quote,
  CheckCircle,
} from 'lucide-react';

export const ArticleDetailView: React.FC = () => {
  const { routeParams, goBack, navigate, showToast, openNewsletter } = useApp();
  const articleSlug = routeParams.slug || routeParams.id;
  const article = getArticleById(articleSlug) || allArticles[0];
  const author = authors.find((a) => a.id === article.authorId);

  const relatedRecipes = useMemo(() => {
    return allRecipes.filter((r) => article.relatedRecipeIds.includes(r.id)).slice(0, 2);
  }, [article]);

  const relatedArticles = useMemo(() => {
    return allArticles
      .filter((a) => a.id !== article.id && (article.relatedArticleIds.includes(a.id) || a.category === article.category))
      .slice(0, 3);
  }, [article]);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: article.title,
          text: article.subtitle,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Article URL copied to clipboard!', 'success');
    }
  };

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between text-xs text-stone-500">
        <button
          onClick={goBack}
          className="flex items-center gap-1.5 text-stone-600 hover:text-stone-900 transition-colors font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to previous page</span>
        </button>

        <div className="flex items-center gap-1 text-[11px]">
          <span>Articles</span>
          <span>/</span>
          <span className="text-emerald-800 font-medium">{article.category}</span>
        </div>
      </div>

      {/* Header Deck */}
      <header className="space-y-4">
        <div className="flex items-center gap-2 text-xs text-stone-500 uppercase tracking-widest font-sans font-semibold">
          <span className="text-emerald-800">{article.category}</span>
          <span aria-hidden="true">·</span>
          <span>{article.readTime}</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-medium text-stone-900 tracking-tight leading-[1.18] text-balance">
          {article.title}
        </h1>

        <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-sans font-normal">
          {article.subtitle}
        </p>

        {/* Author Byline & Dates */}
        <div className="pt-3 border-y border-stone-200 py-3.5 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            {author && (
              <img
                src={author.avatar}
                alt={author.name}
                className="w-11 h-11 rounded-full object-cover"
              />
            )}
            <div>
              <span className="block font-semibold text-stone-900">
                By {author?.name || 'FreshNutri Editors'}
              </span>
              <span className="block text-[11px] text-stone-500">
                {author?.role} · {author?.credentials}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-stone-500">
            <div className="text-right text-[11px]">
              <span className="block">Published {article.publishedAt}</span>
              {article.updatedAt && (
                <span className="text-stone-400 block">Updated {article.updatedAt}</span>
              )}
            </div>

            <button
              onClick={handleShare}
              className="p-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg transition-colors"
              title="Share article"
              aria-label="Share article"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Photography */}
      <div className="relative aspect-16/10 rounded-2xl overflow-hidden shadow-md bg-stone-100 border border-stone-200">
        <img
          src={article.heroImage}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Body Content (Typography & Reading Experience) */}
      <section className="font-sans text-stone-800 space-y-6 leading-relaxed text-base sm:text-lg">
        {article.content.map((block, idx) => {
          if (block.type === 'heading') {
            return (
              <h2
                key={idx}
                className="font-serif text-2xl sm:text-3xl font-semibold text-stone-900 pt-4 pb-1"
              >
                {block.headingText}
              </h2>
            );
          }

          if (block.type === 'callout') {
            return (
              <div
                key={idx}
                className="my-6 p-5 bg-emerald-50/70 border-l-4 border-emerald-700 rounded-r-xl text-stone-800 text-sm leading-relaxed"
              >
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-900 mb-1">
                  <CheckCircle className="w-4 h-4 text-emerald-700" />
                  Key Clinical Takeaway
                </div>
                {block.text}
              </div>
            );
          }

          if (block.type === 'quote') {
            return (
              <figure
                key={idx}
                className="my-8 py-6 px-6 bg-stone-50 border-y border-stone-200 text-center"
              >
                <blockquote className="font-serif italic text-xl sm:text-2xl text-stone-900 leading-snug">
                  “{block.text}”
                </blockquote>
                {block.cite && (
                  <figcaption className="mt-3 text-xs uppercase tracking-wider text-stone-500 font-sans font-semibold">
                    — {block.cite}
                  </figcaption>
                )}
              </figure>
            );
          }

          if (block.type === 'list' && block.items) {
            return (
              <ul key={idx} className="my-4 space-y-2.5 list-disc list-inside text-sm sm:text-base text-stone-700 pl-2">
                {block.items.map((item, i) => (
                  <li key={i} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            );
          }

          // Paragraph with elegant drop cap on the very first paragraph
          return (
            <p
              key={idx}
              className={`leading-relaxed text-stone-700 ${
                idx === 0
                  ? 'first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-stone-900'
                  : ''
              }`}
            >
              {block.text}
            </p>
          );
        })}
      </section>

      {/* Inline Related Recipes */}
      {relatedRecipes.length > 0 && (
        <section className="my-10 p-6 bg-stone-50 rounded-2xl border border-stone-200">
          <div className="mb-4">
            <span className="text-xs uppercase tracking-wider text-emerald-800 font-semibold block mb-0.5">
              From the Test Kitchen
            </span>
            <h3 className="font-serif text-xl font-semibold text-stone-900">
              Tested Recipes Mentioned in this Feature
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedRecipes.map((r) => (
              <RecipeCard key={r.id} recipe={r} layout="horizontal" />
            ))}
          </div>
        </section>
      )}

      {/* Author Bio Box */}
      {author && (
        <section className="p-6 bg-white rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <img
            src={author.avatar}
            alt={author.name}
            className="w-16 h-16 rounded-full object-cover shrink-0"
          />
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <span className="font-serif text-lg font-semibold text-stone-900">
                {author.name}
              </span>
              <span className="text-xs text-emerald-800 font-medium font-mono">
                {author.credentials}
              </span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed max-w-xl">
              {author.bio}
            </p>
            <div className="pt-1">
              <button
                onClick={() => navigate('author', { id: author.id })}
                className="text-xs font-semibold text-stone-900 hover:text-emerald-800 underline"
              >
                View all articles and recipes by {author.name}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Signup Inline Box */}
      <section className="bg-stone-900 text-white rounded-2xl p-6 sm:p-8 text-center space-y-3">
        <span className="font-serif text-2xl font-medium block">
          Never Miss an Evidence-Based Guide
        </span>
        <p className="text-xs text-stone-300 max-w-md mx-auto leading-relaxed">
          Subscribe to the FreshNutri Weekly Digest for weekly meal plans and research breakdowns.
        </p>
        <button
          onClick={openNewsletter}
          className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold rounded-lg transition-colors inline-block"
        >
          Subscribe Free
        </button>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="pt-8 border-t border-stone-200 space-y-6">
          <h2 className="font-serif text-2xl font-semibold text-stone-900">
            More Related Coverage
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {relatedArticles.map((art) => (
              <ArticleCard key={art.id} article={art} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
};
