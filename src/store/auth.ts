import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  onAuthStateChanged
} from 'firebase/auth';
import { defineStore } from 'pinia';

import type { User } from '@/types/user.interface';

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
    async getGoogleAuth(): Promise<void> {
      try {
        const response = await signInWithPopup(googleAuth, provider);
        if (response.user) {
          this.user = {
            uid: response.user.uid,
            displayName: response.user.displayName,
            email: response.user.email,
            photoURL: response.user.photoURL,
            phoneNumber: response.user.phoneNumber,
            emailVerified: response.user.emailVerified
          }
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          this.error = error?.message;
        } else {
          this.error = String(error);
        }
      }
    },
    async checkAuth(): Promise<void> {
      onAuthStateChanged(
        googleAuth,
        (user) => {
          if (user) {
            this.user = {
              uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
              phoneNumber: user.phoneNumber,
              emailVerified: user.emailVerified
            }
          } else {
            this.user = null;
          }
        }
      )
    },
    async signOut(): Promise<void> {
      try {
        await googleAuth.signOut();
        this.user = null;
      } catch (error: unknown) {
        if (error instanceof Error) {
          this.error = error?.message;
        } else {
          this.error = String(error);
        }
      }
    },
  }
});

export default useAuthStore;