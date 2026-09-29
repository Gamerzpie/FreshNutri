import { Article } from '../types';
import { articlesPart1 } from './articles_part1';
import { articlesPart2 } from './articles_part2';

export const allArticles: Article[] = [
  ...articlesPart1,
  ...articlesPart2,
];

export const getArticleById = (id: string): Article | undefined => {
  return allArticles.find((a) => a.id === id || a.slug === id);
};

export const getFeaturedArticles = (): Article[] => {
  return allArticles.filter((a) => a.featured);
};

export const getTrendingArticles = (): Article[] => {
  return allArticles.filter((a) => a.trending);
};

export const getArticlesByCategory = (category: string): Article[] => {
  return allArticles.filter(
    (a) => a.category.toLowerCase() === category.toLowerCase()
  );
};
