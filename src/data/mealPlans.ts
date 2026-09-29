import { MealPlan } from '../types';
import { mealPlansPart1 } from './mealPlans_part1';
import { mealPlansPart2 } from './mealPlans_part2';

export const allMealPlans: MealPlan[] = [
  ...mealPlansPart1,
  ...mealPlansPart2,
];

export const getMealPlanById = (id: string): MealPlan | undefined => {
  return allMealPlans.find((m) => m.id === id || m.slug === id);
};
