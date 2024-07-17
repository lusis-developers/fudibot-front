import { AxiosResponse } from "axios";

import APIBase from "../base";

import type { Pagoplux, PaymentMethods, Datafast } from '@/interfaces/paymentMethods.interface';

class APIPaymentMethods extends APIBase {
  async putPagopluxClientConfig(data: Pagoplux, restaurantUuid: string): Promise<AxiosResponse<PaymentMethods>> {
    const body = {
      ...data,
      restaurantUuid
    }
    return this.put<PaymentMethods>('update-pagoplux-config', body)
  }

  async getPaymentMethodsByRestaurantUuid(restaurantUuid: string): Promise<AxiosResponse<PaymentMethods>> {
    return await this.get<PaymentMethods>(`payment-methods/${restaurantUuid}`)
  }

  async putDatafastConfig(data: Datafast, restaurantUuid: string): Promise<AxiosResponse<PaymentMethods>> {
    const body = {
      ...data,
      restaurantUuid
    }
    return this.put<PaymentMethods>('update-datafast-config', body)
  }
}

export default APIPaymentMethods;