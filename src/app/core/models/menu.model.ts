export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  tags?: MenuTag[];
  isPopular?: boolean;
  isChefsPick?: boolean;
  emoji?: string;
}

export type MenuCategory = 'breakfast' | 'allday' | 'sides';

export type MenuTag = 'beef' | 'chicken' | 'veg' | 'fish';

export interface MenuCategoryInfo {
  id: MenuCategory;
  label: string;
  icon: string;
  description: string;
  count?: number;
}
