import { AxiosResponse } from 'axios';

import APIBase from '../base';

import type { OrderResponse, OrderSchedule } from '@/interfaces/order.interface';

class APIOrder extends APIBase {
  async getOrders(restaurantId: string, page: number = 1): Promise<AxiosResponse<OrderResponse>> {
    return await this.get<OrderResponse>(`orders/${restaurantId}?page=${page}`);
  }

  async updateOrderStatus(orderId: string, status: string): Promise<AxiosResponse> {
    return await this.patch(`update-order/${orderId}`, { status: status })
  }

  async getOrderById(orderId: string): Promise<AxiosResponse> {
    return await this.get(`orders/orderId/${orderId}`);
  }

  async patchOrderSchedule(orderId: string, schedule: Pick<OrderSchedule, 'date' | 'time'>): Promise<AxiosResponse> {
    return await this.patch(`orders-scheduled`, { schedule, orderId });
  }
}

export default APIOrder;