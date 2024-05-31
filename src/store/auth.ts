import { defineStore } from 'pinia';

import { googleProvider, auth } from '@/config/firebase';
import { signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth';

import type { User } from '@/types/user.interface';

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
        const response = await signInWithPopup(auth, googleProvider);
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
        auth,
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
        await firebaseSignOut(auth);
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