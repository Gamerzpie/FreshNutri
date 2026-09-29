import React from 'react';
import { useApp } from '../context/AppContext';
import { authors } from '../data/authors';
import { ShieldCheck, ChefHat, CheckCircle2, Award, HeartPulse, Scale } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Title */}
      <header className="space-y-4 border-b border-stone-200 pb-8 text-center sm:text-left">
        <span className="text-xs uppercase tracking-widest text-emerald-800 font-semibold font-sans">
          About FreshNutri
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-stone-900 leading-tight">
          Where Culinary Art Meets Rigorous Nutrition Science
        </h1>
        <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-sans max-w-2xl">
          FreshNutri is an independent digital food magazine and recipe platform founded on a single conviction: healthy eating should be vibrant, deeply satisfying, and grounded in authentic nutritional science.
        </p>
      </header>

      {/* Editorial Standards (The 3x Test Kitchen Rule) */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <ChefHat className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-semibold text-stone-900">
              The FreshNutri Test-Kitchen Standard
            </h2>
            <span className="text-xs text-stone-500">How every single recipe reaches your dining table</span>
          </div>
        </div>

        <p className="text-sm text-stone-700 leading-relaxed">
          Every recipe published on FreshNutri undergoes up to four test cycles in our dedicated test kitchen. We test on conventional electric ranges, high-heat gas, and induction cooktops using real cookware commonly found in home kitchens.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
            <span className="font-mono text-xs font-bold text-emerald-800 block mb-1">STAGE 01</span>
            <h3 className="font-serif text-sm font-semibold text-stone-900">Nutritional Calibration</h3>
            <p className="text-xs text-stone-600 mt-1">Our registered dietitians audit ingredients to optimize sodium, fiber density, and healthy lipid balance.</p>
          </div>

          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
            <span className="font-mono text-xs font-bold text-emerald-800 block mb-1">STAGE 02</span>
            <h3 className="font-serif text-sm font-semibold text-stone-900">Foolproof Technique</h3>
            <p className="text-xs text-stone-600 mt-1">Culinary chefs test pan temperatures, sear times, and ingredient substitutions across multiple cookware types.</p>
          </div>

          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
            <span className="font-mono text-xs font-bold text-emerald-800 block mb-1">STAGE 03</span>
            <h3 className="font-serif text-sm font-semibold text-stone-900">Taste & Storage Audit</h3>
            <p className="text-xs text-stone-600 mt-1">We evaluate blind flavor scores and test refrigerator storage up to 5 days for weekly meal prep reliability.</p>
          </div>
        </div>
      </section>

      {/* Medical & Nutrition Advisory Board */}
      <section className="space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-emerald-800 font-semibold mb-1">
            <HeartPulse className="w-4 h-4" />
            <span>Clinical Oversight</span>
          </div>
          <h2 className="font-serif text-2xl font-semibold text-stone-900">
            Our Registered Dietitian & Medical Board
          </h2>
          <p className="text-xs text-stone-600 mt-1 max-w-xl">
            Meet the clinical practitioners, food scientists, and editors behind FreshNutri's published research and meal plans.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {authors.map((author) => (
            <div
              key={author.id}
              onClick={() => navigate('author', { id: author.id })}
              className="p-5 bg-white rounded-xl border border-stone-200 hover:border-emerald-700 cursor-pointer transition-all group flex items-start gap-4"
            >
              <img
                src={author.avatar}
                alt={author.name}
                className="w-14 h-14 rounded-full object-cover shrink-0"
              />
              <div className="space-y-1">
                <span className="font-serif text-base font-semibold text-stone-900 group-hover:text-emerald-800 transition-colors block">
                  {author.name}
                </span>
                <span className="text-xs text-emerald-800 font-mono font-medium block">
                  {author.credentials}
                </span>
                <span className="text-[11px] text-stone-500 block leading-snug line-clamp-2">
                  {author.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Medical Disclaimer Banner */}
      <section className="p-6 bg-stone-100/80 rounded-2xl border border-stone-200 text-xs text-stone-600 space-y-2 leading-relaxed">
        <div className="flex items-center gap-2 font-semibold text-stone-900">
          <Scale className="w-4 h-4 text-stone-700" />
          <span>Notice Regarding Health & Nutritional Advice</span>
        </div>
        <p>
          FreshNutri content, including recipes, meal planners, and editorial health reporting, is formulated for educational and informational purposes only. It is not intended as personalized medical diagnosis, prescription, or clinical nutrition therapy. Always seek the advice of your physician or qualified registered dietitian with any questions regarding personal medical conditions or individualized nutritional therapies.
        </p>
      </section>
    </div>
  );
};
