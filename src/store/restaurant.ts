import { defineStore } from 'pinia';

import APIRestaurant from '@/services/restaurant/restaurant';

import type { Restaurant } from '@/interfaces/restaurant.interface';
import { Coordinates } from '@/interfaces/coordinates.interface';

const restaurantService = new APIRestaurant();

interface RootState {
  restaurant: Restaurant | null;
  error: string | null;
  isLoading: boolean;
}


export const useRestaurantStore = defineStore('RestaurantStore', {
  state: (): RootState => ({
    restaurant: null,
    error: null,
    isLoading: false,
  }),

  actions: {
    async getRestaurantById(uuid: string): Promise<void> {
      this.isLoading = true;
      try {
        const response = await restaurantService.getRestaurantById(uuid);
        this.restaurant = response.data;
      } catch (error: unknown) {
        this.error = String(error)
      } finally {
        this.isLoading = false
      }
    },
    addBasicInfo(email: string, location: Coordinates, botName: string) {
      console.log(email, location, botName)
    }
  }
});

export default useRestaurantStore;