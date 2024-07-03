import { defineStore } from 'pinia';

import APIMeal from '@/services/meal/meal';

import type { Meal } from '@/interfaces/meal.interface';

interface RootState {
  meals: Meal[];
  currentPage: number;
  totalPages: number;
  totalOrders: number;
  hasNextPage: boolean;
  nextPage: number | null;
  hasPreviousPage: boolean;
  previousPage: number | null;
  error: string | null;
}

const mealService = new APIMeal();

const useMealStore = defineStore("MealStore", {
  state: (): RootState => ({
    meals: [],
    currentPage: 1,
    totalPages: 1,
    totalOrders: 1,
    hasNextPage: false,
    nextPage: null,
    hasPreviousPage: false,
    previousPage: null,
    error: null,
  }),

  actions: {
    async getMeals(uuid: string, page: number = 1): Promise<void> {
      try {
        const response = await mealService.getMeals(uuid, page);
        this.meals = response.data.meals;
        this.currentPage = response.data.currentPage;
        this.totalPages = response.data.totalPages;
        this.totalOrders = response.data.totalOrders;
        this.nextPage = response.data.nextPage;
        this.hasNextPage = response.data.hasNextPage;
        this.previousPage = response.data.previousPage;
        this.hasPreviousPage = response.data.hasPreviousPage;
      } catch (error: unknown) {
        this.error = String(error)
      }
    },
    async addMeal(meal: Meal, uuid: string) {
      try {
        console.log('meal', meal)
        console.log('uuid', uuid)
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