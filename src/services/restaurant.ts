import APIBase from "./base";

class RestaurantService extends APIBase {
  async getRestaurant(id: string) {
    try {
      return this.get(`restaurants/${id}`);
    } catch (error) {
      console.error(error);
    }
  }
  async createRestaurant(data: any) {
    try {
      return this.post('restaurants', data);
    } catch (error) {
      console.error(error);
    }
  }
}

export default RestaurantService;