import { AxiosResponse } from 'axios';

import APIBase from '../base';

import type { Bank } from '@/interfaces/bank.interface';

class APIBank extends APIBase {
  async getBankAccounts(uuid: string): Promise<AxiosResponse> {
    return await this.get(`banks/${uuid}`);
  } 

  async postBank(data: Bank): Promise<AxiosResponse> {
    return await this.post('bank', data);
  }
}


export default APIBank;