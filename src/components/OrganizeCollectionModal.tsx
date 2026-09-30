import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getRecipeById } from '../data/recipes';
import {
  X,
  FolderPlus,
  Folder,
  Check,
  Plus,
  Bookmark,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

interface OrganizeCollectionModalProps {
  recipeId: string;
  onClose: () => void;
}

export const OrganizeCollectionModal: React.FC<OrganizeCollectionModalProps> = ({
  recipeId,
  onClose,
}) => {
  const {
    collections,
    createCollection,
    toggleRecipeInCollection,
    isRecipeInCollection,
    savedRecipeIds,
    toggleSaveRecipe,
  } = useApp();

  const [newCollectionName, setNewCollectionName] = useState('');
  const [newCollectionDesc, setNewCollectionDesc] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const recipe = getRecipeById(recipeId);
  const isSaved = savedRecipeIds.includes(recipeId);

  // Suggested preset collection names
  const suggestedNames = [
    'Weekly Meal Prep',
    'Holiday Favorites',
    'Quick Weeknights',
    'High-Protein Lunches',
    'DASH & Low-Sodium',
    'Dinner Party Feast',
  ];

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCollectionName.trim()) {
      const newId = createCollection(newCollectionName.trim(), newCollectionDesc.trim() || undefined);
      // Automatically add this recipe to the newly created collection
      toggleRecipeInCollection(newId, recipeId);
      setNewCollectionName('');
      setNewCollectionDesc('');
      setShowCreateForm(false);
    }
  };

  const handleQuickAddPreset = (presetName: string) => {
    // Check if collection already exists
    const existing = collections.find((c) => c.name.toLowerCase() === presetName.toLowerCase());
    if (existing) {
      if (!isRecipeInCollection(existing.id, recipeId)) {
        toggleRecipeInCollection(existing.id, recipeId);
      }
    } else {
      const newId = createCollection(presetName, `Curated collection for ${presetName.toLowerCase()}`);
      toggleRecipeInCollection(newId, recipeId);
    }
  };

  if (!recipe) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-[#FAF9F5] border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100/70 border border-emerald-200 flex items-center justify-center text-emerald-800">
              <Folder className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Organize into Collections
              </h3>
              <p className="text-xs text-stone-500 truncate max-w-[280px]">
                {recipe.title}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 rounded-xl transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1">
          {/* Main Save Status */}
          <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
            <div className="flex items-center gap-2.5">
              <Bookmark className={`w-4 h-4 ${isSaved ? 'text-emerald-700 fill-emerald-700' : 'text-stone-400'}`} />
              <div>
                <span className="text-xs font-semibold text-stone-900 block">
                  {isSaved ? 'Saved to your Cookery' : 'Save to Cookery'}
                </span>
                <span className="text-[11px] text-stone-500">
                  {isSaved ? 'Recipe is saved in your private binder' : 'Add to your personal saved library'}
                </span>
              </div>
            </div>

            <button
              onClick={() => toggleSaveRecipe(recipeId)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors border ${
                isSaved
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                  : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-100'
              }`}
            >
              {isSaved ? 'Saved' : 'Save Recipe'}
            </button>
          </div>

          {/* Existing Collections List */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono uppercase tracking-wider text-stone-500 font-semibold">
                Your Custom Collections ({collections.length})
              </span>
              <button
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="text-emerald-800 hover:text-emerald-950 font-semibold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create Collection</span>
              </button>
            </div>

            {collections.length === 0 ? (
              <div className="p-6 text-center bg-stone-50 rounded-xl border border-dashed border-stone-300">
                <FolderPlus className="w-8 h-8 text-stone-400 mx-auto mb-2" />
                <p className="font-serif text-sm font-semibold text-stone-800">
                  No collections created yet
                </p>
                <p className="text-xs text-stone-500 mt-1 mb-3">
                  Organize your recipes into custom groups like 'Weekly Meal Prep' or 'Holiday Favorites'.
                </p>
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="px-3.5 py-1.5 bg-stone-900 text-white rounded-lg text-xs font-semibold"
                >
                  Create First Collection
                </button>
              </div>
            ) : (
              <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                {collections.map((col) => {
                  const inCol = isRecipeInCollection(col.id, recipeId);
                  return (
                    <button
                      key={col.id}
                      onClick={() => toggleRecipeInCollection(col.id, recipeId)}
                      className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                        inCol
                          ? 'bg-emerald-50/80 border-emerald-400 text-emerald-950 shadow-2xs'
                          : 'bg-white border-stone-200 hover:bg-stone-50 text-stone-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                            inCol
                              ? 'bg-emerald-700 border-emerald-700 text-white'
                              : 'border-stone-300 bg-white'
                          }`}
                        >
                          {inCol && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <span className="font-serif text-sm font-semibold block">
                            {col.name}
                          </span>
                          {col.description && (
                            <span className="text-[11px] text-stone-500 line-clamp-1">
                              {col.description}
                            </span>
                          )}
                        </div>
                      </div>

                      <span className="text-xs font-mono text-stone-400 tabular-nums">
                        {col.recipeIds.length} {col.recipeIds.length === 1 ? 'recipe' : 'recipes'}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Create Collection Form */}
          {showCreateForm && (
            <form onSubmit={handleCreate} className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3 animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider font-semibold text-stone-700">
                  New Custom Named Collection
                </span>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="text-stone-400 hover:text-stone-700 text-xs"
                >
                  Cancel
                </button>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                  Collection Name (e.g. Weekly Meal Prep, Holiday Favorites)
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                  placeholder="e.g. Weekly Meal Prep"
                  className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-emerald-700"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                  Optional Description
                </label>
                <input
                  type="text"
                  value={newCollectionDesc}
                  onChange={(e) => setNewCollectionDesc(e.target.value)}
                  placeholder="e.g. High-protein make-ahead Sunday recipes"
                  className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-emerald-700"
                />
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create & Add Recipe</span>
                </button>
              </div>
            </form>
          )}

          {/* Popular Suggested Collection Chips */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono text-stone-400 block uppercase tracking-wider">
              Quick Suggestions:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {suggestedNames.map((name) => {
                const existing = collections.find((c) => c.name.toLowerCase() === name.toLowerCase());
                const inCol = existing ? isRecipeInCollection(existing.id, recipeId) : false;

                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => handleQuickAddPreset(name)}
                    className={`px-2.5 py-1 text-xs rounded-lg border transition-all flex items-center gap-1.5 ${
                      inCol
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-semibold'
                        : 'bg-white border-stone-200 hover:border-stone-400 text-stone-600'
                    }`}
                  >
                    {inCol ? <Check className="w-3 h-3 text-emerald-700" /> : <Plus className="w-3 h-3 text-stone-400" />}
                    <span>{name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <span className="text-xs text-stone-500">
            Changes save automatically
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
