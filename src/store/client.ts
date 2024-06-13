import { defineStore } from 'pinia';

import type { User } from '@/types/user.interface';
import ClientService from '@/services/client';

interface RootState {
  user: User | null;
  error: string | null;
  isLoading: boolean;
}

const clientService = new ClientService();

export const useClientStore = defineStore('ClientStore', {
  state: (): RootState => ({
    user: null,
    error: null,
    isLoading: false,
  }),

  actions: {
    setUser(user: User): void {
      this.user = user;
      clientService.createClient(user);
      console.log('Usuario establecido en ClientStore:', this.user);
    },
    getUser(): User | null {
      return this.user;
    },
    async getUserIDRestaurant() {
      const userSub = this.user?.sub
      if (!userSub) {
        throw new Error('User not found');
      }
      const restaurantID = await clientService.getClientIDRestaurant(userSub)
      return restaurantID;
    }
  }
});

export default useClientStore;