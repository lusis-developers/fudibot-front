import { defineStore } from 'pinia';

import { Client } from '@/interfaces/client.interface';

import APIClient from '@/services/client/client';

const clientService = new APIClient();

interface RootState {
  client: Client | null;
  error: string | null;
  isLoading: boolean;
}


export const useClientStore = defineStore('ClientStore', {
  state: (): RootState => ({
    client: null,
    error: null,
    isLoading: false,
  }),

  actions: {
    async createClient(client: Client): Promise<void> {
      this.isLoading = true;
      try {
        const response = await clientService.createClient(client);
        this.client = response?.data;
      } catch (error: unknown) {
        this.error = String(error)
      } finally {
        this.isLoading = false;
      }
    },
    async getClientBySub(clientSub: string): Promise<void> {
      this.isLoading = true;
      try {
        const response = await clientService.getClientBySub(clientSub);
        this.client = response.data;
      } catch (error: unknown) {
        this.error = String(error);
      } finally {
        this.isLoading = false;
      }
    }
  }
});

export default useClientStore;