import { defineStore } from "pinia";
import MenuService from "@/services/menu";
import type { Drink, Meal } from "@/types/menu.interface";

interface RootState {
  items: (Meal | Drink)[];
  meals: Meal[];
  drinks: Drink[];
  error: string | null;
}

const menuService = new MenuService();

const useMenuStore = defineStore("MenuStore", {
  state: (): RootState => ({
    items: [],
    meals: [],
    drinks: [],
    error: null,
  }),

  actions: {
    async addMeal(meal: Meal) {
      try {
        await menuService.addMeals(meal);
        this.meals.push(meal);
        this.items.push(meal);
      } catch (error: any) {
        this.error = error.message;
      }
    },
    async addDrink(drink: Drink) {
      try {
        await menuService.addDrinks(drink);
        this.drinks.push(drink);
        this.items.push(drink);
      } catch (error: any) {
        this.error = error.message;
      }
    },
    async removeMeal(item: string) {
      try {
        // await menuService.removeMeal(mealId);
        this.meals = this.meals.filter(meal => meal.item !== item);
        this.items = this.items.filter(i => i.item !== item);
      } catch (error: any) {
        this.error = error.message;
      }
    },
    async removeDrink(item: string) {
      try {
        // await menuService.removeDrink(drinkId);
        this.drinks = this.drinks.filter(drink => drink.item !== item);
        this.items = this.items.filter(i => i.item !== item);
      } catch (error: any) {
        this.error = error.message;
      }
    },
    async addMealImage(image: any) {
      try {
        return await menuService.addMealImage(image);
      } catch (error: any) {
        this.error = error.message;
      }
    },
    async addDrinkImage(image: any) {
      try {
        return await menuService.addDrinkImage(image);
      } catch (error: any) {
        this.error = error.message;
      }
    },
  },
});

export default useMenuStore;