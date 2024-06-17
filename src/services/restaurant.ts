import { RestaurantResponse } from "@/types/restaurant.interface";
import APIBase from "./base";

class RestaurantService extends APIBase {
  async getRestaurant(id: string) {
    try {
      return this.get(`restaurant/${id}`);
    } catch (error) {
      console.error(error);
    }
  }
  async createRestaurant(data: any) {
    try {
      return this.post<RestaurantResponse>('restaurant', data);
    } catch (error) {
      console.error(error);
    }
  }
  async addRestaurantLogo(image: any) {
    try {
      const headers = {
        'Content-Type': 'multipart/form-data'
      }
      return this.post(`restaurant-logo`, image, headers);
    } catch (error) {
      console.error(error);
    }
  }
  async createBank(data: any) {
    try {
      return this.post('bank', data)
    } catch (error) {
      console.error(error);
    }
  }
}

export default RestaurantService;