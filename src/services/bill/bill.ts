import { AxiosResponse } from 'axios';

import APIBase from '../base';

import type { Bill } from '@/interfaces/bill.interface';


class APIBill extends APIBase {
  async updateBill(billId: string, bill: Bill ): Promise<AxiosResponse<Bill>> {
    return await this.patch<Bill>(`bill/${billId}`, bill);
  }

  async getBillById(billId: string): Promise<AxiosResponse<Bill>> {
    return await this.get<Bill>(`bill/${billId}`);
  }
}

export default APIBill;