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
}

export default APIAuth;