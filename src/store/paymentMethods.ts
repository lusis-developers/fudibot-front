import { defineStore } from "pinia";

import APIPaymentMethods from "@/services/paymentMethods/paymentMethods";

import type { Datafast, Pagoplux, PaymentMethods } from "@/interfaces/paymentMethods.interface";

const paymentMethodsService = new APIPaymentMethods();

interface RootState {
  paymentMethods: PaymentMethods | null;
  error: string | null;
  isLoading: boolean;
};

const usePaymentMethodsStore = defineStore('PaymentMethodsStore', {
  state: (): RootState => ({
    paymentMethods: null,
    error: null,
    isLoading: false,
  }),

  actions: {
    async putPagopluxData(data: Pagoplux, restaurantUuid: string): Promise<void> {
      this.isLoading = true;
      try {
        await paymentMethodsService.putPagopluxClientConfig(data, restaurantUuid);
        this.getPaymentMethods(restaurantUuid);
      } catch (error: unknown) {
        this.error = String(error);
      } finally {
        this.isLoading = false;
      }
    },
    async getPaymentMethods(restaurantUuid: string): Promise<void> {
      this.isLoading = true;
      try {
        const response = await paymentMethodsService.getPaymentMethodsByRestaurantUuid(restaurantUuid);
        this.paymentMethods = response.data;
      } catch(error) {
        this.error = String(error);
      } finally {
        this.isLoading = false;
      };
    },
    async putDatafastData(data: Datafast, restaurantUuid: string): Promise<void> {
      this.isLoading = true;
      try {
        await paymentMethodsService.putDatafastConfig(data, restaurantUuid);
        this.getPaymentMethods(restaurantUuid);
      } catch (error: unknown) {
        this.error = String(error);
      } finally {
        this.isLoading = false;
      }
    },
  }
})

export default usePaymentMethodsStore;
