import { AxiosResponse } from 'axios';

import APIBase from '../base';

import type { Client } from '@/interfaces/client.interface';

class APIAuth extends APIBase {
  async registerClient(client: Pick<Client, 'email' | 'family_name' | 'password' | 'name'>): Promise<AxiosResponse<Client>> {
    return await this.post<Client>('auth/register-client', client)
  }

  async loginClient(client: Pick<Client, 'email' | 'password'>): Promise<AxiosResponse<Client>> {
    return await this.post<Client>('auth/client-login', client)
  }

  async getClientSession(token: string): Promise<AxiosResponse<Client>> {
    const headers = {
      ...this.getHeaders(),
      'Authorization': `Bearer ${token}`
    };
    return await this.get<Client>('auth/session', headers);
  }
}

export default APIAuth;