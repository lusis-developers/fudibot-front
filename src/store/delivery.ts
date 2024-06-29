import { defineStore } from 'pinia';

import APIDelivery from '@/services/delivery/delivery';

import type { AddOrEditFleetDetail, Delivery, HasOwnFleet } from '@/interfaces/delivery.interface';

interface RootState {
  delivery: Delivery | null;
  error: string | null;
};

const deliveryService = new APIDelivery();

const useDeliveryStore = defineStore("DeliveryStore", {
  state: (): RootState => ({
    delivery: null,
    error: null
  }),

  actions: {
    async getDeliveryData(id: string) {
      try {
        const response = await deliveryService.getDeliveryData(id);
        this.delivery = response.data;
        console.log('this delivery: ', this.delivery);
      } catch (error) {
        this.error = String(error);
      };
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
        const response = await deliveryService.addGeneralDeliveryCost(data);
        if(this.delivery) {
          this.delivery.fleetDetails = response.data;
        }
      } catch(error) {
        this.error = String(error);
      };
    },
  }
});

export default useDeliveryStore;