import { Drink, Meal } from "@/types/menu.interface";
import APIBase from "./base";

class MenuService extends APIBase {
  async addMeals(meals: Meal) {
    try {
      return this.post('meals', meals);
    } catch (error) {
      console.error(error);
    }
  }  
  async addDrinks(drinks: Drink) {
    try {
      return this.post('drinks', drinks);
    } catch (error) {
      console.error(error);
    }
  }
}

export default MenuService;