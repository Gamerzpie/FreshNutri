import { MealPlan } from '../types';

export const mealPlansPart1: MealPlan[] = [
  {
    id: 'mp-1',
    slug: '7-day-mediterranean-longevity-plan',
    title: '7-Day Mediterranean Longevity & Heart Health Meal Plan',
    subtitle: 'Rich in extra virgin olive oil, wild seafood, leafy greens, and ancient grains to lower systemic inflammation.',
    heroImage: '/src/assets/images/hero_mediterranean_bowl_1790701975731.jpg',
    durationDays: 7,
    dietType: 'Mediterranean',
    caloriesPerDay: 1850,
    tags: ['Heart-Healthy', 'Anti-Inflammatory', 'High-Fiber', 'Omega-3'],
    authorId: 'author-1',
    description: 'Inspired by the dietary patterns of Ikaria, Greece and Sardinia, Italy, this seven-day culinary protocol focuses on unrefined carbohydrates, cold-pressed olive oil, fresh aromatics, and wild seafood.',
    overview: 'Targeting 1,800 to 1,900 balanced calories with at least 38 grams of daily fiber and abundant polyphenols. Every dinner comes together in under 35 minutes.',
    prepNotes: [
      'Sunday Prep: Roast a double batch of chickpeas and prepare a container of lemon tahini dressing.',
      'Midweek Check: Wash and spin dry all salad greens; store between clean kitchen towels to maintain crispness.',
      'Freezer: Portion out salmon fillets the evening before cooking to thaw gently in the refrigerator.'
    ],
    shoppingList: [
      {
        category: 'Produce',
        items: [
          '4 bunches Lacinato kale',
          '3 Persian cucumbers',
          '2 pints cherry tomatoes',
          '3 ripe Hass avocados',
          '2 heads broccoli',
          '1 lb fresh asparagus',
          '2 bulbs fresh fennel',
          'Fresh mint, dill, and flat-leaf parsley',
          '4 Meyer lemons',
          '2 Honeycrisp apples'
        ]
      },
      {
        category: 'Proteins & Seafood',
        items: [
          '4 wild sockeye salmon fillets (6 oz each)',
          '4 Pacific cod fillets',
          '1.5 lbs extra-firm organic tofu',
          '1.5 lbs boneless chicken thighs',
          '1 dozen pasture-raised eggs'
        ]
      },
      {
        category: 'Grains & Pantry Staples',
        items: [
          '1 bag tri-color quinoa',
          '4 cans organic cannellini beans',
          '3 cans chickpeas',
          '1 jar pure sesame tahini',
          '1 bottle cold-pressed extra virgin olive oil',
          '1 jar non-pareil capers',
          'Kalamata olives'
        ]
      },
      {
        category: 'Dairy & Ferments',
        items: [
          '1 tub whole-milk plain Greek yogurt',
          '1 block Greek barrel-aged feta cheese',
          '1 wedge Parmigiano-Reggiano'
        ]
      }
    ],
    days: [
      {
        dayNumber: 1,
        dayName: 'Monday',
        breakfast: {
          recipeId: 'rec-3',
          title: 'Whipped Greek Yogurt Parfait with Chia Berry Compote',
          description: 'Greek yogurt with warm chia berry compote and toasted rolled oats.',
          calories: 340,
          prepTimeMinutes: 10
        },
        lunch: {
          recipeId: 'rec-1',
          title: 'Mediterranean Grain Bowl with Crispy Spiced Chickpeas',
          description: 'Fluffy quinoa, spiced chickpeas, cucumbers, and lemon tahini dressing.',
          calories: 495,
          prepTimeMinutes: 15
        },
        dinner: {
          recipeId: 'rec-2',
          title: 'Pan-Seared Wild Salmon with Meyer Lemon & Asparagus',
          description: 'Crisp skin salmon with caramelized lemon rounds and tender asparagus.',
          calories: 410,
          prepTimeMinutes: 22
        },
        snacks: [
          { title: 'Handful of raw walnuts & 1 sliced orange', calories: 210 },
          { title: 'Herb-steeped chamomile tea', calories: 0 }
        ],
        dailyCalories: 1855,
        dailyProtein: 98,
        dailyFiber: 42
      },
      {
        dayNumber: 2,
        dayName: 'Tuesday',
        breakfast: {
          recipeId: 'rec-13',
          title: 'Heirloom Tomato & Smashed Avocado Sourdough Tartine',
          description: 'Garlic-rubbed sourdough toast with mashed avocado and seeds.',
          calories: 380,
          prepTimeMinutes: 12
        },
        lunch: {
          recipeId: 'rec-6',
          title: 'Avocado & Shelled Edamame Green Goddess Crunch Salad',
          description: 'Shredded cabbage with edamame, cucumber, and herb yogurt dressing.',
          calories: 360,
          prepTimeMinutes: 15
        },
        dinner: {
          recipeId: 'rec-4',
          title: 'Tuscan White Bean & Cavolo Nero Soup with Rosemary Olive Oil',
          description: 'Comforting cannellini bean and kale soup with parmesan.',
          calories: 320,
          prepTimeMinutes: 45
        },
        snacks: [
          { title: '1 cup kefir with a pinch of ground cinnamon', calories: 140 },
          { title: 'Apple slices with almond butter', calories: 190 }
        ],
        dailyCalories: 1820,
        dailyProtein: 86,
        dailyFiber: 46
      },
      {
        dayNumber: 3,
        dayName: 'Wednesday',
        breakfast: {
          recipeId: 'rec-8',
          title: 'Slow-Cooker Steel-Cut Oats with Spiced Orchard Apples',
          description: 'Cinnamon-simmered oats with Honeycrisp apples and pecans.',
          calories: 310,
          prepTimeMinutes: 10
        },
        lunch: {
          recipeId: 'rec-4',
          title: 'Leftover Tuscan White Bean Soup with Sourdough Slice',
          description: 'Rewarmed stew with a slice of whole-grain sourdough toast.',
          calories: 440,
          prepTimeMinutes: 10
        },
        dinner: {
          recipeId: 'rec-9',
          title: 'Herb-Crusted Pacific Cod En Papillote with Kalamata Olives',
          description: 'Parchment baked cod with juicy cherry tomatoes and capers.',
          calories: 290,
          prepTimeMinutes: 30
        },
        snacks: [
          { title: 'Carrot sticks with 3 tbsp edamame hummus', calories: 160 },
          { title: 'Dark chocolate square (85% cacao)', calories: 90 }
        ],
        dailyCalories: 1840,
        dailyProtein: 92,
        dailyFiber: 40
      },
      {
        dayNumber: 4,
        dayName: 'Thursday',
        breakfast: {
          recipeId: 'rec-22',
          title: 'Baked Bell Pepper Egg Boats with Avocado Salsa',
          description: 'Sweet bell peppers baked with farm eggs and sharp white cheddar.',
          calories: 320,
          prepTimeMinutes: 25
        },
        lunch: {
          recipeId: 'rec-1',
          title: 'Mediterranean Grain Bowl (Batch Prepared)',
          description: 'Quinoa, chickpeas, cucumbers, and tahini drizzle.',
          calories: 495,
          prepTimeMinutes: 5
        },
        dinner: {
          recipeId: 'rec-5',
          title: 'Sheet-Pan Lemon-Herb Chicken Thighs with Rainbow Vegetables',
          description: 'Crisp chicken thighs roasted with gold potatoes and zucchini.',
          calories: 520,
          prepTimeMinutes: 45
        },
        snacks: [
          { title: 'Roasted pumpkin seeds (1/4 cup)', calories: 170 },
          { title: 'Fresh berries with mint', calories: 75 }
        ],
        dailyCalories: 1870,
        dailyProtein: 105,
        dailyFiber: 39
      },
      {
        dayNumber: 5,
        dayName: 'Friday',
        breakfast: {
          recipeId: 'rec-3',
          title: 'Greek Yogurt Parfait with Fresh Berries and Walnuts',
          description: 'Strained yogurt with fresh blueberries and toasted seeds.',
          calories: 340,
          prepTimeMinutes: 10
        },
        lunch: {
          recipeId: 'rec-10',
          title: 'Shaved Fennel & Blood Orange Salad with Pomegranate',
          description: 'Crisp fennel, ruby oranges, avocado, and white balsamic.',
          calories: 220,
          prepTimeMinutes: 15
        },
        dinner: {
          recipeId: 'rec-16',
          title: 'Garlic Butter & Dill Shrimp with Sun-Dried Tomato Orzo',
          description: 'Skillet shrimp with whole-wheat orzo, spinach, and feta.',
          calories: 430,
          prepTimeMinutes: 28
        },
        snacks: [
          { title: 'Cottage cheese with cherry tomatoes & olive oil', calories: 180 },
          { title: 'Orange slices and raw pistachios', calories: 160 }
        ],
        dailyCalories: 1860,
        dailyProtein: 99,
        dailyFiber: 37
      },
      {
        dayNumber: 6,
        dayName: 'Saturday',
        breakfast: {
          recipeId: 'rec-39',
          title: 'Cinnamon & Wild Blueberry Baked Oatmeal',
          description: 'Warm baked oatmeal square with maple syrup and pecans.',
          calories: 290,
          prepTimeMinutes: 15
        },
        lunch: {
          recipeId: 'rec-28',
          title: 'Coastal Citrus-Cured Wild Shrimp Ceviche with Plantain Chips',
          description: 'Chilled wild shrimp in lime and grapefruit juice with avocado.',
          calories: 260,
          prepTimeMinutes: 20
        },
        dinner: {
          recipeId: 'rec-20',
          title: 'Whole Roasted Mediterranean Branzino with Herbs & Fennel',
          description: 'Crisp-skinned sea bass roasted over caramelized fennel wedges.',
          calories: 390,
          prepTimeMinutes: 35
        },
        snacks: [
          { title: 'Crispy roasted chickpeas (1/2 cup)', calories: 190 },
          { title: '1 sliced pear with raw honey drizzle', calories: 110 }
        ],
        dailyCalories: 1830,
        dailyProtein: 102,
        dailyFiber: 38
      },
      {
        dayNumber: 7,
        dayName: 'Sunday',
        breakfast: {
          recipeId: 'rec-13',
          title: 'Heirloom Tomato & Smashed Avocado Sourdough Tartine',
          description: 'Whole-grain sourdough toast with mashed avocado, seeds, and tomato.',
          calories: 380,
          prepTimeMinutes: 12
        },
        lunch: {
          recipeId: 'rec-31',
          title: 'Warm Quinoa, Massaged Lacinato Kale & Golden Raisin Salad',
          description: 'Massaged kale, warm quinoa, toasted walnuts, and cider dressing.',
          calories: 340,
          prepTimeMinutes: 20
        },
        dinner: {
          recipeId: 'rec-32',
          title: 'Light Roasted Eggplant Parmigiana with Basil & Fresh Mozzarella',
          description: 'Layers of roasted eggplant, San Marzano sauce, and melted cheese.',
          calories: 280,
          prepTimeMinutes: 50
        },
        snacks: [
          { title: 'Silky dark chocolate avocado mousse', calories: 240 },
          { title: 'Steeped fresh mint tea', calories: 0 }
        ],
        dailyCalories: 1810,
        dailyProtein: 88,
        dailyFiber: 44
      }
    ]
  },
  {
    id: 'mp-2',
    slug: '7-day-high-protein-metabolism-plan',
    title: '7-Day High-Protein Metabolic Fuel Plan',
    subtitle: 'Delivering 130g+ of daily bioavailable protein to preserve lean muscle tissue and support all-day satiety.',
    heroImage: '/src/assets/images/recipe_salmon_skillet_1790701994035.jpg',
    durationDays: 7,
    dietType: 'High-Protein',
    caloriesPerDay: 2050,
    tags: ['High-Protein', 'Metabolism', 'Satiety', 'Muscle Recovery'],
    authorId: 'author-2',
    description: 'Engineered by our clinical dietitians and culinary team to ensure every single meal hits the 30g+ leucine threshold required for optimal muscle protein synthesis.',
    overview: 'Targeting 2,000 to 2,100 calories with 130 to 145 grams of protein daily, drawn from wild fish, poultry, eggs, Greek yogurt, and legumes.',
    prepNotes: [
      'Batch Grill: Cook double the harissa chicken skewers and pork tenderloin on Sunday.',
      'Eggs: Boil a dozen eggs to soft-boiled stage (6.5 minutes) for instant grab-and-go snacks.',
      'Protein Base: Keep plain strained Greek yogurt and hemp hearts stocked in the pantry.'
    ],
    shoppingList: [
      {
        category: 'Proteins',
        items: [
          '2 lbs wild salmon fillets',
          '2 lbs chicken breast',
          '1.5 lbs grass-fed flank steak',
          '1.5 lbs pork tenderloin',
          '2 dozen pasture-raised eggs',
          '2 tubs organic plain Greek yogurt'
        ]
      },
      {
        category: 'Produce',
        items: [
          '4 bunches asparagus',
          '3 heads broccoli',
          '4 avocados',
          '2 lbs baby spinach',
          'Lemons and limes',
          'Bell peppers'
        ]
      },
      {
        category: 'Pantry',
        items: [
          'Hemp hearts',
          'Chia seeds',
          'Almonds and walnuts',
          'Extra virgin olive oil',
          'Black beans and chickpeas'
        ]
      }
    ],
    days: [
      {
        dayNumber: 1,
        dayName: 'Monday',
        breakfast: {
          recipeId: 'rec-22',
          title: 'Baked Bell Pepper Egg Boats with Avocado Salsa',
          description: 'Sweet bell peppers baked with 4 pasture-raised eggs and sharp cheddar.',
          calories: 320,
          prepTimeMinutes: 20
        },
        lunch: {
          recipeId: 'rec-6',
          title: 'Avocado & Shelled Edamame Green Goddess Salad with Grilled Chicken',
          description: 'High-protein crunch salad with edamame, chicken breast, and yogurt dressing.',
          calories: 490,
          prepTimeMinutes: 15
        },
        dinner: {
          recipeId: 'rec-2',
          title: 'Pan-Seared Wild Salmon with Meyer Lemon & Asparagus',
          description: 'Wild salmon fillet with tender asparagus and capers.',
          calories: 410,
          prepTimeMinutes: 22
        },
        snacks: [
          { title: '1 cup Greek yogurt with 2 tbsp hemp hearts', calories: 230 },
          { title: 'Hard-boiled egg with smoked paprika', calories: 80 }
        ],
        dailyCalories: 2040,
        dailyProtein: 142,
        dailyFiber: 34
      },
      {
        dayNumber: 2,
        dayName: 'Tuesday',
        breakfast: {
          recipeId: 'rec-17',
          title: 'Antioxidant Super-Berry & Spinach Protein Smoothie',
          description: 'Blueberries, baby spinach, avocado, and unflavored pea protein.',
          calories: 280,
          prepTimeMinutes: 5
        },
        lunch: {
          recipeId: 'rec-30',
          title: 'Harissa Marinated Chicken Skewers with Mint Labneh and Greens',
          description: 'Smoky grilled chicken skewers with thick yogurt sauce.',
          calories: 460,
          prepTimeMinutes: 15
        },
        dinner: {
          recipeId: 'rec-15',
          title: 'Grass-Fed Flank Steak with Herb Chimichurri & Charred Peppers',
          description: 'Flank steak sliced against the grain with fresh chimichurri.',
          calories: 460,
          prepTimeMinutes: 30
        },
        snacks: [
          { title: 'Edamame pods with flaky sea salt (1 cup)', calories: 190 },
          { title: 'Cottage cheese with cucumber slices', calories: 160 }
        ],
        dailyCalories: 2020,
        dailyProtein: 138,
        dailyFiber: 32
      },
      {
        dayNumber: 3,
        dayName: 'Wednesday',
        breakfast: {
          recipeId: 'rec-3',
          title: 'Whipped Greek Yogurt Parfait with Chia Compote',
          description: 'Whole-milk Greek yogurt with chia berry jam and seeds.',
          calories: 340,
          prepTimeMinutes: 10
        },
        lunch: {
          recipeId: 'rec-16',
          title: 'Garlic Butter & Dill Shrimp with Sun-Dried Tomato Orzo',
          description: 'Skillet shrimp with chickpea orzo and baby spinach.',
          calories: 430,
          prepTimeMinutes: 25
        },
        dinner: {
          recipeId: 'rec-37',
          title: 'Slow-Simmered Turkey Bolognese over Roasted Spaghetti Squash',
          description: 'Lean turkey Bolognese over tender roasted spaghetti squash.',
          calories: 360,
          prepTimeMinutes: 45
        },
        snacks: [
          { title: 'Handful of roasted almonds (1/4 cup)', calories: 170 },
          { title: '2 hard-boiled eggs with sea salt', calories: 150 }
        ],
        dailyCalories: 2010,
        dailyProtein: 135,
        dailyFiber: 33
      },
      {
        dayNumber: 4,
        dayName: 'Thursday',
        breakfast: {
          recipeId: 'rec-22',
          title: 'Baked Egg Boats with Cheddar & Avocado',
          description: 'Baked eggs in sweet peppers with fresh herbs.',
          calories: 320,
          prepTimeMinutes: 20
        },
        lunch: {
          recipeId: 'rec-36',
          title: 'Vibrant Edamame Hummus with Grilled Chicken & Warm Pita',
          description: 'Protein edamame hummus plate with grilled chicken strips.',
          calories: 450,
          prepTimeMinutes: 15
        },
        dinner: {
          recipeId: 'rec-5',
          title: 'Sheet-Pan Lemon-Herb Chicken Thighs with Rainbow Vegetables',
          description: 'Roast chicken thighs with zucchini, peppers, and potatoes.',
          calories: 520,
          prepTimeMinutes: 45
        },
        snacks: [
          { title: 'Greek yogurt cup with cinnamon and walnuts', calories: 210 },
          { title: 'Celery sticks with natural peanut butter', calories: 160 }
        ],
        dailyCalories: 2070,
        dailyProtein: 144,
        dailyFiber: 31
      },
      {
        dayNumber: 5,
        dayName: 'Friday',
        breakfast: {
          recipeId: 'rec-17',
          title: 'Super-Berry Spinach & Plant Protein Smoothie',
          description: 'Antioxidant berries, greens, and plant protein.',
          calories: 280,
          prepTimeMinutes: 5
        },
        lunch: {
          recipeId: 'rec-28',
          title: 'Wild Shrimp Ceviche with Avocado & Seed Crackers',
          description: 'Citrus poached shrimp with cucumber, avocado, and crackers.',
          calories: 380,
          prepTimeMinutes: 15
        },
        dinner: {
          recipeId: 'rec-40',
          title: 'Steamed Alaskan Black Cod in Ginger & Scallion Broth',
          description: 'Silky black cod with steamed baby bok choy.',
          calories: 380,
          prepTimeMinutes: 22
        },
        snacks: [
          { title: 'Shelled edamame with lemon juice (1 cup)', calories: 190 },
          { title: 'Dark chocolate avocado mousse cup', calories: 240 }
        ],
        dailyCalories: 2040,
        dailyProtein: 132,
        dailyFiber: 30
      },
      {
        dayNumber: 6,
        dayName: 'Saturday',
        breakfast: {
          recipeId: 'rec-3',
          title: 'Whipped Greek Yogurt with Pumpkin Seeds and Blueberries',
          description: 'Creamy yogurt topped with pumpkin seeds and fresh berries.',
          calories: 340,
          prepTimeMinutes: 10
        },
        lunch: {
          recipeId: 'rec-15',
          title: 'Leftover Flank Steak Salad with Chimichurri Dressing',
          description: 'Sliced grass-fed steak over baby arugula and cherry tomatoes.',
          calories: 420,
          prepTimeMinutes: 10
        },
        dinner: {
          recipeId: 'rec-34',
          title: 'Herb-Crusted Pork Tenderloin with Roasted Fennel & Apples',
          description: 'Seared lean tenderloin medallions with caramelized fennel.',
          calories: 340,
          prepTimeMinutes: 35
        },
        snacks: [
          { title: '2 scrambled eggs with chives on sourdough', calories: 280 },
          { title: 'Handful of roasted pistachios', calories: 160 }
        ],
        dailyCalories: 2060,
        dailyProtein: 141,
        dailyFiber: 28
      },
      {
        dayNumber: 7,
        dayName: 'Sunday',
        breakfast: {
          recipeId: 'rec-22',
          title: 'Egg & Bell Pepper Boats with Avocado Salsa',
          description: 'Warm baked eggs with melted cheese and fresh salsa.',
          calories: 320,
          prepTimeMinutes: 20
        },
        lunch: {
          recipeId: 'rec-12',
          title: 'Golden Ginger Turmeric Chicken & Rice Soup',
          description: 'Healing bone broth soup with shredded chicken breast.',
          calories: 390,
          prepTimeMinutes: 40
        },
        dinner: {
          recipeId: 'rec-2',
          title: 'Pan-Seared Salmon with Asparagus and Meyer Lemon',
          description: 'Crisp salmon fillet with garlic butter asparagus.',
          calories: 410,
          prepTimeMinutes: 22
        },
        snacks: [
          { title: 'Protein smoothie with berries and almond milk', calories: 240 },
          { title: 'Toasted pumpkin seeds with sea salt', calories: 150 }
        ],
        dailyCalories: 2030,
        dailyProtein: 140,
        dailyFiber: 29
      }
    ]
  },
  {
    id: 'mp-3',
    slug: '7-day-plant-forward-vegetarian-vitality-plan',
    title: '7-Day Plant-Forward Vegetarian Vitality Plan',
    subtitle: 'Vibrant, nutrient-complete meatless cooking celebrating whole legumes, ancient grains, and farmers market vegetables.',
    heroImage: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80',
    durationDays: 7,
    dietType: 'Vegetarian',
    caloriesPerDay: 1900,
    tags: ['Vegetarian', 'Plant-Based', 'High-Fiber', 'Prebiotic'],
    authorId: 'author-1',
    description: 'Proves that plant-based eating is rich, deeply satisfying, and provides complete amino acids without relying on ultra-processed meat analogues.',
    overview: 'Targeting 1,850 to 1,950 calories with 85 to 95 grams of pure plant protein and over 50 grams of dietary fiber each day.',
    prepNotes: [
      'Soak & Cook: Prepare red lentils, cannellini beans, and farro on Sunday afternoon.',
      'Sauces: Whisk up batches of green goddess dressing and lemon-tahini vinaigrette.',
      'Produce Prep: Cube squash and sweet potatoes; store in water in the fridge for fast roasting.'
    ],
    shoppingList: [
      {
        category: 'Produce',
        items: [
          '2 bunches dinosaur kale',
          '3 heads broccoli',
          '2 acorn squash',
          '2 Japanese sweet potatoes',
          'Baby spinach',
          'Avocados and lemons'
        ]
      },
      {
        category: 'Legumes & Tofu',
        items: [
          '2 packages organic extra-firm tofu',
          'Split red lentils',
          '4 cans chickpeas',
          '3 cans cannellini beans',
          'Shelled edamame'
        ]
      },
      {
        category: 'Grains & Pantry',
        items: [
          'Tri-color quinoa',
          'Buckwheat soba noodles',
          'Red lentil rotini',
          'Steel-cut oats',
          'Full-fat coconut milk'
        ]
      }
    ],
    days: [
      {
        dayNumber: 1,
        dayName: 'Monday',
        breakfast: {
          recipeId: 'rec-3',
          title: 'Greek Yogurt Parfait with Chia Berry Compote',
          description: 'Layered yogurt with chia jam and toasted seeds.',
          calories: 340,
          prepTimeMinutes: 10
        },
        lunch: {
          recipeId: 'rec-1',
          title: 'Mediterranean Grain Bowl with Crispy Spiced Chickpeas',
          description: 'Quinoa, chickpeas, cucumber, and creamy tahini.',
          calories: 495,
          prepTimeMinutes: 15
        },
        dinner: {
          recipeId: 'rec-7',
          title: 'Golden Coconut Dahl with Red Lentils & Roasted Sweet Potato',
          description: 'Fragrant turmeric and ginger red lentil curry with sweet potato.',
          calories: 420,
          prepTimeMinutes: 35
        },
        snacks: [
          { title: 'Handful of raw walnuts & 1 apple', calories: 220 },
          { title: 'Matcha green tea with unsweetened oat milk', calories: 60 }
        ],
        dailyCalories: 1895,
        dailyProtein: 88,
        dailyFiber: 52
      },
      {
        dayNumber: 2,
        dayName: 'Tuesday',
        breakfast: {
          recipeId: 'rec-8',
          title: 'Steel-Cut Oats with Spiced Orchard Apples',
          description: 'Overnight oats with cinnamon apples and pecans.',
          calories: 310,
          prepTimeMinutes: 10
        },
        lunch: {
          recipeId: 'rec-6',
          title: 'Avocado & Shelled Edamame Green Goddess Crunch Salad',
          description: 'Cabbage, edamame, and herb yogurt dressing.',
          calories: 360,
          prepTimeMinutes: 15
        },
        dinner: {
          recipeId: 'rec-14',
          title: 'Crispy Lemon-Herb Marinated Tofu with Roasted Broccoli',
          description: 'Crispy baked tofu cubes with garlicky broccoli florets.',
          calories: 340,
          prepTimeMinutes: 40
        },
        snacks: [
          { title: 'Dark chocolate avocado mousse', calories: 240 },
          { title: 'Carrot sticks with 3 tbsp edamame hummus', calories: 160 }
        ],
        dailyCalories: 1870,
        dailyProtein: 91,
        dailyFiber: 48
      },
      {
        dayNumber: 3,
        dayName: 'Wednesday',
        breakfast: {
          recipeId: 'rec-13',
          title: 'Heirloom Tomato & Smashed Avocado Sourdough Tartine',
          description: 'Toasted sourdough with avocado, tomato, and hemp dukkah.',
          calories: 380,
          prepTimeMinutes: 12
        },
        lunch: {
          recipeId: 'rec-19',
          title: 'Herb-Loaded Baked Falafel with Chopped Tahini Salad',
          description: 'Baked herb falafel with diced cucumbers and lemon tahini.',
          calories: 380,
          prepTimeMinutes: 20
        },
        dinner: {
          recipeId: 'rec-4',
          title: 'Tuscan White Bean & Cavolo Nero Soup with Rosemary Olive Oil',
          description: 'Cannellini beans and kale simmered with parmesan rind.',
          calories: 320,
          prepTimeMinutes: 45
        },
        snacks: [
          { title: '1 cup plain Greek yogurt with fresh berries', calories: 190 },
          { title: 'Toasted pumpkin seeds (1/4 cup)', calories: 170 }
        ],
        dailyCalories: 1880,
        dailyProtein: 92,
        dailyFiber: 54
      },
      {
        dayNumber: 4,
        dayName: 'Thursday',
        breakfast: {
          recipeId: 'rec-22',
          title: 'Baked Bell Pepper Egg Boats with Avocado Salsa',
          description: 'Eggs baked in sweet bell peppers with sharp white cheddar.',
          calories: 320,
          prepTimeMinutes: 25
        },
        lunch: {
          recipeId: 'rec-21',
          title: 'Buckwheat Soba Noodles with Sesame Ginger Glazed Tofu',
          description: 'Chilled soba noodles with snap peas, tofu, and ginger dressing.',
          calories: 410,
          prepTimeMinutes: 20
        },
        dinner: {
          recipeId: 'rec-11',
          title: 'Smoky Sweet Potato & Black Bean Quinoa Chili',
          description: 'Hearty chili with fire-roasted tomatoes and sweet potatoes.',
          calories: 365,
          prepTimeMinutes: 45
        },
        snacks: [
          { title: 'Chia seed pudding with fresh mango', calories: 260 },
          { title: 'Steeped ginger herbal tea', calories: 0 }
        ],
        dailyCalories: 1910,
        dailyProtein: 89,
        dailyFiber: 51
      },
      {
        dayNumber: 5,
        dayName: 'Friday',
        breakfast: {
          recipeId: 'rec-39',
          title: 'Cinnamon & Wild Blueberry Baked Oatmeal',
          description: 'Oatmeal bake with maple syrup, blueberries, and toasted pecans.',
          calories: 290,
          prepTimeMinutes: 15
        },
        lunch: {
          recipeId: 'rec-27',
          title: 'Sprouted-Grain Quesadillas with Black Beans & Sweet Corn',
          description: 'Pan-crisped tortillas with black beans, corn, and avocado.',
          calories: 420,
          prepTimeMinutes: 15
        },
        dinner: {
          recipeId: 'rec-41',
          title: 'Roasted Butternut Squash & Crispy Sage Red Lentil Rotini',
          description: 'High-protein lentil pasta in silky butternut squash puree.',
          calories: 390,
          prepTimeMinutes: 35
        },
        snacks: [
          { title: 'Celery sticks with 2 tbsp almond butter', calories: 190 },
          { title: 'Cottage cheese with cracked black pepper', calories: 150 }
        ],
        dailyCalories: 1890,
        dailyProtein: 94,
        dailyFiber: 49
      },
      {
        dayNumber: 6,
        dayName: 'Saturday',
        breakfast: {
          recipeId: 'rec-17',
          title: 'Super-Berry Spinach & Plant Protein Smoothie',
          description: 'Antioxidant berries, baby spinach, avocado, and protein.',
          calories: 280,
          prepTimeMinutes: 5
        },
        lunch: {
          recipeId: 'rec-31',
          title: 'Warm Quinoa, Massaged Lacinato Kale & Golden Raisin Salad',
          description: 'Tender massaged kale with warm quinoa, walnuts, and cider dressing.',
          calories: 340,
          prepTimeMinutes: 20
        },
        dinner: {
          recipeId: 'rec-32',
          title: 'Light Roasted Eggplant Parmigiana with Basil & Mozzarella',
          description: 'Roasted eggplant rounds layered with tomato sauce and mozzarella.',
          calories: 280,
          prepTimeMinutes: 50
        },
        snacks: [
          { title: 'Edamame hummus with warm whole-wheat pita', calories: 290 },
          { title: 'Dark chocolate square & chamomile tea', calories: 90 }
        ],
        dailyCalories: 1880,
        dailyProtein: 86,
        dailyFiber: 47
      },
      {
        dayNumber: 7,
        dayName: 'Sunday',
        breakfast: {
          recipeId: 'rec-35',
          title: 'Coconut Milk Chia Seed Pudding with Fresh Mango',
          description: 'Overnight soaked chia pudding with sweet mango chunks.',
          calories: 260,
          prepTimeMinutes: 5
        },
        lunch: {
          recipeId: 'rec-36',
          title: 'Vibrant Edamame & Avocado Hummus with Warm Pita & Olives',
          description: 'Green edamame hummus plate with warm pita and cucumbers.',
          calories: 390,
          prepTimeMinutes: 15
        },
        dinner: {
          recipeId: 'rec-26',
          title: 'Cranberry & Wild Rice Stuffed Roasted Acorn Squash',
          description: 'Tender squash halves filled with wild rice, quinoa, and pecans.',
          calories: 330,
          prepTimeMinutes: 45
        },
        snacks: [
          { title: 'Greek yogurt parfait with blueberries', calories: 340 },
          { title: 'Toasted pumpkin seeds', calories: 170 }
        ],
        dailyCalories: 1910,
        dailyProtein: 87,
        dailyFiber: 50
      }
    ]
  },
  {
    id: 'mp-4',
    slug: '7-day-heart-healthy-low-sodium-plan',
    title: '7-Day Heart-Healthy & Low-Sodium DASH Protocol',
    subtitle: 'Strictly limited to under 1,500mg sodium daily while maximizing potassium, magnesium, and marine omega-3s.',
    heroImage: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=1200&q=80',
    durationDays: 7,
    dietType: 'Heart-Healthy',
    caloriesPerDay: 1800,
    tags: ['Low-Sodium', 'Cardiovascular', 'Potassium-Rich', 'Heart-Healthy'],
    authorId: 'author-3',
    description: 'Designed in accordance with cardiovascular and DASH clinical guidelines. Features ample potassium from avocados, sweet potatoes, and leafy greens to counteract vascular stiffness.',
    overview: 'Targeting 1,750 to 1,850 calories with daily sodium capped below 1,450mg, potassium exceeding 4,000mg, and zero trans fats.',
    prepNotes: [
      'Citrus Finish: Use fresh lemon zest and herbal vinegars to season dishes without touching the salt shaker.',
      'Beans: Always rinse canned beans under cold running water for 90 seconds to remove up to 40% of canning sodium.',
      'Broth: Use only no-salt-added homemade or commercial low-sodium vegetable broths.'
    ],
    shoppingList: [
      {
        category: 'Produce',
        items: [
          'Sweet potatoes',
          'Avocados',
          'Fresh spinach',
          'Broccoli',
          'Meyer lemons',
          'Blood oranges',
          'Fresh rosemary and dill'
        ]
      },
      {
        category: 'Proteins & Seafood',
        items: [
          'Wild Pacific salmon',
          'Pacific cod fillets',
          'Organic chicken breast',
          'Pasture-raised eggs'
        ]
      },
      {
        category: 'Pantry',
        items: [
          'Rolled oats',
          'Dry lentils',
          'Extra virgin olive oil',
          'Raw walnuts and pumpkin seeds',
          'No-salt-added crushed tomatoes'
        ]
      }
    ],
    days: [
      {
        dayNumber: 1,
        dayName: 'Monday',
        breakfast: {
          recipeId: 'rec-8',
          title: 'Steel-Cut Oats with Spiced Orchard Apples & Walnuts',
          description: 'Cinnamon oats with fresh diced Honeycrisp apples and raw walnuts.',
          calories: 310,
          prepTimeMinutes: 10
        },
        lunch: {
          recipeId: 'rec-10',
          title: 'Shaved Fennel & Blood Orange Salad with Pomegranate',
          description: 'Sodium-free salad with crisp fennel, citrus, and heart-healthy avocado.',
          calories: 220,
          prepTimeMinutes: 15
        },
        dinner: {
          recipeId: 'rec-2',
          title: 'Pan-Seared Salmon with Asparagus (No-Added-Salt)',
          description: 'Wild salmon seared with garlic, lemon slices, and fresh dill.',
          calories: 400,
          prepTimeMinutes: 20
        },
        snacks: [
          { title: '1 medium banana with 1 tbsp unsalted almond butter', calories: 200 },
          { title: 'Chamomile tea with lemon slice', calories: 0 }
        ],
        dailyCalories: 1780,
        dailyProtein: 86,
        dailyFiber: 41
      },
      {
        dayNumber: 2,
        dayName: 'Tuesday',
        breakfast: {
          recipeId: 'rec-3',
          title: 'Greek Yogurt Parfait with Chia Berry Compote',
          description: 'Plain yogurt with chia berry jam and unsalted toasted oats.',
          calories: 340,
          prepTimeMinutes: 10
        },
        lunch: {
          recipeId: 'rec-1',
          title: 'Mediterranean Grain Bowl with Rinsed Chickpeas',
          description: 'Tri-color quinoa, chickpeas, cucumber ribbons, and lemon tahini.',
          calories: 495,
          prepTimeMinutes: 15
        },
        dinner: {
          recipeId: 'rec-9',
          title: 'Herb-Crusted Pacific Cod En Papillote',
          description: 'Delicate cod baked in parchment with cherry tomatoes and oregano.',
          calories: 280,
          prepTimeMinutes: 30
        },
        snacks: [
          { title: 'Unsalted raw walnuts (1/4 cup)', calories: 190 },
          { title: 'Fresh orange slices', calories: 80 }
        ],
        dailyCalories: 1810,
        dailyProtein: 92,
        dailyFiber: 43
      },
      {
        dayNumber: 3,
        dayName: 'Wednesday',
        breakfast: {
          recipeId: 'rec-13',
          title: 'Heirloom Tomato & Smashed Avocado Sourdough Tartine',
          description: 'Sourdough toast rubbed with garlic, mashed avocado, and tomatoes.',
          calories: 380,
          prepTimeMinutes: 12
        },
        lunch: {
          recipeId: 'rec-6',
          title: 'Avocado & Shelled Edamame Green Goddess Salad',
          description: 'Shredded cabbage with edamame, cucumber, and fresh herb dressing.',
          calories: 360,
          prepTimeMinutes: 15
        },
        dinner: {
          recipeId: 'rec-7',
          title: 'Golden Coconut Dahl with Red Lentils & Sweet Potato',
          description: 'Potassium-dense red lentil curry with sweet potato and fresh ginger.',
          calories: 420,
          prepTimeMinutes: 35
        },
        snacks: [
          { title: 'Chia seed pudding with fresh berries', calories: 220 },
          { title: 'Hibiscus tea (natural blood pressure support)', calories: 0 }
        ],
        dailyCalories: 1800,
        dailyProtein: 84,
        dailyFiber: 46
      },
      {
        dayNumber: 4,
        dayName: 'Thursday',
        breakfast: {
          recipeId: 'rec-39',
          title: 'Cinnamon & Wild Blueberry Baked Oatmeal',
          description: 'Baked oats with unsweetened almond milk and wild blueberries.',
          calories: 290,
          prepTimeMinutes: 15
        },
        lunch: {
          recipeId: 'rec-31',
          title: 'Massaged Lacinato Kale & Quinoa Salad',
          description: 'Massaged kale, warm quinoa, toasted walnuts, and cider dressing.',
          calories: 340,
          prepTimeMinutes: 15
        },
        dinner: {
          recipeId: 'rec-40',
          title: 'Steamed Alaskan Black Cod in Ginger Broth',
          description: 'Silky cod steamed with ginger matchsticks and baby bok choy.',
          calories: 380,
          prepTimeMinutes: 20
        },
        snacks: [
          { title: 'Sliced Honeycrisp apple with raw pumpkin seeds', calories: 210 },
          { title: 'Plain kefir with ground flax', calories: 150 }
        ],
        dailyCalories: 1790,
        dailyProtein: 89,
        dailyFiber: 42
      },
      {
        dayNumber: 5,
        dayName: 'Friday',
        breakfast: {
          recipeId: 'rec-17',
          title: 'Super-Berry Spinach & Plant Protein Smoothie',
          description: 'Antioxidant berries, potassium-rich spinach, and avocado.',
          calories: 280,
          prepTimeMinutes: 5
        },
        lunch: {
          recipeId: 'rec-1',
          title: 'Mediterranean Grain Bowl with Crispy Chickpeas',
          description: 'Quinoa, chickpeas, cucumbers, and tahini drizzle.',
          calories: 495,
          prepTimeMinutes: 10
        },
        dinner: {
          recipeId: 'rec-5',
          title: 'Sheet-Pan Lemon-Herb Chicken Thighs with Vegetables',
          description: 'Chicken roasted with potatoes, zucchini, and oregano.',
          calories: 510,
          prepTimeMinutes: 45
        },
        snacks: [
          { title: 'Dark chocolate avocado mousse cup', calories: 240 },
          { title: 'Cucumber slices with lime juice', calories: 40 }
        ],
        dailyCalories: 1830,
        dailyProtein: 98,
        dailyFiber: 40
      },
      {
        dayNumber: 6,
        dayName: 'Saturday',
        breakfast: {
          recipeId: 'rec-3',
          title: 'Greek Yogurt Parfait with Chia Seed Compote',
          description: 'Yogurt with wild blueberry compote and raw pecans.',
          calories: 340,
          prepTimeMinutes: 10
        },
        lunch: {
          recipeId: 'rec-38',
          title: 'Smashed Asian Cucumber Salad with Steamed Tofu Medallions',
          description: 'Crisp smashed cucumbers with sesame oil and ginger tofu.',
          calories: 310,
          prepTimeMinutes: 15
        },
        dinner: {
          recipeId: 'rec-20',
          title: 'Whole Roasted Mediterranean Branzino with Herbs & Fennel',
          description: 'Tender branzino roasted over sliced fennel wedges.',
          calories: 390,
          prepTimeMinutes: 35
        },
        snacks: [
          { title: 'Handful of unsalted pistachios', calories: 170 },
          { title: 'Steeped peppermint tea', calories: 0 }
        ],
        dailyCalories: 1780,
        dailyProtein: 94,
        dailyFiber: 38
      },
      {
        dayNumber: 7,
        dayName: 'Sunday',
        breakfast: {
          recipeId: 'rec-8',
          title: 'Steel-Cut Oats with Orchard Apples & Cinnamon',
          description: 'Warm steel-cut oats with diced apples and pecans.',
          calories: 310,
          prepTimeMinutes: 10
        },
        lunch: {
          recipeId: 'rec-42',
          title: 'Peppery Watercress, Pink Grapefruit & Avocado Salad',
          description: 'Fresh watercress with ruby grapefruit and avocado.',
          calories: 210,
          prepTimeMinutes: 12
        },
        dinner: {
          recipeId: 'rec-4',
          title: 'Tuscan White Bean & Cavolo Nero Soup (Low-Sodium)',
          description: 'Cannellini beans and kale simmered in herb vegetable broth.',
          calories: 320,
          prepTimeMinutes: 45
        },
        snacks: [
          { title: 'Fresh cantaloupe slices with lime', calories: 120 },
          { title: '1 cup low-fat cottage cheese with black pepper', calories: 160 }
        ],
        dailyCalories: 1760,
        dailyProtein: 86,
        dailyFiber: 44
      }
    ]
  },
  {
    id: 'mp-5',
    slug: '7-day-anti-inflammatory-whole-foods-plan',
    title: '7-Day Anti-Inflammatory Whole Foods Reset',
    subtitle: 'Infused with polyphenol-dense herbs, wild turmeric, marine omega-3s, and rainbow antioxidant plants.',
    heroImage: '/src/assets/images/editorial_fresh_market_1790702018266.jpg',
    durationDays: 7,
    dietType: 'Anti-Inflammatory',
    caloriesPerDay: 1850,
    tags: ['Anti-Inflammatory', 'Antioxidants', 'Gut Health', 'Turmeric'],
    authorId: 'author-1',
    description: 'A deeply restorative dietary reset designed to extinguish low-grade systemic inflammation through culinary medicine principles: pairing curcumin with piperine, dark berries with healthy lipids, and prebiotic fibers with cruciferous indoles.',
    overview: '1,800 to 1,900 nutrient-packed calories with 45g+ fiber and powerful botanical compounds.',
    prepNotes: [
      'Turmeric Golden Broth: Simmer ginger and turmeric roots in bone broth on Sunday.',
      'Greens: Store watercress and kale in sealed glass containers with dry cloths.',
      'Seeds: Blend a jar of pumpkin, chia, and hemp seeds for effortless daily topping.'
    ],
    shoppingList: [
      {
        category: 'Produce',
        items: [
          'Fresh turmeric and ginger root',
          'Wild blueberries',
          'Lacinato kale',
          'Watercress',
          'Avocados',
          'Tomatillos'
        ]
      },
      {
        category: 'Proteins & Seafood',
        items: [
          'Wild Alaskan sockeye salmon',
          'Alaskan black cod',
          'Extra-firm organic tofu',
          'Pasture-raised bone broth'
        ]
      },
      {
        category: 'Pantry',
        items: [
          'Extra virgin olive oil',
          'Raw cacao powder',
          'Chia seeds and hemp hearts',
          'Tri-color quinoa',
          'Red lentils'
        ]
      }
    ],
    days: [
      {
        dayNumber: 1,
        dayName: 'Monday',
        breakfast: {
          recipeId: 'rec-3',
          title: 'Greek Yogurt Parfait with Chia Berry Compote',
          description: 'Whipped Greek yogurt layered with wild blueberry chia reduction.',
          calories: 340,
          prepTimeMinutes: 10
        },
        lunch: {
          recipeId: 'rec-1',
          title: 'Mediterranean Grain Bowl with Crispy Spiced Chickpeas',
          description: 'Quinoa, chickpeas, avocado, and turmeric-tahini dressing.',
          calories: 495,
          prepTimeMinutes: 15
        },
        dinner: {
          recipeId: 'rec-2',
          title: 'Pan-Seared Wild Salmon with Meyer Lemon & Asparagus',
          description: 'Wild salmon rich in marine omega-3s with tender asparagus.',
          calories: 410,
          prepTimeMinutes: 22
        },
        snacks: [
          { title: 'Dark chocolate avocado mousse with sea salt', calories: 240 },
          { title: 'Golden turmeric ginger tea with black pepper', calories: 0 }
        ],
        dailyCalories: 1840,
        dailyProtein: 96,
        dailyFiber: 43
      },
      {
        dayNumber: 2,
        dayName: 'Tuesday',
        breakfast: {
          recipeId: 'rec-17',
          title: 'Antioxidant Super-Berry & Spinach Power Smoothie',
          description: 'Wild berries, baby spinach, avocado, and pea protein.',
          calories: 280,
          prepTimeMinutes: 5
        },
        lunch: {
          recipeId: 'rec-6',
          title: 'Avocado & Shelled Edamame Green Goddess Salad',
          description: 'Cruciferous cabbage with edamame and fresh herb dressing.',
          calories: 360,
          prepTimeMinutes: 15
        },
        dinner: {
          recipeId: 'rec-12',
          title: 'Golden Ginger Turmeric Chicken & Rice Soup',
          description: 'Simmered bone broth with fresh ginger, turmeric, and chicken.',
          calories: 390,
          prepTimeMinutes: 40
        },
        snacks: [
          { title: 'Toasted pumpkin seeds with sea salt', calories: 170 },
          { title: 'Sliced Honeycrisp apple with cinnamon', calories: 95 }
        ],
        dailyCalories: 1820,
        dailyProtein: 98,
        dailyFiber: 39
      },
      {
        dayNumber: 3,
        dayName: 'Wednesday',
        breakfast: {
          recipeId: 'rec-13',
          title: 'Heirloom Tomato & Smashed Avocado Sourdough Tartine',
          description: 'Whole-grain sourdough toast with avocado and hemp dukkah.',
          calories: 380,
          prepTimeMinutes: 12
        },
        lunch: {
          recipeId: 'rec-4',
          title: 'Tuscan White Bean & Cavolo Nero Soup with Olive Oil',
          description: 'Cannellini beans and kale simmered with extra virgin olive oil.',
          calories: 320,
          prepTimeMinutes: 35
        },
        dinner: {
          recipeId: 'rec-9',
          title: 'Herb-Crusted Pacific Cod En Papillote with Olives',
          description: 'Tender cod baked in parchment with cherry tomatoes and capers.',
          calories: 290,
          prepTimeMinutes: 30
        },
        snacks: [
          { title: '1 cup plain kefir with wild blueberries', calories: 180 },
          { title: 'Raw walnuts (1/4 cup)', calories: 190 }
        ],
        dailyCalories: 1830,
        dailyProtein: 92,
        dailyFiber: 45
      },
      {
        dayNumber: 4,
        dayName: 'Thursday',
        breakfast: {
          recipeId: 'rec-29',
          title: 'Golden Turmeric & Wild Blueberry Almond Flour Muffin',
          description: 'Grain-free muffin with turmeric, blueberries, and eggs.',
          calories: 220,
          prepTimeMinutes: 10
        },
        lunch: {
          recipeId: 'rec-21',
          title: 'Buckwheat Soba Noodles with Sesame Ginger Glazed Tofu',
          description: 'Buckwheat noodles rich in rutin with crispy ginger tofu.',
          calories: 410,
          prepTimeMinutes: 20
        },
        dinner: {
          recipeId: 'rec-7',
          title: 'Golden Coconut Dahl with Red Lentils & Roasted Sweet Potato',
          description: 'Anti-inflammatory turmeric dahl with sweet potato cubes.',
          calories: 420,
          prepTimeMinutes: 35
        },
        snacks: [
          { title: 'Chia seed pudding with fresh mango', calories: 260 },
          { title: 'Steeped holy basil (tulsi) tea', calories: 0 }
        ],
        dailyCalories: 1850,
        dailyProtein: 86,
        dailyFiber: 48
      },
      {
        dayNumber: 5,
        dayName: 'Friday',
        breakfast: {
          recipeId: 'rec-3',
          title: 'Greek Yogurt Parfait with Chia Jam and Seeds',
          description: 'High-protein strained yogurt with chia berry reduction.',
          calories: 340,
          prepTimeMinutes: 10
        },
        lunch: {
          recipeId: 'rec-42',
          title: 'Peppery Watercress, Pink Grapefruit & Avocado Salad',
          description: 'Watercress packed with glucosinolates, grapefruit, and avocado.',
          calories: 210,
          prepTimeMinutes: 12
        },
        dinner: {
          recipeId: 'rec-40',
          title: 'Steamed Alaskan Black Cod in Ginger, Scallion & Tamari Broth',
          description: 'Omega-3 rich sablefish steamed with ginger and bok choy.',
          calories: 380,
          prepTimeMinutes: 22
        },
        snacks: [
          { title: 'Edamame hummus with sliced Persian cucumbers', calories: 190 },
          { title: 'Dark chocolate square (85% cacao)', calories: 90 }
        ],
        dailyCalories: 1820,
        dailyProtein: 94,
        dailyFiber: 41
      },
      {
        dayNumber: 6,
        dayName: 'Saturday',
        breakfast: {
          recipeId: 'rec-39',
          title: 'Cinnamon & Wild Blueberry Baked Oatmeal',
          description: 'Baked oats with pecans and antioxidant berries.',
          calories: 290,
          prepTimeMinutes: 15
        },
        lunch: {
          recipeId: 'rec-28',
          title: 'Coastal Citrus-Cured Wild Shrimp Ceviche with Avocado',
          description: 'Wild shrimp marinated in fresh citrus juice with avocado.',
          calories: 260,
          prepTimeMinutes: 20
        },
        dinner: {
          recipeId: 'rec-14',
          title: 'Crispy Lemon-Herb Tofu with Roasted Broccoli & Almonds',
          description: 'Marinated tofu with broccoli florets and toasted almonds.',
          calories: 340,
          prepTimeMinutes: 40
        },
        snacks: [
          { title: '1 cup bone broth with grated ginger', calories: 80 },
          { title: 'Apple slices with raw almond butter', calories: 200 }
        ],
        dailyCalories: 1810,
        dailyProtein: 92,
        dailyFiber: 44
      },
      {
        dayNumber: 7,
        dayName: 'Sunday',
        breakfast: {
          recipeId: 'rec-13',
          title: 'Heirloom Tomato & Smashed Avocado Tartine',
          description: 'Sourdough with ripe avocado, tomato slices, and hemp seeds.',
          calories: 380,
          prepTimeMinutes: 12
        },
        lunch: {
          recipeId: 'rec-31',
          title: 'Warm Quinoa, Massaged Lacinato Kale & Golden Raisin Salad',
          description: 'Tender kale with warm quinoa, walnuts, and cider dressing.',
          calories: 340,
          prepTimeMinutes: 20
        },
        dinner: {
          recipeId: 'rec-20',
          title: 'Whole Roasted Mediterranean Branzino with Herbs & Fennel',
          description: 'Fresh sea bass roasted with oregano and caramelized fennel.',
          calories: 390,
          prepTimeMinutes: 35
        },
        snacks: [
          { title: 'Silky dark chocolate avocado mousse', calories: 240 },
          { title: 'Steeped chamomile lavender tisane', calories: 0 }
        ],
        dailyCalories: 1840,
        dailyProtein: 90,
        dailyFiber: 46
      }
    ]
  }
];
