import { defineStore } from 'pinia';

import type { Order } from '@/interfaces/order.interface';

interface RootState {
  orders: Order[];
  error: string | null;
}

// const drinkService = new APIDrink();

const useOrderStore = defineStore("OrderStore", {
  state: (): RootState => ({
    orders: [],
    error: null,
  }),

  actions: {
    async getOrders(restaurantId: string): Promise<void> {
      try {
        console.log(restaurantId);
      } catch (error) {
        console.log(error);
      }
    }
  },
});

export default useOrderStore;