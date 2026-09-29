import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { allRecipes } from '../data/recipes';
import { allArticles } from '../data/articles';
import { authors } from '../data/authors';
import { recipeCategories } from '../data/categories';
import { Recipe, Article } from '../types';
import {
  Layers,
  FileText,
  Users,
  FolderTree,
  Plus,
  Trash2,
  Edit3,
  Calendar,
  Eye,
  CheckCircle2,
  Clock,
  Send,
  Database,
} from 'lucide-react';

export const AdminView: React.FC = () => {
  const {
    customRecipes,
    customArticles,
    addRecipe,
    deleteRecipe,
    addArticle,
    deleteArticle,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'recipes' | 'articles' | 'authors' | 'categories' | 'newsletter'>('recipes');

  // New recipe modal state
  const [showAddRecipeModal, setShowAddRecipeModal] = useState(false);
  const [recipeTitle, setRecipeTitle] = useState('');
  const [recipeDesc, setRecipeDesc] = useState('');
  const [recipeMealType, setRecipeMealType] = useState('Dinner');
  const [recipeCuisine, setRecipeCuisine] = useState('Mediterranean');
  const [recipePrepTime, setRecipePrepTime] = useState(15);
  const [recipeCookTime, setRecipeCookTime] = useState(25);
  const [recipeCalories, setRecipeCalories] = useState(420);
  const [recipeProtein, setRecipeProtein] = useState(28);

  // New article modal state
  const [showAddArticleModal, setShowAddArticleModal] = useState(false);
  const [articleTitle, setArticleTitle] = useState('');
  const [articleSubtitle, setArticleSubtitle] = useState('');
  const [articleCategory, setArticleCategory] = useState('Nutrition');
  const [articleAuthor, setArticleAuthor] = useState('author-1');

  // Publication status toggles
  const [draftStatuses, setDraftStatuses] = useState<Record<string, 'published' | 'draft' | 'scheduled'>>({});

  const handleToggleStatus = (id: string, current: string) => {
    const next = current === 'published' ? 'draft' : 'published';
    setDraftStatuses((prev) => ({ ...prev, [id]: next }));
    showToast(`Status changed to ${next.toUpperCase()}`, 'info');
  };

  const handleCreateRecipe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipeTitle.trim()) return;

    const newRec: Recipe = {
      id: `rec-custom-${Date.now()}`,
      slug: recipeTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: recipeTitle,
      shortDescription: recipeDesc || 'Chef-crafted test kitchen whole-food recipe.',
      intro: recipeDesc || 'Delicious, nutrient-dense recipe tested for maximum flavor.',
      heroImage: '/src/assets/images/recipe_salmon_skillet_1790701994035.jpg',
      prepTime: Number(recipePrepTime),
      cookTime: Number(recipeCookTime),
      totalTime: Number(recipePrepTime) + Number(recipeCookTime),
      difficulty: 'Easy',
      servings: 4,
      mealType: [recipeMealType as any],
      cuisine: recipeCuisine as any,
      cookingMethod: 'Stovetop',
      dietaryTags: ['Heart-Healthy', 'High-Protein'],
      mainIngredient: 'Fresh Produce',
      seasonal: 'Year-Round',
      rating: 5.0,
      reviewsCount: 1,
      ingredients: [
        { name: 'Extra virgin olive oil', amount: 2, unit: 'tbsp' },
        { name: 'Garlic cloves, minced', amount: 3, unit: 'cloves' },
        { name: 'Sea salt and black pepper', amount: 1, unit: 'pinch' },
      ],
      instructions: [
        { step: 1, title: 'Prep', text: 'Heat olive oil in a large skillet over medium-high heat.' },
        { step: 2, title: 'Cook', text: 'Sauté aromatics until fragrant, then simmer to golden finish.' },
      ],
      nutrition: {
        calories: Number(recipeCalories),
        protein: Number(recipeProtein),
        carbohydrates: 32,
        fat: 16,
        saturatedFat: 2.5,
        fiber: 7,
        sugar: 3,
        sodium: 380,
        potassium: 620,
      },
      authorId: 'author-2',
      publishedAt: new Date().toISOString().split('T')[0],
      featured: false,
    };

    addRecipe(newRec);
    setShowAddRecipeModal(false);
    setRecipeTitle('');
    setRecipeDesc('');
  };

  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!articleTitle.trim()) return;

    const newArt: Article = {
      id: `art-custom-${Date.now()}`,
      slug: articleTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: articleTitle,
      subtitle: articleSubtitle || 'Original reporting from the FreshNutri nutrition desk.',
      category: articleCategory as any,
      heroImage: '/src/assets/images/editorial_fresh_market_1790702018266.jpg',
      authorId: articleAuthor,
      publishedAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      readTime: '5 min read',
      tags: ['Nutrition', 'Health', 'Science'],
      content: [
        {
          type: 'paragraph',
          text: 'This comprehensive guide explores the intersection of culinary tradition and nutritional science.',
        },
      ],
      relatedRecipeIds: ['rec-1'],
      relatedArticleIds: ['art-1'],
    };

    addArticle(newArt);
    setShowAddArticleModal(false);
    setArticleTitle('');
    setArticleSubtitle('');
  };

  const combinedRecipes = [...customRecipes, ...allRecipes];
  const combinedArticles = [...customArticles, ...allArticles];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Deck */}
      <div className="border-b border-stone-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-emerald-800 font-semibold block mb-1">
            FreshNutri Editorial Desk
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-900">
            Content Management System (CMS)
          </h1>
          <p className="mt-2 text-stone-600 text-sm max-w-xl">
            Live administrative workspace for publishing recipes, scheduling articles, managing nutrition categories, and author credentials.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === 'recipes' && (
            <button
              onClick={() => setShowAddRecipeModal(true)}
              className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Recipe</span>
            </button>
          )}

          {activeTab === 'articles' && (
            <button
              onClick={() => setShowAddArticleModal(true)}
              className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Article</span>
            </button>
          )}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-stone-200 overflow-x-auto pb-1 scrollbar-none text-xs font-medium">
        <button
          onClick={() => setActiveTab('recipes')}
          className={`px-4 py-2 border-b-2 font-semibold transition-colors flex items-center gap-2 ${
            activeTab === 'recipes'
              ? 'border-emerald-700 text-emerald-900'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Recipes ({combinedRecipes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('articles')}
          className={`px-4 py-2 border-b-2 font-semibold transition-colors flex items-center gap-2 ${
            activeTab === 'articles'
              ? 'border-emerald-700 text-emerald-900'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Articles ({combinedArticles.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('authors')}
          className={`px-4 py-2 border-b-2 font-semibold transition-colors flex items-center gap-2 ${
            activeTab === 'authors'
              ? 'border-emerald-700 text-emerald-900'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Authors ({authors.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('categories')}
          className={`px-4 py-2 border-b-2 font-semibold transition-colors flex items-center gap-2 ${
            activeTab === 'categories'
              ? 'border-emerald-700 text-emerald-900'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          <FolderTree className="w-4 h-4" />
          <span>Categories ({recipeCategories.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('newsletter')}
          className={`px-4 py-2 border-b-2 font-semibold transition-colors flex items-center gap-2 ${
            activeTab === 'newsletter'
              ? 'border-emerald-700 text-emerald-900'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          <Send className="w-4 h-4" />
          <span>Newsletter Broadcasts</span>
        </button>
      </div>

      {/* 1. RECIPES TABLE */}
      {activeTab === 'recipes' && (
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs">
          <div className="p-4 border-b border-stone-200 flex items-center justify-between text-xs text-stone-500">
            <span>Showing all active test-kitchen recipes</span>
            <span className="font-mono tabular-nums">{combinedRecipes.length} Total</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-800">
              <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-200">
                <tr>
                  <th className="py-3 px-4">Recipe Title</th>
                  <th className="py-3 px-4">Course</th>
                  <th className="py-3 px-4">Cuisine</th>
                  <th className="py-3 px-4">Time</th>
                  <th className="py-3 px-4">Protein / Cal</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {combinedRecipes.slice(0, 15).map((r) => {
                  const status = draftStatuses[r.id] || 'published';
                  return (
                    <tr key={r.id} className="hover:bg-stone-50/60 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-stone-900 max-w-[240px] truncate">
                        {r.title}
                      </td>
                      <td className="py-3.5 px-4 text-stone-600">{r.mealType[0]}</td>
                      <td className="py-3.5 px-4 text-stone-600">{r.cuisine}</td>
                      <td className="py-3.5 px-4 font-mono tabular-nums">{r.totalTime} mins</td>
                      <td className="py-3.5 px-4 font-mono tabular-nums text-stone-600">
                        {r.nutrition.protein}g / {r.nutrition.calories} kcal
                      </td>
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => handleToggleStatus(r.id, status)}
                          className={`px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider ${
                            status === 'published'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {status}
                        </button>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        <button
                          onClick={() => showToast('Editing parameters loaded into draft view', 'info')}
                          className="p-1 text-stone-400 hover:text-stone-700"
                          title="Edit recipe"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteRecipe(r.id)}
                          className="p-1 text-red-400 hover:text-red-700"
                          title="Delete recipe"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2. ARTICLES TABLE */}
      {activeTab === 'articles' && (
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs">
          <div className="p-4 border-b border-stone-200 flex items-center justify-between text-xs text-stone-500">
            <span>Showing all editorial magazine articles</span>
            <span className="font-mono tabular-nums">{combinedArticles.length} Total</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-800">
              <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-200">
                <tr>
                  <th className="py-3 px-4">Headline</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Author</th>
                  <th className="py-3 px-4">Read Time</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {combinedArticles.slice(0, 15).map((a) => {
                  const author = authors.find((auth) => auth.id === a.authorId);
                  const status = draftStatuses[a.id] || 'published';
                  return (
                    <tr key={a.id} className="hover:bg-stone-50/60 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-stone-900 max-w-[280px] truncate">
                        {a.title}
                      </td>
                      <td className="py-3.5 px-4 text-emerald-800 font-medium">{a.category}</td>
                      <td className="py-3.5 px-4 text-stone-600">{author?.name || 'Staff'}</td>
                      <td className="py-3.5 px-4 text-stone-500 font-mono">{a.readTime}</td>
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => handleToggleStatus(a.id, status)}
                          className={`px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider ${
                            status === 'published'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {status}
                        </button>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        <button
                          onClick={() => showToast('Article loaded in draft editor', 'info')}
                          className="p-1 text-stone-400 hover:text-stone-700"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteArticle(a.id)}
                          className="p-1 text-red-400 hover:text-red-700"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. AUTHORS LIST */}
      {activeTab === 'authors' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {authors.map((auth) => (
            <div key={auth.id} className="p-5 bg-white rounded-xl border border-stone-200 space-y-3">
              <div className="flex items-center gap-3">
                <img src={auth.avatar} alt={auth.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h3 className="font-serif text-base font-semibold text-stone-900">{auth.name}</h3>
                  <span className="text-xs text-emerald-800 font-mono font-medium block">{auth.credentials}</span>
                </div>
              </div>
              <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">{auth.bio}</p>
              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span>{auth.role}</span>
                <span className="text-emerald-800 font-semibold cursor-pointer">Edit Profile</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. CATEGORIES MANAGER */}
      {activeTab === 'categories' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {recipeCategories.map((cat) => (
            <div key={cat.id} className="p-4 bg-white rounded-xl border border-stone-200 flex items-start justify-between">
              <div>
                <h4 className="font-serif text-sm font-semibold text-stone-900">{cat.name}</h4>
                <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">{cat.slug}</p>
              </div>
              <span className="text-[11px] text-emerald-800 font-medium bg-emerald-50 px-2 py-0.5 rounded">
                Active
              </span>
            </div>
          ))}
        </div>
      )}

      {/* 5. NEWSLETTER BROADCASTS */}
      {activeTab === 'newsletter' && (
        <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-4 max-w-xl text-xs">
          <h3 className="font-serif text-lg font-semibold text-stone-900">
            Broadcast Weekly Magazine Issue
          </h3>
          <p className="text-stone-600">
            Dispatch the Thursday meal plan digest and featured articles to 250,000+ active subscribers.
          </p>
          <div className="space-y-2">
            <label className="block font-semibold text-stone-800">Issue Subject</label>
            <input
              type="text"
              defaultValue="The Spring Produce Guide + 7-Day Mediterranean Meal Plan"
              className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs"
            />
          </div>
          <button
            onClick={() => showToast('Newsletter campaign queued for scheduled Thursday 7:00 AM dispatch!', 'success')}
            className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-lg"
          >
            Schedule Dispatch
          </button>
        </div>
      )}

      {/* Add Recipe Modal */}
      {showAddRecipeModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF9F5] w-full max-w-lg rounded-2xl shadow-2xl border border-stone-200 p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif text-xl font-semibold text-stone-900">
              Publish New Test-Kitchen Recipe
            </h3>
            <form onSubmit={handleCreateRecipe} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-stone-800 mb-1">Recipe Title</label>
                <input
                  type="text"
                  required
                  value={recipeTitle}
                  onChange={(e) => setRecipeTitle(e.target.value)}
                  placeholder="e.g., Crispy Lemon Herb Cod with Snap Peas"
                  className="w-full p-2.5 bg-white border border-stone-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-800 mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={recipeDesc}
                  onChange={(e) => setRecipeDesc(e.target.value)}
                  placeholder="Summary for recipe card and search snippet..."
                  className="w-full p-2.5 bg-white border border-stone-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-800 mb-1">Meal Course</label>
                  <select
                    value={recipeMealType}
                    onChange={(e) => setRecipeMealType(e.target.value)}
                    className="w-full p-2.5 bg-white border border-stone-200 rounded-lg"
                  >
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Salads">Salads</option>
                    <option value="Soups">Soups</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-stone-800 mb-1">Cuisine</label>
                  <input
                    type="text"
                    value={recipeCuisine}
                    onChange={(e) => setRecipeCuisine(e.target.value)}
                    className="w-full p-2.5 bg-white border border-stone-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-800 mb-1">Total Time (mins)</label>
                  <input
                    type="number"
                    value={recipePrepTime + recipeCookTime}
                    onChange={(e) => setRecipeCookTime(Number(e.target.value))}
                    className="w-full p-2.5 bg-white border border-stone-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-800 mb-1">Protein (g)</label>
                  <input
                    type="number"
                    value={recipeProtein}
                    onChange={(e) => setRecipeProtein(Number(e.target.value))}
                    className="w-full p-2.5 bg-white border border-stone-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddRecipeModal(false)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 rounded-lg text-stone-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-lg"
                >
                  Publish Recipe
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Article Modal */}
      {showAddArticleModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF9F5] w-full max-w-lg rounded-2xl shadow-2xl border border-stone-200 p-6 space-y-4">
            <h3 className="font-serif text-xl font-semibold text-stone-900">
              Publish New Editorial Article
            </h3>
            <form onSubmit={handleCreateArticle} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-stone-800 mb-1">Article Title</label>
                <input
                  type="text"
                  required
                  value={articleTitle}
                  onChange={(e) => setArticleTitle(e.target.value)}
                  placeholder="e.g., The Bioavailability of Culinary Spices"
                  className="w-full p-2.5 bg-white border border-stone-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-800 mb-1">Subtitle / Abstract</label>
                <textarea
                  rows={2}
                  value={articleSubtitle}
                  onChange={(e) => setArticleSubtitle(e.target.value)}
                  placeholder="Deck explaining the primary clinical or culinary insight..."
                  className="w-full p-2.5 bg-white border border-stone-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-800 mb-1">Category</label>
                  <select
                    value={articleCategory}
                    onChange={(e) => setArticleCategory(e.target.value)}
                    className="w-full p-2.5 bg-white border border-stone-200 rounded-lg"
                  >
                    <option value="Nutrition">Nutrition</option>
                    <option value="Healthy Eating">Healthy Eating</option>
                    <option value="Cooking Tips">Cooking Tips</option>
                    <option value="Food News">Food News</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-800 mb-1">Author</label>
                  <select
                    value={articleAuthor}
                    onChange={(e) => setArticleAuthor(e.target.value)}
                    className="w-full p-2.5 bg-white border border-stone-200 rounded-lg"
                  >
                    {authors.map((auth) => (
                      <option key={auth.id} value={auth.id}>
                        {auth.name} ({auth.credentials})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddArticleModal(false)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 rounded-lg text-stone-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-lg"
                >
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
