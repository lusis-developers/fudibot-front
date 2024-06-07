import { defineStore } from 'pinia';
import Auth0Service from '@/services/auth';
import type { User } from '@/types/user.interface';
import useClientStore from './client';

const auth0Service = new Auth0Service();

interface RootState {
  user: User | null;
  error: string | null;
}

const useAuthStore = defineStore('AuthStore', {
  state: (): RootState => ({
    user: null,
    error: null
  }),

  actions: {
    async loginWithGoogle(): Promise<void> {
      try {
        await auth0Service.loginWithGoogle();
      } catch (error: unknown) {
        if (error instanceof Error) {
          this.error = error.message;
        } else {
          this.error = String(error);
        }
      }
    },
    async loginWithFacebook(): Promise<void> {
      try {
        await auth0Service.loginWithFacebook();
      } catch (error: unknown) {
        if (error instanceof Error) {
          this.error = error.message;
        } else {
          this.error = String(error);
        }
      }
    },
    async handleAuthCallback(): Promise<void> {
      try {
        await auth0Service.handleRedirectCallback();
        await this.checkAuth();
      } catch (error: unknown) {
        if (error instanceof Error) {
          this.error = error.message;
        } else {
          this.error = String(error);
        }
      }
    },
    async checkAuth(): Promise<void> {
      try {
        const isAuthenticated = await auth0Service.isAuthenticated();
        if (isAuthenticated) {
          const user = await auth0Service.getUser();
          this.user = {
            sub: user.sub,
            name: user.name,
            email: user.email,
            picture: user.picture,
            email_verified: user.email_verified,
          };
          const clientStore = useClientStore();
          clientStore.setUser(this.user)
        } else {
          this.user = null;
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          this.error = error.message;
        } else {
          this.error = String(error);
        }
      }
    },
    async signOut(): Promise<void> {
      try {
        auth0Service.logout();
        this.user = null;
      } catch (error: unknown) {
        if (error instanceof Error) {
          this.error = error.message;
        } else {
          this.error = String(error);
        }
      }
    },
  }
});

export default useAuthStore;
