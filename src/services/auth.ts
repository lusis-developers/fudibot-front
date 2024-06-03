import {
  createAuth0Client,
  Auth0ClientOptions,
  Auth0Client,
  RedirectLoginOptions
} from '@auth0/auth0-spa-js';

class Auth0Service {
  private auth0Client: Auth0Client | null = null;

  constructor() {
    this.init();
  }

  async init(): Promise<void> {
    try {
      const config: Auth0ClientOptions = {
        domain: 'dev-rtlzfsmq8fzuo8xt.us.auth0.com', // Usa tu dominio Auth0 real aquí
        clientId: 'MKec3hnxog79HvHqal3Mh3G1am5N6qFU',
        authorizationParams: {
          grandType: 'authorization_code',
          redirect_uri: 'http://localhost:5173/authorize',
          scope: 'openid profile email phone address'
        },
        useRefreshTokens: true, // Habilita el uso de refresh tokens
        cacheLocation: 'localstorage'
      }
  
      this.auth0Client = await createAuth0Client(config);
    } catch (error) {
      console.log('error', error)
    }

  }

  private async loginWithConnection(connection: string): Promise<void> {
    if (this.auth0Client) {
      const options: RedirectLoginOptions = {
        authorizationParams: {
          connection
        }
      };

      await this.auth0Client.loginWithRedirect(options);
    }
  }

  async loginWithGoogle(): Promise<void> {
    console.log('oath', this.auth0Client);
    await this.loginWithConnection('google-oauth2');
  }

  async loginWithFacebook(): Promise<void> {
    await this.loginWithConnection('facebook');
  }

  async handleRedirectCallback(): Promise<void> {
    if (this.auth0Client) {
      await this.auth0Client.handleRedirectCallback();
      window.history.replaceState(
        {},
        document.title,
        window.location.pathname
      )
    }
  }

  async isAuthenticated(): Promise<boolean> {
    if (this.auth0Client) {
      return await this.auth0Client.isAuthenticated();
    }
    return false;
  }

  async getUser(): Promise<any> {
    if (this.auth0Client) {
      return await this.auth0Client.getUser();
    }
    return null;
  }

  logout(): void {
    if (this.auth0Client) {
      this.auth0Client.logout({
        logoutParams: {
          returnTo: 'http://localhost:5173'
        }
      })
    }
  }
}

export default Auth0Service;
