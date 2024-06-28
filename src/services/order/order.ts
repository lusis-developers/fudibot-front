import { AxiosResponse } from 'axios';

import APIBase from '../base';

import type { OrderResponse } from '@/interfaces/order.interface';

class APIOrder extends APIBase {
  async getOrders(restaurantId: string, page: number = 1): Promise<AxiosResponse<OrderResponse>> {
    return await this.get<OrderResponse>(`orders/${restaurantId}?page=${page}`);
  }

  async updateOrderStatus(orderId: string, status: string): Promise<AxiosResponse> {
    console.log('desde el servicio', orderId)
    return await this.patch(`update-order/${orderId}`, { status: status })
  }
}

export default APIOrder;