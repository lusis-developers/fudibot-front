import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth
} from 'firebase/auth';
import { defineStore } from 'pinia';

import { User } from '@/types/user.interface';

const googleAuth = getAuth();
const provider = new GoogleAuthProvider();

provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

interface RootState {
  user: User | null,
  error: string | null
} 

const useAuthStore = defineStore('AuthStore', {
  state: (): RootState => ({
    user: null,
    error: null
  }),

  actions: {
    async getGoogleAuth() {
      try {
        const response = await signInWithPopup(googleAuth, provider);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
  }
});

export default useAuthStore;