import { defineStore } from 'pinia';

import type { Order } from '@/interfaces/order.interface';
import APIOrder from '@/services/order/order';

interface RootState {
  orders: Order[];
  currentPage: number;
  total: number;
  totalOrders: number;
  error: string | null;
}

const orderService = new APIOrder();

const useOrderStore = defineStore("OrderStore", {
  state: (): RootState => ({
    orders: [],
    currentPage: 1,
    total: 1,
    totalOrders: 1,
    error: null,
  }),

  actions: {
    async getOrders(restaurantId: string): Promise<void> {
      try {
        const response = await orderService.getOrders(restaurantId);
        this.orders = response.data.orders;
        this.currentPage = response.data.currentPage;
        this.total = response.data.total;
        this.totalOrders = response.data.totalOrders;
      } catch (error) {
        this.error = String(error);
      }
    }
  },
});

export default useOrderStore;