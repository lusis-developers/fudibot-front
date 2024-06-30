import { defineStore } from 'pinia';

import APIBill from '@/services/bill/bill';
import { Bill } from '@/interfaces/bill.interface';

interface RootState {
  bill: Bill | null;
  isLoading: boolean;
  error: string | null;
}

const billService = new APIBill();

const useBillStore = defineStore("BillStore", {
  state: (): RootState => ({
    bill: null,
    error: null,
    isLoading: false
  }),

  actions: {
    async updateBill(billId: string, bill: Bill): Promise<void> {
      this.isLoading = true;
      try {
        const response = await billService.updateBill(billId, bill);
        this.bill = response.data;
        console.log(this.bill);
      } catch (error: unknown) {
        this.error = String(error);
      } finally {
        this.isLoading = false;
      }
    }
  },
});

export default useBillStore;