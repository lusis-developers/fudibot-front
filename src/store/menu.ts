import { defineStore } from "pinia";

import MenuService from "@/services/menu";
import type { Drink, Meal } from "@/types/menu.interface";

interface RootState {
  meals: Meal[];
  drinks: Drink[];
  error: string | null;
}

const menuService = new MenuService();

const useMenuStore = defineStore("MenuStore", {
  state: (): RootState => ({
    meals: [],
    drinks: [],
    error: null,
  }),

  actions: {
    async addMeals(meals: Meal) {
      await menuService.addMeals(meals)
    },
    async addDrinks(drinks: Drink) {
      await menuService.addDrinks(drinks)
    },
  },
});

export default useMenuStore;