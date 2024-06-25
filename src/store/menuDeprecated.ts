// import { defineStore } from "pinia";
// import MenuService from "@/services/menuDeprecated";

// import type { MenuItem } from "@/interfaces/menuDeprecated.interface";

// interface RootState {
//   items: MenuItem[];
//   meals: MenuItem[];
//   drinks: MenuItem[];
//   error: string | null;
// }

// const menuService = new MenuService();

// const useMenuStore = defineStore("MenuStore", {
//   state: (): RootState => ({
//     items: [],
//     meals: [],
//     drinks: [],
//     error: null,
//   }),

//   actions: {
//     async addMeal(meal: MenuItem) {
//       try {
//         await menuService.addMeals(meal);
//         this.meals.push(meal);
//         this.items.push(meal);
//       } catch (error: any) {
//         this.error = error.message;
//       }
//     },
//     async addDrink(drink: MenuItem) {
//       try {
//         await menuService.addDrinks(drink);
//         this.drinks.push(drink);
//         this.items.push(drink);
//       } catch (error: any) {
//         this.error = error.message;
//       }
//     },
//     async removeMeal(item: string) {
//       try {
//         // await menuService.removeMeal(mealId);
//         this.meals = this.meals.filter(meal => meal.item !== item);
//         this.items = this.items.filter(i => i.item !== item);
//       } catch (error: any) {
//         this.error = error.message;
//       }
//     },
//     async removeDrink(item: string) {
//       try {
//         // await menuService.removeDrink(drinkId);
//         this.drinks = this.drinks.filter(drink => drink.item !== item);
//         this.items = this.items.filter(i => i.item !== item);
//       } catch (error: any) {
//         this.error = error.message;
//       }
//     },
//     async addMealImage(image: File): Promise<string> {
//       try {
//         const response = await menuService.addMealImage(image);
//         return response?.data.url;
//       } catch (error: any) {
//         this.error = error.message;
//         return ''
//       }
//     },
//     async addDrinkImage(image: File): Promise<string> {
//       try {
//         const response = await menuService.addDrinkImage(image);
//         return response?.data.url;
//       } catch (error: any) {
//         this.error = error.message;
//         return ''
//       }
//     },
//   },
// });

// export default useMenuStore;