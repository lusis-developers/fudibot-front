import { defineStore } from 'pinia';

import type { User } from '@/types/user.interface';

interface RootState {
  user: User | null;
  error: string | null;
  isLoading: boolean;
}

export const useClientStore = defineStore('ClientStore', {
  state: (): RootState => ({
    user: null,
    error: null,
    isLoading: false,
  }),

  actions: {
    setUser(user: User): void {
      this.user = user;
      console.log('Usuario establecido en ClientStore:', this.user);
    },
  }
});

export default useClientStore;