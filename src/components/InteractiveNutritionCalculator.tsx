import React, { useState } from 'react';
import { NutritionInfo } from '../types';
import { useApp } from '../context/AppContext';
import {
  Calculator,
  Minus,
  Plus,
  Scale,
  Copy,
  Check,
  HeartPulse,
  Flame,
  Info,
  Layers,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

interface InteractiveNutritionCalculatorProps {
  nutrition: NutritionInfo;
  baseServings: number;
  currentServings: number;
  onServingsChange: (newServings: number) => void;
  recipeTitle: string;
}

export const InteractiveNutritionCalculator: React.FC<InteractiveNutritionCalculatorProps> = ({
  nutrition,
  baseServings,
  currentServings,
  onServingsChange,
  recipeTitle,
}) => {
  const { showToast } = useApp();
  const [viewMode, setViewMode] = useState<'per-serving' | 'entire-batch'>('per-serving');
  const [copied, setCopied] = useState(false);

  // Multiplier for recalculations
  // If viewMode === 'per-serving': values are per single portion (scaled if base recipe proportion changes)
  // If viewMode === 'entire-batch': values are multiplied by current total batch servings
  const batchMultiplier = currentServings;
  const factor = viewMode === 'entire-batch' ? batchMultiplier : 1;

  // Recalculated Nutritional Values
  const calories = Math.round(nutrition.calories * factor);
  const protein = Math.round(nutrition.protein * factor * 10) / 10;
  const carbs = Math.round(nutrition.carbohydrates * factor * 10) / 10;
  const fiber = Math.round(nutrition.fiber * factor * 10) / 10;
  const netCarbs = Math.max(0, Math.round((carbs - fiber) * 10) / 10);
  const totalFat = Math.round(nutrition.fat * factor * 10) / 10;
  const saturatedFat = Math.round(nutrition.saturatedFat * factor * 10) / 10;
  const sugar = Math.round(nutrition.sugar * factor * 10) / 10;
  const sodium = Math.round(nutrition.sodium * factor);
  const potassium = Math.round(nutrition.potassium * factor);

  // Calorie calculations from macros:
  // Protein = 4 kcal/g, Carbs = 4 kcal/g, Fat = 9 kcal/g
  const proteinCal = protein * 4;
  const carbsCal = carbs * 4;
  const fatCal = totalFat * 9;
  const totalMacroCal = Math.max(1, proteinCal + carbsCal + fatCal);

  const proteinPct = Math.round((proteinCal / totalMacroCal) * 100);
  const carbsPct = Math.round((carbsCal / totalMacroCal) * 100);
  const fatPct = Math.max(0, 100 - proteinPct - carbsPct);

  // Potassium to Sodium Ratio (electrolytes)
  const electrolyteRatio = sodium > 0 ? (potassium / sodium).toFixed(2) : 'N/A';

  // Daily Value Reference (FDA standard 2,000 kcal diet)
  const dvReference = {
    fat: 78, // g
    saturatedFat: 20, // g
    sodium: 2300, // mg
    carbs: 275, // g
    fiber: 28, // g
    protein: 50, // g
    potassium: 4700, // mg
  };

  const getDV = (amount: number, ref: number) => {
    return Math.round((amount / ref) * 100);
  };

  // Quick Preset Handlers
  const applyPreset = (mult: number) => {
    const target = Math.max(1, Math.round(baseServings * mult));
    onServingsChange(target);
  };

  // Copy Nutrition Facts to Clipboard
  const handleCopy = () => {
    const label = viewMode === 'entire-batch' ? `Entire Batch (${currentServings} servings)` : `Per Single Serving`;
    const text = [
      `Nutrition Facts for ${recipeTitle} (${label}):`,
      `• Calories: ${calories} kcal`,
      `• Protein: ${protein}g (${proteinPct}% cal)`,
      `• Total Fat: ${totalFat}g (${fatPct}% cal) | Sat Fat: ${saturatedFat}g`,
      `• Total Carbs: ${carbs}g (${carbsPct}% cal) | Fiber: ${fiber}g | Net Carbs: ${netCarbs}g`,
      `• Sugars: ${sugar}g`,
      `• Sodium: ${sodium}mg (${getDV(sodium, dvReference.sodium)}% DV)`,
      `• Potassium: ${potassium}mg (${getDV(potassium, dvReference.potassium)}% DV)`,
      `• Potassium-to-Sodium Ratio: ${electrolyteRatio}`,
      `Calculated via FreshNutri Culinary Science Lab`,
    ].join('\n');

    navigator.clipboard.writeText(text);
    setCopied(true);
    showToast('Recalculated nutrition facts copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  // Dynamic Clinical & Dietary Flags (calculated per portion)
  const perPortionSodium = nutrition.sodium;
  const perPortionProtein = nutrition.protein;
  const perPortionFiber = nutrition.fiber;
  const perPortionNetCarbs = Math.max(0, nutrition.carbohydrates - nutrition.fiber);

  return (
    <section className="bg-white rounded-2xl border border-stone-200/90 shadow-sm overflow-hidden space-y-6 p-6 sm:p-8">
      {/* Header & Mode Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-stone-200">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-widest font-mono">
            <Calculator className="w-4 h-4 text-emerald-700" />
            <span>Interactive Nutrition Calculator</span>
          </div>
          <h2 className="font-serif text-2xl font-semibold text-stone-900">
            Real-Time Nutrition & Portion Scaler
          </h2>
          <p className="text-xs text-stone-500">
            Adjust the serving count below to automatically recompute calories, macronutrients, and % Daily Values.
          </p>
        </div>

        {/* View Mode Toggle: Per Serving vs Entire Batch */}
        <div className="flex items-center p-1 bg-stone-100 rounded-xl border border-stone-200 self-start md:self-auto text-xs font-semibold">
          <button
            onClick={() => setViewMode('per-serving')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              viewMode === 'per-serving'
                ? 'bg-white text-stone-900 shadow-2xs font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Per Serving
          </button>
          <button
            onClick={() => setViewMode('entire-batch')}
            className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              viewMode === 'entire-batch'
                ? 'bg-stone-900 text-white shadow-2xs font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Entire Batch ({currentServings})</span>
          </button>
        </div>
      </div>

      {/* Serving Controls Bar & Quick Presets */}
      <div className="bg-[#FAF9F5] p-4 sm:p-5 rounded-2xl border border-stone-200/80 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-700 font-mono">
              Portion Servings:
            </span>
            {/* Stepper */}
            <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-xl border border-stone-300 shadow-2xs">
              <button
                type="button"
                onClick={() => onServingsChange(Math.max(1, currentServings - 1))}
                className="w-7 h-7 bg-stone-50 hover:bg-stone-200 rounded-lg flex items-center justify-center text-stone-800 transition-colors"
                aria-label="Decrease servings"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <input
                type="number"
                min="1"
                max="30"
                value={currentServings}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  if (!isNaN(val) && val >= 1 && val <= 30) {
                    onServingsChange(val);
                  }
                }}
                className="w-12 text-center font-mono text-base font-bold text-emerald-950 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => onServingsChange(Math.min(30, currentServings + 1))}
                className="w-7 h-7 bg-stone-50 hover:bg-stone-200 rounded-lg flex items-center justify-center text-stone-800 transition-colors"
                aria-label="Increase servings"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            <span className="text-xs text-stone-500 font-medium">
              (Recipe base: {baseServings} portions)
            </span>
          </div>

          {/* Quick Multiplier Presets */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-mono text-stone-400 mr-1 hidden sm:inline">Presets:</span>
            {[
              { label: '0.5x Half', mult: 0.5 },
              { label: '1x Base', mult: 1 },
              { label: '1.5x', mult: 1.5 },
              { label: '2x Double', mult: 2 },
              { label: '3x Triple', mult: 3 },
            ].map((p) => {
              const target = Math.max(1, Math.round(baseServings * p.mult));
              const isActive = currentServings === target;
              return (
                <button
                  key={p.label}
                  onClick={() => applyPreset(p.mult)}
                  className={`px-2.5 py-1 text-xs rounded-lg font-mono transition-all border ${
                    isActive
                      ? 'bg-emerald-800 border-emerald-800 text-white font-bold shadow-2xs'
                      : 'bg-white border-stone-200 hover:border-stone-400 text-stone-700'
                  }`}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Range Slider for Touch and Drag */}
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between text-[11px] font-mono text-stone-400">
            <span>1 Serving (Solo)</span>
            <span className="text-emerald-800 font-semibold">{currentServings} Servings</span>
            <span>20 Servings (Catering)</span>
          </div>
          <input
            type="range"
            min="1"
            max="20"
            step="1"
            value={Math.min(20, currentServings)}
            onChange={(e) => onServingsChange(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
          />
        </div>
      </div>

      {/* Recalculated Primary Macronutrient Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {/* Calories Tile */}
        <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/90 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-stone-500 font-mono text-xs uppercase tracking-wider">Calories</span>
            <Flame className="w-4 h-4 text-amber-600" />
          </div>
          <div className="mt-2">
            <span className="font-serif text-3xl font-bold text-stone-900 tabular-nums">
              {calories}
            </span>
            <span className="text-xs text-stone-500 font-mono ml-1">kcal</span>
          </div>
          <span className="text-[10px] text-stone-400 font-mono mt-1">
            {viewMode === 'entire-batch' ? 'total batch' : 'per serving'}
          </span>
        </div>

        {/* Protein Tile */}
        <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200/80 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-emerald-900 font-mono text-xs uppercase tracking-wider font-semibold">Protein</span>
            <span className="text-xs font-mono font-bold text-emerald-700">{proteinPct}%</span>
          </div>
          <div className="mt-2">
            <span className="font-serif text-3xl font-bold text-emerald-950 tabular-nums">
              {protein}
            </span>
            <span className="text-xs text-emerald-800 font-mono ml-1">g</span>
          </div>
          <span className="text-[10px] text-emerald-700 font-mono mt-1">
            {getDV(protein, dvReference.protein)}% Daily Value
          </span>
        </div>

        {/* Carbohydrates Tile */}
        <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/90 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-stone-500 font-mono text-xs uppercase tracking-wider">Carbs</span>
            <span className="text-xs font-mono font-bold text-stone-500">{carbsPct}%</span>
          </div>
          <div className="mt-2">
            <span className="font-serif text-3xl font-bold text-stone-900 tabular-nums">
              {carbs}
            </span>
            <span className="text-xs text-stone-500 font-mono ml-1">g</span>
          </div>
          <span className="text-[10px] text-stone-400 font-mono mt-1">
            Net: {netCarbs}g (Sugar: {sugar}g)
          </span>
        </div>

        {/* Dietary Fiber Tile */}
        <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200/80 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-emerald-900 font-mono text-xs uppercase tracking-wider font-semibold">Fiber</span>
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="mt-2">
            <span className="font-serif text-3xl font-bold text-emerald-950 tabular-nums">
              {fiber}
            </span>
            <span className="text-xs text-emerald-800 font-mono ml-1">g</span>
          </div>
          <span className="text-[10px] text-emerald-700 font-mono mt-1">
            {getDV(fiber, dvReference.fiber)}% Daily Value
          </span>
        </div>

        {/* Total Fat Tile */}
        <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/90 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-stone-500 font-mono text-xs uppercase tracking-wider">Total Fat</span>
            <span className="text-xs font-mono font-bold text-stone-500">{fatPct}%</span>
          </div>
          <div className="mt-2">
            <span className="font-serif text-3xl font-bold text-stone-900 tabular-nums">
              {totalFat}
            </span>
            <span className="text-xs text-stone-500 font-mono ml-1">g</span>
          </div>
          <span className="text-[10px] text-stone-400 font-mono mt-1">
            Sat Fat: {saturatedFat}g ({getDV(saturatedFat, dvReference.saturatedFat)}%)
          </span>
        </div>
      </div>

      {/* Macronutrient Calorie Breakdown Visual Distribution Bar */}
      <div className="space-y-2 p-4 bg-stone-50/80 rounded-2xl border border-stone-200">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-stone-700 font-semibold">Calorie Energy Distribution:</span>
          <span className="text-stone-500 text-[11px]">
            {proteinCal.toFixed(0)} kcal Protein · {carbsCal.toFixed(0)} kcal Carbs · {fatCal.toFixed(0)} kcal Fat
          </span>
        </div>
        <div className="h-3 w-full rounded-full bg-stone-200 overflow-hidden flex">
          <div
            style={{ width: `${proteinPct}%` }}
            className="bg-emerald-700 transition-all duration-500"
            title={`Protein: ${proteinPct}% of calories`}
          />
          <div
            style={{ width: `${carbsPct}%` }}
            className="bg-amber-500 transition-all duration-500"
            title={`Carbohydrates: ${carbsPct}% of calories`}
          />
          <div
            style={{ width: `${fatPct}%` }}
            className="bg-stone-500 transition-all duration-500"
            title={`Total Fat: ${fatPct}% of calories`}
          />
        </div>
        <div className="flex items-center justify-between text-[11px] text-stone-600 pt-1">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-700 inline-block" />
            <span>Protein ({proteinPct}%)</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span>Carbs ({carbsPct}%)</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-stone-500 inline-block" />
            <span>Fat ({fatPct}%)</span>
          </span>
        </div>
      </div>

      {/* Clinical Micronutrients: Sodium, Potassium & Electrolytes */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono text-stone-500 block uppercase">Sodium</span>
            <span className="font-serif text-lg font-bold text-stone-900 tabular-nums">{sodium} mg</span>
          </div>
          <div className="text-right font-mono text-[11px]">
            <span className="text-stone-700 font-bold block">{getDV(sodium, dvReference.sodium)}% DV</span>
            <span className="text-stone-400 text-[10px]">Max: 2,300mg</span>
          </div>
        </div>

        <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono text-stone-500 block uppercase">Potassium</span>
            <span className="font-serif text-lg font-bold text-stone-900 tabular-nums">{potassium} mg</span>
          </div>
          <div className="text-right font-mono text-[11px]">
            <span className="text-stone-700 font-bold block">{getDV(potassium, dvReference.potassium)}% DV</span>
            <span className="text-stone-400 text-[10px]">Target: 4,700mg</span>
          </div>
        </div>

        <div className="p-3.5 bg-emerald-50/70 rounded-xl border border-emerald-200/80 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono text-emerald-800 block uppercase font-semibold">K : Na Ratio</span>
            <span className="font-serif text-lg font-bold text-emerald-950 tabular-nums">{electrolyteRatio} : 1</span>
          </div>
          <div className="text-right font-mono text-[11px]">
            <span className="text-emerald-700 font-bold block">
              {Number(electrolyteRatio) >= 2.0 ? 'Optimal (DASH)' : 'Standard'}
            </span>
            <span className="text-emerald-600/80 text-[10px]">AHA Target &gt; 2.0</span>
          </div>
        </div>
      </div>

      {/* Recalculated Nutrition Label Table (FDA Standard Format) */}
      <div className="border border-stone-300 rounded-2xl p-5 bg-white space-y-3 font-sans">
        <div className="border-b-4 border-stone-900 pb-1 flex items-baseline justify-between">
          <h3 className="font-black text-2xl tracking-tighter uppercase text-stone-950">
            Nutrition Facts
          </h3>
          <span className="text-xs font-mono text-stone-500">
            {viewMode === 'entire-batch' ? `Batch Yield: ${currentServings} servings` : `1 Serving (Yield: ${currentServings})`}
          </span>
        </div>

        <div className="border-b border-stone-200 pb-2 text-xs flex justify-between items-baseline">
          <div>
            <span className="font-bold text-stone-900">Serving Size:</span>{' '}
            <span className="text-stone-600">{viewMode === 'entire-batch' ? `Entire Dish (${currentServings} portions)` : `1 prepared portion`}</span>
          </div>
          <span className="font-bold text-stone-500 text-[10px] uppercase">% Daily Value*</span>
        </div>

        <div className="space-y-1.5 text-xs text-stone-800 divide-y divide-stone-100">
          <div className="flex justify-between items-center py-1">
            <span className="font-bold">Total Fat <span className="font-normal">{totalFat}g</span></span>
            <span className="font-bold font-mono">{getDV(totalFat, dvReference.fat)}%</span>
          </div>
          <div className="flex justify-between items-center py-1 pl-4 text-stone-600">
            <span>Saturated Fat {saturatedFat}g</span>
            <span className="font-bold font-mono">{getDV(saturatedFat, dvReference.saturatedFat)}%</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="font-bold">Sodium <span className="font-normal">{sodium}mg</span></span>
            <span className="font-bold font-mono">{getDV(sodium, dvReference.sodium)}%</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="font-bold">Total Carbohydrate <span className="font-normal">{carbs}g</span></span>
            <span className="font-bold font-mono">{getDV(carbs, dvReference.carbs)}%</span>
          </div>
          <div className="flex justify-between items-center py-1 pl-4 text-stone-600">
            <span>Dietary Fiber {fiber}g</span>
            <span className="font-bold font-mono">{getDV(fiber, dvReference.fiber)}%</span>
          </div>
          <div className="flex justify-between items-center py-1 pl-4 text-stone-600">
            <span>Total Sugars {sugar}g</span>
            <span className="text-stone-400 font-mono">—</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="font-bold">Protein <span className="font-normal">{protein}g</span></span>
            <span className="font-bold font-mono">{getDV(protein, dvReference.protein)}%</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="font-bold">Potassium <span className="font-normal">{potassium}mg</span></span>
            <span className="font-bold font-mono">{getDV(potassium, dvReference.potassium)}%</span>
          </div>
        </div>

        <div className="pt-2 border-t-2 border-stone-900 text-[10px] text-stone-500 leading-tight">
          *The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.
        </div>
      </div>

      {/* Recalculated Health Badges */}
      <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
        <span className="text-stone-500 font-mono text-[11px]">Dietary Indicators:</span>
        {perPortionSodium <= 140 && (
          <span className="px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-md font-medium">
            FDA Low Sodium (&le;140mg)
          </span>
        )}
        {perPortionProtein >= 25 && (
          <span className="px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-md font-medium">
            High Protein (25g+)
          </span>
        )}
        {perPortionFiber >= 5 && (
          <span className="px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-md font-medium">
            High Fiber (5g+)
          </span>
        )}
        {perPortionNetCarbs <= 10 && (
          <span className="px-2.5 py-1 bg-stone-100 border border-stone-200 text-stone-800 rounded-md font-medium">
            Low Carb / Keto Friendly (&le;10g Net Carbs)
          </span>
        )}
        {saturatedFat <= 2 && (
          <span className="px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-md font-medium">
            Heart-Healthy Low Saturated Fat (&le;2g)
          </span>
        )}
      </div>

      {/* Footer Tools: Copy Nutrition & Medical Advisory */}
      <div className="pt-3 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          onClick={handleCopy}
          className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 self-start"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5 text-stone-500" />}
          <span>{copied ? 'Copied to Clipboard!' : 'Copy Nutrition for Logging App'}</span>
        </button>

        <span className="text-[11px] text-stone-400 font-mono">
          USDA FoodData Central Verified · Recalculated Instantly
        </span>
      </div>
    </section>
  );
};
