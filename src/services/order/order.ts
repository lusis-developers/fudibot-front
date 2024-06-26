import { AxiosResponse } from 'axios';

import APIBase from '../base';

import type { OrderResponse } from '@/interfaces/order.interface';

class APIOrder extends APIBase {
  // async addMeals(meal: Order): Promise<AxiosResponse<Order>> {
  //   return this.post('orders', meal);
  // }
  
  // async addMealImage(image: File): Promise<AxiosResponse<Image>> {
  //   return this.uploadFile<Image>(`meals-image`, image);
  // }

  // async removeMeal(mealId: string) {
  //   return this.delete(`meals/${mealId}`);
  // }

  async getOrders(restaurantId: string): Promise<AxiosResponse<OrderResponse>> {
    return await this.get<OrderResponse>(`orders/${restaurantId}`);
  }
}

export default APIOrder;