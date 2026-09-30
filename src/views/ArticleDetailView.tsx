import React, { useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { allArticles, getArticleById } from '../data/articles';
import { authors } from '../data/authors';
import { allRecipes } from '../data/recipes';
import { RecipeCard } from '../components/RecipeCard';
import { ArticleCard } from '../components/ArticleCard';
import {
  Clock,
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Share2,
  Bookmark,
  Calendar,
  Sparkles,
  Quote,
  CheckCircle,
} from 'lucide-react';

export const ArticleDetailView: React.FC = () => {
  const { routeParams, goBack, navigate, customArticles, showToast, openNewsletter } = useApp();
  const articleSlug = routeParams.slug || routeParams.id;

  const allAvailableArticles = useMemo(() => {
    return [...allArticles, ...customArticles];
  }, [customArticles]);

  const article = useMemo(() => {
    return allAvailableArticles.find((a) => a.slug === articleSlug || a.id === articleSlug) || allArticles[0];
  }, [allAvailableArticles, articleSlug]);

  const articleIndex = useMemo(() => {
    return allAvailableArticles.findIndex((a) => a.id === article.id);
  }, [allAvailableArticles, article.id]);

  const prevArticle = articleIndex > 0 ? allAvailableArticles[articleIndex - 1] : allAvailableArticles[allAvailableArticles.length - 1];
  const nextArticle = articleIndex < allAvailableArticles.length - 1 ? allAvailableArticles[articleIndex + 1] : allAvailableArticles[0];

  const author = authors.find((a) => a.id === article.authorId);

  // Sync document title and scroll to top on article change
  useEffect(() => {
    if (article) {
      document.title = `${article.title} | FreshNutri Magazine`;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute('content', article.subtitle);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [article?.id]);

  const relatedRecipes = useMemo(() => {
    return allRecipes.filter((r) => article.relatedRecipeIds.includes(r.id)).slice(0, 2);
  }, [article]);

  const relatedArticles = useMemo(() => {
    return allAvailableArticles
      .filter((a) => a.id !== article.id && (article.relatedArticleIds.includes(a.id) || a.category === article.category))
      .slice(0, 3);
  }, [allAvailableArticles, article]);

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
      {/* Navigation Breadcrumb Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-stone-500 border-b border-stone-200/80 pb-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => navigate('home')}
            className="hover:text-stone-900 transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <button
            onClick={() => navigate('articles')}
            className="hover:text-stone-900 transition-colors font-semibold text-stone-700"
          >
            Articles
          </button>
          <span>/</span>
          <button
            onClick={() => navigate('articles', { sub: article.category })}
            className="text-emerald-800 hover:text-emerald-950 font-medium transition-colors"
          >
            {article.category}
          </button>
          <span>/</span>
          <span className="truncate max-w-[200px] text-stone-900 font-semibold" title={article.title}>
            {article.title}
          </span>
        </div>

        {/* Page counter & direct pager */}
        <div className="flex items-center gap-2 self-end sm:self-auto font-mono text-[11px]">
          <span className="text-stone-400">
            Article <strong className="text-stone-800">{articleIndex >= 0 ? articleIndex + 1 : 1}</strong> of {allAvailableArticles.length}
          </span>
          <span className="text-stone-300">·</span>
          <button
            onClick={() => navigate('article', { slug: prevArticle.slug })}
            className="px-2 py-1 bg-white hover:bg-stone-100 border border-stone-200 rounded-md text-stone-700 transition-colors flex items-center gap-1"
            title={`Previous article: ${prevArticle.title}`}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Prev</span>
          </button>
          <button
            onClick={() => navigate('article', { slug: nextArticle.slug })}
            className="px-2 py-1 bg-white hover:bg-stone-100 border border-stone-200 rounded-md text-stone-700 transition-colors flex items-center gap-1"
            title={`Next article: ${nextArticle.title}`}
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
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
                className="w-10 h-10 rounded-full object-cover border border-stone-200"
              />
            )}
            <div>
              {author ? (
                <button
                  onClick={() => navigate('author', { id: author.id })}
                  className="font-medium text-stone-900 hover:text-emerald-800 transition-colors block text-left"
                >
                  By {author.name}
                </button>
              ) : (
                <span className="font-medium text-stone-900">FreshNutri Culinary Lab</span>
              )}
              <div className="flex items-center gap-2 text-[11px] text-stone-400 font-mono">
                <span>{author?.role}</span>
                <span>·</span>
                <span>Published {article.publishedAt}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 border border-stone-200 text-stone-600 hover:bg-stone-50 rounded-lg transition-colors"
              title="Share article"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="aspect-16/10 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
        <img
          src={article.heroImage}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Content Body */}
      <div className="prose prose-stone max-w-none text-stone-800 text-sm sm:text-base leading-relaxed space-y-6">
        {article.content.map((block, index) => {
          if (block.type === 'heading') {
            return (
              <h2
                key={index}
                className="font-serif text-2xl sm:text-3xl font-semibold text-stone-900 pt-6 pb-2 border-b border-stone-100"
              >
                {block.headingText || block.text}
              </h2>
            );
          }
          if (block.type === 'quote') {
            return (
              <blockquote
                key={index}
                className="border-l-4 border-emerald-700 pl-4 py-2 italic text-stone-700 bg-stone-50 rounded-r-lg my-4 space-y-1"
              >
                <p>{block.text}</p>
                {block.cite && (
                  <cite className="block text-xs text-stone-500 not-italic font-mono">
                    — {block.cite}
                  </cite>
                )}
              </blockquote>
            );
          }
          if (block.type === 'callout') {
            return (
              <div
                key={index}
                className="p-5 bg-emerald-50/70 border border-emerald-200 rounded-xl text-stone-800 my-4"
              >
                {block.headingText && (
                  <h4 className="font-serif font-bold text-emerald-950 mb-1">
                    {block.headingText}
                  </h4>
                )}
                <p className="text-sm leading-relaxed">{block.text}</p>
              </div>
            );
          }
          if (block.type === 'list' && block.items) {
            return (
              <ul key={index} className="list-disc list-inside space-y-1.5 text-stone-700 my-3">
                {block.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            );
          }
          return (
            <p key={index} className="leading-relaxed">
              {block.text}
            </p>
          );
        })}
      </div>

      {/* Tags */}
      {article.tags.length > 0 && (
        <div className="pt-6 border-t border-stone-200 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-stone-400 font-mono">Article Tags:</span>
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 bg-stone-100 text-stone-700 rounded-md font-mono"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Related Recipes Callout Box */}
      {relatedRecipes.length > 0 && (
        <section className="bg-[#FAF9F5] p-6 rounded-2xl border border-stone-200 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-900 font-mono">
              Complementary Test Kitchen Recipes
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} layout="compact" />
            ))}
          </div>
        </section>
      )}

      {/* Author Bio Box */}
      {author && (
        <section className="p-6 bg-stone-50 rounded-2xl border border-stone-200 flex items-start gap-4">
          <img
            src={author.avatar}
            alt={author.name}
            className="w-14 h-14 rounded-full object-cover border border-stone-200 shrink-0"
          />
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-base font-semibold text-stone-900">
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

      {/* Article Navigation Bar: Previous & Next Article Pages */}
      <section className="pt-8 border-t-2 border-stone-200 space-y-4">
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono uppercase tracking-wider text-stone-500 font-semibold">
            Editorial Reading · Article {articleIndex >= 0 ? articleIndex + 1 : 1} of {allAvailableArticles.length}
          </span>
          <button
            onClick={() => navigate('articles')}
            className="text-emerald-800 hover:text-emerald-950 font-semibold flex items-center gap-1 transition-colors"
          >
            <span>All Articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Previous Article Card */}
          <div
            onClick={() => navigate('article', { slug: prevArticle.slug })}
            className="group cursor-pointer p-4 bg-white hover:bg-stone-50 rounded-2xl border border-stone-200 transition-all hover:border-emerald-700 flex items-center gap-4"
          >
            <img
              src={prevArticle.heroImage}
              alt=""
              className="w-16 h-16 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform"
            />
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block mb-0.5 flex items-center gap-1">
                <ChevronLeft className="w-3 h-3 text-emerald-700" />
                <span>Previous Article</span>
              </span>
              <h4 className="font-serif text-sm font-semibold text-stone-900 group-hover:text-emerald-900 transition-colors line-clamp-1">
                {prevArticle.title}
              </h4>
              <span className="text-[11px] text-stone-500 font-mono">
                {prevArticle.category} · {prevArticle.readTime}
              </span>
            </div>
          </div>

          {/* Next Article Card */}
          <div
            onClick={() => navigate('article', { slug: nextArticle.slug })}
            className="group cursor-pointer p-4 bg-white hover:bg-stone-50 rounded-2xl border border-stone-200 transition-all hover:border-emerald-700 flex items-center gap-4 text-right sm:flex-row-reverse"
          >
            <img
              src={nextArticle.heroImage}
              alt=""
              className="w-16 h-16 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform"
            />
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block mb-0.5 flex items-center justify-end gap-1">
                <span>Next Article</span>
                <ChevronRight className="w-3 h-3 text-emerald-700" />
              </span>
              <h4 className="font-serif text-sm font-semibold text-stone-900 group-hover:text-emerald-900 transition-colors line-clamp-1">
                {nextArticle.title}
              </h4>
              <span className="text-[11px] text-stone-500 font-mono">
                {nextArticle.category} · {nextArticle.readTime}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="pt-6 border-t border-stone-200 space-y-6">
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
