import { defineStore } from 'pinia';
import APIDrink from '@/services/drink/drinks';

import type { Drink } from '@/interfaces/drink.interface';

interface RootState {
  drinks: Drink[];
  error: string | null;
}

const drinkService = new APIDrink();

const useDrinkStore = defineStore("DrinkStore", {
  state: (): RootState => ({
    drinks: [],
    error: null,
  }),

  actions: {
    async addDrink(drink: Drink): Promise<void> {
      try {
        await drinkService.addDrinks(drink);
        this.drinks.push(drink);
        // this.items.push(drink);
      } catch (error: any) {
        this.error = error.message;
      }
    },
    async removeDrink(item: string): Promise<void> {
      try {
        this.drinks = this.drinks.filter(drink => drink.item !== item);
      } catch (error: any) {
        this.error = error.message;
      }
    },
    async addDrinkImage(image: File): Promise<string> {
      try {
        const response = await drinkService.addDrinkImage(image);
        return response?.data.url;
      } catch (error: any) {
        this.error = error.message;
        return ''
      }
    },
  },
});

export default useDrinkStore;