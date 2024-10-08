import { defineStore } from 'pinia';

import APIDelivery from '@/services/delivery/delivery';

import type { AddOrEditFleetDetail, Delivery, HasOwnFleet } from '@/interfaces/delivery.interface';

interface RootState {
  delivery: Delivery | null;
  error: string | null;
  isLoading: boolean,
};

const deliveryService = new APIDelivery();

const useDeliveryStore = defineStore("DeliveryStore", {
  state: (): RootState => ({
    delivery: null,
    error: null,
    isLoading: false,
  }),

  actions: {
    async getDeliveryData(id: string) {
      this.isLoading = true
      try {
        const response = await deliveryService.getDeliveryData(id);
        this.delivery = response.data;
      } catch (error) {
        this.error = String(error);
      } finally {
        this.isLoading = false
      }
    },
    async postHasOwnFleet(data: HasOwnFleet) {
      try {
        await deliveryService.postHasOwnFleet(data);
      } catch (error) {
        this.error = String(error);
      };
    },
    async addFleetDetail(data: AddOrEditFleetDetail) {
      try {
        const response = await deliveryService.addFleetDetail(data);
        this.delivery = response.data;
      } catch (error) {
        this.error = String(error);
      }
    },
    async deleteFleetDetail(deliveryId: string, fleetId: string) {
      try {
        const response = await deliveryService.deleteFleetDetail(deliveryId, fleetId);
        this.delivery = response.data;
      } catch (error) {
        this.error = String(error); 
      };
    },
    async addGeneralDeliveryCost(data: {id: string, generalDeliveryCost: number}) {
      try {
        await deliveryService.addGeneralDeliveryCost(data);
      } catch(error) {
        this.error = String(error);
      };
    },
    async createBooking(restaurantUuid: string, data: { from: string, name: string }) {
      try {
        const response = await deliveryService.createBooking(restaurantUuid, data);
        return response.data;
      } catch (error) {
        this.error = String(error);
      };
    },
  }
});

export default useDeliveryStore;