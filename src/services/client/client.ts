import { AxiosResponse } from 'axios';

import APIBase from '../base';

import type { Client } from '@/interfaces/client.interface';

class APIClient extends APIBase {
  async createClient(client: Client): Promise<AxiosResponse<Client>> {
    return await this.post<Client>('client', client);
  }

  async getClientBySub(sub: string): Promise<AxiosResponse<Client>> {
    return await this.get<Client>(`client/${sub}`);
  }
}

export default APIClient;