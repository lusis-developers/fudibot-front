import { defineStore } from 'pinia';
import { AxiosError } from 'axios';

import APIBill from '@/services/bill/bill';
import { Bill } from '@/interfaces/bill.interface';

interface RootState {
  bill: Bill | null;
  isLoading: boolean;
  error: AxiosError | null;
}

const billService = new APIBill();

const useBillStore = defineStore("BillStore", {
  state: (): RootState => ({
    bill: null,
    error: null,
    isLoading: false,
  }),

  actions: {
    async updateBill(billId: string, bill: Pick<Bill, 'name' | 'documentType' | 'documentNumber' | 'email' >): Promise<void> {
      this.isLoading = true;
      try {
        const data = {
          ...bill,
          isSent: true
        }
        const response = await billService.updateBill(billId, data);
        this.bill = response.data;
        this.getBillById(billId);
      } catch (error: unknown) {
        this.error = error as AxiosError;
      } finally {
        this.isLoading = false;
      }
    },
    async getBillById(billId: string): Promise<void> {
      try {
        const response = await billService.getBillById(billId);
        this.bill = response.data;
      } catch (error: unknown) {
        this.error = error as AxiosError;
      }
    },
    async sendCreateBill(restaurantId: string, billId: string, from: string): Promise<void> {
      this.isLoading = true;
      try {
        await billService.sendCreateBill(restaurantId, billId, from);
      } catch (error: unknown) {
        this.error = error as AxiosError;
      } finally {
        this.isLoading = false;
      }
    }
  },
});

export default useBillStore;