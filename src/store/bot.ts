import { defineStore } from 'pinia';

import APIBot from '@/services/bot/bot';
import { AxiosError } from 'axios';

interface RootState {
  status: any | null;
  isLoading: boolean;
  error: AxiosError | null;
}

const botService = new APIBot();

const useBotStore = defineStore("BotStore", {
  state: (): RootState => ({
    status: null,
    error: null,
    isLoading: false
  }),

  actions: {
    async getBot(botId: string): Promise<void> {
      this.isLoading = true;
      try {
        const response = await botService.getContainer(botId);
        this.status = response.data;
      } catch (error: unknown) {
        this.error = error as AxiosError;
      } finally {
        this.isLoading = false;
      }
    },
    async createBot(botId: string): Promise<void> {
      this.isLoading = true;
      try {
        await botService.createContainer(botId);
        this.getBot(botId);
      } catch (error: unknown) {
        this.error = error as AxiosError;
      } finally {
        this.isLoading = false;
      }
    },
    async deleteBot(botId: string): Promise<void> {
      this.isLoading = true;
      try {
        await botService.removeContainer(botId);
      } catch (error: unknown) {
        this.error = error as AxiosError;
      } finally {
        this.status = null;
        this.isLoading = false;
      }
    }
  },
});

export default useBotStore;