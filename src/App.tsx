import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { NewsletterModal } from './components/NewsletterModal';
import { ToastContainer } from './components/ToastContainer';

// Views
import { HomeView } from './views/HomeView';
import { RecipeListingView } from './views/RecipeListingView';
import { RecipeDetailView } from './views/RecipeDetailView';
import { ArticleListingView } from './views/ArticleListingView';
import { ArticleDetailView } from './views/ArticleDetailView';
import { MealPlansView } from './views/MealPlansView';
import { MealPlanDetailView } from './views/MealPlanDetailView';
import { NutritionHubView } from './views/NutritionHubView';
import { HealthyLifestyleView } from './views/HealthyLifestyleView';
import { FoodNewsView } from './views/FoodNewsView';
import { CategoryPageView } from './views/CategoryPageView';
import { SavedRecipesView } from './views/SavedRecipesView';
import { AuthorView } from './views/AuthorView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { AdminView } from './views/AdminView';
import { HealthConditionsDietView } from './views/HealthConditionsDietView';

const MainContent: React.FC = () => {
  const { currentRoute } = useApp();

  const renderCurrentView = () => {
    switch (currentRoute) {
      case 'recipes':
        return <RecipeListingView />;
      case 'recipe':
        return <RecipeDetailView />;
      case 'articles':
        return <ArticleListingView />;
      case 'article':
        return <ArticleDetailView />;
      case 'healthy-eating':
        return <ArticleListingView />;
      case 'nutrition':
        return <NutritionHubView />;
      case 'health-diets':
      case 'condition-diet':
        return <HealthConditionsDietView />;
      case 'meal-plans':
        return <MealPlansView />;
      case 'meal-plan':
        return <MealPlanDetailView />;
      case 'healthy-lifestyle':
        return <HealthyLifestyleView />;
      case 'food-news':
        return <FoodNewsView />;
      case 'category':
        return <CategoryPageView />;
      case 'saved':
        return <SavedRecipesView />;
      case 'author':
        return <AuthorView />;
      case 'about':
        return <AboutView />;
      case 'contact':
        return <ContactView />;
      case 'admin':
        return <AdminView />;
      case 'home':
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-stone-900 selection:bg-emerald-100 selection:text-emerald-950 font-sans">
      <Header />
      <main className="flex-1">
        {renderCurrentView()}
      </main>
      <Footer />
      <SearchModal />
      <NewsletterModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
