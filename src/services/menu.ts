import { Drink, Meal } from "@/types/menu.interface";
import APIBase from "./base";

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
}

export default MenuService;