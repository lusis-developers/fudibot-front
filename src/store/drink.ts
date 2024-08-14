import { defineStore } from 'pinia';
import APIDrink from '@/services/drink/drinks';

import type { Drink } from '@/interfaces/drink.interface';
import { Categories } from '@/enum/mealOrDrink.enum';

interface RootState {
  drinks: Drink[];
  currentPage: number;
  totalPages: number;
  totalOrders: number;
  hasNextPage: boolean;
  nextPage: number | null;
  hasPreviousPage: boolean;
  previousPage: number | null;
  error: string | null;
  isLoading: boolean;
}

const drinkService = new APIDrink();

const useDrinkStore = defineStore("DrinkStore", {
  state: (): RootState => ({
    drinks: [],
    currentPage: 1,
    totalPages: 1,
    totalOrders: 1,
    hasNextPage: false,
    nextPage: null,
    hasPreviousPage: false,
    previousPage: null,
    error: null,
    isLoading: false,
  }),

  actions: {
    async getDrinks(uuid: string, page: number = 1): Promise<void> {
      this.isLoading = true;
      try {
        const response = await drinkService.getDrinks(uuid, page);
        this.drinks = response.data.drinks.map((drink: Drink) => ({
          ...drink,
          categoryType: Categories.DRINK
        }));;


        this.currentPage = response.data.currentPage;
        this.totalPages = response.data.totalPages;
        this.totalOrders = response.data.totalOrders;
        this.nextPage = response.data.nextPage;
        this.hasNextPage = response.data.hasNextPage;
        this.previousPage = response.data.previousPage;
        this.hasPreviousPage = response.data.hasPreviousPage;
      } catch(error: unknown) {
        this.error = String(error)
      } finally {
        this.isLoading = false;
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