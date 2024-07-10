import { defineStore } from 'pinia';

import type { OrdersRequested } from '@/interfaces/order.interface';
import APIOrder from '@/services/order/order';

interface RootState {
  orders: OrdersRequested[];
  currentPage: number;
  totalPages: number;
  totalOrders: number;
  hasNextPage: boolean;
  nextPage: number | null;
  hasPreviousPage: boolean;
  previousPage: number | null;
  error: string | null;
}

const orderService = new APIOrder();

const useOrderStore = defineStore("OrderStore", {
  state: (): RootState => ({
    orders: [],
    currentPage: 1,
    totalPages: 1,
    totalOrders: 1,
    hasNextPage: false,
    nextPage: null,
    hasPreviousPage: false,
    previousPage: null,
    error: null,
  }),

  actions: {
    async getOrders(restaurantId: string, page: number = 1): Promise<void> {
      try {
        const response = await orderService.getOrders(restaurantId, page);
        this.orders = response.data.orders;
        this.currentPage = response.data.currentPage;
        this.totalPages = response.data.totalPages;
        this.totalOrders = response.data.totalOrders;
        this.nextPage = response.data.nextPage;
        this.hasNextPage = response.data.hasNextPage;
        this.previousPage = response.data.previousPage;
        this.hasPreviousPage = response.data.hasPreviousPage;
      } catch (error) {
        this.error = String(error);
      }
    },
    async updateOrderStatus(orderId: string, status: string, restaurantId: string) {
      try {
        await orderService.updateOrderStatus(orderId, status);
        this.getOrders(restaurantId);
      } catch (error: unknown) {
        this.error = String(error);
      }
    }
  },
});

export default useOrderStore;