import {
  createAuth0Client,
  Auth0ClientOptions,
  Auth0Client,
  RedirectLoginOptions
} from '@auth0/auth0-spa-js';

class Auth0Service {
  private auth0Client: Auth0Client | null = null;
  private initPromise: Promise<void> | null = null;
  private domain: string = 'dev-fzn3icmi5a20c452.us.auth0.com' || '';
  private clientId: string = '4dS9j5MWVIyywq1kSz4U6cIhn4qKQ8ta' || '';
  // private clientSecret: string = 'iQBN-5h6R3PRwnRx0hFjouxdh-lrZcDyQ51LNVnDR5TxY1QT3BxIG5GJhVJ0kl9_' || '';
  // private audience: string = 'https://dev-fzn3icmi5a20c452.us.auth0.com/api/v2/' || '';
  // private realm: string = 'Username-Password-Authentication' || '';

  constructor() {
    this.initPromise = this.init();
  }

  private async init(): Promise<void> {
    try {
      const config: Auth0ClientOptions = {
        domain: this.domain,
        clientId: this.clientId,
        authorizationParams: {
          grantType: 'authorization_code',
          redirect_uri: window.location.origin + '/authorize',
          scope: 'openid profile email phone address'
        },
        useRefreshTokens: true,
        cacheLocation: 'localstorage'
      };
  
      this.auth0Client = await createAuth0Client(config);
    } catch (error) {
      console.log('Error initializing Auth0:', error);
    }
  }

  private async ensureClientInitialized(): Promise<void> {
    if (!this.initPromise) {
      this.initPromise = this.init();
    }
    await this.initPromise;
  }

  private async loginWithConnection(connection: string): Promise<void> {
    await this.ensureClientInitialized();
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
    await this.loginWithConnection('google-oauth2');
  }

  async loginWithFacebook(): Promise<void> {
    await this.loginWithConnection('facebook');
  }

  async handleRedirectCallback(): Promise<void> {
    await this.ensureClientInitialized();
    if (this.auth0Client) {
      await this.auth0Client.handleRedirectCallback();
      window.history.replaceState(
        {},
        document.title,
        window.location.pathname
      );
    }
  }

  async isAuthenticated(): Promise<boolean> {
    await this.ensureClientInitialized();
    if (this.auth0Client) {
      return await this.auth0Client.isAuthenticated();
    }
    const accessToken = localStorage.getItem('access_token');
    return !!accessToken;
  }

  async getUser(): Promise<any> {
    await this.ensureClientInitialized();
    if (this.auth0Client) {
      return await this.auth0Client.getUser();
    }
    return null;
  }

  logout(): void {
    if (this.auth0Client) {
      this.auth0Client.logout({
        logoutParams: {
          returnTo: window.location.origin
        }
      });
    }
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
  }

  // async loginWithUsernameAndPassword(username: string, password: string): Promise<any> {
  //   try {
  //     const response = await fetch(`https://${this.domain}/oauth/token`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         grant_type: 'password',
  //         username,
  //         password,
  //         audience: this.audience,
  //         scope: 'openid profile email',
  //         client_id: this.clientId,
  //         client_secret: this.clientSecret,
  //         realm: this.realm
  //       })
  //     });
  
  //     const data = await response.json();
  //     if (data.error) {
  //       throw new Error(data.error_description);
  //     }
  
  //     localStorage.setItem('access_token', data.access_token);
  //     localStorage.setItem('id_token', data.id_token);
      
  //     return data;
  //   } catch (error) {
  //     console.error('Login failed:', error);
  //     throw error;
  //   }
  // }

  // async registerUser(email: string, password: string): Promise<any> {
  //   try {
  //     const response = await fetch(`https://${this.domain}/dbconnections/signup`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         client_id: this.clientId,
  //         email,
  //         password,
  //         connection: this.realm
  //       })
  //     });

  //     const data = await response.json();
  //     if (data.statusCode === 404 || data.statusCode === 400) {
  //       const errorMessage = data.description || 'Unknown error';
  //       throw new Error(errorMessage);
  //     }

  //     return data;
  //   } catch (error: unknown) {
  //     const errorMessage = (error as { description: string }).description || 'Unknown error';
  //     throw new Error(errorMessage);
  //   }
  // }
}

export default Auth0Service;
