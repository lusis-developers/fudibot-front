import APIBase from "./base";
import { Drink, Meal } from "@/types/menu.interface";

class MenuService extends APIBase {
  async addMeals(meal: Meal) {
    try {
      return this.post('meals', meal);
    } catch (error) {
      console.error(error);
    }
  }
  async addDrinks(drink: Drink) {
    try {
      return this.post('drinks', drink);
    } catch (error) {
      console.error(error);
    }
  }
  async addMealImage(image: any, mealId: string) {
    try {
      return this.post(`meals-image/${mealId}`, image);
    } catch (error) {
      console.error(error);
    }
  }
  async addDrinkImage(image: any, drinkId: string) {
    try {
      return this.post(`drinks-image/${drinkId}`, image);
    } catch (error) {
      console.error(error);
    }
  }
  async removeMeal(mealId: string) {
    try {
      return this.delete(`meals/${mealId}`);
    } catch (error) {
      console.error(error);
    }
  }
  async removeDrink(drinkId: string) {
    try {
      return this.delete(`drinks/${drinkId}`);
    } catch (error) {
      console.error(error);
    }
  }
}

export default MenuService;