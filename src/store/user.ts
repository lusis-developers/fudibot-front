import { defineStore } from 'pinia';

import APIUser from '@/services/user/user';

import type { User } from '@/interfaces/user.interface';

const userService = new APIUser();

interface RootState {
  user: User | null;
  error: string | null;
  isLoading: boolean;
};

const useUserStore = defineStore('UserStore', {
  state: (): RootState => ({
    user: null,
    error: null,
    isLoading: false,
  }),

  actions: {
    async getUser(userId: string): Promise<void> {
      this.isLoading = true;
      try {
        const response = await userService.getUserById(userId);
        this.user = response.data;
      } catch (error: unknown) {
        this.error = String(error);
      } finally {
        this.isLoading = false;
      }
    },
  }
})

export default useUserStore;
