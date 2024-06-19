import APIBase from "./base";
import { Drink, Meal } from "@/interfaces/menu.interface";

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
  async addMealImage(image: any) {
    try {
      const headers = {
        'Content-Type': 'multipart/form-data'
      }
      return this.post(`meals-image`, image, headers);
    } catch (error) {
      console.error(error);
    }
  }
  async addDrinkImage(image: any) {
    try {
      const headers = {
        'Content-Type': 'multipart/form-data'
      }
      return this.post(`drinks-image`, image, headers);
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