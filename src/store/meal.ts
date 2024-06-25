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
    async getMeals(uuid: string): Promise<void> {
      try {
        const response = await mealService.getMeals(uuid);
        this.meals = response.data;
      } catch (error: unknown) {
        this.error = String(error)
      }
    },
    async addMeal(meal: Meal, uuid: string) {
      try {
        await mealService.addMeals({ ...meal, uuid });
        this.getMeals(uuid);
      } catch (error: any) {
        this.error = error.message;
      }
    },
    async removeMeal(mealId: string, uuid: string) {
      try {
        await mealService.removeMeal(mealId);
        this.getMeals(uuid);
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