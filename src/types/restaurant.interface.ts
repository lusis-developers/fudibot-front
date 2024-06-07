export interface Meal {
  id: string;
  name: string;
  price: number;
}

export interface Drink {
  id: string;
  name: string;
  price: number;
}

export interface Restaurant {
  name: string;
  meals: Meal[];
  drinks: Drink[];
}