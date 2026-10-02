/**
 * FreshNutri Search Engine Optimization & Dynamic Metadata Manager
 * Manages Googlebot metadata, OpenGraph, Canonical URLs, and dynamic Schema.org JSON-LD
 * Optimized for Google Recipe Rich Results, Google News/Articles, Core Web Vitals & Search Snippets
 */
import { Recipe, Article, MealPlan } from '../types';

interface PageSEOOptions {
  title: string;
  description: string;
  keywords?: string;
  canonicalPath?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  schema?: Record<string, any>;
}

export const defaultKeywords = [
  'healthy recipes',
  'clean eating recipes',
  'easy healthy dinners',
  'whole food recipes',
  'Mediterranean diet meal plan',
  'high protein recipes',
  'anti-inflammatory recipes',
  'low calorie meals',
  'macro calculator',
  'USDA nutrition facts',
  'dietitian approved recipes',
  'allrecipes alternative',
  'best healthy allrecipes alternative',
  'nyt cooking alternative',
  'nyt cooking free alternative',
  'eatingwell alternative',
  'eating well meal plans',
  'skinnytaste alternative',
  'skinnytaste low calorie recipes',
  'yummly alternative',
  'food52 alternative',
  'epicurious healthy recipes',
  'bon appetit alternative',
  'tasty healthy recipes alternative',
].join(', ');

/**
 * Updates dynamic DOM head elements for Googlebot, social sharing, and search bots
 */
export const setPageSEO = ({
  title,
  description,
  keywords,
  canonicalPath,
  ogImage,
  ogType = 'website',
  schema,
}: PageSEOOptions) => {
  // 1. Browser Title
  document.title = title;

  // 2. Meta Description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', description);

  // 3. Meta Keywords
  let metaKw = document.querySelector('meta[name="keywords"]');
  if (!metaKw) {
    metaKw = document.createElement('meta');
    metaKw.setAttribute('name', 'keywords');
    document.head.appendChild(metaKw);
  }
  metaKw.setAttribute('content', keywords || defaultKeywords);

  // 4. OpenGraph & Twitter Social Cards
  const setMetaProperty = (prop: string, val: string) => {
    let el = document.querySelector(`meta[property="${prop}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('property', prop);
      document.head.appendChild(el);
    }
    el.setAttribute('content', val);
  };

  const setMetaName = (name: string, val: string) => {
    let el = document.querySelector(`meta[name="${name}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('name', name);
      document.head.appendChild(el);
    }
    el.setAttribute('content', val);
  };

  setMetaProperty('og:title', title);
  setMetaProperty('og:description', description);
  setMetaProperty('og:type', ogType);

  setMetaName('twitter:title', title);
  setMetaName('twitter:description', description);

  if (ogImage) {
    setMetaProperty('og:image', ogImage);
    setMetaName('twitter:image', ogImage);
  }

  // 5. Canonical Link
  const baseOrigin = window.location.origin || 'https://freshnutri.com';
  const fullCanonical = canonicalPath
    ? canonicalPath.startsWith('http')
      ? canonicalPath
      : `${baseOrigin}${canonicalPath}`
    : window.location.href;
  setMetaProperty('og:url', fullCanonical);

  let canonicalEl = document.querySelector('link[rel="canonical"]');
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', fullCanonical);

  // 6. Dynamic Page Schema.org JSON-LD
  const existingScript = document.getElementById('page-jsonld-schema');
  if (existingScript) {
    existingScript.remove();
  }

  if (schema) {
    const script = document.createElement('script');
    script.id = 'page-jsonld-schema';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema, null, 2);
    document.head.appendChild(script);
  }
};

/**
 * Map Dietary Tags to Schema.org Diet Types for Google Search Ranking
 */
const mapDietaryTagsToSchema = (tags: string[] = []): string[] => {
  const mapping: Record<string, string> = {
    'Gluten-Free': 'https://schema.org/GlutenFreeDiet',
    'Vegetarian': 'https://schema.org/VegetarianDiet',
    'Vegan': 'https://schema.org/VeganDiet',
    'Low-Carb': 'https://schema.org/LowCarbDiet',
    'Keto': 'https://schema.org/LowCarbDiet',
    'Low-Sodium': 'https://schema.org/LowSaltDiet',
    'DASH Diet': 'https://schema.org/LowSaltDiet',
    'Low-Calorie': 'https://schema.org/LowCalorieDiet',
    'Diabetic-Friendly': 'https://schema.org/DiabeticDiet',
  };

  const results: string[] = [];
  tags.forEach((tag) => {
    if (mapping[tag]) results.push(mapping[tag]);
  });
  return results;
};

/**
 * Generate Schema.org/Recipe JSON-LD for rich Google Recipe cards with BreadcrumbList
 */
export const buildRecipeSchema = (recipe: Recipe, authorName = 'FreshNutri Test Kitchen') => {
  const origin = window.location.origin || 'https://freshnutri.com';
  const pageUrl = `${origin}/#/recipe/${recipe.slug}`;
  const suitableDiets = mapDietaryTagsToSchema(recipe.dietaryTags);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      // 1. Breadcrumbs for Google Search snippet hierarchy
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${origin}/#/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Recipes',
            item: `${origin}/#/recipes`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: recipe.mealType[0] || 'Dinners',
            item: `${origin}/#/recipes?mealType=${encodeURIComponent(recipe.mealType[0] || 'Dinner')}`,
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: recipe.title,
            item: pageUrl,
          },
        ],
      },
      // 2. Complete Google Recipe Schema
      {
        '@type': 'Recipe',
        '@id': `${pageUrl}#recipe`,
        name: recipe.title,
        headline: recipe.title,
        description: recipe.shortDescription || recipe.intro,
        image: [
          recipe.heroImage,
          `${recipe.heroImage}&w=1200&h=675`,
          `${recipe.heroImage}&w=1200&h=900`,
          `${recipe.heroImage}&w=1200&h=1200`,
        ],
        author: {
          '@type': 'Person',
          name: authorName,
          jobTitle: 'Culinary Nutritionist',
          worksFor: {
            '@type': 'Organization',
            name: 'FreshNutri Test Kitchen',
          },
        },
        publisher: {
          '@type': 'Organization',
          name: 'FreshNutri',
          url: origin,
          logo: {
            '@type': 'ImageObject',
            url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=512&h=512&q=80',
          },
        },
        datePublished: recipe.publishedAt || '2026-03-01',
        dateModified: '2026-09-30',
        prepTime: `PT${recipe.prepTime}M`,
        cookTime: `PT${recipe.cookTime}M`,
        totalTime: `PT${recipe.totalTime}M`,
        recipeYield: `${recipe.servings} servings`,
        recipeCategory: recipe.mealType[0] || 'Dinner',
        recipeCuisine: recipe.cuisine,
        isAccessibleForFree: 'true',
        mainEntityOfPage: pageUrl,
        keywords: [
          ...recipe.dietaryTags,
          recipe.cuisine,
          recipe.mainIngredient,
          'healthy recipe',
          'clean eating',
          'Allrecipes healthy alternative',
          'NYT Cooking free alternative',
          'EatingWell alternative',
          'tested dinner recipe',
          'USDA macro verified',
        ].join(', '),
        ...(suitableDiets.length > 0 ? { suitableForDiet: suitableDiets } : {}),
        nutrition: {
          '@type': 'NutritionInformation',
          calories: `${recipe.nutrition.calories} calories`,
          proteinContent: `${recipe.nutrition.protein}g`,
          fatContent: `${recipe.nutrition.fat}g`,
          carbohydrateContent: `${recipe.nutrition.carbohydrates}g`,
          fiberContent: `${recipe.nutrition.fiber}g`,
          sodiumContent: `${recipe.nutrition.sodium}mg`,
          servingSize: '1 serving',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: recipe.rating.toFixed(1),
          reviewCount: (recipe.reviewsCount || 48).toString(),
          bestRating: '5',
          worstRating: '1',
        },
        recipeIngredient: recipe.ingredients.map(
          (ing) => `${ing.amount > 0 ? ing.amount + ' ' : ''}${ing.unit} ${ing.name}${ing.notes ? ' (' + ing.notes + ')' : ''}`.trim()
        ),
        recipeInstructions: recipe.instructions.map((inst) => ({
          '@type': 'HowToStep',
          name: inst.title || `Step ${inst.step}`,
          text: inst.text + (inst.tip ? ` Chef tip: ${inst.tip}` : ''),
          url: `${pageUrl}#step-${inst.step}`,
          position: inst.step,
        })),
      },
    ],
  };
};

/**
 * Generate Schema.org/NewsArticle JSON-LD for Google News & Search Rankings
 */
export const buildArticleSchema = (article: Article, authorName = 'FreshNutri Editorial Board') => {
  const origin = window.location.origin || 'https://freshnutri.com';
  const pageUrl = `${origin}/#/article/${article.slug}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${origin}/#/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Articles',
            item: `${origin}/#/articles`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: article.category,
            item: `${origin}/#/articles?category=${encodeURIComponent(article.category)}`,
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: article.title,
            item: pageUrl,
          },
        ],
      },
      {
        '@type': 'NewsArticle',
        '@id': `${pageUrl}#article`,
        headline: article.title,
        alternativeHeadline: article.subtitle,
        description: article.subtitle,
        image: [
          article.heroImage,
          `${article.heroImage}&w=1200&h=675`,
          `${article.heroImage}&w=1200&h=900`,
        ],
        datePublished: article.publishedAt,
        dateModified: article.updatedAt || article.publishedAt,
        author: {
          '@type': 'Person',
          name: authorName,
          jobTitle: 'Clinical Nutrition Researcher',
          worksFor: {
            '@type': 'Organization',
            name: 'FreshNutri Media',
          },
        },
        publisher: {
          '@type': 'Organization',
          name: 'FreshNutri Media',
          url: origin,
          logo: {
            '@type': 'ImageObject',
            url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=512&h=512&q=80',
          },
        },
        mainEntityOfPage: pageUrl,
        isAccessibleForFree: 'true',
        articleSection: article.category,
        inLanguage: 'en-US',
        keywords: [
          ...article.tags,
          article.category,
          'nutrition science',
          'evidence-based health',
          'EatingWell alternative article',
          'food as medicine',
          'dietitian review',
        ].join(', '),
      },
    ],
  };
};

/**
 * Generate Schema.org Meal Plan (ItemList / HowTo) for Google
 */
export const buildMealPlanSchema = (plan: MealPlan, authorName = 'FreshNutri Test Kitchen') => {
  const origin = window.location.origin || 'https://freshnutri.com';
  const pageUrl = `${origin}/#/meal-plan/${plan.slug}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${origin}/#/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Meal Plans',
            item: `${origin}/#/meal-plans`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: plan.title,
            item: pageUrl,
          },
        ],
      },
      {
        '@type': 'ItemList',
        '@id': `${pageUrl}#mealplan`,
        name: plan.title,
        description: plan.description,
        image: plan.heroImage,
        numberOfItems: plan.days.length,
        author: {
          '@type': 'Person',
          name: authorName,
        },
        publisher: {
          '@type': 'Organization',
          name: 'FreshNutri',
          url: origin,
        },
        itemListElement: plan.days.map((day, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: `Day ${day.dayNumber}: ${day.dayName}`,
          description: `Breakfast: ${day.breakfast.title}, Lunch: ${day.lunch.title}, Dinner: ${day.dinner.title}`,
        })),
      },
    ],
  };
};
