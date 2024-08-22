import { defineStore } from 'pinia';

import APISales from '@/services/sales/sales';

import type { SalesDataItem } from '@/interfaces/sales.interface';

const salesService = new APISales();

interface RootState {
  salesPerMonth: SalesDataItem[] | null;
  error: string | null;
  isLoading: boolean;
};

const useSalesStore = defineStore('SalesStore', {
  state: (): RootState => ({
    salesPerMonth: null,
    error: null,
    isLoading: false,
  }),

  actions: {
    async getSalesPerMonth(restaurantId: string): Promise<void> {
      this.isLoading = true;
      try {
        const response = await salesService.getSalesPerMonth(restaurantId);
        this.salesPerMonth = response.data;
      } catch (error: unknown) {
        this.error = String(error);
      } finally {
        this.isLoading = false;
      }
    },
  }
})

export default useSalesStore;
