export type DifficultyLevel = 'Easy' | 'Medium' | 'Advanced';

export type MealType =
  | 'Breakfast'
  | 'Lunch'
  | 'Dinner'
  | 'Appetizers'
  | 'Salads'
  | 'Soups'
  | 'Main Dishes'
  | 'Side Dishes'
  | 'Desserts'
  | 'Snacks'
  | 'Smoothies'
  | 'Drinks'
  | 'Baking'
  | 'Pasta'
  | 'Rice & Grains'
  | 'Chicken'
  | 'Beef'
  | 'Seafood'
  | 'Vegetarian'
  | 'Vegan';

export type DietaryTag =
  | 'High-Protein'
  | 'Vegetarian'
  | 'Vegan'
  | 'Gluten-Free'
  | 'Dairy-Free'
  | 'Low-Carb'
  | 'Heart-Healthy'
  | 'Mediterranean'
  | 'Keto-Friendly'
  | 'Nut-Free'
  | 'Diabetes-Friendly'
  | 'Anti-Inflammatory'
  | 'DASH (Low-Sodium)'
  | 'Kidney-Friendly'
  | 'Low-Cholesterol'
  | 'Low-Purine (Gout)'
  | 'Low-FODMAP';

export type Cuisine =
  | 'Mediterranean'
  | 'Asian'
  | 'Mexican'
  | 'Italian'
  | 'American'
  | 'Middle Eastern'
  | 'Indian'
  | 'French'
  | 'Global Fusion';

export type CookingMethod =
  | 'One-Pot'
  | 'Baking'
  | 'Air Fryer'
  | 'Grilling'
  | 'Slow Cooker'
  | 'No-Cook'
  | 'Stovetop'
  | 'Sheet Pan'
  | 'Roasting';

export type Season = 'Spring' | 'Summer' | 'Fall' | 'Winter' | 'Year-Round';

export interface Author {
  id: string;
  name: string;
  role: string;
  credentials: string; // e.g., "MS, RD, LDN" or "Culinary Nutritionist"
  bio: string;
  avatar: string;
  socials?: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
  notes?: string;
}

export interface RecipeInstruction {
  step: number;
  title?: string;
  text: string;
  tip?: string;
}

export interface NutritionInfo {
  calories: number;
  protein: number; // grams
  carbohydrates: number; // grams
  fat: number; // grams
  saturatedFat: number; // grams
  fiber: number; // grams
  sugar: number; // grams
  sodium: number; // mg
  potassium: number; // mg
}

export interface RecipeReview {
  id: string;
  userName: string;
  userLocation: string;
  rating: number;
  date: string;
  comment: string;
  helpfulCount: number;
}

export interface Recipe {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  intro: string;
  heroImage: string;
  prepTime: number; // minutes
  cookTime: number; // minutes
  totalTime: number; // minutes
  difficulty: DifficultyLevel;
  servings: number;
  mealType: MealType[];
  cuisine: Cuisine;
  cookingMethod: CookingMethod;
  dietaryTags: DietaryTag[];
  mainIngredient: string;
  seasonal: Season;
  rating: number;
  reviewsCount: number;
  ingredients: Ingredient[];
  instructions: RecipeInstruction[];
  nutrition: NutritionInfo;
  recipeNotes?: string;
  substitutions?: string[];
  storageInfo?: string;
  authorId: string;
  publishedAt: string;
  updatedAt?: string;
  featured?: boolean;
  trending?: boolean;
  quickAndEasy?: boolean;
  budgetFriendly?: boolean;
  mealPrepFriendly?: boolean;
  reviews?: RecipeReview[];
}

export type ArticleCategory =
  | 'Nutrition'
  | 'Healthy Eating'
  | 'Food News'
  | 'Cooking Tips'
  | 'Kitchen Tips'
  | 'Ingredients'
  | 'Healthy Lifestyle'
  | 'Meal Planning'
  | 'Food Trends'
  | 'Seasonal Food'
  | 'Expert Advice';

export interface ArticleContentBlock {
  type: 'paragraph' | 'heading' | 'callout' | 'quote' | 'image' | 'list';
  headingText?: string;
  text?: string;
  items?: string[];
  caption?: string;
  cite?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: ArticleCategory;
  heroImage: string;
  authorId: string;
  publishedAt: string;
  updatedAt: string;
  readTime: string;
  content: ArticleContentBlock[];
  relatedRecipeIds: string[];
  relatedArticleIds: string[];
  tags: string[];
  featured?: boolean;
  trending?: boolean;
}

export interface MealPlanDayMeal {
  recipeId?: string;
  title: string;
  description: string;
  calories: number;
  prepTimeMinutes?: number;
}

export interface MealPlanDay {
  dayNumber: number;
  dayName: string;
  breakfast: MealPlanDayMeal;
  lunch: MealPlanDayMeal;
  dinner: MealPlanDayMeal;
  snacks: { title: string; calories: number }[];
  dailyCalories: number;
  dailyProtein: number;
  dailyFiber: number;
}

export interface ShoppingCategory {
  category: string;
  items: { id: string; name: string; checked: boolean }[];
}

export interface MealPlan {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  heroImage: string;
  durationDays: number;
  dietType: string;
  caloriesPerDay: number;
  tags: string[];
  description: string;
  overview: string;
  prepNotes: string[];
  shoppingList: {
    category: string;
    items: string[];
  }[];
  days: MealPlanDay[];
  authorId: string;
}

export interface SavedCollection {
  id: string;
  name: string;
  description?: string;
  recipeIds: string[];
  createdAt: string;
}

export interface CategoryInfo {
  id: string;
  slug: string;
  name: string;
  type: 'recipe' | 'nutrition' | 'lifestyle';
  description: string;
  heroImage: string;
  featuredRecipeIds?: string[];
  featuredArticleIds?: string[];
}

export interface ConditionDiet {
  id: string;
  slug: string;
  conditionName: string;
  shortBadge: string;
  dietProtocolName: string;
  headline: string;
  targetAudience: string;
  overview: string;
  pathophysiology: string;
  clinicalTargets: Array<{
    nutrient: string;
    target: string;
    mechanism: string;
    clinicalNote?: string;
  }>;
  foodsToPrioritize: Array<{
    category: string;
    items: string[];
    whyItHelps: string;
  }>;
  foodsToLimit: Array<{
    category: string;
    items: string[];
    riskFactor: string;
  }>;
  dailyMealStructure: {
    breakfast: string;
    lunch: string;
    dinner: string;
    snacks: string;
  };
  sampleMealPlanSlug?: string;
  recommendedRecipeIds: string[];
  clinicalCitations: string[];
  keyAdvice: string[];
}
