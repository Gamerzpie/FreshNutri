import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { authors } from '../data/authors';
import { setPageSEO, defaultKeywords } from '../utils/seo';
import { ShieldCheck, ChefHat, CheckCircle2, Award, HeartPulse, Scale, Check, X, Sparkles } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { navigate } = useApp();

  useEffect(() => {
    setPageSEO({
      title: 'About FreshNutri – Test-Kitchen Standards & Modern Recipe Alternative',
      description: 'Learn why home cooks and dietitians choose FreshNutri over Allrecipes, NYT Cooking, and EatingWell. 100% free, chef-tested whole-food recipes with live USDA macro scaling.',
      keywords: [
        'about freshnutri',
        'allrecipes alternative',
        'nyt cooking free alternative',
        'eatingwell alternative',
        'skinnytaste alternative',
        'test kitchen standards',
        'registered dietitian recipes',
        'whole food cooking standards',
      ].join(', '),
      canonicalPath: '/#/about',
      ogType: 'website',
    });
  }, []);

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

      {/* FreshNutri vs Legacy Recipe Platforms: Direct Comparison Table */}
      <section className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 space-y-6 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-800 font-semibold mb-1 font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Platform Comparison</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-stone-900">
            How FreshNutri Compares to Legacy Recipe Sites
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
            See how FreshNutri redefines the digital cooking experience compared to traditional platforms like Allrecipes, NYT Cooking, EatingWell, and Skinnytaste.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-200 font-mono text-[11px] text-stone-500 uppercase tracking-wider">
                <th className="py-3 pr-4 font-semibold text-stone-900">Feature Dimension</th>
                <th className="py-3 px-3 font-bold text-emerald-900 bg-emerald-50/70 rounded-t-lg">FreshNutri</th>
                <th className="py-3 px-3 font-medium text-stone-600">Allrecipes</th>
                <th className="py-3 px-3 font-medium text-stone-600">NYT Cooking</th>
                <th className="py-3 px-3 font-medium text-stone-600">EatingWell</th>
                <th className="py-3 pl-3 font-medium text-stone-600">Skinnytaste</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              <tr>
                <td className="py-3.5 pr-4 font-semibold text-stone-800">Test-Kitchen Standard</td>
                <td className="py-3.5 px-3 font-medium text-emerald-900 bg-emerald-50/50">Tested 3–4x by pros</td>
                <td className="py-3.5 px-3 text-stone-500">Unverified user posts</td>
                <td className="py-3.5 px-3 text-stone-700">Tested by chefs</td>
                <td className="py-3.5 px-3 text-stone-700">Tested in test kitchen</td>
                <td className="py-3.5 pl-3 text-stone-700">Blogger tested</td>
              </tr>
              <tr>
                <td className="py-3.5 pr-4 font-semibold text-stone-800">Cost & Paywalls</td>
                <td className="py-3.5 px-3 font-bold text-emerald-800 bg-emerald-50/50">100% Free & Open</td>
                <td className="py-3.5 px-3 text-stone-600">Free with heavy ads</td>
                <td className="py-3.5 px-3 text-red-600 font-medium">Paid subscription paywall</td>
                <td className="py-3.5 px-3 text-stone-600">Free with ad clutter</td>
                <td className="py-3.5 pl-3 text-stone-600">Free with display ads</td>
              </tr>
              <tr>
                <td className="py-3.5 pr-4 font-semibold text-stone-800">Dynamic Live Macro Scaling</td>
                <td className="py-3.5 px-3 font-bold text-emerald-800 bg-emerald-50/50">Instant live recalculation</td>
                <td className="py-3.5 px-3 text-stone-400">Static approximations</td>
                <td className="py-3.5 px-3 text-stone-400">Limited/Static</td>
                <td className="py-3.5 px-3 text-stone-500">Static tables only</td>
                <td className="py-3.5 pl-3 text-stone-500">Static tables only</td>
              </tr>
              <tr>
                <td className="py-3.5 pr-4 font-semibold text-stone-800">Dietitian Medical Verification</td>
                <td className="py-3.5 px-3 font-medium text-emerald-900 bg-emerald-50/50">Clinical MS/RD Board</td>
                <td className="py-3.5 px-3 text-stone-400">None</td>
                <td className="py-3.5 px-3 text-stone-400">Occasional</td>
                <td className="py-3.5 px-3 text-stone-700">Dietitians on staff</td>
                <td className="py-3.5 pl-3 text-stone-500">Registered dietitian review</td>
              </tr>
              <tr>
                <td className="py-3.5 pr-4 font-semibold text-stone-800">Curated 7-Day Meal Protocols</td>
                <td className="py-3.5 px-3 font-medium text-emerald-900 bg-emerald-50/50">Included with smart checklists</td>
                <td className="py-3.5 px-3 text-stone-400">None</td>
                <td className="py-3.5 px-3 text-stone-400">Editorial roundups only</td>
                <td className="py-3.5 px-3 text-stone-600">Static article lists</td>
                <td className="py-3.5 pl-3 text-stone-600">Weekly PDF lists</td>
              </tr>
              <tr>
                <td className="py-3.5 pr-4 font-semibold text-stone-800">User Reading Experience</td>
                <td className="py-3.5 px-3 font-bold text-emerald-800 bg-emerald-50/50">Zero clutter & instant recipe jump</td>
                <td className="py-3.5 px-3 text-stone-400">Auto-play video & popups</td>
                <td className="py-3.5 px-3 text-stone-700">Clean (paywalled)</td>
                <td className="py-3.5 px-3 text-stone-400">Heavy banner display ads</td>
                <td className="py-3.5 pl-3 text-stone-400">Ad networks & long essays</td>
              </tr>
            </tbody>
          </table>
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
