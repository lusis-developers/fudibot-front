import { defineStore } from 'pinia';

import APIBank from '@/services/bank/bank';

import type { Bank } from '@/interfaces/bank.interface';

interface RootState {
  bankAccounts: Bank[];
  error: string | null;
}

const bankService = new APIBank();

const useBankStore = defineStore("BankStore", {
  state: (): RootState => ({
    bankAccounts: [],
    error: null,
  }),

  actions: {
    async getBanks(uuid: string) {
      try {
        const response = await bankService.getBankAccounts(uuid);
        this.bankAccounts = response.data;
      } catch (error: unknown) {
        this.error = String(error);
      }
    },
    async postBank(data: Bank, uuid: string): Promise<void> {
      try {
        await bankService.postBank({ ...data, uuid });
        this.getBanks(uuid);
      } catch (error: unknown) {
        this.error = String(error);
      }
    },
  },
});

export default useBankStore;