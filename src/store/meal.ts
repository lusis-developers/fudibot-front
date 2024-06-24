import { defineStore } from 'pinia';

import APIMeal from '@/services/meal/meal';

import type { Meal } from '@/interfaces/meal.interface';

interface RootState {
  meals: Meal[];
  error: string | null;
}

const mealService = new APIMeal();

const useMealStore = defineStore("MealStore", {
  state: (): RootState => ({
    meals: [],
    error: null,
  }),

  actions: {
    async addMeal(meal: Meal) {
      try {
        await mealService.addMeals(meal);
        this.meals.push(meal);
      } catch (error: any) {
        this.error = error.message;
      }
    },
    async removeMeal(item: string) {
      try {
        // // await menuService.removeMeal(mealId);
        // this.meals = this.meals.filter(meal => meal.item !== item);
        // this.items = this.items.filter(i => i.item !== item);
      } catch (error: any) {
        this.error = error.message;
      }
    },
    async addMealImage(image: File): Promise<string> {
      try {
        const response = await mealService.addMealImage(image);
        return response?.data.url;
      } catch (error: any) {
        this.error = error.message;
        return ''
      }
    },
  },
});

export default useMealStore;