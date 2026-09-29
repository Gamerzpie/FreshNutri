import { MealPlan } from '../types';

export const mealPlansPart2: MealPlan[] = [
  {
    id: 'mp-6',
    slug: '7-day-quick-easy-30-minute-plan',
    title: '7-Day Quick & Easy 30-Minute Dinner Plan',
    subtitle: 'Streamlined weeknight cooking with maximum nutrient yield and minimal cleanup time.',
    heroImage: '/src/assets/images/recipe_salmon_skillet_1790701994035.jpg',
    durationDays: 7,
    dietType: 'Quick & Easy',
    caloriesPerDay: 1900,
    tags: ['Quick & Easy', 'Weeknight Dinners', 'Under 30 Mins', 'One-Pan'],
    authorId: 'author-2',
    description: 'Zero complicated culinary steps. Every dinner in this plan cooks in a single skillet, sheet pan, or bowl in 30 minutes or less, designed for busy professionals and weeknights.',
    overview: '1,850 to 1,950 daily calories featuring 20 to 30-minute recipes and minimal dishes.',
    prepNotes: [
      'Pre-Chopped Produce: Buy pre-washed greens and trimmed asparagus to shave 10 minutes off prep.',
      'One Pan Rule: Use your trusty 12-inch cast iron skillet or heavy rimmed sheet pan.',
      'Quick Starches: Keep microwavable organic quinoa pouches or precooked grains on standby.'
    ],
    shoppingList: [
      {
        category: 'Proteins',
        items: ['Wild salmon fillets', 'Large peeled wild shrimp', 'Flank steak', 'Boneless chicken breast', 'Eggs']
      },
      {
        category: 'Produce',
        items: ['Asparagus', 'Persian cucumbers', 'Baby spinach', 'Sweet mini peppers', 'Lemons', 'Avocados']
      },
      {
        category: 'Pantry',
        items: ['Chickpea orzo', 'Buckwheat soba', 'Capers', 'Extra virgin olive oil', 'Tamari']
      }
    ],
    days: [
      {
        dayNumber: 1,
        dayName: 'Monday',
        breakfast: {
          recipeId: 'rec-3',
          title: 'Greek Yogurt Parfait with Chia Jam',
          description: 'Whipped yogurt with quick warm berry compote.',
          calories: 340,
          prepTimeMinutes: 10
        },
        lunch: {
          recipeId: 'rec-6',
          title: 'Avocado & Edamame Green Goddess Crunch Salad',
          description: 'No-cook cabbage and edamame salad with herb yogurt dressing.',
          calories: 360,
          prepTimeMinutes: 15
        },
        dinner: {
          recipeId: 'rec-2',
          title: 'Pan-Seared Salmon with Asparagus (22 Mins)',
          description: 'Crispy skin salmon with lemon and tender asparagus.',
          calories: 410,
          prepTimeMinutes: 22
        },
        snacks: [
          { title: 'Handful of almonds and 1 orange', calories: 200 },
          { title: 'Edamame hummus with cucumber rounds', calories: 180 }
        ],
        dailyCalories: 1890,
        dailyProtein: 105,
        dailyFiber: 34
      },
      {
        dayNumber: 2,
        dayName: 'Tuesday',
        breakfast: {
          recipeId: 'rec-13',
          title: 'Heirloom Tomato & Smashed Avocado Sourdough Tartine',
          description: 'Toasted sourdough with seasoned avocado and sliced tomato.',
          calories: 380,
          prepTimeMinutes: 12
        },
        lunch: {
          recipeId: 'rec-1',
          title: 'Mediterranean Grain Bowl with Crispy Chickpeas',
          description: 'Quick quinoa bowl with chickpeas and lemon tahini.',
          calories: 495,
          prepTimeMinutes: 15
        },
        dinner: {
          recipeId: 'rec-16',
          title: 'Garlic Butter & Dill Shrimp with Orzo (25 Mins)',
          description: 'One-skillet shrimp with tender orzo, spinach, and feta.',
          calories: 430,
          prepTimeMinutes: 25
        },
        snacks: [
          { title: 'Cottage cheese with berries', calories: 170 },
          { title: 'Pumpkin seeds with sea salt', calories: 150 }
        ],
        dailyCalories: 1885,
        dailyProtein: 99,
        dailyFiber: 36
      },
      {
        dayNumber: 3,
        dayName: 'Wednesday',
        breakfast: {
          recipeId: 'rec-17',
          title: 'Antioxidant Super-Berry Power Smoothie (5 Mins)',
          description: 'Blended berries, spinach, avocado, and protein.',
          calories: 280,
          prepTimeMinutes: 5
        },
        lunch: {
          recipeId: 'rec-28',
          title: 'Wild Shrimp Ceviche with Avocado & Crisp Tostadas',
          description: 'Chilled citrus shrimp with cucumber and avocado.',
          calories: 340,
          prepTimeMinutes: 15
        },
        dinner: {
          recipeId: 'rec-15',
          title: 'Grilled Flank Steak with Chimichurri (25 Mins)',
          description: 'Quick-seared steak with fresh parsley chimichurri.',
          calories: 460,
          prepTimeMinutes: 25
        },
        snacks: [
          { title: 'Greek yogurt with honey and walnuts', calories: 230 },
          { title: 'Apple slices with cinnamon', calories: 95 }
        ],
        dailyCalories: 1870,
        dailyProtein: 112,
        dailyFiber: 31
      },
      {
        dayNumber: 4,
        dayName: 'Thursday',
        breakfast: {
          recipeId: 'rec-22',
          title: 'Baked Bell Pepper Egg Boats (25 Mins)',
          description: 'Oven-baked egg pepper boats with melted cheese.',
          calories: 320,
          prepTimeMinutes: 25
        },
        lunch: {
          recipeId: 'rec-27',
          title: 'Crispy Black Bean & Sweet Corn Quesadillas',
          description: 'Skillet quesadilla with mashed black beans and salsa.',
          calories: 420,
          prepTimeMinutes: 15
        },
        dinner: {
          recipeId: 'rec-21',
          title: 'Buckwheat Soba with Glazed Tofu (25 Mins)',
          description: 'Quick soba noodles with seared ginger tofu and snap peas.',
          calories: 410,
          prepTimeMinutes: 25
        },
        snacks: [
          { title: 'Dark chocolate avocado mousse', calories: 240 },
          { title: 'Toasted pistachios (1/4 cup)', calories: 160 }
        ],
        dailyCalories: 1910,
        dailyProtein: 95,
        dailyFiber: 38
      },
      {
        dayNumber: 5,
        dayName: 'Friday',
        breakfast: {
          recipeId: 'rec-3',
          title: 'Whipped Greek Yogurt Parfait',
          description: 'Yogurt with chia blueberry jam and rolled oats.',
          calories: 340,
          prepTimeMinutes: 10
        },
        lunch: {
          recipeId: 'rec-38',
          title: 'Smashed Asian Cucumber Salad with Tofu',
          description: 'Crushed cucumbers with sesame oil, tamari, and tofu.',
          calories: 320,
          prepTimeMinutes: 12
        },
        dinner: {
          recipeId: 'rec-40',
          title: 'Steamed Alaskan Black Cod in Ginger Broth (20 Mins)',
          description: 'Delicate cod steamed in minutes with ginger and bok choy.',
          calories: 380,
          prepTimeMinutes: 20
        },
        snacks: [
          { title: '1 sliced pear with almond butter', calories: 210 },
          { title: 'Edamame hummus with warm pita wedges', calories: 240 }
        ],
        dailyCalories: 1870,
        dailyProtein: 104,
        dailyFiber: 33
      },
      {
        dayNumber: 6,
        dayName: 'Saturday',
        breakfast: {
          recipeId: 'rec-13',
          title: 'Heirloom Tomato Avocado Sourdough Tartine',
          description: 'Sourdough toast with avocado, tomato, and hemp dukkah.',
          calories: 380,
          prepTimeMinutes: 12
        },
        lunch: {
          recipeId: 'rec-42',
          title: 'Peppery Watercress, Pink Grapefruit & Avocado Salad',
          description: 'No-cook salad with watercress, grapefruit, and avocado.',
          calories: 210,
          prepTimeMinutes: 12
        },
        dinner: {
          recipeId: 'rec-30',
          title: 'Grilled Harissa Chicken Skewers with Mint Labneh',
          description: 'Fast-cooking skewered chicken breast with cool yogurt.',
          calories: 440,
          prepTimeMinutes: 25
        },
        snacks: [
          { title: 'Cottage cheese with pineapple chunks', calories: 180 },
          { title: 'Toasted pumpkin seeds', calories: 160 }
        ],
        dailyCalories: 1860,
        dailyProtein: 110,
        dailyFiber: 32
      },
      {
        dayNumber: 7,
        dayName: 'Sunday',
        breakfast: {
          recipeId: 'rec-17',
          title: 'Antioxidant Super-Berry Power Smoothie',
          description: 'Quick morning smoothie with berries, greens, and avocado.',
          calories: 280,
          prepTimeMinutes: 5
        },
        lunch: {
          recipeId: 'rec-6',
          title: 'Avocado & Edamame Green Goddess Crunch Salad',
          description: 'Crunchy cabbage and edamame with yogurt herb dressing.',
          calories: 360,
          prepTimeMinutes: 15
        },
        dinner: {
          recipeId: 'rec-2',
          title: 'Pan-Seared Wild Salmon with Lemon & Asparagus',
          description: 'Crisp salmon fillet with garlic butter asparagus.',
          calories: 410,
          prepTimeMinutes: 22
        },
        snacks: [
          { title: 'Greek yogurt with raw honey & walnuts', calories: 230 },
          { title: 'Dark chocolate square', calories: 90 }
        ],
        dailyCalories: 1850,
        dailyProtein: 108,
        dailyFiber: 34
      }
    ]
  },
  {
    id: 'mp-7',
    slug: '7-day-sunday-batch-meal-prep-plan',
    title: '7-Day Sunday Batch-Cook & Meal-Prep Plan',
    subtitle: 'Invest two relaxing hours in the kitchen on Sunday to enjoy grab-and-go nourishing meals all week long.',
    heroImage: '/src/assets/images/hero_mediterranean_bowl_1790701975731.jpg',
    durationDays: 7,
    dietType: 'Meal-Prep',
    caloriesPerDay: 1950,
    tags: ['Meal Prep', 'Batch Cooking', 'Organized Living', 'Time Saving'],
    authorId: 'author-5',
    description: 'Designed around our modular batch framework. Cook two versatile grains, two clean proteins, and one large pot of soup on Sunday, then assemble diverse meals in 5 minutes throughout the week.',
    overview: '1,900 to 2,000 calories with zero mid-week cooking stress.',
    prepNotes: [
      'Sunday 2-Hour Plan: Simmer Tuscan white bean soup; roast chicken thighs and chickpeas simultaneously on two oven racks; bake blueberry oatmeal.',
      'Storage: Pack lunches into glass containers with snap lids; keep dressings in separate small jars.'
    ],
    shoppingList: [
      {
        category: 'Proteins',
        items: ['3 lbs bone-in chicken thighs', '1 lb wild salmon', 'Canned cannellini beans', 'Canned chickpeas', 'Eggs']
      },
      {
        category: 'Produce',
        items: ['2 bunches dinosaur kale', 'Yukon gold potatoes', 'Zucchini', 'Bell peppers', 'Avocados', 'Carrots']
      },
      {
        category: 'Pantry',
        items: ['Tri-color quinoa', 'Rolled oats', 'Wild blueberries', 'Tahini', 'Olive oil']
      }
    ],
    days: [
      {
        dayNumber: 1,
        dayName: 'Monday',
        breakfast: {
          recipeId: 'rec-39',
          title: 'Reheated Wild Blueberry Baked Oatmeal Square',
          description: 'Pre-baked oatmeal square warmed with almond milk.',
          calories: 290,
          prepTimeMinutes: 5
        },
        lunch: {
          recipeId: 'rec-1',
          title: 'Mediterranean Grain Bowl with Crispy Chickpeas',
          description: 'Pre-portioned quinoa, chickpeas, cucumbers, and tahini.',
          calories: 495,
          prepTimeMinutes: 5
        },
        dinner: {
          recipeId: 'rec-5',
          title: 'Sheet-Pan Lemon-Herb Chicken Thighs with Vegetables',
          description: 'Juicy roasted chicken thigh with gold potatoes and zucchini.',
          calories: 520,
          prepTimeMinutes: 10
        },
        snacks: [
          { title: 'Greek yogurt with fresh berries', calories: 190 },
          { title: 'Roasted pumpkin seeds (1/4 cup)', calories: 170 }
        ],
        dailyCalories: 1940,
        dailyProtein: 108,
        dailyFiber: 42
      },
      {
        dayNumber: 2,
        dayName: 'Tuesday',
        breakfast: {
          recipeId: 'rec-39',
          title: 'Wild Blueberry Baked Oatmeal with Pecans',
          description: 'Warm oatmeal bake with toasted pecans.',
          calories: 290,
          prepTimeMinutes: 5
        },
        lunch: {
          recipeId: 'rec-4',
          title: 'Tuscan White Bean & Cavolo Nero Soup with Sourdough',
          description: 'Simmered cannellini bean and kale soup reheated in minutes.',
          calories: 420,
          prepTimeMinutes: 5
        },
        dinner: {
          recipeId: 'rec-1',
          title: 'Mediterranean Grain Bowl with Roasted Chicken Slices',
          description: 'Quinoa bowl topped with sliced Sunday roasted chicken.',
          calories: 540,
          prepTimeMinutes: 10
        },
        snacks: [
          { title: 'Apple slices with almond butter', calories: 200 },
          { title: 'Hard-boiled egg with sea salt', calories: 80 }
        ],
        dailyCalories: 1930,
        dailyProtein: 112,
        dailyFiber: 44
      },
      {
        dayNumber: 3,
        dayName: 'Wednesday',
        breakfast: {
          recipeId: 'rec-3',
          title: 'Greek Yogurt Parfait with Chia Berry Compote',
          description: 'Whipped yogurt layered with prepared chia compote.',
          calories: 340,
          prepTimeMinutes: 5
        },
        lunch: {
          recipeId: 'rec-4',
          title: 'Tuscan White Bean & Cavolo Nero Soup',
          description: 'Rich bean soup topped with fresh olive oil and pecorino.',
          calories: 320,
          prepTimeMinutes: 5
        },
        dinner: {
          recipeId: 'rec-11',
          title: 'Smoky Sweet Potato & Black Bean Quinoa Chili',
          description: 'Hearty slow-simmered bean and sweet potato chili.',
          calories: 420,
          prepTimeMinutes: 10
        },
        snacks: [
          { title: 'Chia pudding with fresh mango', calories: 260 },
          { title: 'Walnuts and dark chocolate square', calories: 180 }
        ],
        dailyCalories: 1920,
        dailyProtein: 98,
        dailyFiber: 48
      },
      {
        dayNumber: 4,
        dayName: 'Thursday',
        breakfast: {
          recipeId: 'rec-39',
          title: 'Wild Blueberry Baked Oatmeal Square',
          description: 'Warmed baked oatmeal with a splash of oat milk.',
          calories: 290,
          prepTimeMinutes: 5
        },
        lunch: {
          recipeId: 'rec-11',
          title: 'Smoky Sweet Potato & Black Bean Chili with Avocado',
          description: 'Batch chili served warm with sliced ripe avocado.',
          calories: 480,
          prepTimeMinutes: 5
        },
        dinner: {
          recipeId: 'rec-5',
          title: 'Sheet-Pan Chicken Thighs with Roasted Vegetables',
          description: 'Prepped chicken thighs with roasted zucchini and peppers.',
          calories: 520,
          prepTimeMinutes: 10
        },
        snacks: [
          { title: 'Carrot sticks with edamame hummus', calories: 170 },
          { title: 'Cottage cheese with black pepper', calories: 150 }
        ],
        dailyCalories: 1940,
        dailyProtein: 110,
        dailyFiber: 43
      },
      {
        dayNumber: 5,
        dayName: 'Friday',
        breakfast: {
          recipeId: 'rec-17',
          title: 'Super-Berry Spinach Power Smoothie',
          description: 'Quick morning smoothie with berries, greens, and protein.',
          calories: 280,
          prepTimeMinutes: 5
        },
        lunch: {
          recipeId: 'rec-31',
          title: 'Warm Quinoa, Massaged Kale & Golden Raisin Salad',
          description: 'Massaged kale with quinoa, walnuts, and cider dressing.',
          calories: 340,
          prepTimeMinutes: 10
        },
        dinner: {
          recipeId: 'rec-2',
          title: 'Pan-Seared Salmon with Asparagus (Fresh Friday Cook)',
          description: 'Quick fresh salmon sear to celebrate the weekend.',
          calories: 410,
          prepTimeMinutes: 20
        },
        snacks: [
          { title: 'Dark chocolate avocado mousse', calories: 240 },
          { title: 'Toasted pistachios (1/4 cup)', calories: 160 }
        ],
        dailyCalories: 1910,
        dailyProtein: 104,
        dailyFiber: 39
      },
      {
        dayNumber: 6,
        dayName: 'Saturday',
        breakfast: {
          recipeId: 'rec-13',
          title: 'Heirloom Tomato & Smashed Avocado Tartine',
          description: 'Sourdough toast with avocado, tomato, and hemp seeds.',
          calories: 380,
          prepTimeMinutes: 12
        },
        lunch: {
          recipeId: 'rec-27',
          title: 'Crispy Black Bean & Sweet Corn Quesadillas',
          description: 'Tortillas crisped with leftover black beans and corn.',
          calories: 420,
          prepTimeMinutes: 15
        },
        dinner: {
          recipeId: 'rec-37',
          title: 'Turkey Bolognese over Roasted Spaghetti Squash',
          description: 'Comforting turkey sauce over spaghetti squash strands.',
          calories: 360,
          prepTimeMinutes: 40
        },
        snacks: [
          { title: 'Greek yogurt parfait with blueberries', calories: 340 },
          { title: 'Handful of roasted pumpkin seeds', calories: 150 }
        ],
        dailyCalories: 1930,
        dailyProtein: 106,
        dailyFiber: 41
      },
      {
        dayNumber: 7,
        dayName: 'Sunday',
        breakfast: {
          recipeId: 'rec-22',
          title: 'Baked Bell Pepper Egg Boats with Avocado Salsa',
          description: 'Warm eggs baked in sweet peppers with fresh salsa.',
          calories: 320,
          prepTimeMinutes: 20
        },
        lunch: {
          recipeId: 'rec-37',
          title: 'Leftover Turkey Bolognese with Sourdough Bread',
          description: 'Warmed Bolognese with crusty sourdough slice.',
          calories: 430,
          prepTimeMinutes: 10
        },
        dinner: {
          recipeId: 'rec-7',
          title: 'Golden Coconut Dahl with Red Lentils & Sweet Potato',
          description: 'Fragrant turmeric and ginger dahl (makes Monday lunch).',
          calories: 420,
          prepTimeMinutes: 35
        },
        snacks: [
          { title: 'Apple slices with almond butter', calories: 200 },
          { title: 'Herbal chamomile tea', calories: 0 }
        ],
        dailyCalories: 1920,
        dailyProtein: 98,
        dailyFiber: 45
      }
    ]
  },
  {
    id: 'mp-8',
    slug: '7-day-budget-friendly-whole-foods-plan',
    title: '7-Day Budget-Friendly Whole-Foods Plan ($50/Week)',
    subtitle: 'Maximizing nutrition per dollar with humble agrarian staples: dried legumes, whole grains, eggs, and cabbage.',
    heroImage: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80',
    durationDays: 7,
    dietType: 'Budget-Friendly',
    caloriesPerDay: 1900,
    tags: ['Budget-Friendly', 'Affordable Health', 'Legumes', 'High-Fiber'],
    authorId: 'author-5',
    description: 'Eating a nutrient-dense whole-food diet does not require boutique grocery stores. Centered on affordable bulk staples like brown lentils, black beans, cabbage, sweet potatoes, and rolled oats.',
    overview: 'Complete nutritional balance for approximately $7 per day.',
    prepNotes: [
      'Bulk Buying: Buy dried lentils, rolled oats, and brown rice in bulk bins for dramatic savings.',
      'Frozen Produce: Frozen spinach and berries provide identical vitamins to fresh at half the price.'
    ],
    shoppingList: [
      {
        category: 'Produce',
        items: ['Green cabbage', 'Carrots', 'Yellow onions', 'Sweet potatoes', 'Bananas', 'Garlic']
      },
      {
        category: 'Proteins & Legumes',
        items: ['Split red lentils', 'Dry black beans', 'Canned chickpeas', 'Dozen eggs', 'Canned tuna in olive oil']
      },
      {
        category: 'Grains & Pantry',
        items: ['Rolled oats', 'Brown rice', 'Canned crushed tomatoes', 'Peanut butter', 'Olive oil']
      }
    ],
    days: [
      {
        dayNumber: 1,
        dayName: 'Monday',
        breakfast: {
          recipeId: 'rec-8',
          title: 'Steel-Cut Oats with Apples & Cinnamon',
          description: 'Warm simmered oats with diced apple and cinnamon.',
          calories: 310,
          prepTimeMinutes: 10
        },
        lunch: {
          recipeId: 'rec-1',
          title: 'Mediterranean Grain Bowl with Crispy Chickpeas',
          description: 'Quinoa, roasted spiced chickpeas, and tahini drizzle.',
          calories: 495,
          prepTimeMinutes: 15
        },
        dinner: {
          recipeId: 'rec-7',
          title: 'Golden Coconut Dahl with Red Lentils & Sweet Potato',
          description: 'Aromatic red lentil curry simmered with turmeric and ginger.',
          calories: 420,
          prepTimeMinutes: 35
        },
        snacks: [
          { title: 'Banana with 2 tbsp natural peanut butter', calories: 250 },
          { title: 'Steeped green tea', calories: 0 }
        ],
        dailyCalories: 1880,
        dailyProtein: 86,
        dailyFiber: 49
      },
      {
        dayNumber: 2,
        dayName: 'Tuesday',
        breakfast: {
          recipeId: 'rec-8',
          title: 'Oatmeal with Peanut Butter and Sliced Banana',
          description: 'Rolled oats with natural peanut butter and banana coins.',
          calories: 340,
          prepTimeMinutes: 10
        },
        lunch: {
          recipeId: 'rec-7',
          title: 'Leftover Golden Coconut Dahl over Brown Rice',
          description: 'Fragrant red lentil curry over steamed brown rice.',
          calories: 460,
          prepTimeMinutes: 5
        },
        dinner: {
          recipeId: 'rec-11',
          title: 'Smoky Sweet Potato & Black Bean Quinoa Chili',
          description: 'Hearty slow-simmered bean and sweet potato chili.',
          calories: 365,
          prepTimeMinutes: 45
        },
        snacks: [
          { title: '2 hard-boiled eggs with sea salt', calories: 150 },
          { title: 'Carrot sticks with lemon and salt', calories: 60 }
        ],
        dailyCalories: 1870,
        dailyProtein: 88,
        dailyFiber: 51
      },
      {
        dayNumber: 3,
        dayName: 'Wednesday',
        breakfast: {
          recipeId: 'rec-22',
          title: 'Baked Bell Pepper Egg Boats',
          description: 'Sweet bell peppers baked with farm eggs and cheddar.',
          calories: 320,
          prepTimeMinutes: 20
        },
        lunch: {
          recipeId: 'rec-11',
          title: 'Leftover Smoky Black Bean Chili with Corn Tortillas',
          description: 'Reheated chili served with warm corn tortillas.',
          calories: 460,
          prepTimeMinutes: 5
        },
        dinner: {
          recipeId: 'rec-4',
          title: 'Tuscan White Bean & Cavolo Nero Soup with Sourdough',
          description: 'Cannellini beans and kale simmered with garlic broth.',
          calories: 420,
          prepTimeMinutes: 40
        },
        snacks: [
          { title: 'Handful of roasted sunflower seeds', calories: 180 },
          { title: '1 orange', calories: 70 }
        ],
        dailyCalories: 1890,
        dailyProtein: 92,
        dailyFiber: 52
      },
      {
        dayNumber: 4,
        dayName: 'Thursday',
        breakfast: {
          recipeId: 'rec-8',
          title: 'Steel-Cut Oats with Apple and Cinnamon',
          description: 'Nutty oats simmered with apples and spices.',
          calories: 310,
          prepTimeMinutes: 10
        },
        lunch: {
          recipeId: 'rec-4',
          title: 'Tuscan White Bean Soup with Greens',
          description: 'Warm bean soup with a drizzle of olive oil.',
          calories: 320,
          prepTimeMinutes: 5
        },
        dinner: {
          recipeId: 'rec-27',
          title: 'Crispy Black Bean & Sweet Corn Quesadillas',
          description: 'Pan-crisped tortillas with seasoned black beans and cheese.',
          calories: 420,
          prepTimeMinutes: 15
        },
        snacks: [
          { title: 'Peanut butter toast on whole-wheat bread', calories: 260 },
          { title: 'Carrot sticks with hummus', calories: 150 }
        ],
        dailyCalories: 1890,
        dailyProtein: 89,
        dailyFiber: 47
      },
      {
        dayNumber: 5,
        dayName: 'Friday',
        breakfast: {
          recipeId: 'rec-22',
          title: 'Baked Egg Pepper Boats with Salsa',
          description: 'Baked eggs in peppers with cheddar and salsa.',
          calories: 320,
          prepTimeMinutes: 20
        },
        lunch: {
          recipeId: 'rec-27',
          title: 'Black Bean & Sweet Corn Quesadillas with Cabbage Slaw',
          description: 'Crispy quesadilla with crunchy cabbage vinegar slaw.',
          calories: 440,
          prepTimeMinutes: 15
        },
        dinner: {
          recipeId: 'rec-14',
          title: 'Crispy Lemon-Herb Tofu with Roasted Broccoli',
          description: 'Baked tofu cubes with roasted broccoli florets.',
          calories: 340,
          prepTimeMinutes: 35
        },
        snacks: [
          { title: 'Roasted chickpeas with cumin and salt', calories: 180 },
          { title: '1 sliced apple with cinnamon', calories: 95 }
        ],
        dailyCalories: 1870,
        dailyProtein: 94,
        dailyFiber: 45
      },
      {
        dayNumber: 6,
        dayName: 'Saturday',
        breakfast: {
          recipeId: 'rec-39',
          title: 'Cinnamon & Blueberry Baked Oatmeal',
          description: 'Baked oats with blueberries and sunflower seeds.',
          calories: 290,
          prepTimeMinutes: 15
        },
        lunch: {
          recipeId: 'rec-38',
          title: 'Smashed Asian Cucumber Salad with Crispy Tofu',
          description: 'Crisp smashed cucumbers with sesame oil and pan-seared tofu.',
          calories: 320,
          prepTimeMinutes: 12
        },
        dinner: {
          recipeId: 'rec-41',
          title: 'Roasted Butternut Squash Red Lentil Rotini',
          description: 'High-protein lentil pasta in silky roasted squash sauce.',
          calories: 390,
          prepTimeMinutes: 35
        },
        snacks: [
          { title: 'Peanut butter banana smoothie', calories: 280 },
          { title: 'Toasted pumpkin seeds', calories: 150 }
        ],
        dailyCalories: 1890,
        dailyProtein: 90,
        dailyFiber: 46
      },
      {
        dayNumber: 7,
        dayName: 'Sunday',
        breakfast: {
          recipeId: 'rec-8',
          title: 'Steel-Cut Oats with Apples and Peanut Butter',
          description: 'Hearty oats with warm apple compote and peanut butter.',
          calories: 360,
          prepTimeMinutes: 10
        },
        lunch: {
          recipeId: 'rec-41',
          title: 'Leftover Butternut Red Lentil Rotini',
          description: 'Warmed lentil pasta with fresh cracked pepper.',
          calories: 390,
          prepTimeMinutes: 5
        },
        dinner: {
          recipeId: 'rec-7',
          title: 'Golden Coconut Dahl with Red Lentils & Sweet Potato',
          description: 'Aromatic red lentil curry with sweet potato chunks.',
          calories: 420,
          prepTimeMinutes: 35
        },
        snacks: [
          { title: '2 hard-boiled eggs with paprika', calories: 150 },
          { title: 'Dark chocolate square', calories: 90 }
        ],
        dailyCalories: 1860,
        dailyProtein: 89,
        dailyFiber: 48
      }
    ]
  },
  {
    id: 'mp-9',
    slug: '7-day-busy-family-friendly-week-plan',
    title: '7-Day Busy Family-Friendly Week Plan',
    subtitle: 'Crowd-pleasing, vegetable-loaded meals that kids love and parents feel good about serving.',
    heroImage: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80',
    durationDays: 7,
    dietType: 'Family-Friendly',
    caloriesPerDay: 2000,
    tags: ['Family-Friendly', 'Kid-Approved', 'Crowd-Pleasing', 'Quick'],
    authorId: 'author-5',
    description: 'End dinner-table battles with meals designed around deconstructable plates, mild aromatic spices, and natural sweetness from roasted roots and sweet corn.',
    overview: 'Nutrient-rich, delicious dinners the whole family eagerly gathers around.',
    prepNotes: [
      'Deconstructable Serving: Serve bowls family-style so children can choose their preferred components.',
      'Double Batch: Always double the turkey Bolognese and baked oatmeal for zero-effort weekend snacks.'
    ],
    shoppingList: [
      {
        category: 'Proteins',
        items: ['Bone-in chicken thighs', 'Lean ground turkey', 'Large wild shrimp', 'Eggs']
      },
      {
        category: 'Produce',
        items: ['Sweet potatoes', 'Spaghetti squash', 'Yukon gold potatoes', 'Sweet bell peppers', 'Strawberries']
      },
      {
        category: 'Pantry',
        items: ['Sprouted grain tortillas', 'Crushed plum tomatoes', 'Black beans', 'Rolled oats', 'Pure maple syrup']
      }
    ],
    days: [
      {
        dayNumber: 1,
        dayName: 'Monday',
        breakfast: {
          recipeId: 'rec-39',
          title: 'Cinnamon & Wild Blueberry Baked Oatmeal',
          description: 'Warm baked oatmeal square with maple drizzle.',
          calories: 290,
          prepTimeMinutes: 15
        },
        lunch: {
          recipeId: 'rec-27',
          title: 'Crispy Black Bean & Sweet Corn Quesadillas',
          description: 'Tortillas with black beans, sweet corn, and mild cheese.',
          calories: 420,
          prepTimeMinutes: 15
        },
        dinner: {
          recipeId: 'rec-5',
          title: 'Sheet-Pan Lemon-Herb Chicken Thighs with Rainbow Vegetables',
          description: 'Crispy chicken thighs with sweet peppers and roast potatoes.',
          calories: 520,
          prepTimeMinutes: 45
        },
        snacks: [
          { title: 'Fresh strawberry slices with Greek yogurt dip', calories: 180 },
          { title: 'Whole-grain seed crackers with cheddar', calories: 190 }
        ],
        dailyCalories: 1990,
        dailyProtein: 104,
        dailyFiber: 36
      },
      {
        dayNumber: 2,
        dayName: 'Tuesday',
        breakfast: {
          recipeId: 'rec-13',
          title: 'Smashed Avocado Toast with Strawberries on the Side',
          description: 'Sourdough toast with mild mashed avocado.',
          calories: 360,
          prepTimeMinutes: 10
        },
        lunch: {
          recipeId: 'rec-5',
          title: 'Leftover Roast Chicken & Potato Bowl',
          description: 'Warmed chicken thighs with roasted gold potatoes and dip.',
          calories: 480,
          prepTimeMinutes: 5
        },
        dinner: {
          recipeId: 'rec-37',
          title: 'Slow-Simmered Turkey Bolognese over Spaghetti Squash',
          description: 'Savory turkey Bolognese over spaghetti squash ribbons.',
          calories: 360,
          prepTimeMinutes: 45
        },
        snacks: [
          { title: 'Banana slices with almond butter', calories: 200 },
          { title: 'Homemade trail mix with raisins & pumpkin seeds', calories: 170 }
        ],
        dailyCalories: 1980,
        dailyProtein: 108,
        dailyFiber: 35
      },
      {
        dayNumber: 3,
        dayName: 'Wednesday',
        breakfast: {
          recipeId: 'rec-3',
          title: 'Whipped Greek Yogurt Parfait with Chia Berry Jam',
          description: 'Parfait glasses with creamy yogurt and sweet jam.',
          calories: 340,
          prepTimeMinutes: 10
        },
        lunch: {
          recipeId: 'rec-37',
          title: 'Leftover Turkey Bolognese with Whole-Grain Pasta',
          description: 'Warm Bolognese sauce over pasta with parmesan.',
          calories: 460,
          prepTimeMinutes: 10
        },
        dinner: {
          recipeId: 'rec-16',
          title: 'Garlic Butter & Dill Shrimp with Sweet Tomato Orzo',
          description: 'Tender shrimp with orzo and sweet sun-dried tomatoes.',
          calories: 430,
          prepTimeMinutes: 28
        },
        snacks: [
          { title: 'Silky dark chocolate avocado mousse cups', calories: 240 },
          { title: 'Apple slices with peanut butter', calories: 190 }
        ],
        dailyCalories: 2010,
        dailyProtein: 102,
        dailyFiber: 34
      },
      {
        dayNumber: 4,
        dayName: 'Thursday',
        breakfast: {
          recipeId: 'rec-39',
          title: 'Warm Blueberry Baked Oatmeal Square',
          description: 'Oatmeal bake with maple syrup and pecans.',
          calories: 290,
          prepTimeMinutes: 5
        },
        lunch: {
          recipeId: 'rec-1',
          title: 'Mediterranean Grain Bowl (Deconstructed)',
          description: 'Quinoa, roasted chickpeas, cucumber spears, and dip.',
          calories: 495,
          prepTimeMinutes: 15
        },
        dinner: {
          recipeId: 'rec-11',
          title: 'Smoky Sweet Potato & Black Bean Quinoa Chili',
          description: 'Mild sweet potato and black bean chili with avocado.',
          calories: 365,
          prepTimeMinutes: 45
        },
        snacks: [
          { title: 'Cottage cheese with pineapple', calories: 170 },
          { title: 'Air-popped popcorn with olive oil & sea salt', calories: 140 }
        ],
        dailyCalories: 1960,
        dailyProtein: 94,
        dailyFiber: 43
      },
      {
        dayNumber: 5,
        dayName: 'Friday',
        breakfast: {
          recipeId: 'rec-22',
          title: 'Baked Bell Pepper Egg Boats with Cheddar',
          description: 'Fun pepper boats with baked eggs and melted cheese.',
          calories: 320,
          prepTimeMinutes: 25
        },
        lunch: {
          recipeId: 'rec-11',
          title: 'Leftover Sweet Potato Chili with Tortilla Chips',
          description: 'Warm chili with crunchy corn tortilla chips.',
          calories: 450,
          prepTimeMinutes: 5
        },
        dinner: {
          recipeId: 'rec-32',
          title: 'Light Roasted Eggplant Parmigiana with Mozzarella',
          description: 'Cheesy roasted eggplant bake with San Marzano sauce.',
          calories: 280,
          prepTimeMinutes: 50
        },
        snacks: [
          { title: 'Berry smoothie with Greek yogurt and honey', calories: 240 },
          { title: 'Roasted pumpkin seeds', calories: 160 }
        ],
        dailyCalories: 1970,
        dailyProtein: 98,
        dailyFiber: 40
      },
      {
        dayNumber: 6,
        dayName: 'Saturday',
        breakfast: {
          recipeId: 'rec-3',
          title: 'Greek Yogurt Parfait with Strawberries and Oats',
          description: 'Strained yogurt with fresh strawberries and oats.',
          calories: 340,
          prepTimeMinutes: 10
        },
        lunch: {
          recipeId: 'rec-27',
          title: 'Crispy Black Bean Quesadillas with Guacamole',
          description: 'Toasted quesadillas with black beans and fresh avocado.',
          calories: 420,
          prepTimeMinutes: 15
        },
        dinner: {
          recipeId: 'rec-2',
          title: 'Pan-Seared Wild Salmon with Asparagus Spears',
          description: 'Crisp salmon fillet with sweet lemon and asparagus.',
          calories: 410,
          prepTimeMinutes: 22
        },
        snacks: [
          { title: 'Dark chocolate avocado mousse with raspberries', calories: 240 },
          { title: 'Hard-boiled egg with sea salt', calories: 80 }
        ],
        dailyCalories: 1990,
        dailyProtein: 106,
        dailyFiber: 35
      },
      {
        dayNumber: 7,
        dayName: 'Sunday',
        breakfast: {
          recipeId: 'rec-39',
          title: 'Blueberry Baked Oatmeal with Sliced Peaches',
          description: 'Warm oatmeal bake with sliced fruit.',
          calories: 290,
          prepTimeMinutes: 10
        },
        lunch: {
          recipeId: 'rec-6',
          title: 'Avocado & Shelled Edamame Salad with Chicken Strips',
          description: 'Crunchy salad with sweet edamame and chicken breast.',
          calories: 460,
          prepTimeMinutes: 15
        },
        dinner: {
          recipeId: 'rec-12',
          title: 'Golden Ginger Chicken & Rice Soup',
          description: 'Comforting chicken soup with fluffy rice and tender chicken.',
          calories: 390,
          prepTimeMinutes: 40
        },
        snacks: [
          { title: 'Sliced Honeycrisp apple with peanut butter', calories: 210 },
          { title: 'Greek yogurt with honey drizzle', calories: 150 }
        ],
        dailyCalories: 1980,
        dailyProtein: 110,
        dailyFiber: 36
      }
    ]
  },
  {
    id: 'mp-10',
    slug: '7-day-blood-sugar-metabolic-balance-plan',
    title: '7-Day Blood Sugar & Metabolic Balance Plan',
    subtitle: 'Optimizing glycemic sequencing, resistant starch, soluble fiber, and clean protein for steady daytime energy.',
    heroImage: '/src/assets/images/hero_mediterranean_bowl_1790701975731.jpg',
    durationDays: 7,
    dietType: 'Blood Sugar Balance',
    caloriesPerDay: 1850,
    tags: ['Blood Sugar', 'Insulin Sensitivity', 'Resistant Starch', 'Low-Glycemic'],
    authorId: 'author-3',
    description: 'Rooted in continuous glucose monitor (CGM) trials and clinical nutrition science. Meals are structured around food sequencing: vegetables and fiber first, healthy proteins and fats second, complex carbohydrates last.',
    overview: '1,800 to 1,900 balanced calories engineered to prevent post-meal fatigue and reactive hypoglycemia.',
    prepNotes: [
      'Retrogradation: Cook grains and legumes 24 hours ahead and chill in the fridge to maximize resistant starch.',
      'Vegetable Starter: Always start lunch and dinner with a small salad or vegetable plate.'
    ],
    shoppingList: [
      {
        category: 'Produce',
        items: ['Avocados', 'Persian cucumbers', 'Lacinato kale', 'Broccoli', 'Lemons', 'Asparagus']
      },
      {
        category: 'Proteins',
        items: ['Wild salmon fillets', 'Pacific cod', 'Pasture-raised eggs', 'Extra-firm tofu', 'Chicken breast']
      },
      {
        category: 'Pantry',
        items: ['Chia seeds', 'Apple cider vinegar', 'Extra virgin olive oil', 'Quinoa', 'Cannellini beans']
      }
    ],
    days: [
      {
        dayNumber: 1,
        dayName: 'Monday',
        breakfast: {
          recipeId: 'rec-22',
          title: 'Baked Bell Pepper Egg Boats with Avocado Salsa',
          description: 'Zero glycemic spike breakfast with pasture eggs and healthy fats.',
          calories: 320,
          prepTimeMinutes: 20
        },
        lunch: {
          recipeId: 'rec-6',
          title: 'Avocado & Shelled Edamame Green Goddess Crunch Salad',
          description: 'High-fiber cabbage and edamame salad with yogurt dressing.',
          calories: 360,
          prepTimeMinutes: 15
        },
        dinner: {
          recipeId: 'rec-2',
          title: 'Pan-Seared Wild Salmon with Meyer Lemon & Asparagus',
          description: 'Wild salmon with tender asparagus and olive oil.',
          calories: 410,
          prepTimeMinutes: 22
        },
        snacks: [
          { title: 'Handful of raw walnuts (1/4 cup)', calories: 190 },
          { title: 'Apple slices dipped in natural almond butter', calories: 200 }
        ],
        dailyCalories: 1840,
        dailyProtein: 114,
        dailyFiber: 38
      },
      {
        dayNumber: 2,
        dayName: 'Tuesday',
        breakfast: {
          recipeId: 'rec-3',
          title: 'Whipped Greek Yogurt Parfait with Chia Berry Jam',
          description: 'Unsweetened Greek yogurt with chia berry reduction and seeds.',
          calories: 340,
          prepTimeMinutes: 10
        },
        lunch: {
          recipeId: 'rec-1',
          title: 'Mediterranean Grain Bowl with Resistant Starch Quinoa',
          description: 'Chilled cooked quinoa, crispy chickpeas, and tahini drizzle.',
          calories: 495,
          prepTimeMinutes: 15
        },
        dinner: {
          recipeId: 'rec-9',
          title: 'Herb-Crusted Pacific Cod En Papillote with Olives',
          description: 'Tender cod baked in parchment with cherry tomatoes and capers.',
          calories: 290,
          prepTimeMinutes: 30
        },
        snacks: [
          { title: 'Cottage cheese with sliced cucumbers & black pepper', calories: 160 },
          { title: 'Roasted pumpkin seeds (1/4 cup)', calories: 170 }
        ],
        dailyCalories: 1835,
        dailyProtein: 108,
        dailyFiber: 41
      },
      {
        dayNumber: 3,
        dayName: 'Wednesday',
        breakfast: {
          recipeId: 'rec-17',
          title: 'Antioxidant Super-Berry & Spinach Protein Smoothie',
          description: 'Wild berries, baby spinach, avocado, and pea protein.',
          calories: 280,
          prepTimeMinutes: 5
        },
        lunch: {
          recipeId: 'rec-4',
          title: 'Tuscan White Bean & Cavolo Nero Soup with Olive Oil',
          description: 'Cannellini beans and kale simmered in aromatic broth.',
          calories: 320,
          prepTimeMinutes: 35
        },
        dinner: {
          recipeId: 'rec-15',
          title: 'Grass-Fed Flank Steak with Herb Chimichurri & Peppers',
          description: 'Lean flank steak with tangy parsley-oregano chimichurri.',
          calories: 460,
          prepTimeMinutes: 30
        },
        snacks: [
          { title: 'Celery sticks with 2 tbsp peanut butter', calories: 190 },
          { title: 'Dark chocolate square (85% cacao)', calories: 90 }
        ],
        dailyCalories: 1840,
        dailyProtein: 118,
        dailyFiber: 37
      },
      {
        dayNumber: 4,
        dayName: 'Thursday',
        breakfast: {
          recipeId: 'rec-22',
          title: 'Baked Bell Pepper Egg Boats with Sharp Cheddar',
          description: 'Pasture eggs in sweet peppers with fresh herbs.',
          calories: 320,
          prepTimeMinutes: 20
        },
        lunch: {
          recipeId: 'rec-21',
          title: 'Buckwheat Soba Noodles with Sesame Ginger Tofu',
          description: 'Low-glycemic buckwheat noodles with crisp pan-seared tofu.',
          calories: 410,
          prepTimeMinutes: 20
        },
        dinner: {
          recipeId: 'rec-40',
          title: 'Steamed Alaskan Black Cod in Ginger & Scallion Broth',
          description: 'Silky cod steamed with ginger matchsticks and baby bok choy.',
          calories: 380,
          prepTimeMinutes: 22
        },
        snacks: [
          { title: 'Chia seed pudding with fresh berries', calories: 240 },
          { title: 'Toasted pistachios (1/4 cup)', calories: 160 }
        ],
        dailyCalories: 1850,
        dailyProtein: 104,
        dailyFiber: 36
      },
      {
        dayNumber: 5,
        dayName: 'Friday',
        breakfast: {
          recipeId: 'rec-13',
          title: 'Heirloom Tomato & Smashed Avocado Sourdough Tartine',
          description: 'Artisan sourdough with seasoned avocado, tomato, and hemp.',
          calories: 380,
          prepTimeMinutes: 12
        },
        lunch: {
          recipeId: 'rec-38',
          title: 'Smashed Asian Cucumber Salad with Steamed Edamame',
          description: 'Crisp smashed cucumbers with sesame oil and edamame.',
          calories: 310,
          prepTimeMinutes: 15
        },
        dinner: {
          recipeId: 'rec-37',
          title: 'Turkey Bolognese over Roasted Spaghetti Squash',
          description: 'Savory turkey Bolognese over roasted squash strands.',
          calories: 360,
          prepTimeMinutes: 45
        },
        snacks: [
          { title: 'Silky dark chocolate avocado mousse', calories: 240 },
          { title: 'Handful of roasted almonds', calories: 160 }
        ],
        dailyCalories: 1840,
        dailyProtein: 102,
        dailyFiber: 40
      },
      {
        dayNumber: 6,
        dayName: 'Saturday',
        breakfast: {
          recipeId: 'rec-3',
          title: 'Whipped Greek Yogurt Parfait with Pumpkin Seeds',
          description: 'High-protein strained yogurt with toasted seeds and berries.',
          calories: 340,
          prepTimeMinutes: 10
        },
        lunch: {
          recipeId: 'rec-28',
          title: 'Coastal Citrus Wild Shrimp Ceviche with Avocado',
          description: 'Chilled wild shrimp in lime juice with diced avocado.',
          calories: 260,
          prepTimeMinutes: 20
        },
        dinner: {
          recipeId: 'rec-14',
          title: 'Crispy Lemon-Herb Tofu with Roasted Broccoli & Almonds',
          description: 'Marinated tofu cubes with garlicky broccoli florets.',
          calories: 340,
          prepTimeMinutes: 40
        },
        snacks: [
          { title: 'Edamame hummus with sliced Persian cucumbers', calories: 210 },
          { title: '2 hard-boiled eggs with sea salt', calories: 150 }
        ],
        dailyCalories: 1820,
        dailyProtein: 110,
        dailyFiber: 39
      },
      {
        dayNumber: 7,
        dayName: 'Sunday',
        breakfast: {
          recipeId: 'rec-22',
          title: 'Baked Bell Pepper Egg Boats with Avocado Salsa',
          description: 'Baked pasture eggs in pepper halves with cheddar and salsa.',
          calories: 320,
          prepTimeMinutes: 20
        },
        lunch: {
          recipeId: 'rec-31',
          title: 'Warm Quinoa, Massaged Lacinato Kale & Walnut Salad',
          description: 'Massaged kale with quinoa, toasted walnuts, and cider dressing.',
          calories: 340,
          prepTimeMinutes: 20
        },
        dinner: {
          recipeId: 'rec-2',
          title: 'Pan-Seared Salmon with Asparagus & Lemon',
          description: 'Wild salmon fillet with lemon and tender asparagus spears.',
          calories: 410,
          prepTimeMinutes: 22
        },
        snacks: [
          { title: 'Apple slices with natural almond butter', calories: 200 },
          { title: 'Steeped cinnamon chamomile herbal tea', calories: 0 }
        ],
        dailyCalories: 1830,
        dailyProtein: 106,
        dailyFiber: 42
      }
    ]
  }
];
