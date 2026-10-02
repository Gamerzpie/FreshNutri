import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ConditionDiet, Recipe } from '../types';
import { allConditionDiets } from '../data/conditionDiets';
import { allRecipes, getRecipeById } from '../data/recipes';
import { RecipeCard } from '../components/RecipeCard';
import { setPageSEO } from '../utils/seo';
import {
  HeartPulse,
  Activity,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Printer,
  Sparkles,
  Info,
  Calendar,
  Flame,
  Stethoscope,
  Apple,
  Search,
  ChevronRight,
  Calculator
} from 'lucide-react';

export const HealthConditionsDietView: React.FC = () => {
  const { navigate, routeParams, showToast } = useApp();

  // Selected condition diet state
  const initialSlug = routeParams.slug || 'hypertension-dash-diet';
  const [selectedSlug, setSelectedSlug] = useState<string>(initialSlug);

  // Active diet object
  const currentDiet: ConditionDiet = useMemo(() => {
    return allConditionDiets.find((d) => d.slug === selectedSlug) || allConditionDiets[0];
  }, [selectedSlug]);

  // Recommended recipes for this condition
  const conditionRecipes = useMemo(() => {
    return currentDiet.recommendedRecipeIds
      .map((id) => getRecipeById(id))
      .filter((r): r is NonNullable<typeof r> => Boolean(r));
  }, [currentDiet]);

  // Sync document title and MedicalWebPage schema for Google
  useEffect(() => {
    if (currentDiet) {
      setPageSEO({
        title: `${currentDiet.dietProtocolName} (${currentDiet.conditionName}) | FreshNutri`,
        description: currentDiet.overview || currentDiet.headline,
        keywords: `${currentDiet.dietProtocolName}, ${currentDiet.conditionName}, clinical diet, hypertension nutrition, diabetes diet, DASH diet protocol, medical nutrition therapy, dietitian guidance`,
        canonicalPath: `/#/health-diets?slug=${currentDiet.slug}`,
        ogType: 'article',
        schema: {
          '@context': 'https://schema.org',
          '@type': 'MedicalWebPage',
          name: `${currentDiet.dietProtocolName} Clinical Nutrition Therapy`,
          description: currentDiet.overview || currentDiet.headline,
          about: {
            '@type': 'MedicalCondition',
            name: currentDiet.conditionName,
          },
          publisher: {
            '@type': 'Organization',
            name: 'FreshNutri Test Kitchen & Clinical Board',
          },
        },
      });
    }
  }, [currentDiet?.slug]);

  // Interactive BP & Sodium Meal Calculator State
  const [calcSodium, setCalcSodium] = useState<number>(420);
  const [calcPotassium, setCalcPotassium] = useState<number>(850);
  const [calcMealType, setCalcMealType] = useState<string>('Lunch');

  const presetMeals = [
    { label: 'DASH Herb-Poached Salmon & Chard', sodium: 280, potassium: 980, meal: 'Dinner' },
    { label: 'Mediterranean Grain & Chickpea Bowl', sodium: 340, potassium: 780, meal: 'Lunch' },
    { label: 'Steel-Cut Oats with Berries & Seeds', sodium: 65, potassium: 620, meal: 'Breakfast' },
    { label: 'Commercial Canned Soup & Saltines (Comparison)', sodium: 1250, potassium: 210, meal: 'Lunch' },
    { label: 'Deli Ham & Cheese Sandwich (Comparison)', sodium: 1480, potassium: 290, meal: 'Lunch' },
  ];

  const handleApplyPreset = (preset: typeof presetMeals[0]) => {
    setCalcSodium(preset.sodium);
    setCalcPotassium(preset.potassium);
    setCalcMealType(preset.meal);
    showToast(`Loaded "${preset.label}" into calculator`, 'info');
  };

  const handlePrintSummary = () => {
    window.print();
  };

  // Evaluation of sodium
  const isHypertensionDiet = currentDiet.id === 'diet-bp-hypertension';
  const sodiumLimit = isHypertensionDiet ? 1500 : 2300;
  const sodiumPerMealTarget = Math.round(sodiumLimit / 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Editorial Header */}
      <header className="border-b border-stone-200 pb-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
            <span className="text-xs uppercase tracking-widest text-emerald-800 font-semibold font-sans">
              Medical Nutrition Therapy & Therapeutic Diets
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-lg text-xs font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>Reviewed by Registered Dietitians (RDN, LDN) & Cardiology Guidelines</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-2">
            <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-stone-900 tracking-tight leading-tight">
              Clinical Diets for Blood Pressure & Chronic Disease
            </h1>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Targeted, evidence-based nutritional protocols designed to support blood pressure regulation, glucose homeostasis, cardiovascular health, kidney preservation, and gut wellness.
            </p>
          </div>

          <button
            onClick={handlePrintSummary}
            className="self-start md:self-auto px-4 py-2.5 bg-white border border-stone-300 hover:border-stone-900 text-stone-700 hover:text-stone-900 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 shrink-0 shadow-2xs"
          >
            <Printer className="w-4 h-4" />
            <span>Print Patient Summary</span>
          </button>
        </div>
      </header>

      {/* Disease & Condition Selector Tabs */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500 font-mono">
            Select Medical Condition or Therapeutic Protocol
          </h2>
          <span className="text-xs text-stone-400">8 Clinical Protocols Available</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {allConditionDiets.map((diet) => {
            const isSelected = diet.slug === selectedSlug;
            return (
              <button
                key={diet.id}
                onClick={() => setSelectedSlug(diet.slug)}
                className={`p-3 text-left rounded-xl border transition-all flex flex-col justify-between min-h-[90px] ${
                  isSelected
                    ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                    : 'bg-white text-stone-800 border-stone-200 hover:border-emerald-700 hover:bg-stone-50/50'
                }`}
              >
                <div className="space-y-1">
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-wider block ${
                      isSelected ? 'text-emerald-400' : 'text-emerald-800'
                    }`}
                  >
                    {diet.shortBadge}
                  </span>
                  <span className="font-serif text-xs font-semibold leading-snug line-clamp-2 block">
                    {diet.conditionName}
                  </span>
                </div>
                <div className="pt-2 flex items-center justify-between">
                  <span className={`text-[10px] ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                    {diet.dietProtocolName.split('&')[0]}
                  </span>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Hero Banner for Active Protocol */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-stone-100">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-semibold">
                {currentDiet.conditionName}
              </span>
              <span className="text-stone-300">·</span>
              <span className="text-xs font-medium text-stone-500 font-mono">
                Protocol: {currentDiet.dietProtocolName}
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl font-semibold text-stone-900 leading-tight">
              {currentDiet.headline}
            </h2>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-700">
              <strong className="text-stone-900">Target Patient Profile: </strong>
              {currentDiet.targetAudience}
            </div>

            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              {currentDiet.overview}
            </p>
          </div>

          {currentDiet.sampleMealPlanSlug && (
            <div className="lg:w-72 shrink-0 p-5 bg-[#F4F1EA] rounded-xl border border-stone-200 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-900 uppercase tracking-wider">
                <Calendar className="w-4 h-4 text-emerald-800" />
                <span>Structured 7-Day Plan</span>
              </div>
              <h3 className="font-serif text-base font-semibold text-stone-900 leading-snug">
                Complete Weekly Meal Schedule Available
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Includes grocery checklist, Sunday prep guides, breakfast, lunch, dinner, and dietitian tips.
              </p>
              <button
                onClick={() => navigate('meal-plan', { slug: currentDiet.sampleMealPlanSlug! })}
                className="w-full py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <span>View 7-Day Meal Plan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Pathophysiology Deep Dive */}
        <div className="p-4 sm:p-5 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-stone-900 uppercase tracking-wider font-mono">
            <Stethoscope className="w-4 h-4 text-emerald-800" />
            <span>Pathophysiology: Why Food Matters for this Condition</span>
          </div>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
            {currentDiet.pathophysiology}
          </p>
        </div>

        {/* Clinical Nutrient Targets Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-semibold text-stone-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-800" />
              <span>Exact Clinical Nutrient Targets</span>
            </h3>
            <span className="text-xs text-stone-500 font-mono">Evidence-Based Benchmarks</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentDiet.clinicalTargets.map((target, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-stone-200 bg-white hover:border-emerald-700 transition-colors space-y-2"
              >
                <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block font-mono">
                  {target.nutrient}
                </span>
                <div className="font-serif text-xl font-bold text-emerald-900">
                  {target.target}
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {target.mechanism}
                </p>
                {target.clinicalNote && (
                  <div className="pt-2 text-[11px] text-stone-500 border-t border-stone-100 flex items-start gap-1.5">
                    <Info className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>{target.clinicalNote}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BP & Sodium Interactive Meal Checker (Active for BP or all conditions) */}
      <section className="bg-emerald-950 text-white rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-900 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest">
              <Calculator className="w-4 h-4" />
              <span>Interactive Patient Tool</span>
            </div>
            <h3 className="font-serif text-2xl font-semibold text-white">
              Sodium & Potassium Meal Calculator for Blood Pressure
            </h3>
            <p className="text-xs text-emerald-200/80 max-w-xl">
              Check your meal’s sodium and potassium levels against the strict American Heart Association DASH target (1,500 mg daily maximum for hypertensive patients).
            </p>
          </div>

          <div className="text-left md:text-right text-xs text-emerald-300">
            <span className="block font-mono">AHA Daily Limit: 1,500 mg Sodium</span>
            <span className="block font-mono">AHA Daily Target: 4,700 mg Potassium</span>
          </div>
        </div>

        {/* Presets */}
        <div className="space-y-2">
          <span className="text-xs text-emerald-300 font-medium">Quick Meal Presets to Test:</span>
          <div className="flex flex-wrap gap-2">
            {presetMeals.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handleApplyPreset(preset)}
                className="px-3 py-1.5 bg-emerald-900/60 hover:bg-emerald-900 border border-emerald-700/60 rounded-lg text-xs text-emerald-100 transition-colors text-left"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sliders & Visual Gauge */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-2">
          <div className="md:col-span-6 space-y-5">
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-emerald-200">Meal Sodium Intake:</span>
                <span className="font-mono font-bold text-white text-sm">{calcSodium} mg</span>
              </div>
              <input
                type="range"
                min="0"
                max="2000"
                step="25"
                value={calcSodium}
                onChange={(e) => setCalcSodium(Number(e.target.value))}
                className="w-full h-2 bg-emerald-900 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <div className="flex justify-between text-[10px] text-emerald-400/80 mt-1 font-mono">
                <span>0 mg (Very Low)</span>
                <span>500 mg (DASH Goal/Meal)</span>
                <span>1,500+ mg (Exceeds Daily)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-emerald-200">Meal Potassium Content:</span>
                <span className="font-mono font-bold text-white text-sm">{calcPotassium} mg</span>
              </div>
              <input
                type="range"
                min="0"
                max="2000"
                step="25"
                value={calcPotassium}
                onChange={(e) => setCalcPotassium(Number(e.target.value))}
                className="w-full h-2 bg-emerald-900 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <div className="flex justify-between text-[10px] text-emerald-400/80 mt-1 font-mono">
                <span>0 mg</span>
                <span>1,000 mg (Optimal Meal)</span>
                <span>2,000 mg</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-6 bg-emerald-900/50 border border-emerald-800 rounded-xl p-5 space-y-3">
            <span className="text-xs uppercase font-mono tracking-wider text-emerald-400 block">
              DASH Blood Pressure Evaluation
            </span>

            {calcSodium <= 500 ? (
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-emerald-300 font-semibold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Excellent DASH-Compliant Meal (Sodium ≤ 500 mg)</span>
                </div>
                <p className="text-xs text-emerald-200/90 leading-relaxed">
                  This meal represents only {Math.round((calcSodium / 1500) * 100)}% of your strict 1,500 mg daily hypertension budget. High potassium ({calcPotassium} mg) will actively stimulate your kidneys to excrete sodium and relax arterial smooth muscle.
                </p>
              </div>
            ) : calcSodium <= 800 ? (
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-amber-300 font-semibold text-sm">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>Moderate Sodium Meal ({Math.round((calcSodium / 1500) * 100)}% of Daily Limit)</span>
                </div>
                <p className="text-xs text-emerald-200/90 leading-relaxed">
                  Consuming {calcSodium} mg in one meal means subsequent meals today should stay below 350 mg to protect arterial pressure. Pair with fresh citrus and steamed leafy greens to boost potassium.
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-rose-300 font-semibold text-sm">
                  <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
                  <span>High Sodium Warning ({Math.round((calcSodium / 1500) * 100)}% of Daily Hypertensive Allowance)</span>
                </div>
                <p className="text-xs text-rose-100/90 leading-relaxed">
                  This single meal nearly exhausts or exceeds the entire daily allowance for individuals with elevated blood pressure. Consider swapping commercial marinades for fresh herbs, lemon juice, or garlic.
                </p>
              </div>
            )}

            <div className="pt-2 border-t border-emerald-800 text-[11px] text-emerald-300/80">
              <span>Potassium-to-Sodium Ratio: </span>
              <strong className="text-white font-mono">
                {(calcPotassium / Math.max(calcSodium, 1)).toFixed(2)} : 1
              </strong>
              <span className="ml-1 text-emerald-400">
                (AHA recommends {'>'} 2.5 : 1 for cardiovascular protection)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Comparative Guidance: Foods to Prioritize vs Foods to Limit */}
      <section className="space-y-6">
        <div>
          <h3 className="font-serif text-2xl font-semibold text-stone-900">
            Nutritional Prescription: What to Eat vs What to Restrict
          </h3>
          <p className="text-stone-600 text-sm mt-1">
            Carefully curated ingredient categories calibrated specifically for {currentDiet.conditionName}.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Foods to Prioritize (Green Card) */}
          <div className="bg-white rounded-2xl border border-emerald-200 p-6 space-y-5 shadow-2xs">
            <div className="flex items-center gap-2 text-emerald-800 font-semibold text-base border-b border-emerald-100 pb-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <h4>Foods to Actively Prioritize</h4>
            </div>

            <div className="space-y-4">
              {currentDiet.foodsToPrioritize.map((group, idx) => (
                <div key={idx} className="p-3.5 bg-emerald-50/50 rounded-xl border border-emerald-100/80 space-y-1.5">
                  <span className="font-serif text-sm font-semibold text-emerald-950 block">
                    {group.category}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item, itemIdx) => (
                      <span
                        key={itemIdx}
                        className="px-2 py-0.5 bg-white border border-emerald-200 text-emerald-900 text-[11px] font-medium rounded-md"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <p className="text-[11px] text-emerald-800/90 pt-1 leading-relaxed">
                    <strong>Why It Works:</strong> {group.whyItHelps}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Foods to Limit (Red/Stone Card) */}
          <div className="bg-white rounded-2xl border border-rose-200 p-6 space-y-5 shadow-2xs">
            <div className="flex items-center gap-2 text-rose-900 font-semibold text-base border-b border-rose-100 pb-3">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
              <h4>Foods to Strictly Limit or Avoid</h4>
            </div>

            <div className="space-y-4">
              {currentDiet.foodsToLimit.map((group, idx) => (
                <div key={idx} className="p-3.5 bg-rose-50/40 rounded-xl border border-rose-100 space-y-1.5">
                  <span className="font-serif text-sm font-semibold text-rose-950 block">
                    {group.category}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item, itemIdx) => (
                      <span
                        key={itemIdx}
                        className="px-2 py-0.5 bg-white border border-rose-200 text-rose-900 text-[11px] font-medium rounded-md"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <p className="text-[11px] text-rose-800/90 pt-1 leading-relaxed">
                    <strong>Clinical Risk Factor:</strong> {group.riskFactor}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Daily Meal Structure Blueprint */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-2xs">
        <div>
          <span className="text-xs uppercase tracking-wider text-emerald-800 font-semibold font-mono block mb-1">
            Practical Application
          </span>
          <h3 className="font-serif text-2xl font-semibold text-stone-900">
            Sample Daily Therapeutic Meal Blueprint
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            How a complete day of meals is orchestrated to hit exact electrolyte, macro, and micro targets.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-stone-900">
              <span>BREAKFAST</span>
              <span className="font-mono text-emerald-800 text-[11px]">Phase 01</span>
            </div>
            <p className="text-xs text-stone-700 leading-relaxed">
              {currentDiet.dailyMealStructure.breakfast}
            </p>
          </div>

          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-stone-900">
              <span>LUNCH</span>
              <span className="font-mono text-emerald-800 text-[11px]">Phase 02</span>
            </div>
            <p className="text-xs text-stone-700 leading-relaxed">
              {currentDiet.dailyMealStructure.lunch}
            </p>
          </div>

          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-stone-900">
              <span>DINNER</span>
              <span className="font-mono text-emerald-800 text-[11px]">Phase 03</span>
            </div>
            <p className="text-xs text-stone-700 leading-relaxed">
              {currentDiet.dailyMealStructure.dinner}
            </p>
          </div>

          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-stone-900">
              <span>SNACKS & HYDRATION</span>
              <span className="font-mono text-emerald-800 text-[11px]">Support</span>
            </div>
            <p className="text-xs text-stone-700 leading-relaxed">
              {currentDiet.dailyMealStructure.snacks}
            </p>
          </div>
        </div>

        {/* Practical Dietitian Rules of Thumb */}
        <div className="pt-4 border-t border-stone-200 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 font-mono">
            Key Dietitian Advice & Practical Kitchen Rules
          </h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-stone-700">
            {currentDiet.keyAdvice.map((advice, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>{advice}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Curated Matching Recipes from Database */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-wider text-emerald-800 font-semibold font-mono block mb-1">
              Test-Kitchen Tested
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-stone-900">
              Curated Recipes for {currentDiet.conditionName}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Every recipe below has been audited to strictly comply with {currentDiet.dietProtocolName} nutrient parameters.
            </p>
          </div>

          <button
            onClick={() => navigate('recipes')}
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1.5 transition-colors shrink-0"
          >
            <span>Search All 70 Recipes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {conditionRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>

      {/* Clinical Citations & Reference Literature */}
      <section className="p-6 bg-stone-100 rounded-xl border border-stone-200 space-y-3 text-xs text-stone-600">
        <div className="flex items-center gap-2 text-stone-900 font-bold uppercase tracking-wider font-mono">
          <BookOpen className="w-4 h-4 text-emerald-800" />
          <span>Clinical References & Medical Guidelines</span>
        </div>
        <ol className="list-decimal list-inside space-y-1.5 text-[11px] leading-relaxed">
          {currentDiet.clinicalCitations.map((citation, idx) => (
            <li key={idx} className="text-stone-700">
              {citation}
            </li>
          ))}
        </ol>
      </section>

      {/* Prominent Medical Disclaimer */}
      <div className="p-5 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-950 leading-relaxed space-y-2">
        <div className="flex items-center gap-2 font-bold text-amber-900 uppercase tracking-wide">
          <AlertTriangle className="w-4 h-4 text-amber-700" />
          <span>Clinical Nutrition & Medical Advice Disclaimer</span>
        </div>
        <p>
          The therapeutic dietary guidelines, nutrient targets, and sample meal blueprints provided on FreshNutri are developed by registered dietitians for educational, lifestyle, and disease-prevention purposes only. They are not intended as a substitute for individualized clinical diagnosis, personalized medical nutrition therapy (MNT), or prescriptive medical treatment. Always consult your attending cardiologist, nephrologist, endocrinologist, or registered dietitian before making substantial modifications to your sodium, potassium, protein, or carbohydrate intake—particularly if taking antihypertensive medications (such as ACE inhibitors, ARBs, beta-blockers, or diuretics) that influence electrolyte excretion.
        </p>
      </div>
    </div>
  );
};
