import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Heart, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate, subscribeNewsletter } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      subscribeNewsletter(email, ['Daily Recipe', 'Weekly Meal Planner']);
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Editorial Magazine Banner */}
        <div className="pb-12 border-b border-stone-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <span className="font-serif text-3xl sm:text-4xl text-white font-medium tracking-tight block">
              FreshNutri
            </span>
            <p className="mt-3 text-stone-400 text-sm max-w-xl leading-relaxed">
              A modern digital food and nutrition publication dedicated to delicious, whole-food recipes tested in our test kitchen, evidence-based nutrition science, and mindful lifestyle rhythms.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-stone-800/80 p-5 rounded-xl border border-stone-700/80">
              <span className="text-white text-sm font-semibold block">
                The FreshNutri Weekly Digest
              </span>
              <p className="text-xs text-stone-400 mt-1">
                Seasonal recipes, 7-day meal plans, and peer-reviewed nutrition science delivered every Thursday.
              </p>
              {subscribed ? (
                <div className="mt-3 text-xs text-emerald-400 font-medium bg-emerald-950/60 p-2.5 rounded-lg border border-emerald-800">
                  Thank you! You are subscribed to the FreshNutri Weekly Digest.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="mt-3 flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="flex-1 bg-stone-900 border border-stone-700 text-white placeholder-stone-500 text-xs px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Multi-Column Nav Grid */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 text-xs border-b border-stone-800">
          <div>
            <h4 className="text-white font-semibold uppercase tracking-wider mb-4">Recipes</h4>
            <ul className="space-y-2.5 text-stone-400">
              <li><button onClick={() => navigate('category', { slug: 'breakfast' })} className="hover:text-stone-200 transition-colors">Healthy Breakfast</button></li>
              <li><button onClick={() => navigate('category', { slug: 'lunch' })} className="hover:text-stone-200 transition-colors">Energizing Lunch</button></li>
              <li><button onClick={() => navigate('category', { slug: 'dinner' })} className="hover:text-stone-200 transition-colors">Weeknight Dinner</button></li>
              <li><button onClick={() => navigate('category', { slug: 'salads' })} className="hover:text-stone-200 transition-colors">Abundant Salads</button></li>
              <li><button onClick={() => navigate('category', { slug: 'soups' })} className="hover:text-stone-200 transition-colors">Soups & Stews</button></li>
              <li><button onClick={() => navigate('category', { slug: 'seafood' })} className="hover:text-stone-200 transition-colors">Omega-3 Seafood</button></li>
              <li><button onClick={() => navigate('category', { slug: 'vegetarian' })} className="hover:text-stone-200 transition-colors">Vegetarian Mains</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold uppercase tracking-wider mb-4">Clinical & Condition Diets</h4>
            <ul className="space-y-2.5 text-stone-400">
              <li><button onClick={() => navigate('health-diets', { slug: 'hypertension-dash-diet' })} className="hover:text-stone-200 transition-colors">DASH Blood Pressure</button></li>
              <li><button onClick={() => navigate('health-diets', { slug: 'type-2-diabetes-blood-sugar' })} className="hover:text-stone-200 transition-colors">Diabetes & Blood Sugar</button></li>
              <li><button onClick={() => navigate('health-diets', { slug: 'hyperlipidemia-cardiovascular-health' })} className="hover:text-stone-200 transition-colors">Cholesterol & Heart</button></li>
              <li><button onClick={() => navigate('health-diets', { slug: 'chronic-kidney-disease-renal-nutrition' })} className="hover:text-stone-200 transition-colors">Kidney Health (CKD)</button></li>
              <li><button onClick={() => navigate('health-diets', { slug: 'irritable-bowel-ibs-low-fodmap' })} className="hover:text-stone-200 transition-colors">IBS & Low-FODMAP</button></li>
              <li><button onClick={() => navigate('health-diets')} className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">All Clinical Diets →</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold uppercase tracking-wider mb-4">Meal Plans</h4>
            <ul className="space-y-2.5 text-stone-400">
              <li><button onClick={() => navigate('meal-plan', { slug: '7-day-mediterranean-longevity-plan' })} className="hover:text-stone-200 transition-colors">7-Day Mediterranean</button></li>
              <li><button onClick={() => navigate('meal-plan', { slug: '7-day-high-protein-metabolism-plan' })} className="hover:text-stone-200 transition-colors">7-Day High-Protein</button></li>
              <li><button onClick={() => navigate('meal-plan', { slug: '7-day-plant-forward-vegetarian-vitality-plan' })} className="hover:text-stone-200 transition-colors">7-Day Plant-Forward</button></li>
              <li><button onClick={() => navigate('meal-plan', { slug: '7-day-heart-healthy-low-sodium-plan' })} className="hover:text-stone-200 transition-colors">7-Day Low-Sodium</button></li>
              <li><button onClick={() => navigate('meal-plan', { slug: '7-day-quick-easy-30-minute-plan' })} className="hover:text-stone-200 transition-colors">7-Day 30-Minute</button></li>
              <li><button onClick={() => navigate('meal-plans')} className="hover:text-stone-200 transition-colors">Browse All 10 Plans</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold uppercase tracking-wider mb-4">Healthy Lifestyle</h4>
            <ul className="space-y-2.5 text-stone-400">
              <li><button onClick={() => navigate('category', { slug: 'circadian-eating-sleep' })} className="hover:text-stone-200 transition-colors">Circadian Eating</button></li>
              <li><button onClick={() => navigate('category', { slug: 'mindful-eating-sensory' })} className="hover:text-stone-200 transition-colors">Mindful Eating</button></li>
              <li><button onClick={() => navigate('category', { slug: 'kitchen-pantry-systems' })} className="hover:text-stone-200 transition-colors">Pantry Organization</button></li>
              <li><button onClick={() => navigate('category', { slug: 'sustainable-low-waste-food' })} className="hover:text-stone-200 transition-colors">Zero-Waste Kitchen</button></li>
              <li><button onClick={() => navigate('category', { slug: 'seasonal-rhythms-markets' })} className="hover:text-stone-200 transition-colors">Seasonal Markets</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold uppercase tracking-wider mb-4">Editorial & About</h4>
            <ul className="space-y-2.5 text-stone-400">
              <li><button onClick={() => navigate('about')} className="hover:text-stone-200 transition-colors">About FreshNutri</button></li>
              <li><button onClick={() => navigate('about')} className="hover:text-stone-200 transition-colors">Test Kitchen Standards</button></li>
              <li><button onClick={() => navigate('author', { id: 'author-1' })} className="hover:text-stone-200 transition-colors">Registered Dietitian Board</button></li>
              <li><button onClick={() => navigate('contact')} className="hover:text-stone-200 transition-colors">Contact Our Editors</button></li>
              <li><button onClick={() => navigate('admin')} className="hover:text-stone-200 transition-colors">Content Management</button></li>
            </ul>
          </div>
        </div>

        {/* Strict Medical & Nutrition Disclaimer */}
        <div className="py-6 border-b border-stone-800 text-[11px] text-stone-500 leading-relaxed">
          <p>
            <strong className="text-stone-400">Medical & Nutritional Disclaimer:</strong> The nutritional information and dietary recommendations provided on FreshNutri are for informational and educational purposes only. Content has been reviewed by registered dietitians and culinary professionals but is not intended to substitute for individualized medical advice, clinical diagnosis, or medical nutrition therapy. Always consult with a qualified physician or certified healthcare provider before altering your dietary regimen or addressing specific medical conditions.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} FreshNutri Media, Inc. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6 text-stone-400">
            <button onClick={() => navigate('about')} className="hover:text-stone-300 transition-colors">Privacy Policy</button>
            <button onClick={() => navigate('about')} className="hover:text-stone-300 transition-colors">Terms of Service</button>
            <button onClick={() => navigate('about')} className="hover:text-stone-300 transition-colors">Editorial Guidelines</button>
            <button onClick={() => navigate('contact')} className="hover:text-stone-300 transition-colors">Support</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
