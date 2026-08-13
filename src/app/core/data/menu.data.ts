import { MenuItem, MenuCategoryInfo } from '../models/menu.model';

export const MENU_CATEGORIES: MenuCategoryInfo[] = [
  { id: 'breakfast', label: 'Breakfast & Brunch', icon: '🍳', description: 'Start your day the KIKAZ way' },
  { id: 'allday',    label: 'All-Day Menu',        icon: '🌯', description: 'Wraps packed with flavour, any time' },
  { id: 'sides',     label: 'Sides & Snacks',      icon: '🍟', description: 'Every wrap needs a sidekick' },
];

export const MENU_ITEMS: MenuItem[] = [

  // ── BREAKFAST & BRUNCH ──────────────────────────────────────────
  {
    id: 'scramble-on',
    name: 'Scramble On',
    description: 'Fluffy scrambled eggs and melted cheese, wrapped in a soft tortilla — simple and satisfying.',
    price: 200, category: 'breakfast', tags: ['veg'],
    emoji: '🥚', image: 'food_scramble_wrap.png',
  },
  {
    id: 'sausage-cheese-start',
    name: 'Sausage & Cheese Start',
    description: 'Lebanese beef sausage, gooey cheese, and scrambled eggs wrapped up for a hearty morning fix.',
    price: 250, category: 'breakfast', tags: ['beef'], isPopular: true,
    emoji: '🌭', image: 'food_sausage_wrap.png',
  },
  {
    id: 'green-shroom-wrap',
    name: 'Green & Shroom Wrap',
    description: 'A warm wrap filled with sautéed mushrooms, spinach, and soft scrambled eggs — earthy and filling.',
    price: 230, category: 'breakfast', tags: ['veg'],
    emoji: '🍄', image: 'food_green_shroom.png',
  },
  {
    id: 'labneh-garden',
    name: 'Labneh Garden',
    description: 'Thick labneh wrapped with crunchy cucumbers, tomatoes, and mint — a creamy, refreshing start.',
    price: 220, category: 'breakfast', tags: ['veg'],
    emoji: '🥗', image: undefined,
  },
  {
    id: 'tarweit-zaatar',
    name: "Tarwe'it Zaatar",
    description: 'A Lebanese favorite — rich labneh with a generous sprinkle of zaatar, all wrapped up.',
    price: 220, category: 'breakfast', tags: ['veg'],
    emoji: '🫙', image: undefined,
  },
  {
    id: 'fala-full',
    name: 'Fala-Full',
    description: 'Crispy falafel with tahini and pickles, wrapped and ready to go.',
    price: 150, category: 'breakfast', tags: ['veg'],
    emoji: '🧆', image: undefined,
  },
  {
    id: 'halloumi-melt',
    name: 'Halloumi Melt',
    description: 'Grilled halloumi, juicy tomato slices, and pesto — a melty, Mediterranean wrap.',
    price: 250, category: 'breakfast', tags: ['veg'], isChefsPick: true,
    emoji: '🧀', image: 'food_halloumi_wrap.png',
  },
  {
    id: 'tuna-turner',
    name: 'Tuna Turner',
    description: 'Creamy spicy tuna with sesame, crunchy vegetables, and a hint of sriracha — bold and satisfying.',
    price: 250, category: 'breakfast', tags: ['fish'],
    emoji: '🐟', image: 'tuna_turner.png',
  },
  {
    id: 'salmon-says',
    name: 'Salmon Says',
    description: 'Smoked salmon layered with creamy labneh, fresh onions, and lime for a light but flavorful bite.',
    price: 370, category: 'breakfast', tags: ['fish'],
    emoji: '🍣', image: undefined,
  },

  // ── LUNCH & ALL-DAY MENU ────────────────────────────────────────
  {
    id: 'slaw-order',
    name: 'Slaw & Order',
    description: 'Fries, slaw, and house sauce all wrapped up for the perfect crispy-creamy combo.',
    price: 260, category: 'allday', tags: ['veg'],
    emoji: '🥙', image: undefined,
  },
  {
    id: 'cheesy-chicken-quesa',
    name: 'Cheesy Chicken Quesa',
    description: 'Grilled chicken and melted cheese folded into a golden quesadilla — oozy, chewy, satisfying.',
    price: 350, category: 'allday', tags: ['chicken'], isPopular: true,
    emoji: '🫓', image: undefined,
  },
  {
    id: 'chicken-got-garlic',
    name: 'Chicken Got Garlic',
    description: 'Juicy garlic-marinated chicken, pickles, and house sauce — shawarma-style perfection.',
    price: 350, category: 'allday', tags: ['chicken'], isChefsPick: true,
    emoji: '🧄', image: undefined,
  },
  {
    id: 'shawarma-drama',
    name: 'Shawarma Drama',
    description: 'Tender spiced beef, creamy tahini, and pickles in a hot grilled wrap — hearty and bold.',
    price: 370, category: 'allday', tags: ['beef'], isPopular: true,
    emoji: '🌯', image: 'food_sausage_wrap.png',
  },
  {
    id: 'sujukd',
    name: "Sujuk'd",
    description: 'Juicy minced beef seasoned with bold sujuk spices, topped with caramelized onions, melted cheese, and house sauce — rich, smoky, and satisfying.',
    price: 370, category: 'allday', tags: ['beef'],
    emoji: '🫕', image: undefined,
  },
  {
    id: 'bang-bang-burger',
    name: 'Bang Bang Burger',
    description: 'A sweet and spicy Asian-style beef wrap with slaw and bang bang sauce.',
    price: 370, category: 'allday', tags: ['beef'],
    emoji: '💥', image: undefined,
  },
  {
    id: 'the-crunchie',
    name: 'The Crunchie',
    description: 'Golden chicken tenders, garlic mayo, and pickles — comfort food in a wrap.',
    price: 350, category: 'allday', tags: ['chicken'],
    emoji: '✨', image: undefined,
  },
  {
    id: 'what-the-kafta',
    name: 'What the Kafta',
    description: 'Juicy grilled kafta with tomatoes, pickles, and creamy mayo — wrapped and toasted to perfection.',
    price: 320, category: 'allday', tags: ['beef'],
    emoji: '🔥', image: undefined,
  },
  {
    id: 'kobeba-kraze',
    name: 'Kobeba Kraze',
    description: 'Crispy kobeba wrapped with tahini, pickles, and fresh herbs for the perfect crunchy bite.',
    price: 310, category: 'allday', tags: ['beef'],
    emoji: '🥙', image: undefined,
  },

  // ── SIDES & SNACKS ──────────────────────────────────────────────
  {
    id: 'chickie-dodo',
    name: 'Chickie Dodo',
    description: '5 Crispy fried chicken tenders, seasoned and ready to snack on.',
    price: 240, category: 'sides', tags: ['chicken'], isPopular: true,
    emoji: '🍗', image: undefined,
  },
  {
    id: 'fries-before-guys',
    name: 'Fries Before Guys',
    description: 'Classic golden fries — crispy outside, fluffy inside unlike guys.',
    price: 120, category: 'sides', tags: ['veg'],
    emoji: '🍟', image: undefined,
  },
  {
    id: 'cheesy-does-it',
    name: 'Cheesy Does It',
    description: 'Hot fries loaded with gooey melted cheese.',
    price: 170, category: 'sides', tags: ['veg'], isChefsPick: true,
    emoji: '🧀', image: undefined,
  },
  {
    id: 'popeye',
    name: 'Popeye',
    description: '12 Baked pastries filled with seasoned spinach — flaky, savory, and satisfying.',
    price: 240, category: 'sides', tags: ['veg'],
    emoji: '🥬', image: undefined,
  },
  {
    id: 'corn-ribbed',
    name: 'Corn Ribbed',
    description: 'Sweet corn ribs seasoned and roasted until crispy, served with a creamy dipping sauce.',
    price: 200, category: 'sides', tags: ['veg'],
    emoji: '🌽', image: undefined,
  },
  {
    id: 'kobeba-nugs',
    name: 'Kobeba Nugs',
    description: 'Golden crispy kobeba bites packed with flavorful minced beef and spices.',
    price: 250, category: 'sides', tags: ['beef'],
    emoji: '🥩', image: undefined,
  },
];
