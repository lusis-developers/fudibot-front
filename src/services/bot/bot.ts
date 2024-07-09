import { AxiosResponse } from 'axios';

import APIBase from '../base';

class APIBot extends APIBase {
  async getContainer(botId: string): Promise<AxiosResponse> {
    return await this.get(`container/${botId}`);
  }

  async createContainer(botId: string): Promise<AxiosResponse> {
    return await this.post(`container/${botId}`, {});
  }
}

export default APIBot;