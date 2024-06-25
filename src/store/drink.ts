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
    async getDrinks(uuid: string): Promise<void> {
      try {
        const response = await drinkService.getDrinks(uuid);
        this.drinks = response.data;
      } catch(error: unknown) {
        this.error = String(error)
      }
    },
    async addDrink(drink: Drink, uuid: string): Promise<void> {
      try {
        await drinkService.addDrinks({ ...drink, uuid });
        this.getDrinks(uuid)
      } catch (error: any) {
        this.error = error.message;
      }
    },
    async removeDrink(item: string, uuid: string): Promise<void> {
      try {
        this.drinks = this.drinks.filter(drink => drink.item !== item);
        this.getDrinks(uuid);
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