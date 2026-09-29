import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { allRecipes } from '../data/recipes';
import { RecipeCard } from '../components/RecipeCard';
import { Bookmark, FolderPlus, Trash2, Plus, Sparkles, Folder } from 'lucide-react';

export const SavedRecipesView: React.FC = () => {
  const {
    savedRecipeIds,
    collections,
    createCollection,
    deleteCollection,
    addRecipeToCollection,
    removeRecipeFromCollection,
    navigate,
  } = useApp();

  const [activeCollectionId, setActiveCollectionId] = useState<string>('all');
  const [newCollectionName, setNewCollectionName] = useState('');
  const [newCollectionDesc, setNewCollectionDesc] = useState('');
  const [showAddCollectionModal, setShowAddCollectionModal] = useState(false);

  // Resolved saved recipes
  const savedRecipes = useMemo(() => {
    return allRecipes.filter((r) => savedRecipeIds.includes(r.id));
  }, [savedRecipeIds]);

  // Displayed recipes depending on active collection tab
  const displayedRecipes = useMemo(() => {
    if (activeCollectionId === 'all') {
      return savedRecipes;
    }
    const currentCol = collections.find((c) => c.id === activeCollectionId);
    if (!currentCol) return savedRecipes;
    return allRecipes.filter((r) => currentCol.recipeIds.includes(r.id));
  }, [activeCollectionId, savedRecipes, collections]);

  const handleCreateCollection = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCollectionName.trim()) {
      createCollection(newCollectionName.trim(), newCollectionDesc.trim());
      setNewCollectionName('');
      setNewCollectionDesc('');
      setShowAddCollectionModal(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-stone-200 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-emerald-800 font-semibold block mb-1">
            Personal Cookery
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-900">
            Saved Recipes & Collections
          </h1>
          <p className="mt-2 text-stone-600 text-sm max-w-xl">
            Your private recipe binder stored directly in your browser. Organize your favorite weeknight meals, batch prep plans, and dinner party ideas.
          </p>
        </div>

        <button
          onClick={() => setShowAddCollectionModal(true)}
          className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <FolderPlus className="w-4 h-4" />
          <span>New Collection</span>
        </button>
      </div>

      {/* Collection Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setActiveCollectionId('all')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors border ${
            activeCollectionId === 'all'
              ? 'bg-stone-900 border-stone-900 text-white shadow-2xs'
              : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
          }`}
        >
          All Saved ({savedRecipes.length})
        </button>

        {collections.map((col) => (
          <div key={col.id} className="relative group">
            <button
              onClick={() => setActiveCollectionId(col.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-2 border ${
                activeCollectionId === col.id
                  ? 'bg-stone-900 border-stone-900 text-white shadow-2xs'
                  : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
            >
              <Folder className="w-3.5 h-3.5" />
              <span>{col.name}</span>
              <span className="opacity-70 tabular-nums font-mono">({col.recipeIds.length})</span>
            </button>
          </div>
        ))}
      </div>

      {/* Current Collection Controls & Delete */}
      {activeCollectionId !== 'all' && (
        <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between text-xs">
          <div>
            <span className="font-semibold text-stone-900">
              {collections.find((c) => c.id === activeCollectionId)?.name}
            </span>
            <span className="text-stone-500 ml-2">
              {collections.find((c) => c.id === activeCollectionId)?.description}
            </span>
          </div>
          <button
            onClick={() => {
              deleteCollection(activeCollectionId);
              setActiveCollectionId('all');
            }}
            className="text-red-600 hover:text-red-800 flex items-center gap-1 font-medium"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete Collection</span>
          </button>
        </div>
      )}

      {/* Saved Recipes Grid */}
      {displayedRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedRecipes.map((recipe) => (
            <div key={recipe.id} className="relative group/card">
              <RecipeCard recipe={recipe} />

              {/* Add to Collection Dropdown Button (On Card Hover) */}
              {collections.length > 0 && (
                <div className="mt-2 p-2 bg-white rounded-lg border border-stone-200 flex items-center justify-between text-xs">
                  <span className="text-stone-500 text-[11px]">Collection:</span>
                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        addRecipeToCollection(e.target.value, recipe.id);
                        e.target.value = '';
                      }
                    }}
                    className="bg-stone-50 border border-stone-200 rounded px-2 py-0.5 text-[11px] text-stone-700 focus:outline-none"
                    defaultValue=""
                  >
                    <option value="" disabled>Add to collection...</option>
                    {collections.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-white rounded-2xl border border-stone-200 p-8 space-y-4">
          <Bookmark className="w-10 h-10 text-stone-300 mx-auto" />
          <h3 className="font-serif text-xl font-semibold text-stone-900">
            {activeCollectionId === 'all'
              ? 'Your Saved Recipe Binder is Empty'
              : 'No recipes in this collection yet'}
          </h3>
          <p className="text-xs text-stone-500 max-w-md mx-auto">
            Click the bookmark icon on any recipe across FreshNutri to save it here for quick access while planning meals or cooking in the kitchen.
          </p>
          <button
            onClick={() => navigate('recipes')}
            className="px-5 py-2.5 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-stone-800"
          >
            Explore Recipe Database
          </button>
        </div>
      )}

      {/* Create Collection Modal */}
      {showAddCollectionModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF9F5] w-full max-w-md rounded-2xl shadow-2xl border border-stone-200 p-6 space-y-4">
            <h3 className="font-serif text-xl font-semibold text-stone-900">
              Create New Collection
            </h3>
            <form onSubmit={handleCreateCollection} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Collection Name
                </label>
                <input
                  type="text"
                  required
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                  placeholder="e.g., Quick Weeknight Dinners, High-Protein Meals"
                  className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Description (Optional)
                </label>
                <input
                  type="text"
                  value={newCollectionDesc}
                  onChange={(e) => setNewCollectionDesc(e.target.value)}
                  placeholder="e.g., Fast meals under 30 minutes for Monday through Thursday"
                  className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddCollectionModal(false)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg"
                >
                  Create Collection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
