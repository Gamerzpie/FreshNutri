import { Recipe } from '../types';
import { recipesPart1 } from './recipes_part1';
import { recipesPart2 } from './recipes_part2';
import { recipesPart3 } from './recipes_part3';
import { recipesPart4 } from './recipes_part4';
import { recipesPart5 } from './recipes_part5';

export const allRecipes: Recipe[] = [
  ...recipesPart1,
  ...recipesPart2,
  ...recipesPart3,
  ...recipesPart4,
  ...recipesPart5,
];

export const getRecipeById = (id: string): Recipe | undefined => {
  return allRecipes.find((r) => r.id === id || r.slug === id);
};

export const getFeaturedRecipes = (): Recipe[] => {
  return allRecipes.filter((r) => r.featured);
};

export const getTrendingRecipes = (): Recipe[] => {
  return allRecipes.filter((r) => r.trending || r.rating >= 4.9);
};

export const getQuickRecipes = (): Recipe[] => {
  return allRecipes.filter((r) => r.totalTime <= 30);
};

export const getHighProteinRecipes = (): Recipe[] => {
  return allRecipes.filter((r) => r.nutrition.protein >= 25);
};

export const getVegetarianRecipes = (): Recipe[] => {
  return allRecipes.filter((r) => r.dietaryTags.includes('Vegetarian'));
};
