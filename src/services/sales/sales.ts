import { AxiosResponse } from 'axios';

import APIBase from '../base';

import type { SalesOrders } from '@/interfaces/sales.interface';

class APISales extends APIBase {
  async getSalesPerMonth(restaurantId: string): Promise<AxiosResponse<SalesOrders>> {
    return await this.get<SalesOrders>(`sales-monthly/${restaurantId}`);
  }
}

export default APISales;