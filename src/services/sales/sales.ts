import { AxiosResponse } from 'axios';

import APIBase from '../base';

import type { SalesDataItem } from '@/interfaces/sales.interface';

class APISales extends APIBase {
  async getSalesPerMonth(restaurantId: string): Promise<AxiosResponse<SalesDataItem[]>> {
    return await this.get<SalesDataItem[]>(`sales/${restaurantId}`);
  }
}

export default APISales;