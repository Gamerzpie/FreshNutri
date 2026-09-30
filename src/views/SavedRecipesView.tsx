import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { allRecipes } from '../data/recipes';
import { RecipeCard } from '../components/RecipeCard';
import {
  Bookmark,
  FolderPlus,
  Trash2,
  Plus,
  Sparkles,
  Folder,
  Edit3,
  Check,
  X,
  Layers,
  ChefHat,
  ArrowRight,
  SlidersHorizontal,
} from 'lucide-react';

export const SavedRecipesView: React.FC = () => {
  const {
    savedRecipeIds,
    collections,
    createCollection,
    renameCollection,
    deleteCollection,
    addRecipeToCollection,
    removeRecipeFromCollection,
    openOrganizeModal,
    navigate,
    showToast,
  } = useApp();

  const [activeCollectionId, setActiveCollectionId] = useState<string>('all');
  const [newCollectionName, setNewCollectionName] = useState('');
  const [newCollectionDesc, setNewCollectionDesc] = useState('');
  const [showAddCollectionModal, setShowAddCollectionModal] = useState(false);

  // Rename modal state
  const [editingCollectionId, setEditingCollectionId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editDesc, setEditDesc] = useState('');

  // Quick Add Recipes to Active Collection Modal
  const [showAddRecipesModal, setShowAddRecipesModal] = useState(false);

  // Resolved saved recipes
  const savedRecipes = useMemo(() => {
    return allRecipes.filter((r) => savedRecipeIds.includes(r.id));
  }, [savedRecipeIds]);

  // Active collection object
  const currentCollection = useMemo(() => {
    if (activeCollectionId === 'all') return null;
    return collections.find((c) => c.id === activeCollectionId) || null;
  }, [activeCollectionId, collections]);

  // Displayed recipes depending on active collection tab
  const displayedRecipes = useMemo(() => {
    if (activeCollectionId === 'all') {
      return savedRecipes;
    }
    if (!currentCollection) return savedRecipes;
    return allRecipes.filter((r) => currentCollection.recipeIds.includes(r.id));
  }, [activeCollectionId, savedRecipes, currentCollection]);

  // Recipes available to add to active collection (saved recipes not yet in this collection)
  const availableToAdd = useMemo(() => {
    if (!currentCollection) return [];
    return savedRecipes.filter((r) => !currentCollection.recipeIds.includes(r.id));
  }, [currentCollection, savedRecipes]);

  // Preset collection name suggestions
  const suggestedCollectionPresets = [
    'Weekly Meal Prep',
    'Holiday Favorites',
    'Quick Weeknights',
    'High-Protein Lunches',
    'DASH & Low-Sodium',
    'Dinner Party Feast',
    'Summer Grilling',
    'Comfort Soups',
  ];

  const handleCreateCollection = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCollectionName.trim()) {
      const newId = createCollection(newCollectionName.trim(), newCollectionDesc.trim() || undefined);
      setNewCollectionName('');
      setNewCollectionDesc('');
      setShowAddCollectionModal(false);
      setActiveCollectionId(newId);
    }
  };

  const handleStartRename = () => {
    if (!currentCollection) return;
    setEditingCollectionId(currentCollection.id);
    setEditName(currentCollection.name);
    setEditDesc(currentCollection.description || '');
  };

  const handleSaveRename = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCollectionId && editName.trim()) {
      renameCollection(editingCollectionId, editName.trim(), editDesc.trim() || undefined);
      setEditingCollectionId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-stone-200 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-emerald-800 font-semibold font-mono block mb-1">
            Personal Cookery & Recipe Binder
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-900">
            Saved Recipes & Custom Collections
          </h1>
          <p className="mt-2 text-stone-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Organize your favorite recipes into custom named collections such as <strong className="text-stone-800">"Weekly Meal Prep"</strong> or <strong className="text-stone-800">"Holiday Favorites"</strong>. All collections persist in your browser for instant kitchen reference.
          </p>
        </div>

        <button
          onClick={() => setShowAddCollectionModal(true)}
          className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-2 self-start sm:self-auto shadow-sm"
        >
          <FolderPlus className="w-4 h-4 text-emerald-400" />
          <span>New Collection</span>
        </button>
      </div>

      {/* Collection Tabs Rail */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-stone-200">
        {/* All Saved Tab */}
        <button
          onClick={() => setActiveCollectionId('all')}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 border ${
            activeCollectionId === 'all'
              ? 'bg-stone-900 border-stone-900 text-white shadow-sm'
              : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span>All Saved</span>
          <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono tabular-nums ${
            activeCollectionId === 'all' ? 'bg-stone-800 text-stone-200' : 'bg-stone-100 text-stone-600'
          }`}>
            {savedRecipes.length}
          </span>
        </button>

        {/* Custom Named Collection Tabs */}
        {collections.map((col) => {
          const isActive = activeCollectionId === col.id;
          return (
            <button
              key={col.id}
              onClick={() => setActiveCollectionId(col.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 border ${
                isActive
                  ? 'bg-stone-900 border-stone-900 text-white shadow-sm'
                  : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
            >
              <Folder className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-stone-400'}`} />
              <span>{col.name}</span>
              <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono tabular-nums ${
                isActive ? 'bg-stone-800 text-stone-200' : 'bg-stone-100 text-stone-600'
              }`}>
                {col.recipeIds.length}
              </span>
            </button>
          );
        })}

        {/* Inline + Tab to create new collection */}
        <button
          onClick={() => setShowAddCollectionModal(true)}
          className="px-3 py-2.5 rounded-xl text-xs font-semibold text-stone-500 hover:text-stone-900 hover:bg-stone-100 whitespace-nowrap transition-colors flex items-center gap-1.5 border border-dashed border-stone-300"
          title="Create custom named collection"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Tab</span>
        </button>
      </div>

      {/* Active Collection Banner & Management Strip */}
      {currentCollection && (
        <div className="bg-[#FAF9F5] p-5 sm:p-6 rounded-2xl border border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-900 font-mono text-[10px] uppercase font-bold rounded-md">
                Custom Collection
              </span>
              <span className="text-stone-400 text-xs font-mono">
                Created {currentCollection.createdAt}
              </span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              {currentCollection.name}
            </h2>
            <p className="text-xs text-stone-500 max-w-xl">
              {currentCollection.description || 'Custom collection curated from your favorite test-kitchen recipes.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            {/* Add Recipes to this collection button */}
            <button
              onClick={() => setShowAddRecipesModal(true)}
              className="px-3.5 py-2 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Saved Recipes</span>
            </button>

            {/* Rename Collection button */}
            <button
              onClick={handleStartRename}
              className="px-3 py-2 bg-white hover:bg-stone-100 border border-stone-300 text-stone-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Edit3 className="w-3.5 h-3.5 text-stone-500" />
              <span>Rename</span>
            </button>

            {/* Delete Collection button */}
            <button
              onClick={() => {
                if (window.confirm(`Are you sure you want to delete the collection "${currentCollection.name}"?`)) {
                  deleteCollection(currentCollection.id);
                  setActiveCollectionId('all');
                }
              }}
              className="px-3 py-2 bg-white hover:bg-red-50 border border-stone-300 hover:border-red-300 text-red-600 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
              title="Delete this collection"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      )}

      {/* Saved Recipes Grid */}
      {displayedRecipes.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-stone-500 font-mono">
            <span>
              Showing {displayedRecipes.length} {displayedRecipes.length === 1 ? 'recipe' : 'recipes'} in{' '}
              <strong className="text-stone-800 font-sans font-semibold">
                {currentCollection ? currentCollection.name : 'All Saved'}
              </strong>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedRecipes.map((recipe) => (
              <div key={recipe.id} className="relative group/card flex flex-col justify-between">
                <RecipeCard recipe={recipe} />

                {/* Card Collection Actions Strip */}
                <div className="mt-2.5 p-2.5 bg-white rounded-xl border border-stone-200 flex items-center justify-between text-xs">
                  <button
                    onClick={() => openOrganizeModal(recipe.id)}
                    className="text-stone-600 hover:text-emerald-900 font-medium flex items-center gap-1.5 text-xs transition-colors"
                  >
                    <Folder className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Organize Collections</span>
                  </button>

                  {/* If in custom collection tab: quick remove from this collection */}
                  {currentCollection && (
                    <button
                      onClick={() => removeRecipeFromCollection(currentCollection.id, recipe.id)}
                      className="text-stone-400 hover:text-red-600 transition-colors text-[11px] font-mono flex items-center gap-1"
                      title={`Remove from ${currentCollection.name}`}
                    >
                      <X className="w-3 h-3" />
                      <span>Remove from tab</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="py-16 text-center max-w-md mx-auto space-y-4 bg-white p-8 rounded-2xl border border-stone-200">
          <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mx-auto">
            <Folder className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <h3 className="font-serif text-xl font-semibold text-stone-900">
              {currentCollection ? `No recipes in "${currentCollection.name}" yet` : 'Your recipe binder is currently empty'}
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              {currentCollection
                ? 'Populate this custom collection by adding recipes from your saved collection or while browsing the test kitchen.'
                : 'Bookmark your favorite recipes while browsing to keep them easily accessible in your cookery.'}
            </p>
          </div>

          <div className="pt-2 flex flex-wrap justify-center gap-2">
            {currentCollection && savedRecipes.length > 0 ? (
              <button
                onClick={() => setShowAddRecipesModal(true)}
                className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add from All Saved ({savedRecipes.length})</span>
              </button>
            ) : (
              <button
                onClick={() => navigate('recipes')}
                className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
              >
                <span>Browse All Recipes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* MODAL 1: Create New Collection Modal */}
      {showAddCollectionModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div
            className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-stone-200 p-6 space-y-5 animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <FolderPlus className="w-5 h-5 text-emerald-800" />
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  New Custom Named Collection
                </h3>
              </div>
              <button
                onClick={() => setShowAddCollectionModal(false)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCollection} className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Collection Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  placeholder="e.g. Weekly Meal Prep, Holiday Favorites"
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:border-emerald-700 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Optional Description
                </label>
                <input
                  type="text"
                  placeholder="e.g. High-protein dinners and weekend batch soups"
                  value={newCollectionDesc}
                  onChange={(e) => setNewCollectionDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:border-emerald-700 focus:bg-white"
                />
              </div>

              {/* Quick Preset Buttons */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wider block">
                  Quick Name Presets:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {suggestedCollectionPresets.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setNewCollectionName(preset)}
                      className="px-2.5 py-1 bg-stone-100 hover:bg-emerald-50 hover:text-emerald-900 hover:border-emerald-300 border border-stone-200 text-stone-600 rounded-lg transition-colors"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setShowAddCollectionModal(false)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <FolderPlus className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Create Tab</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Rename Collection Modal */}
      {editingCollectionId && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div
            className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-stone-200 p-6 space-y-4 animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-emerald-800" />
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Rename Collection
                </h3>
              </div>
              <button
                onClick={() => setEditingCollectionId(null)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveRename} className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Collection Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:border-emerald-700 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:border-emerald-700 focus:bg-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setEditingCollectionId(null)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-lg transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: Add Recipes to Current Collection Modal */}
      {showAddRecipesModal && currentCollection && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div
            className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[85vh] animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 bg-[#FAF9F5] border-b border-stone-200 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Add Saved Recipes to "{currentCollection.name}"
                </h3>
                <p className="text-xs text-stone-500">
                  Select from your saved recipes to add them to this tab.
                </p>
              </div>
              <button
                onClick={() => setShowAddRecipesModal(false)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-2 flex-1">
              {availableToAdd.length === 0 ? (
                <div className="p-8 text-center text-stone-500 text-xs space-y-2">
                  <Check className="w-8 h-8 text-emerald-600 mx-auto" />
                  <p className="font-semibold text-stone-800">
                    All your currently saved recipes are already in this collection!
                  </p>
                  <p>
                    Bookmark more recipes from the recipes catalog to add them here.
                  </p>
                </div>
              ) : (
                availableToAdd.map((recipe) => (
                  <div
                    key={recipe.id}
                    className="p-3 bg-stone-50 hover:bg-stone-100 rounded-xl border border-stone-200 flex items-center justify-between gap-3 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={recipe.heroImage}
                        alt=""
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <span className="font-serif text-xs font-semibold text-stone-900 block line-clamp-1">
                          {recipe.title}
                        </span>
                        <span className="text-[11px] text-stone-500">
                          {recipe.cuisine} · {recipe.totalTime} mins
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => addRecipeToCollection(currentCollection.id, recipe.id)}
                      className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 shrink-0"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add</span>
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setShowAddRecipesModal(false)}
                className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
