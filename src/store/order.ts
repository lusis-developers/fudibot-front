import { defineStore } from 'pinia';

import type { OrdersRequested, OrderSchedule } from '@/interfaces/order.interface';
import APIOrder from '@/services/order/order';
import { AxiosError } from 'axios';

interface RootState {
  orders: OrdersRequested[];
  currentPage: number;
  totalPages: number;
  totalOrders: number;
  hasNextPage: boolean;
  nextPage: number | null;
  hasPreviousPage: boolean;
  previousPage: number | null;
  error: AxiosError | null;
  orderScheduled: OrdersRequested | null;
  isLoading: boolean;
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
    orderScheduled: null,
    isLoading: false,
  }),

  actions: {
    async getOrders(restaurantId: string, page: number = 1, scheduledDelivery: boolean): Promise<void> {
      this.isLoading = true;
      try {
        const response = await orderService.getOrders(restaurantId, page, scheduledDelivery);
        this.orders = response.data.orders;
        this.currentPage = response.data.currentPage;
        this.totalPages = response.data.totalPages;
        this.totalOrders = response.data.totalOrders;
        this.nextPage = response.data.nextPage;
        this.hasNextPage = response.data.hasNextPage;
        this.previousPage = response.data.previousPage;
        this.hasPreviousPage = response.data.hasPreviousPage;
      } catch (error) {
        this.error = error as AxiosError;
      } finally {
        this.isLoading = false;
      }
    },
    async updateOrderStatus(orderId: string, status: string, restaurantId: string, scheduledDelivery: boolean) {
      try {
        await orderService.updateOrderStatus(orderId, status);
        this.getOrders(restaurantId, this.currentPage, scheduledDelivery);
      } catch (error: unknown) {
        this.error = error as AxiosError;
      }
    },
    async updateOrderScheduled(orderId: string, schedule: Pick<OrderSchedule, 'date' | 'time'>): Promise<void> {
      try {
        await orderService.patchOrderSchedule(orderId, schedule);
        this.getOrderById(orderId);
      } catch (error: unknown) {
        this.error = error as AxiosError;
      }
    },
    async getOrderById(orderId: string): Promise<void> {
      try {
        const response = await orderService.getOrderById(orderId);
        this.orderScheduled = response.data;
      } catch (error: unknown) {
        this.error = error as AxiosError;
      }
    }
  },
});

export default useOrderStore;