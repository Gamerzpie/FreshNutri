import { ConditionDiet } from '../types';

export const allConditionDiets: ConditionDiet[] = [
  {
    id: 'diet-bp-hypertension',
    slug: 'hypertension-dash-diet',
    conditionName: 'High Blood Pressure & Hypertension',
    shortBadge: 'Cardiovascular / BP',
    dietProtocolName: 'The DASH Diet & Sodium-Calibrated Protocol',
    headline: 'Clinically Proven Nutritional Therapy to Lower Systolic & Diastolic Blood Pressure',
    targetAudience: 'Individuals diagnosed with Stage 1 or Stage 2 Hypertension, Pre-hypertension, or Elevated Systolic BP (>120 mmHg)',
    overview: 'The DASH (Dietary Approaches to Stop Hypertension) dietary pattern is endorsed by the American Heart Association (AHA) and the American College of Cardiology (ACC) as first-line non-pharmacological therapy for blood pressure management. By shifting the intracellular sodium-to-potassium electrolyte ratio and increasing bioavailable magnesium and dietary nitrates, this protocol restores endothelial vasodilation and lowers systemic vascular resistance.',
    pathophysiology: 'High dietary sodium causes hypervolemia and water retention while stiffening arterial vascular walls. Conversely, potassium acts as a natural diuretic that signals vascular smooth muscle to relax. Foods rich in inorganic nitrates (such as red beets, arugula, and celery) are converted by oral microbiome flora into nitric oxide (NO)—the body’s master vasodilator that rapidly reduces systolic pressure.',
    clinicalTargets: [
      {
        nutrient: 'Dietary Sodium',
        target: '< 1,500 mg / day',
        mechanism: 'Prevents intravascular fluid overload and down-regulates the renin-angiotensin-aldosterone axis.',
        clinicalNote: 'Lowering sodium from 3,500mg to 1,500mg drops systolic BP by an average of 8–11 mmHg in hypertensive individuals.'
      },
      {
        nutrient: 'Dietary Potassium',
        target: '4,000 – 4,700 mg / day',
        mechanism: 'Stimulates renal natriuresis (sodium excretion) and directly relaxes arterial smooth muscle.',
        clinicalNote: 'Found in avocados, sweet potatoes, Swiss chard, salmon, white beans, and bananas.'
      },
      {
        nutrient: 'Dietary Magnesium',
        target: '420 – 500 mg / day',
        mechanism: 'Acts as a natural calcium-channel blocker, preventing arterial spasm and promoting endothelial elasticity.',
        clinicalNote: 'Rich in pumpkin seeds, hemp hearts, spinach, and 100% dark cacao.'
      },
      {
        nutrient: 'Dietary Calcium',
        target: '1,200 mg / day',
        mechanism: 'Participates in vascular tone modulation and membrane stabilization of vascular smooth muscle.',
        clinicalNote: 'Obtained via plain kefir, Greek yogurt, canned wild salmon with bones, and sesame tahini.'
      },
      {
        nutrient: 'Dietary Nitrates (NO3)',
        target: '> 300 mg / day',
        mechanism: 'Generates circulating nitric oxide, prompting immediate arterial lumen expansion and reduced peripheral resistance.',
        clinicalNote: 'High in concentrated beetroot juice, raw arugula, and celery ribbons.'
      }
    ],
    foodsToPrioritize: [
      {
        category: 'Nitrate & Potassium Produce',
        items: ['Roasted red & golden beets', 'Raw baby arugula', 'Swiss chard & Lacinato kale', 'Hass avocados', 'Garnet sweet potatoes'],
        whyItHelps: 'Delivers a concentrated flood of potassium ions and natural nitrates to open up narrowed blood vessels.'
      },
      {
        category: 'Mineral-Dense Legumes',
        items: ['Cannellini white beans', 'French green lentils', 'Chickpeas', 'Black beans cooked from scratch'],
        whyItHelps: 'High in potassium and magnesium while providing viscous soluble fiber that supports gut-mediated vascular health.'
      },
      {
        category: 'Cold-Water Seafood & Lean Proteins',
        items: ['Wild Alaskan salmon', 'Pacific halibut', 'Skinless organic poultry breast', 'Pasture-raised egg whites'],
        whyItHelps: 'Supplies high-biological value protein without the high sodium or saturated fat found in processed deli meats.'
      },
      {
        category: 'Heart Seeds & Nuts',
        items: ['Raw unsalted pumpkin seeds (pepitas)', 'Shelled hemp hearts', 'Raw California walnuts', 'Unsalted pistachios'],
        whyItHelps: 'Supercharged with magnesium and L-arginine, the amino acid substrate for nitric oxide synthesis.'
      },
      {
        category: 'Salt-Free Flavor Enhancers',
        items: ['Fresh lemon & Meyer lemon juice', 'Raw apple cider vinegar & aged balsamic', 'Smoked paprika, cumin & turmeric', 'Fresh garlic, rosemary & oregano'],
        whyItHelps: 'Provides robust savory dimension so you never feel deprived without the salt shaker.'
      }
    ],
    foodsToLimit: [
      {
        category: 'Ultra-Processed Sodium Bombs',
        items: ['Cured and smoked deli meats (bacon, salami, ham)', 'Canned soups and commercial broths (unless verified <140mg/serving)', 'Store-bought salad dressings and marinades', 'Frozen convenience meals and pizza'],
        riskFactor: 'A single commercial meal can exceed 1,800mg of sodium, immediately spiking arterial fluid tension.'
      },
      {
        category: 'Hidden Sodium Condiments',
        items: ['Standard soy sauce and tamari (switch to low-sodium or coconut aminos)', 'Commercial hot sauces and barbecue glazes', 'Pickled condiments in heavy brine'],
        riskFactor: 'Adds stealth sodium that sabotages clinical pressure goals.'
      },
      {
        category: 'Excess Stimulants & Licorice',
        items: ['Energy drinks and excessive caffeine (>400mg/day)', 'Real black licorice (glycyrrhizin)', 'Alcohol in excess of 1 drink/day'],
        riskFactor: 'Glycyrrhizin causes pseudo-hyperaldosteronism, retaining sodium and causing severe hypertension surges.'
      }
    ],
    dailyMealStructure: {
      breakfast: 'Steel-cut oats with chia seeds, wild blueberries, and a dollop of unsweetened Greek yogurt (Potassium: ~650mg, Sodium: 65mg).',
      lunch: 'Large arugula and roasted beet salad with French green lentils, sliced avocado, toasted walnuts, and citrus vinaigrette (Potassium: ~1,100mg, Sodium: 140mg).',
      dinner: 'Pan-poached turmeric halibut or wild salmon over steamed Swiss chard and baked garnet sweet potato (Potassium: ~1,450mg, Sodium: 280mg).',
      snacks: 'Unsalted pumpkin seeds with a crisp Granny Smith apple; chamomile lavender tea.'
    },
    sampleMealPlanSlug: '7-day-heart-healthy-low-sodium-plan',
    recommendedRecipeIds: ['rec-4', 'rec-61', 'rec-57', 'rec-5', 'rec-56', 'rec-2', 'rec-64'],
    clinicalCitations: [
      'Appel LJ, et al. A clinical trial of the effects of dietary patterns on blood pressure. DASH Collaborative Research Group. N Engl J Med. 1997.',
      'Whelton PK, et al. 2017 ACC/AHA/AAPA/ABC/ACPM/AGS/APhA/ASH/ASPC/NMA/PCNA Guideline for the Prevention, Detection, Evaluation, and Management of High Blood Pressure in Adults. J Am Coll Cardiol. 2018.',
      'Sacks FM, et al. Effects on blood pressure of reduced dietary sodium and the Dietary Approaches to Stop Hypertension (DASH) diet. N Engl J Med. 2001.'
    ],
    keyAdvice: [
      'Track your baseline sodium for 3 consecutive days using our Meal Checker tool below.',
      'Cook whole grains and legumes from dry with aromatics (bay leaves, garlic, rosemary) instead of salt.',
      'Pair potassium-rich vegetables with every single meal to actively flush sodium via your kidneys.',
      'Never discontinue prescribed antihypertensive medication without explicit clearance from your cardiologist.'
    ]
  },
  {
    id: 'diet-type2-diabetes',
    slug: 'type-2-diabetes-blood-sugar',
    conditionName: 'Type 2 Diabetes & Insulin Resistance',
    shortBadge: 'Metabolic & Glycemic',
    dietProtocolName: 'Low-Glycemic Load & Fiber-Sequenced Protocol',
    headline: 'Prevent Glycemic Surges, Lower Fasting Insulin & Stabilize HbA1c',
    targetAudience: 'Individuals managing Type 2 Diabetes, Pre-Diabetes, Metabolic Syndrome, or Insulin Resistance',
    overview: 'Managing blood glucose is not solely about restricting total carbohydrates—it is about carbohydrate architecture, glycemic sequencing, and gut-mediated incretin stimulation. This protocol prioritizes high viscous soluble fiber, resistant starch, and clinical protein-fat pairing to blunt glucose absorption curves by up to 70%.',
    pathophysiology: 'In insulin resistance, peripheral tissues (muscle, adipose) fail to clear glucose efficiently from circulation, triggering compensatory hyperinsulinemia. Rapid carbohydrate digestion produces acute glucose excursions and oxidative stress. By placing dietary fiber and protein ahead of carbohydrates in meal sequence, gastric emptying slows down and GLP-1 hormone secretion is amplified naturally.',
    clinicalTargets: [
      {
        nutrient: 'Net Carbohydrates',
        target: '< 35 – 45 g / meal',
        mechanism: 'Minimizes the absolute postprandial glucose load entering the hepatic portal vein.',
        clinicalNote: 'Calculate Net Carbs = Total Carbs minus Dietary Fiber.'
      },
      {
        nutrient: 'Viscous Soluble Fiber',
        target: '> 35 – 45 g / day',
        mechanism: 'Forms a gel-like matrix in the upper jejunum, delaying carbohydrate breakdown and absorption.',
        clinicalNote: 'Found in chia seeds, flaxseed, lentils, oats, and Brussels sprouts.'
      },
      {
        nutrient: 'Protein Pre-Load',
        target: '25 – 35 g / meal',
        mechanism: 'Triggers early peptide YY (PYY) and GLP-1 secretion, slowing gastric motility.',
        clinicalNote: 'High biological value poultry, wild fish, organic tofu, and pastured eggs.'
      },
      {
        nutrient: 'Resistant Starch Type 3 (RS3)',
        target: '15 – 20 g / day',
        mechanism: 'Bypasses small bowel digestion to fuel short-chain fatty acid (butyrate) synthesis in the colon.',
        clinicalNote: 'Cooked and chilled sweet potatoes, black beans, and parboiled brown rice.'
      }
    ],
    foodsToPrioritize: [
      {
        category: 'Non-Starchy Cruciferous Vegetables',
        items: ['Broccoli & broccolini', 'Brussels sprouts', 'Cauliflower', 'Tuscan kale & baby spinach', 'Asparagus spears'],
        whyItHelps: 'Extremely low glycemic load with high polyphenol and sulforaphane density that enhances insulin receptor sensitivity.'
      },
      {
        category: 'Slow-Release Legumes & Seeds',
        items: ['French Puy lentils', 'Black turtle beans', 'Organic chia seeds & ground flaxseed', 'Shelled edamame'],
        whyItHelps: 'Rich in amylose and resistant starch that converts glucose release into a steady trickle rather than a spike.'
      },
      {
        category: 'Clean Satiety Proteins',
        items: ['Wild King & Sockeye salmon', 'Extra-firm sprouted tofu', 'Pasture-raised whole eggs', 'Lean ground turkey breast'],
        whyItHelps: 'Preserves lean muscle mass—the primary sink for postprandial glucose disposal.'
      },
      {
        category: 'Healthy Monounsaturated Lipids',
        items: ['First cold-pressed extra virgin olive oil', 'Ripe Hass avocados', 'Raw almonds & walnuts', 'Tahini'],
        whyItHelps: 'Slows down gastric emptying and enhances cell membrane fluidity for improved insulin signaling.'
      }
    ],
    foodsToLimit: [
      {
        category: 'Refined Flours & Rapid Starches',
        items: ['White bread, bagels, and pastries', 'Instant white rice & refined pasta', 'Instant oat packets with added sugars', 'Pretzels and rice cakes'],
        riskFactor: 'Have a glycemic index comparable to pure table sugar, resulting in rapid post-meal spikes.'
      },
      {
        category: 'Liquid Sugars & High Fructose',
        items: ['Sodas and sweetened iced teas', '100% fruit juices and fruit smoothies lacking fiber', 'Agave nectar and commercial honey glazes'],
        riskFactor: 'Liquid carbohydrates overwhelm liver glycogen stores and promote de novo lipogenesis.'
      },
      {
        category: 'Trans Fats & Hydrogenated Oils',
        items: ['Commercial baked goods with partially hydrogenated oils', 'Fried fast foods', 'Non-dairy coffee creamers'],
        riskFactor: 'Impair insulin receptor substrate-1 (IRS-1) signaling in muscle tissue.'
      }
    ],
    dailyMealStructure: {
      breakfast: 'Baked bell pepper egg boat with avocado salsa and a side of sautéed baby spinach (Net Carbs: 6g, Protein: 22g).',
      lunch: 'Korean bibimbap quinoa bowl with crispy sesame tempeh, pickled cucumbers, and sautéed mushrooms (Net Carbs: 38g, Fiber: 11g, Protein: 29g).',
      dinner: 'Pan-seared wild salmon fillet over roasted asparagus spears and half a roasted sweet potato (Net Carbs: 22g, Protein: 36g).',
      snacks: 'Raw walnuts with cinnamon-dusted celery sticks; unsweetened green tea.'
    },
    sampleMealPlanSlug: '7-day-blood-sugar-metabolic-balance-plan',
    recommendedRecipeIds: ['rec-55', 'rec-1', 'rec-65', 'rec-62', 'rec-2', 'rec-58', 'rec-43'],
    clinicalCitations: [
      'American Diabetes Association. Standards of Care in Diabetes—2026. Diabetes Care. 2026.',
      'Shukla AP, et al. Food order has a significant impact on postprandial glucose and insulin levels in Type 2 Diabetes. Diabetes Care. 2015.',
      'Bantle JP, et al. Nutrition recommendations and interventions for diabetes. Diabetes Care. 2008.'
    ],
    keyAdvice: [
      'Practice "Food Sequencing": Eat your salad/greens first, proteins second, and complex carbohydrates last.',
      'Take a brisk 10-minute walk immediately following your largest meal to activate soleus muscle glucose uptake.',
      'Cook starches (quinoa, sweet potatoes) the day before and cool them in the fridge to double their resistant starch content.',
      'Check your post-meal glucose 90 minutes after eating to identify your individual food tolerances.'
    ]
  },
  {
    id: 'diet-cardiovascular-cholesterol',
    slug: 'hyperlipidemia-cardiovascular-health',
    conditionName: 'High Cholesterol & Heart Disease',
    shortBadge: 'Lipid & Arterial',
    dietProtocolName: 'The Portfolio Diet & Cardioprotective Lipid Protocol',
    headline: 'Clinically Lower LDL-C and ApoB through Targeted Functional Foods',
    targetAudience: 'Patients with Hypercholesterolemia, High LDL-C, Elevated Apolipoprotein B (ApoB), or Atherosclerosis',
    overview: 'Developed by Dr. David Jenkins at the University of Toronto, the Portfolio Diet combines four distinct cholesterol-lowering food groups into a single comprehensive pattern. Clinical trials demonstrate that this diet reduces LDL cholesterol by 28–35%—a magnitude comparable to first-generation statin medications.',
    pathophysiology: 'Atherosclerosis begins when circulating ApoB-containing lipoproteins (primarily LDL) become trapped in the subendothelial space of coronary arteries, undergoing oxidation and inciting macrophage foam-cell inflammation. By clearing circulating bile acids through soluble fibers, providing plant sterols to block intestinal cholesterol absorption, and displacing saturated fatty acids with monounsaturated fats, liver LDL-receptor expression is dramatically upregulated.',
    clinicalTargets: [
      {
        nutrient: 'Saturated Fatty Acids',
        target: '< 5 – 6% of total calories',
        mechanism: 'Down-regulates hepatic LDL receptors; keeping saturated fat low maximizes receptor clearance of LDL particles.',
        clinicalNote: 'Less than 12g saturated fat per day on a 2,000 calorie plan.'
      },
      {
        nutrient: 'Viscous Beta-Glucan & Soluble Fiber',
        target: '> 15 – 20 g / day',
        mechanism: 'Binds cholesterol-rich bile acids in the intestine, forcing the liver to consume circulating LDL to make new bile.',
        clinicalNote: 'Derived from steel-cut oats, oat bran, barley, and psyllium husk.'
      },
      {
        nutrient: 'Dietary Plant Sterols & Stanols',
        target: '2.0 g / day',
        mechanism: 'Displaces dietary and biliary cholesterol from mixed micelles, reducing intestinal absorption by up to 50%.',
        clinicalNote: 'Found naturally in cold-pressed vegetable oils, seeds, legumes, and fortified heart foods.'
      },
      {
        nutrient: 'Marine Omega-3 EPA & DHA',
        target: '1,500 – 2,000 mg / day',
        mechanism: 'Reduces hepatic very low-density lipoprotein (VLDL) triglyceride synthesis and lowers circulating remnant particles.',
        clinicalNote: 'Found in wild King salmon, sardines, mackerel, and purified algal oil.'
      }
    ],
    foodsToPrioritize: [
      {
        category: 'Beta-Glucan Grains',
        items: ['Coarse steel-cut oats', 'Oat bran', 'Hulled barley', 'Whole-grain sourdough rye'],
        whyItHelps: 'Viscous fibers form an intestinal barrier that traps cholesterol before it enters the bloodstream.'
      },
      {
        category: 'Atheroprotective Tree Nuts',
        items: ['Raw California walnuts', 'Raw whole almonds', 'Shelled unsalted pistachios', 'Pecans'],
        whyItHelps: 'Contains plant sterols, L-arginine, and alpha-linolenic acid (ALA) to protect arterial endothelium.'
      },
      {
        category: 'Plant Proteins & Legumes',
        items: ['Edamame and organic whole soy', 'French green lentils', 'Chickpeas', 'Cannellini beans'],
        whyItHelps: 'Displaces animal saturated fat while peptide fractions trigger LDL-receptor upregulation.'
      },
      {
        category: 'High-Polyphenol Lipids',
        items: ['Early-harvest high-polyphenol extra virgin olive oil', 'Ripe avocados'],
        whyItHelps: 'Protects LDL particles from oxidative damage, preventing plaque formation.'
      }
    ],
    foodsToLimit: [
      {
        category: 'Saturated Fatty Meat & Dairy',
        items: ['Fatty cuts of grain-fed beef and pork', 'Butter, heavy cream, and full-fat cheddar', 'Commercial baked goods with palm oil', 'Coconut oil and coconut butter in high quantities'],
        riskFactor: 'Directly suppresses hepatic LDL-receptor density, causing ApoB particles to linger in circulation.'
      },
      {
        category: 'Industrial Dietary Trans Fats',
        items: ['Fried commercial foods', 'Shortening and hard margarine', 'Commercial baked goods'],
        riskFactor: 'Raises atherogenic LDL while simultaneously depressing protective HDL.'
      }
    ],
    dailyMealStructure: {
      breakfast: 'Warm steel-cut oats topped with 1 tbsp ground flaxseed, 2 tbsp raw walnuts, and half a sliced pear (Saturated Fat: 1.5g, Beta-Glucan: 4g).',
      lunch: 'Tuscan white bean and cavolo nero soup served with a drizzle of cold-pressed olive oil and whole-grain seed crackers (Saturated Fat: 2g, Fiber: 12g).',
      dinner: 'Pan-seared wild salmon fillet over steamed asparagus, roasted sweet potato wedges, and massaged kale salad (Saturated Fat: 2.8g, EPA/DHA: 1,800mg).',
      snacks: 'A handful of raw almonds with fresh blackberries; hot green tea.'
    },
    sampleMealPlanSlug: '7-day-heart-healthy-low-sodium-plan',
    recommendedRecipeIds: ['rec-2', 'rec-63', 'rec-45', 'rec-5', 'rec-58', 'rec-61', 'rec-60'],
    clinicalCitations: [
      'Jenkins DJ, et al. Direct comparison of a dietary portfolio of cholesterol-lowering foods with a statin in hypercholesterolemic participants. Am J Clin Nutr. 2005.',
      'Grundy SM, et al. 2018 AHA/ACC/AACVPR/AAPA/ABC/ACPM/ADA/AGS/APhA/ASPC/NLA/PCNA Guideline on the Management of Blood Cholesterol. Circulation. 2019.'
    ],
    keyAdvice: [
      'Incorporate at least 1/4 cup of raw tree nuts every single day—a cornerstone of the Portfolio Protocol.',
      'Swap all cooking butter and solid fats for cold-pressed extra virgin olive oil.',
      'Add 1 tablespoon of ground psyllium husk or oat bran into your morning oatmeal or smoothie.',
      'Request an Apolipoprotein B (ApoB) and High-Sensitivity CRP blood test at your next clinical cardiology visit.'
    ]
  },
  {
    id: 'diet-chronic-kidney-disease',
    slug: 'chronic-kidney-disease-renal-nutrition',
    conditionName: 'Chronic Kidney Disease (Stages 1–3)',
    shortBadge: 'Renal / Nephrology',
    dietProtocolName: 'Renal-Protective Plant-Dominant Protocol (PLADO)',
    headline: 'Reduce Glomerular Hyperfiltration and Protect Remaining Nephron Architecture',
    targetAudience: 'Patients with Early-to-Moderate Chronic Kidney Disease (eGFR 30–89 mL/min/1.73m²)',
    overview: 'Modern nephrology research has transformed renal nutrition. Pioneered by leading nephrologists, the Plant-Dominant Low-Protein (PLADO) protocol demonstrates that substituting animal protein with whole plant-based proteins lowers intraglomerular pressure, reduces uremic toxins generated by gut dysbiosis, and slows CKD progression without causing protein malnutrition.',
    pathophysiology: 'Dietary animal proteins induce afferent arteriolar vasodilation, causing glomerular hyperfiltration and progressive glomerulosclerosis. Furthermore, inorganic phosphate additives found in processed foods are 90–100% absorbed, causing arterial calcification and secondary hyperparathyroidism. Plant phytate phosphorus is only 30–50% bioavailable, making whole plant foods significantly safer for renal filtration.',
    clinicalTargets: [
      {
        nutrient: 'Dietary Protein',
        target: '0.6 – 0.8 g / kg body weight / day',
        mechanism: 'Reduces hyperfiltration injury and minimizes accumulation of nitrogenous waste products (BUN).',
        clinicalNote: 'For a 70 kg individual: 42g to 56g of protein daily, with >50% from plant sources.'
      },
      {
        nutrient: 'Bioavailable Phosphorus',
        target: '< 800 – 1,000 mg / day',
        mechanism: 'Protects vascular endothelium and prevents renal osteodystrophy (bone mineral disorder).',
        clinicalNote: 'Avoid all foods with inorganic additives containing "PHOS" in ingredient labels.'
      },
      {
        nutrient: 'Dietary Sodium',
        target: '< 1,800 – 2,000 mg / day',
        mechanism: 'Controls extracellular fluid volume, reduces proteinuria, and enhances response to ACE inhibitors/ARBs.',
        clinicalNote: 'Crucial for preserving residual renal filtration rate.'
      },
      {
        nutrient: 'Dietary Potassium',
        target: 'Tailored (2,000–3,000 mg / day if serum K >5.0)',
        mechanism: 'Maintains cardiac membrane stability while preventing hyperkalemia in reduced excretion states.',
        clinicalNote: 'Only restrict high-potassium foods if your nephrologist confirms elevated serum potassium.'
      }
    ],
    foodsToPrioritize: [
      {
        category: 'Renal-Safe Low-Phosphorus Produce',
        items: ['Cauliflower florets', 'Red bell peppers', 'Cabbage and iceberg lettuce', 'Cucumbers', 'Apples & berries'],
        whyItHelps: 'High in protective antioxidants and fiber with naturally lower potassium and phosphorus loads.'
      },
      {
        category: 'Plant Proteins with Organic Phytate',
        items: ['Organic firm tofu', 'French green lentils (boiled & drained)', 'Sprouted chickpeas', 'Edamame in moderation'],
        whyItHelps: 'Phosphate bound to phytate passes safely into the stool without overtaxing renal excretion.'
      },
      {
        category: 'Clean Caloric Carriers',
        items: ['Extra virgin olive oil', 'White basmati rice', 'Rice noodles', 'Gluten-free oats'],
        whyItHelps: 'Supplies sufficient non-protein calories to prevent muscle catabolism and preserve body weight.'
      }
    ],
    foodsToLimit: [
      {
        category: 'Inorganic Phosphate Additives',
        items: ['Dark colas and packaged beverages', 'Processed cheese slices and spreads', 'Fast food chicken nuggets and sausages', 'Refrigerated bakery doughs with sodium acid pyrophosphate'],
        riskFactor: 'Inorganic phosphates are 100% absorbed and highly toxic to failing nephrons.'
      },
      {
        category: 'Excess Red Meat & Deli Meats',
        items: ['Cured bacon, sausages, and hot dogs', 'Heavy portions of beef or pork (>4 oz)', 'Commercial meat extracts and bouillon cubes'],
        riskFactor: 'Drives severe glomerular hyperfiltration and increases serum creatinine and urea.'
      },
      {
        category: 'High-Sodium Canned Foods',
        items: ['Commercial canned vegetables (unrinsed)', 'Canned broths and soups', 'Pickles and sauerkraut'],
        riskFactor: 'Triggers acute fluid retention and uncontrolled secondary hypertension.'
      }
    ],
    dailyMealStructure: {
      breakfast: 'Warm basmati rice pudding cooked with unsweetened almond milk, cinnamon, and fresh diced green apples (Protein: 5g, Phosphorus: Low).',
      lunch: 'Crispy za’atar spiced cauliflower bowl with shredded red cabbage, sliced cucumbers, and light lemon tahini (Protein: 8g, Sodium: 210mg).',
      dinner: 'Pan-poached cod or grilled tofu over sautéed bell peppers and zucchini ribbons with extra virgin olive oil (Protein: 22g, Potassium: Moderate).',
      snacks: 'Fresh organic blueberries or seedless red grapes; hibiscus herbal tea.'
    },
    sampleMealPlanSlug: '7-day-heart-healthy-low-sodium-plan',
    recommendedRecipeIds: ['rec-59', 'rec-64', 'rec-67', 'rec-1', 'rec-4', 'rec-57'],
    clinicalCitations: [
      'Kalantar-Zadeh K, et al. Plant-dominant low-protein diet for conservative management of chronic kidney disease. Nutrients. 2020.',
      'Ikizler TA, et al. KDOQI Clinical Practice Guideline for Nutrition in CKD: 2020 Update. Am J Kidney Dis. 2020.'
    ],
    keyAdvice: [
      'Always inspect food ingredient labels for any word containing "-PHOS-" (e.g., sodium tripolyphosphate).',
      'Boiling vegetables in plenty of water and discarding the cooking water ("leaching") reduces potassium by 50%.',
      'Never consume starfruit (carambola) as it contains a neurotoxin that failing kidneys cannot clear.',
      'Collaborate closely with a certified Renal Dietitian (CSR) to individualize your lab-based targets.'
    ]
  },
  {
    id: 'diet-gastrointestinal-ibs',
    slug: 'irritable-bowel-ibs-low-fodmap',
    conditionName: 'IBS, SIBO & Gut Sensitivity',
    shortBadge: 'Digestive & Microbiome',
    dietProtocolName: 'The Low-FODMAP Digestive Protocol',
    headline: 'Eliminate Fermentable Carbohydrates to Resolve Bloating, Gas & Spasms',
    targetAudience: 'Individuals suffering from Irritable Bowel Syndrome (IBS-D, IBS-C, IBS-M) or Small Intestinal Bacterial Overgrowth (SIBO)',
    overview: 'Developed by researchers at Monash University in Australia, the Low-FODMAP protocol is the premier evidence-based nutritional therapy for functional gut disorders. By temporarily restricting short-chain carbohydrates that ferment rapidly or pull excessive water into the bowel, clinical bloating and abdominal pain are reduced in up to 86% of patients.',
    pathophysiology: 'FODMAPs (Fermentable Oligosaccharides, Disaccharides, Monosaccharides, and Polyols) are poorly absorbed in the small intestine. In individuals with visceral hypersensitivity, their rapid bacterial fermentation produces methane and hydrogen gas, causing painful luminal distension, bloating, and irregular bowel motility.',
    clinicalTargets: [
      {
        nutrient: 'Phase 1: Strict Elimination',
        target: '2 to 6 weeks duration',
        mechanism: 'Calms gut inflammation, reduces gas volume, and establishes baseline symptom resolution.',
        clinicalNote: 'Restrict all high-FODMAP foods during this strict baseline period.'
      },
      {
        nutrient: 'Phase 2: Structured Challenge',
        target: 'Systematic 3-day tests',
        mechanism: 'Isolates exact FODMAP subcategories (fructose, lactose, sorbitol, mannitol, fructans, GOS) triggering symptoms.',
        clinicalNote: 'Test one food group at a time while maintaining a symptom diary.'
      },
      {
        nutrient: 'Phase 3: Personalization',
        target: 'Long-term sustainable diet',
        mechanism: 'Re-expands dietary diversity to support colonic microbial bifidobacteria while avoiding specific triggers.',
        clinicalNote: 'Never remain on a strict Phase 1 elimination indefinitely.'
      }
    ],
    foodsToPrioritize: [
      {
        category: 'Low-FODMAP Vegetables',
        items: ['Zucchini & yellow squash', 'Carrots & parsnips', 'Cucumbers', 'Bok choy & common cabbage (up to 75g)', 'Baby spinach'],
        whyItHelps: 'Digest easily without feeding gas-producing dysbiotic bacteria in the small intestine.'
      },
      {
        category: 'Gentle Whole Proteins',
        items: ['Fresh wild salmon & white fish', 'Pasture-raised eggs', 'Skinless chicken & turkey breast', 'Firm pressed tofu'],
        whyItHelps: 'Pure proteins contain zero fermentable carbohydrates, providing zero gas substrate.'
      },
      {
        category: 'Low-FODMAP Grains',
        items: ['Quinoa & wild rice', '100% buckwheat soba noodles', 'Traditional slow-fermented sourdough spelt bread', 'Gluten-free oats'],
        whyItHelps: 'Provides essential prebiotic fiber while excluding difficult-to-digest wheat fructans.'
      },
      {
        category: 'Garlic & Onion Replacements',
        items: ['Green tops of scallions & leeks', 'Garlic-infused extra virgin olive oil (fructans are not oil-soluble)', 'Fresh ginger root', 'Asafoetida (hing) spice powder'],
        whyItHelps: 'Delivers full culinary savoriness without the severe gas produced by garlic and onion fructans.'
      }
    ],
    foodsToLimit: [
      {
        category: 'High-Fructan Aromatics & Grains',
        items: ['Raw & cooked garlic and onions', 'Standard wheat bread, pasta, and baked goods', 'Rye and barley in large portions'],
        riskFactor: 'Fructans are the #1 dietary trigger for severe abdominal pain and bloating in IBS.'
      },
      {
        category: 'High-Fructose & Polyol Fruits',
        items: ['Apples, pears, and mangoes', 'Watermelon and cherries', 'Stone fruits (peaches, plums, apricots)', 'Dried fruits of all kinds'],
        riskFactor: 'Excess free fructose and polyols pull fluid rapidly into the ileum, triggering diarrhea and cramps.'
      },
      {
        category: 'High-Lactose Dairy',
        items: ['Cow milk and evaporated milk', 'Ice cream and soft cheeses (ricotta, mascarpone)', 'Whey protein concentrates'],
        riskFactor: 'Lactase deficiency leads to undigested sugar reaching colonic bacteria.'
      }
    ],
    dailyMealStructure: {
      breakfast: 'Warm gluten-free oat porridge cooked in almond milk with fresh strawberries and pumpkin seeds (FODMAP-Safe).',
      lunch: 'Vietnamese grilled shrimp vermicelli salad with julienned carrots, cucumbers, and fresh mint (FODMAP-Safe).',
      dinner: 'Pan-poached turmeric halibut in light coconut broth with bok choy and steamed jasmine rice (FODMAP-Safe).',
      snacks: 'Unripe greenish banana with 1 tbsp peanut butter; peppermint herbal infusion.'
    },
    sampleMealPlanSlug: '7-day-mediterranean-longevity-plan',
    recommendedRecipeIds: ['rec-57', 'rec-70', 'rec-63', 'rec-66', 'rec-4', 'rec-2'],
    clinicalCitations: [
      'Halmos EP, et al. A diet low in FODMAPs reduces symptoms of irritable bowel syndrome. Gastroenterology. 2014.',
      'Gibson PR, Shepherd SJ. Evidence-based dietary management of functional gastrointestinal symptoms: The FODMAP approach. J Gastroenterol Hepatol. 2010.'
    ],
    keyAdvice: [
      'Use garlic-infused olive oil—fructans cannot dissolve in oil, giving you full garlic flavor with zero gut distress.',
      'Only eat the green tops of scallions and leeks; the white bulbs contain the highest concentrations of fructans.',
      'Do not remain on strict Phase 1 elimination for longer than 6 weeks to prevent depletion of beneficial Bifidobacteria.',
      'Keep a detailed 7-day food and symptom journal to accurately identify your specific trigger categories.'
    ]
  },
  {
    id: 'diet-gout-hyperuricemia',
    slug: 'gout-hyperuricemia-low-purine',
    conditionName: 'Gout & Hyperuricemia',
    shortBadge: 'Metabolic & Joint',
    dietProtocolName: 'The Low-Purine & Uric Acid Clearance Protocol',
    headline: 'Prevent Monosodium Urate Crystallization and Reduce Flare Frequency',
    targetAudience: 'Patients diagnosed with Gout, Asymptomatic Hyperuricemia (serum urate >6.8 mg/dL), or Uric Acid Kidney Stones',
    overview: 'Gout is an intensely painful inflammatory arthritis caused by the crystallization of monosodium urate in joints and periarticular tissues. While genetic factors dictate renal urate excretion, specific dietary choices directly fuel serum uric acid levels. This protocol combines purine restriction, natural xanthine oxidase inhibition from tart cherries, and renal clearance optimization.',
    pathophysiology: 'Uric acid is the end-product of purine nucleotide degradation. High-purine animal foods flood the liver with adenosine and guanosine, driving xanthine oxidase activity. Crucially, industrial high-fructose corn syrup (HFCS) depletes hepatic ATP during phosphorylation, generating vast surges of AMP that are rapidly converted into uric acid within minutes of ingestion.',
    clinicalTargets: [
      {
        nutrient: 'Dietary Purines',
        target: '< 200 mg / day',
        mechanism: 'Reduces the hepatic pool of purines requiring catabolic conversion into uric acid.',
        clinicalNote: 'Avoid organ meats, small oily fish, and concentrated yeast extracts.'
      },
      {
        nutrient: 'Daily Fluid Intake',
        target: '> 3.0 Liters / day',
        mechanism: 'Prevents urine supersaturation and promotes continuous renal clearance of urate crystals.',
        clinicalNote: 'Target pale, clear urine throughout daytime hours.'
      },
      {
        nutrient: 'Tart Cherry Anthocyanins',
        target: '> 250 mg / day',
        mechanism: 'Clinically shown to inhibit xanthine oxidase and boost renal urate excretion, reducing flares by up to 50%.',
        clinicalNote: 'Pure Montmorency tart cherry concentrate or fresh dark sweet cherries.'
      },
      {
        nutrient: 'Dairy Whey & Casein',
        target: '1 – 2 servings / day',
        mechanism: 'Lactalbumin and casein exert a potent uricosuric effect, actively clearing uric acid through the kidneys.',
        clinicalNote: 'Plain low-fat Greek yogurt, kefir, or skim milk.'
      }
    ],
    foodsToPrioritize: [
      {
        category: 'Anthocyanin-Rich Berries',
        items: ['Montmorency tart cherries & 100% tart cherry juice', 'Wild blueberries', 'Blackberries', 'Dark sweet cherries'],
        whyItHelps: 'Anthocyanins directly suppress inflammatory IL-1beta and xanthine oxidase enzymes.'
      },
      {
        category: 'Uricosuric Dairy Proteins',
        items: ['Plain unsweetened kefir', 'Low-fat Greek yogurt', 'Skim milk'],
        whyItHelps: 'Natural dairy proteins stimulate the kidneys to excrete uric acid rapidly.'
      },
      {
        category: 'Alkalinizing Low-Purine Produce',
        items: ['Cucumbers & celery', 'Cauliflower & broccoli', 'Red bell peppers', 'Carrots & sweet potatoes', 'Avocados'],
        whyItHelps: 'Alkalinizes urine pH, preventing uric acid from crystallizing into painful joint needles.'
      },
      {
        category: 'Plant Proteins & Eggs',
        items: ['Pasture-raised eggs', 'Firm organic tofu', 'Shelled edamame', 'Cooked green lentils in moderation'],
        whyItHelps: 'Modern clinical trials confirm that purine-rich plant foods DO NOT increase gout flares.'
      }
    ],
    foodsToLimit: [
      {
        category: 'Extreme High-Purine Organ Meats',
        items: ['Liver, kidneys, sweetbreads, and heart', 'Wild game meats (venison, pheasant)', 'Heavy meat gravies and demi-glaces'],
        riskFactor: 'Contains over 400mg purines per 100g, triggering acute postprandial hyperuricemia spikes.'
      },
      {
        category: 'High-Purine Seafood',
        items: ['Sardines, anchovies, and mackerel in oil', 'Mussels and scallops', 'Fish roe (caviar)'],
        riskFactor: 'Rapidly increases serum urate within 2 to 4 hours of consumption.'
      },
      {
        category: 'Alcohol & High-Fructose Corn Syrup',
        items: ['Beer (contains brewers yeast and guanosine)', 'Distilled spirits and heavy wine', 'Sodas and sweetened juices with HFCS'],
        riskFactor: 'Beer provides a double hit of purines plus alcohol; alcohol competes with uric acid for renal excretion.'
      }
    ],
    dailyMealStructure: {
      breakfast: 'Ceremonial matcha and wild blueberry chia pudding with a glass of pure Montmorency tart cherry juice (Purines: Very Low).',
      lunch: 'Crispy za’atar cauliflower bowl with whipped feta, shaved cucumbers, and toasted pine nuts (Purines: Low).',
      dinner: 'French green lentil shepherd’s pie with sweet potato mash and a side of massaged kale (Purines: Safe).',
      snacks: 'Fresh dark cherries with plain low-fat Greek yogurt; abundant lemon water.'
    },
    sampleMealPlanSlug: '7-day-plant-forward-vegetarian-vitality-plan',
    recommendedRecipeIds: ['rec-56', 'rec-59', 'rec-62', 'rec-64', 'rec-68', 'rec-58'],
    clinicalCitations: [
      'Choi HK, et al. Purine-rich foods, dairy and protein intake, and the risk of gout in men. N Engl J Med. 2004.',
      'Zhang Y, et al. Cherry consumption and decreased risk of recurrent gout attacks. Arthritis Rheum. 2012.'
    ],
    keyAdvice: [
      'Drink 8 ounces of pure Montmorency tart cherry juice daily or eat 1 cup of fresh dark cherries during active flare risk.',
      'Eliminate all commercial beer completely—beer contains brewers yeast and purine precursors that trigger flares.',
      'Plant-based purines (beans, lentils, spinach) are clinically proven safe and do not increase gout attack risk.',
      'Drink a large glass of filtered water right before bed to prevent urine stagnation and overnight crystal formation.'
    ]
  },
  {
    id: 'diet-fatty-liver-masld',
    slug: 'metabolic-fatty-liver-nafld-masld',
    conditionName: 'Fatty Liver Disease (MASLD / NAFLD)',
    shortBadge: 'Hepatic & Metabolic',
    dietProtocolName: 'The Hepatoprotective Mediterranean Protocol',
    headline: 'Reverse Hepatic Steatosis, Lower Liver Transaminases & Reduce Visceral Fat',
    targetAudience: 'Individuals diagnosed with Metabolic Dysfunction-Associated Steatotic Liver Disease (MASLD / NAFLD) or Elevated ALT/AST',
    overview: 'MASLD (formerly NAFLD) affects over 30% of global adults and is tightly linked with insulin resistance and visceral adiposity. While no single pharmaceutical cure exists, the hepatoprotective Mediterranean diet is clinically proven to reduce intrahepatic lipid content by up to 40% even before significant total body weight loss occurs.',
    pathophysiology: 'Hepatic steatosis occurs when the influx of free fatty acids from insulin-resistant visceral fat and de novo lipogenesis (stimulated by refined fructose) exceeds the liver’s capacity for beta-oxidation and VLDL export. This causes toxic lipid accumulation, mitochondrial dysfunction, and lipid peroxidation that triggers hepatic fibrogenesis.',
    clinicalTargets: [
      {
        nutrient: 'Refined Fructose Elimination',
        target: '0 g added fructose',
        mechanism: 'Eliminates the primary substrate for hepatic de novo lipogenesis and uncouples hepatic lipotoxicity.',
        clinicalNote: 'Check labels for high-fructose corn syrup, agave, and concentrated fruit juice purees.'
      },
      {
        nutrient: 'Dietary Choline',
        target: '> 450 – 550 mg / day',
        mechanism: 'Required to synthesize phosphatidylcholine, without which the liver cannot package triglycerides into VLDL for export.',
        clinicalNote: 'Obtained via pasture-raised egg yolks, wild salmon, Brussels sprouts, and shiitake mushrooms.'
      },
      {
        nutrient: 'Coffee Polyphenols (Chlorogenic Acid)',
        target: '2 to 3 cups / day',
        mechanism: 'Activates hepatic AMP-activated protein kinase (AMPK) and stimulates autophagy of lipid droplets in hepatocytes.',
        clinicalNote: 'Unsweetened black or oat-milk coffee has strong clinical trial backing in MASLD.'
      },
      {
        nutrient: 'Marine Omega-3 Polyunsaturated Fats',
        target: '2,000 mg / day',
        mechanism: 'Inhibits sterol regulatory element-binding protein 1c (SREBP-1c) to turn off fat-storing genes in liver cells.',
        clinicalNote: 'Wild salmon, sardines, and cold-pressed walnut oil.'
      }
    ],
    foodsToPrioritize: [
      {
        category: 'Cruciferous Liver Detoxifiers',
        items: ['Broccoli & broccolini', 'Brussels sprouts', 'Cabbage', 'Watercress & arugula', 'Radishes'],
        whyItHelps: 'Contains glucoraphanin, which metabolizes into sulforaphane—a master activator of Nrf2 antioxidant defense in liver cells.'
      },
      {
        category: 'Choline-Dense Whole Foods',
        items: ['Pasture-raised whole eggs', 'Wild Alaskan salmon', 'Shiitake mushrooms', 'Organic edamame'],
        whyItHelps: 'Prevents fat from getting trapped inside liver hepatocytes by facilitating lipid export.'
      },
      {
        category: 'High-Polyphenol Antioxidant Brews',
        items: ['Unsweetened black coffee', 'Ceremonial Japanese matcha', 'Raw unsweetened cacao'],
        whyItHelps: 'Potent polyphenols stimulate hepatic mitochondrial beta-oxidation.'
      },
      {
        category: 'Anti-Steatotic Fats',
        items: ['First cold-pressed extra virgin olive oil (3+ tbsp/day)', 'Avocados', 'Raw walnuts'],
        whyItHelps: 'Displaces pro-inflammatory omega-6 seed oils and suppresses hepatic inflammation.'
      }
    ],
    foodsToLimit: [
      {
        category: 'Added Fructose & High-Glycemic Sweets',
        items: ['Sodas, energy drinks, and fruit juices', 'Agave syrup and corn syrup pastries', 'Candy and sweetened dairy desserts'],
        riskFactor: 'Fructose is metabolized exclusively by the liver directly into intrahepatic fat.'
      },
      {
        category: 'Alcohol in All Quantities',
        items: ['Beer, wine, and hard liquor'],
        riskFactor: 'Even modest alcohol consumption accelerates fibrosis progression in fatty liver.'
      },
      {
        category: 'Ultra-Processed Seed Oils in High Heat',
        items: ['Deep-fried fast foods', 'Reused commercial frying oils with oxidized aldehydes'],
        riskFactor: 'Induces severe lipid peroxidation and hepatic endoplasmic reticulum stress.'
      }
    ],
    dailyMealStructure: {
      breakfast: 'Two soft-poached pasture-raised eggs over steamed Swiss chard with a slice of whole-grain sourdough and black coffee (Choline: 300mg).',
      lunch: 'Korean bibimbap quinoa bowl with crispy sesame tempeh, sautéed shiitakes, and pickled radishes (Fiber: 9g, Plant Protein: 29g).',
      dinner: 'Pan-seared wild salmon over roasted Brussels sprouts and half a baked sweet potato (EPA/DHA: 1,800mg, Sulforaphane: High).',
      snacks: 'Raw walnuts with fresh blackberries; unsweetened green tea.'
    },
    sampleMealPlanSlug: '7-day-mediterranean-longevity-plan',
    recommendedRecipeIds: ['rec-55', 'rec-2', 'rec-4', 'rec-57', 'rec-61', 'rec-65', 'rec-5'],
    clinicalCitations: [
      'Rinella ME, et al. AASLD Practice Guidance on the Clinical Assessment and Management of Nonalcoholic Fatty Liver Disease. Hepatology. 2023.',
      'Gepner Y, et al. The effect of Mediterranean and low-carbohydrate diets on intrahepatic fat: A randomized controlled trial. J Hepatol. 2019.'
    ],
    keyAdvice: [
      'Drink 2 to 3 cups of filtered black coffee daily—consistently associated in meta-analyses with reduced liver stiffness.',
      'Eliminate 100% of liquid sugary drinks and fruit juices; replace with sparkling mineral water and lemon.',
      'Cook generously with cold-pressed extra virgin olive oil (aim for 3 tablespoons daily).',
      'Ask your hepatologist or primary physician for a transient elastography (FibroScan) to monitor liver fat percentage.'
    ]
  },
  {
    id: 'diet-anti-inflammatory-arthritis',
    slug: 'systemic-inflammation-arthritis',
    conditionName: 'Arthritis & Systemic Inflammation',
    shortBadge: 'Inflammation & Joints',
    dietProtocolName: 'The Anti-Inflammatory Polyphenol Protocol',
    headline: 'Downregulate Pro-Inflammatory Cytokines (TNF-α, IL-6) and Ease Joint Stiffness',
    targetAudience: 'Individuals suffering from Osteoarthritis, Rheumatoid Arthritis, Chronic Joint Pain, or Elevated hs-CRP',
    overview: 'Chronic low-grade systemic inflammation is the shared driver of degenerative joint disorders and premature cellular aging. This protocol floods the bloodstream with powerful natural anti-inflammatory compounds—including curcumin from fresh turmeric, sulforaphane, EPA/DHA omega-3s, and anthocyanins—to inhibit the master pro-inflammatory nuclear factor kappa B (NF-κB) transcription pathway.',
    pathophysiology: 'Pro-inflammatory cytokines like tumor necrosis factor-alpha (TNF-α) and interleukin-6 (IL-6) upregulate matrix metalloproteinases (MMPs) that degrade joint cartilage and synovial fluid. High dietary omega-6 to omega-3 ratios fuel arachidonic acid pathways, generating inflammatory Series-2 prostaglandins. Restoring balance calms synovial edema and improves joint range of motion.',
    clinicalTargets: [
      {
        nutrient: 'Dietary Omega-6 : Omega-3 Ratio',
        target: '< 4 : 1 (Standard Western diet is >16:1)',
        mechanism: 'Competitively inhibits cyclooxygenase (COX) enzymes, shifting synthesis toward anti-inflammatory Series-3 prostaglandins.',
        clinicalNote: 'Eliminate soybean/corn oil; maximize wild salmon, chia seeds, and walnuts.'
      },
      {
        nutrient: 'Curcuminoids + Piperine',
        target: '> 500 mg active curcuminoids / day',
        mechanism: 'Directly suppresses NF-κB and inhibits inflammatory COX-2 and 5-LOX pathways.',
        clinicalNote: 'Always pair turmeric with black pepper (piperine increases bioavailability by 2,000%).'
      },
      {
        nutrient: 'Dietary Polyphenols',
        target: '> 1,000 mg / day',
        mechanism: 'Neutralizes reactive oxygen species in synovial fluid and preserves cartilage proteoglycans.',
        clinicalNote: 'Found in dark berries, extra virgin olive oil, green tea, and 85%+ cacao.'
      },
      {
        nutrient: 'Plant Diversity Metric',
        target: '> 30 distinct plants / week',
        mechanism: 'Enriches microbiome bacterial diversity, driving short-chain fatty acid (butyrate) synthesis to heal intestinal barrier.',
        clinicalNote: 'Counts all vegetables, fruits, herbs, spices, whole grains, nuts, and seeds.'
      }
    ],
    foodsToPrioritize: [
      {
        category: 'Golden Anti-Inflammatory Roots',
        items: ['Fresh turmeric root (paired with black pepper)', 'Fresh ginger root', 'Garlic and shallots'],
        whyItHelps: 'Gingerols and curcuminoids deliver natural analgesic and joint-protective benefits.'
      },
      {
        category: 'Cold-Water Wild Marine Fish',
        items: ['Wild Alaskan salmon', 'Pacific halibut', 'Alaskan black cod', 'Sardines'],
        whyItHelps: 'Supercharged with specialized pro-resolving mediators (SPMs) that actively clear joint inflammation.'
      },
      {
        category: 'Polyphenol-Dense Superberries',
        items: ['Wild frozen blueberries', 'Blackberries', 'Pomegranate arils', 'Dark sweet cherries'],
        whyItHelps: 'Inhibits inflammatory cartilage breakdown enzymes while scavenging free radicals.'
      },
      {
        category: 'Leafy Greens & Microgreens',
        items: ['Lacinato kale', 'Watercress', 'Radish microgreens', 'Baby arugula'],
        whyItHelps: 'Provides bioavailable Vitamin K, lutein, and magnesium to soothe tissue swelling.'
      }
    ],
    foodsToLimit: [
      {
        category: 'Refined Industrial Seed Oils',
        items: ['Soybean oil and corn oil', 'Cottonseed and generic "vegetable oil" blends', 'Commercial deep-fried foods'],
        riskFactor: 'Excess linoleic acid fuels arachidonic acid inflammatory cascades.'
      },
      {
        category: 'Refined Sugars & Advanced Glycation End-Products (AGEs)',
        items: ['High-sugar baked goods', 'Charred/blackened grilled meats cooked at extreme dry heat', 'Sweetened beverages'],
        riskFactor: 'AGEs bind to RAGE receptors on chondrocytes, accelerating joint tissue degradation.'
      },
      {
        category: 'Ultra-Processed Packaged Snacks',
        items: ['Potato chips and cheese crackers', 'Processed snack meats with chemical nitrates'],
        riskFactor: 'Triggers gut barrier permeability ("leaky gut"), causing endotoxemia and systemic flare-ups.'
      }
    ],
    dailyMealStructure: {
      breakfast: 'Ceremonial matcha & wild blueberry chia seed pudding topped with crushed pistachios and raw cacao nibs (Polyphenols: ~450mg).',
      lunch: 'Roasted ruby beets & blood orange salad with shaved fennel, toasted walnuts, and cold-pressed walnut oil (Polyphenols: ~600mg).',
      dinner: 'Pan-poached golden turmeric halibut in lemongrass coconut broth with baby bok choy and Thai basil (Curcumin: High, Omega-3: High).',
      snacks: 'Avocado and raw cacao silk mousse with fresh raspberries; steeped ginger-turmeric tea.'
    },
    sampleMealPlanSlug: '7-day-mediterranean-longevity-plan',
    recommendedRecipeIds: ['rec-57', 'rec-61', 'rec-56', 'rec-67', 'rec-4', 'rec-2', 'rec-65'],
    clinicalCitations: [
      'Calder PC. Omega-3 fatty acids and inflammatory processes: From molecules to man. Biochem Soc Trans. 2017.',
      'Daily JW, et al. Efficacy of Turmeric Extracts and Curcumin for Alleviating the Symptoms of Joint Arthritis: A Systematic Review and Meta-Analysis. J Med Food. 2016.'
    ],
    keyAdvice: [
      'Always add a crack of fresh black pepper whenever cooking with turmeric to boost curcumin absorption by 2,000%.',
      'Aim for a target of 30 different plant varieties per week to optimize your gut microbiome anti-inflammatory signaling.',
      'Avoid high-temperature charring when cooking meats; use gentle pan-poaching, steaming, or slow roasting.',
      'Keep a morning joint stiffness rating (1–10 scale) to track your dietary progress over 4 to 8 weeks.'
    ]
  }
];

export const getConditionDietBySlug = (slug: string): ConditionDiet | undefined => {
  return allConditionDiets.find((d) => d.slug === slug || d.id === slug);
};
