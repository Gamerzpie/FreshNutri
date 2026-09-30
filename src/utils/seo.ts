/**
 * FreshNutri Search Engine Optimization & Dynamic Metadata Manager
 * Manages Googlebot metadata, OpenGraph, Canonical URLs, and dynamic Schema.org JSON-LD
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

  // 4. OpenGraph Title & Description
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
  const fullCanonical = canonicalPath ? `${baseOrigin}${canonicalPath}` : window.location.href;
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
 * Generate Schema.org/Recipe JSON-LD for rich Google Recipe cards
 */
export const buildRecipeSchema = (recipe: Recipe, authorName = 'FreshNutri Test Kitchen') => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.title,
    description: recipe.shortDescription || recipe.intro,
    image: [recipe.heroImage],
    author: {
      '@type': 'Person',
      name: authorName,
    },
    datePublished: recipe.publishedAt || '2026-03-01',
    prepTime: `PT${recipe.prepTime}M`,
    cookTime: `PT${recipe.cookTime}M`,
    totalTime: `PT${recipe.totalTime}M`,
    recipeYield: `${recipe.servings} servings`,
    recipeCategory: recipe.mealType[0] || 'Dinner',
    recipeCuisine: recipe.cuisine,
    keywords: [
      ...recipe.dietaryTags,
      recipe.cuisine,
      recipe.mainIngredient,
      'healthy recipe',
      'clean eating',
      'Allrecipes healthy alternative',
      'NYT Cooking free alternative',
      'EatingWell alternative',
    ].join(', '),
    nutrition: {
      '@type': 'NutritionInformation',
      calories: `${recipe.nutrition.calories} calories`,
      proteinContent: `${recipe.nutrition.protein}g`,
      fatContent: `${recipe.nutrition.fat}g`,
      carbohydrateContent: `${recipe.nutrition.carbohydrates}g`,
      fiberContent: `${recipe.nutrition.fiber}g`,
      sodiumContent: `${recipe.nutrition.sodium}mg`,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: recipe.rating.toString(),
      reviewCount: (recipe.reviewsCount || 45).toString(),
      bestRating: '5',
      worstRating: '1',
    },
    recipeIngredient: recipe.ingredients.map(
      (ing) => `${ing.amount > 0 ? ing.amount + ' ' : ''}${ing.unit} ${ing.name}`.trim()
    ),
    recipeInstructions: recipe.instructions.map((inst) => ({
      '@type': 'HowToStep',
      name: inst.title || `Step ${inst.step}`,
      text: inst.text,
      url: `${window.location.origin}/#/recipe/${recipe.slug}#step-${inst.step}`,
    })),
  };
};

/**
 * Generate Schema.org/Article JSON-LD for rich editorial guides
 */
export const buildArticleSchema = (article: Article, authorName = 'FreshNutri Editorial Board') => {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.subtitle,
    image: [article.heroImage],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: 'FreshNutri Media',
      logo: {
        '@type': 'ImageObject',
        url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=512&h=512&q=80',
      },
    },
    articleSection: article.category,
    keywords: [
      ...article.tags,
      article.category,
      'nutrition science',
      'evidence-based health',
      'EatingWell alternative article',
    ].join(', '),
  };
};
