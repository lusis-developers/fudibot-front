import { defineStore } from 'pinia';

import Auth0Service from '@/services/auth/auth0';

import { Client } from '@/interfaces/client.interface';

const auth0Service = new Auth0Service();

interface RootState {
  error: string | null;
}

const useAuthStore = defineStore('AuthStore', {
  state: (): RootState => ({
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
    async registerWithCredentials(email: string, password: string): Promise<void> {
      try {
        await auth0Service.registerUser(email, password);
      } catch (error: unknown) {
        this.error = String(error);
      }
    },
    async loginWithCredentials(email: string, password: string): Promise<void> {
      try {
        await auth0Service.loginWithUsernameAndPassword(email, password);
      } catch (error: unknown) {
        if (error instanceof Error) {
          this.error = error.message;
        } else {
          this.error = String(error);
        }
      }
    },
    // TODO: WAITING FOR DEVELOPER CREDENTIALS
    // async loginWithFacebook(): Promise<void> {
    //   try {
    //     await auth0Service.loginWithFacebook();
    //   } catch (error: unknown) {
    //     if (error instanceof Error) {
    //       this.error = error.message;
    //     } else {
    //       this.error = String(error);
    //     }
    //   }
    // },
    async handleAuthCallback(): Promise<Client | null> {
      try {
        await auth0Service.handleRedirectCallback();
        return await this.checkAuth();
      } catch (error: unknown) {
        if (error instanceof Error) {
          this.error = error.message;
        } else {
          this.error = String(error);
        }
        return null;
      }
    },
    async checkAuth(): Promise<Client | null> {
      try {
        const isAuthenticated = await auth0Service.isAuthenticated();
        if (isAuthenticated) {
          const response = await auth0Service.getUser();
          const client = {
            sub: response.sub,
            name: response.name,
            email: response.email,
            picture: response.picture,
            email_verified: response.email_verified,
            nickname: response.nickname,
            family_name: response.family_name,
            given_name: response.given_name
          };
          return client;
        } else {
          return null;
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          this.error = error.message;
        } else {
          this.error = String(error);
        }
        return null;
      }
    },
    async signOut(): Promise<void> {
      try {
        auth0Service.logout();
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
