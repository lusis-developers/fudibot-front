import { AxiosResponse } from 'axios';

import APIBase from '../base';

import type { currentMonthDetails, SalesOrders } from '@/interfaces/sales.interface';

class APISales extends APIBase {
  async getSalesPerMonth(restaurantId: string): Promise<AxiosResponse<SalesOrders>> {
    return await this.get<SalesOrders>(`sales-monthly/${restaurantId}`);
  }

  async getSalesCurrentMonth(restaurantId: string): Promise<AxiosResponse<currentMonthDetails>> {
    return await this.get<currentMonthDetails>(`sales-current-month/${restaurantId}`);
  }
}

export default APISales;