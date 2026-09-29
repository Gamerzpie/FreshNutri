import React, { useState } from 'react';
import { Article } from '../types';
import { useApp } from '../context/AppContext';
import { authors } from '../data/authors';
import { Clock, ArrowUpRight, BookOpen } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  variant?: 'lead' | 'standard' | 'horizontal';
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, variant = 'standard' }) => {
  const { navigate } = useApp();
  const [imgError, setImgError] = useState(false);
  const author = authors.find((a) => a.id === article.authorId);

  const handleClick = () => {
    navigate('article', { slug: article.slug || article.id });
  };

  if (variant === 'lead') {
    return (
      <article
        onClick={handleClick}
        className="group cursor-pointer bg-white rounded-2xl border border-stone-200/90 overflow-hidden hover:border-stone-300 transition-all duration-200 grid grid-cols-1 lg:grid-cols-12"
      >
        <div className="lg:col-span-7 relative aspect-16/10 lg:aspect-auto overflow-hidden bg-stone-100 min-h-[320px]">
          {!imgError ? (
            <img
              src={article.heroImage}
              alt={article.title}
              onError={() => setImgError(true)}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100 text-stone-400 p-8 text-center">
              <BookOpen className="w-10 h-10 mb-2 text-stone-300" />
              <span className="text-sm font-serif italic text-stone-500">{article.title}</span>
            </div>
          )}
        </div>

        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-500 uppercase tracking-widest font-sans mb-3">
              <span className="text-emerald-800 font-semibold">{article.category}</span>
              <span aria-hidden="true">·</span>
              <span>{article.readTime}</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 group-hover:text-emerald-800 transition-colors leading-tight">
              {article.title}
            </h2>

            <p className="mt-4 text-sm text-stone-600 leading-relaxed line-clamp-3">
              {article.subtitle}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {author && (
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-9 h-9 rounded-full object-cover"
                />
              )}
              <div>
                <span className="block text-xs font-semibold text-stone-900">
                  {author?.name || 'FreshNutri Staff'}
                </span>
                <span className="block text-[11px] text-stone-500">
                  {author?.credentials || 'Registered Dietitian'}
                </span>
              </div>
            </div>

            <span className="text-xs font-semibold text-stone-900 group-hover:text-emerald-700 flex items-center gap-1">
              Read Essay <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'horizontal') {
    return (
      <article
        onClick={handleClick}
        className="group cursor-pointer bg-white rounded-xl border border-stone-200/90 overflow-hidden hover:border-stone-300 transition-all duration-200 flex flex-col sm:flex-row"
      >
        <div className="relative sm:w-2/5 aspect-16/10 sm:aspect-auto overflow-hidden bg-stone-100 shrink-0">
          {!imgError ? (
            <img
              src={article.heroImage}
              alt={article.title}
              onError={() => setImgError(true)}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100 text-stone-400 p-4 text-center">
              <BookOpen className="w-6 h-6 mb-1 text-stone-300" />
            </div>
          )}
        </div>

        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-500 uppercase tracking-wider mb-2">
              <span className="text-emerald-800 font-semibold">{article.category}</span>
              <span aria-hidden="true">·</span>
              <span>{article.readTime}</span>
            </div>

            <h3 className="font-serif text-base sm:text-lg font-semibold text-stone-900 group-hover:text-emerald-800 transition-colors line-clamp-2 leading-snug">
              {article.title}
            </h3>

            <p className="mt-2 text-xs text-stone-600 line-clamp-2 leading-relaxed">
              {article.subtitle}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
            <span>By {author?.name || 'FreshNutri Editors'}</span>
            <span className="font-medium text-stone-900 group-hover:text-emerald-700 flex items-center gap-0.5">
              Read <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      onClick={handleClick}
      className="group cursor-pointer bg-white rounded-xl border border-stone-200/90 overflow-hidden hover:border-stone-300 transition-all duration-200 flex flex-col h-full"
    >
      <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
        {!imgError ? (
          <img
            src={article.heroImage}
            alt={article.title}
            onError={() => setImgError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100 text-stone-400 p-4 text-center">
            <BookOpen className="w-6 h-6 mb-1 text-stone-300" />
            <span className="text-xs font-serif italic text-stone-500">{article.title}</span>
          </div>
        )}
      </div>

      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-stone-500 uppercase tracking-wider mb-2">
            <span className="text-emerald-800 font-semibold">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readTime}</span>
          </div>

          <h3 className="font-serif text-base sm:text-lg font-semibold text-stone-900 group-hover:text-emerald-800 transition-colors line-clamp-2 leading-snug">
            {article.title}
          </h3>

          <p className="mt-2 text-xs text-stone-600 line-clamp-2 leading-relaxed">
            {article.subtitle}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-2">
            {author && (
              <img
                src={author.avatar}
                alt={author.name}
                className="w-6 h-6 rounded-full object-cover"
              />
            )}
            <span className="truncate max-w-[130px] font-medium text-stone-700">{author?.name}</span>
          </div>

          <span className="text-stone-400 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{article.publishedAt}</span>
          </span>
        </div>
      </div>
    </article>
  );
};
