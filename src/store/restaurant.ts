import { defineStore } from 'pinia';
import type { Restaurant, Meal, Drink } from '@/types/restaurant.interface';

interface RootState {
  restaurant: Restaurant;
  error: string | null;
  isLoading: boolean;
}

export const useRestaurantStore = defineStore('RestaurantStore', {
  state: (): RootState => ({
    restaurant: {
      name: 'Restaurante Ficticio',
      meals: [
        { id: '1', name: 'Pizza', price: 10 },
        { id: '2', name: 'Burger', price: 8 },
        { id: '3', name: 'Pasta', price: 12 },
      ],
      drinks: [
        { id: '1', name: 'Coke', price: 2 },
        { id: '2', name: 'Water', price: 1 },
        { id: '3', name: 'Juice', price: 3 },
      ],
    },
    error: null,
    isLoading: false,
  }),

  actions: {
    addMeal(meal: Meal): void {
      this.restaurant.meals.push(meal);
      console.log('Meal added:', meal);
    },

    addDrink(drink: Drink): void {
      this.restaurant.drinks.push(drink);
      console.log('Drink added:', drink);
    },
  }
});

export default useRestaurantStore;