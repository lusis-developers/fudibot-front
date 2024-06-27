import { AxiosResponse } from 'axios';

import APIBase from '../base';

import type { OrderResponse } from '@/interfaces/order.interface';

class APIOrder extends APIBase {
  async getOrders(restaurantId: string, page: number = 1): Promise<AxiosResponse<OrderResponse>> {
    return await this.get<OrderResponse>(`orders/${restaurantId}?page=${page}`);
  }
}

export default APIOrder;