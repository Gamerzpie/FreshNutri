import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Mail, Check, ShieldCheck } from 'lucide-react';

export const NewsletterModal: React.FC = () => {
  const { isNewsletterOpen, closeNewsletter, subscribeNewsletter } = useApp();
  const [email, setEmail] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    'Daily Test-Kitchen Recipe',
    '7-Day Meal Planner',
    'Nutrition Science',
  ]);

  if (!isNewsletterOpen) return null;

  const topicsList = [
    { id: 'Daily Test-Kitchen Recipe', label: 'Daily Test-Kitchen Recipe', desc: 'One foolproof, RD-vetted weeknight recipe in your inbox at 7 AM.' },
    { id: '7-Day Meal Planner', label: '7-Day Weekly Meal Planner', desc: 'Every Thursday: complete 7-day dinner plan with organized grocery list.' },
    { id: 'Nutrition Science', label: 'Clinical Nutrition & Research', desc: 'Deep dives on gut microbiome, blood sugar, and cardiovascular health.' },
    { id: 'Seasonal Market Guides', label: 'Seasonal Produce & Market Guides', desc: 'Monthly buying advice for eating in tune with local harvests.' },
  ];

  const toggleTopic = (id: string) => {
    setSelectedTopics((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && selectedTopics.length > 0) {
      subscribeNewsletter(email, selectedTopics);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FAF9F5] w-full max-w-lg rounded-2xl shadow-2xl border border-stone-200 overflow-hidden relative p-6 sm:p-8 animate-fade-in">
        <button
          onClick={closeNewsletter}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-lg"
          aria-label="Close newsletter modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <span className="font-serif text-2xl font-semibold text-stone-900 block leading-tight">
              Join FreshNutri
            </span>
            <span className="text-xs text-stone-500">
              The premier publication for healthy home cooking
            </span>
          </div>
        </div>

        <p className="text-xs text-stone-600 mt-2 leading-relaxed">
          Select which editions you would like to receive. We respect your attention: zero sponsored clutter, just chef-crafted recipes and clinical nutrition.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="space-y-2.5">
            {topicsList.map((topic) => {
              const checked = selectedTopics.includes(topic.id);
              return (
                <div
                  key={topic.id}
                  onClick={() => toggleTopic(topic.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                    checked
                      ? 'bg-white border-emerald-600 shadow-2xs'
                      : 'bg-stone-50/50 border-stone-200 hover:bg-white'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
                      checked
                        ? 'bg-emerald-700 border-emerald-700 text-white'
                        : 'border-stone-300 bg-white'
                    }`}
                  >
                    {checked && <Check className="w-3 h-3" />}
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-stone-900">
                      {topic.label}
                    </span>
                    <span className="block text-[11px] text-stone-500 mt-0.5">
                      {topic.desc}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-lg text-stone-900 text-xs focus:outline-none focus:border-emerald-600 shadow-2xs"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <span>Subscribe to Selected Editions</span>
          </button>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-400 pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Unsubscribe anytime with 1 click. Zero spam guaranteed.</span>
          </div>
        </form>
      </div>
    </div>
  );
};
