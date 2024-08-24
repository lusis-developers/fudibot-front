import { defineStore } from 'pinia';

import APISales from '@/services/sales/sales';

import type { SalesDataItem } from '@/interfaces/sales.interface';

const salesService = new APISales();

interface RootState {
  salesPerMonth: SalesDataItem[] | null;
  currentMonthRevenue: number | null,
  ordersOpen: number | null,
  salesMonthClosed: number | null,
  error: string | null;
  isLoading: boolean;
};

const useSalesStore = defineStore('SalesStore', {
  state: (): RootState => ({
    salesPerMonth: null,
    currentMonthRevenue: null,
    ordersOpen: null,
    salesMonthClosed: null,
    error: null,
    isLoading: false,
  }),

  actions: {
    async getSalesPerMonth(restaurantId: string): Promise<void> {
      this.isLoading = true;
      try {
        const response = await salesService.getSalesPerMonth(restaurantId);
        this.salesPerMonth = response.data.annualSalesByMonth.map((sale) => {
          return {
            ...sale,
            revenue: (sale.revenue / 100)
          }
        });
      } catch (error: unknown) {
        this.error = String(error);
      } finally {
        this.isLoading = false;
      }
    },
    async getSalesCurrentMonth(restaurantId: string): Promise<void> {
      this.isLoading = true;
      try {
        const response = await salesService.getSalesCurrentMonth(restaurantId);
        this.ordersOpen = response.data.ordersOpen;
        this.salesMonthClosed = response.data.salesMonthClosed;
        this.currentMonthRevenue = response.data.currentMonthRevenue;
      } catch (error: unknown) {
        this.error = String(error);
      } finally {
        this.isLoading = false;
      }
    },
  }
})

export default useSalesStore;
