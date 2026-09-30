import React, { createContext, useContext, useState, useEffect } from 'react';
import { SavedCollection, Recipe, Article } from '../types';
import { allRecipes } from '../data/recipes';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning';
}

interface AppContextType {
  // Navigation
  currentRoute: string;
  routeParams: Record<string, string>;
  navigate: (route: string, params?: Record<string, string>) => void;
  goBack: () => void;

  // Saved Recipes & Collections
  savedRecipeIds: string[];
  collections: SavedCollection[];
  isRecipeSaved: (recipeId: string) => boolean;
  toggleSaveRecipe: (recipeId: string) => void;
  createCollection: (name: string, description?: string) => string;
  renameCollection: (collectionId: string, newName: string, newDescription?: string) => void;
  addRecipeToCollection: (collectionId: string, recipeId: string) => void;
  removeRecipeFromCollection: (collectionId: string, recipeId: string) => void;
  toggleRecipeInCollection: (collectionId: string, recipeId: string) => void;
  isRecipeInCollection: (collectionId: string, recipeId: string) => boolean;
  getCollectionsForRecipe: (recipeId: string) => SavedCollection[];
  deleteCollection: (collectionId: string) => void;

  // Organize Recipe Modal
  organizeRecipeModalId: string | null;
  openOrganizeModal: (recipeId: string) => void;
  closeOrganizeModal: () => void;

  // Search Modal
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Newsletter Modal
  isNewsletterOpen: boolean;
  openNewsletter: () => void;
  closeNewsletter: () => void;
  subscribeNewsletter: (email: string, topics: string[]) => boolean;

  // Dynamic Content (support Admin additions/edits)
  customRecipes: Recipe[];
  customArticles: Article[];
  addRecipe: (recipe: Recipe) => void;
  updateRecipe: (recipe: Recipe) => void;
  deleteRecipe: (id: string) => void;
  addArticle: (article: Article) => void;
  updateArticle: (article: Article) => void;
  deleteArticle: (id: string) => void;

  // Toast
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const SAVED_RECIPES_KEY = 'freshnutri_saved_recipes_v1';
const SAVED_COLLECTIONS_KEY = 'freshnutri_collections_v1';
const CUSTOM_RECIPES_KEY = 'freshnutri_custom_recipes_v1';
const CUSTOM_ARTICLES_KEY = 'freshnutri_custom_articles_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Routing
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [routeParams, setRouteParams] = useState<Record<string, string>>({});
  const [historyStack, setHistoryStack] = useState<Array<{ route: string; params: Record<string, string> }>>([
    { route: 'home', params: {} },
  ]);

  // Saved items
  const [savedRecipeIds, setSavedRecipeIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(SAVED_RECIPES_KEY) || localStorage.getItem('freshtable_saved_recipes_v1');
      return stored ? JSON.parse(stored) : ['rec-1', 'rec-2', 'rec-4'];
    } catch {
      return ['rec-1', 'rec-2', 'rec-4'];
    }
  });

  const [collections, setCollections] = useState<SavedCollection[]>(() => {
    try {
      const stored = localStorage.getItem(SAVED_COLLECTIONS_KEY) || localStorage.getItem('freshtable_collections_v1');
      return stored
        ? JSON.parse(stored)
        : [
            {
              id: 'col-weeknight',
              name: 'Quick Weeknight Dinners',
              description: 'Nutritious meals ready in 35 minutes or less',
              recipeIds: ['rec-1', 'rec-2'],
              createdAt: '2026-03-01',
            },
            {
              id: 'col-meal-prep',
              name: 'Sunday Batch Prep',
              description: 'Big-batch soups, roasted vegetables, and grains',
              recipeIds: ['rec-4'],
              createdAt: '2026-03-05',
            },
          ];
    } catch {
      return [];
    }
  });

  // Custom added/edited recipes and articles (for Admin functionality)
  const [customRecipes, setCustomRecipes] = useState<Recipe[]>(() => {
    try {
      const stored = localStorage.getItem(CUSTOM_RECIPES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [customArticles, setCustomArticles] = useState<Article[]>(() => {
    try {
      const stored = localStorage.getItem(CUSTOM_ARTICLES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Modals & Search
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const [organizeRecipeModalId, setOrganizeRecipeModalId] = useState<string | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync saved items to local storage
  useEffect(() => {
    try {
      localStorage.setItem(SAVED_RECIPES_KEY, JSON.stringify(savedRecipeIds));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [savedRecipeIds]);

  useEffect(() => {
    try {
      localStorage.setItem(SAVED_COLLECTIONS_KEY, JSON.stringify(collections));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [collections]);

  useEffect(() => {
    try {
      localStorage.setItem(CUSTOM_RECIPES_KEY, JSON.stringify(customRecipes));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [customRecipes]);

  useEffect(() => {
    try {
      localStorage.setItem(CUSTOM_ARTICLES_KEY, JSON.stringify(customArticles));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [customArticles]);

  // URL Hash synchronization for clean, shareable URLs
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '') || 'home';
      const parts = hash.split('/');
      const baseRoute = parts[0] || 'home';
      const params: Record<string, string> = {};

      if (parts[1]) {
        params.id = parts[1];
        params.slug = parts[1];
      }
      if (parts[2]) {
        params.sub = parts[2];
      }

      setCurrentRoute(baseRoute);
      setRouteParams(params);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial load
    if (window.location.hash) {
      handleHashChange();
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (route: string, params: Record<string, string> = {}) => {
    let hash = `#/${route}`;
    if (params.id || params.slug) {
      hash += `/${params.id || params.slug}`;
    }
    window.location.hash = hash;
    setCurrentRoute(route);
    setRouteParams(params);
    setHistoryStack((prev) => [...prev, { route, params }]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    if (historyStack.length > 1) {
      const nextStack = [...historyStack];
      nextStack.pop();
      const prev = nextStack[nextStack.length - 1];
      setHistoryStack(nextStack);
      navigate(prev.route, prev.params);
    } else {
      navigate('home');
    }
  };

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const isRecipeSaved = (recipeId: string): boolean => {
    return savedRecipeIds.includes(recipeId);
  };

  const toggleSaveRecipe = (recipeId: string) => {
    setSavedRecipeIds((prev) => {
      const exists = prev.includes(recipeId);
      if (exists) {
        showToast('Recipe removed from your saved list', 'info');
        return prev.filter((id) => id !== recipeId);
      } else {
        const found = allRecipes.find((r) => r.id === recipeId);
        showToast(`Saved "${found ? found.title : 'Recipe'}" to your collection!`, 'success');
        return [...prev, recipeId];
      }
    });
  };

  const createCollection = (name: string, description?: string): string => {
    const newId = `col-${Date.now()}`;
    const newCol: SavedCollection = {
      id: newId,
      name,
      description,
      recipeIds: [],
      createdAt: new Date().toISOString().split('T')[0],
    };
    setCollections((prev) => [...prev, newCol]);
    showToast(`Created new collection "${name}"`, 'success');
    return newId;
  };

  const renameCollection = (collectionId: string, newName: string, newDescription?: string) => {
    setCollections((prev) =>
      prev.map((c) =>
        c.id === collectionId
          ? { ...c, name: newName, description: newDescription !== undefined ? newDescription : c.description }
          : c
      )
    );
    showToast(`Updated collection "${newName}"`, 'success');
  };

  const addRecipeToCollection = (collectionId: string, recipeId: string) => {
    setCollections((prev) =>
      prev.map((c) => {
        if (c.id === collectionId && !c.recipeIds.includes(recipeId)) {
          return { ...c, recipeIds: [...c.recipeIds, recipeId] };
        }
        return c;
      })
    );
    // Also ensure it is marked as saved
    if (!savedRecipeIds.includes(recipeId)) {
      setSavedRecipeIds((prev) => [...prev, recipeId]);
    }
    const colName = collections.find((c) => c.id === collectionId)?.name || 'collection';
    showToast(`Saved to "${colName}"`, 'success');
  };

  const removeRecipeFromCollection = (collectionId: string, recipeId: string) => {
    setCollections((prev) =>
      prev.map((c) => {
        if (c.id === collectionId) {
          return { ...c, recipeIds: c.recipeIds.filter((id) => id !== recipeId) };
        }
        return c;
      })
    );
    const colName = collections.find((c) => c.id === collectionId)?.name || 'collection';
    showToast(`Removed from "${colName}"`, 'info');
  };

  const toggleRecipeInCollection = (collectionId: string, recipeId: string) => {
    const col = collections.find((c) => c.id === collectionId);
    if (!col) return;
    if (col.recipeIds.includes(recipeId)) {
      removeRecipeFromCollection(collectionId, recipeId);
    } else {
      addRecipeToCollection(collectionId, recipeId);
    }
  };

  const isRecipeInCollection = (collectionId: string, recipeId: string): boolean => {
    const col = collections.find((c) => c.id === collectionId);
    return Boolean(col && col.recipeIds.includes(recipeId));
  };

  const getCollectionsForRecipe = (recipeId: string): SavedCollection[] => {
    return collections.filter((c) => c.recipeIds.includes(recipeId));
  };

  const deleteCollection = (collectionId: string) => {
    setCollections((prev) => prev.filter((c) => c.id !== collectionId));
    showToast('Collection deleted', 'info');
  };

  const openOrganizeModal = (recipeId: string) => setOrganizeRecipeModalId(recipeId);
  const closeOrganizeModal = () => setOrganizeRecipeModalId(null);

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  const openNewsletter = () => setIsNewsletterOpen(true);
  const closeNewsletter = () => setIsNewsletterOpen(false);

  const subscribeNewsletter = (email: string, topics: string[]): boolean => {
    if (!email || !email.includes('@')) return false;
    showToast(`Welcome! You are subscribed with ${topics.length} preferred editions.`, 'success');
    setIsNewsletterOpen(false);
    return true;
  };

  // Content Management
  const addRecipe = (recipe: Recipe) => {
    setCustomRecipes((prev) => [recipe, ...prev]);
    showToast(`Published "${recipe.title}"`, 'success');
  };

  const updateRecipe = (recipe: Recipe) => {
    setCustomRecipes((prev) => prev.map((r) => (r.id === recipe.id ? recipe : r)));
    showToast(`Updated "${recipe.title}"`, 'success');
  };

  const deleteRecipe = (id: string) => {
    setCustomRecipes((prev) => prev.filter((r) => r.id !== id));
    showToast('Recipe deleted from database', 'info');
  };

  const addArticle = (article: Article) => {
    setCustomArticles((prev) => [article, ...prev]);
    showToast(`Published "${article.title}"`, 'success');
  };

  const updateArticle = (article: Article) => {
    setCustomArticles((prev) => prev.map((a) => (a.id === article.id ? article : a)));
    showToast(`Updated "${article.title}"`, 'success');
  };

  const deleteArticle = (id: string) => {
    setCustomArticles((prev) => prev.filter((a) => a.id !== id));
    showToast('Article deleted from publication', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentRoute,
        routeParams,
        navigate,
        goBack,
        savedRecipeIds,
        collections,
        isRecipeSaved,
        toggleSaveRecipe,
        createCollection,
        renameCollection,
        addRecipeToCollection,
        removeRecipeFromCollection,
        toggleRecipeInCollection,
        isRecipeInCollection,
        getCollectionsForRecipe,
        deleteCollection,
        organizeRecipeModalId,
        openOrganizeModal,
        closeOrganizeModal,
        isSearchOpen,
        openSearch,
        closeSearch,
        searchQuery,
        setSearchQuery,
        isNewsletterOpen,
        openNewsletter,
        closeNewsletter,
        subscribeNewsletter,
        customRecipes,
        customArticles,
        addRecipe,
        updateRecipe,
        deleteRecipe,
        addArticle,
        updateArticle,
        deleteArticle,
        toasts,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
