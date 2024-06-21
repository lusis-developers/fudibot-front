import { defineStore } from 'pinia';

import APIRestaurant from '@/services/restaurant/restaurant';

import type { Restaurant } from '@/interfaces/restaurant.interface';
import type { Coordinates } from '@/interfaces/coordinates.interface';

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
    async getRestaurantById(id: string): Promise<void> {
      this.isLoading = true;
      try {
        const response = await restaurantService.getRestaurantById(id);
        this.restaurant = response.data;
      } catch (error: unknown) {
        this.error = String(error)
      } finally {
        this.isLoading = false
      }
    },
    addBasicInfo(location: Coordinates, botName: string) {
      console.log(location, botName)
      if (this.restaurant) {
        this.restaurant.botName = botName;
        this.restaurant.location = location
      }
    },
    
  }
});

export default useRestaurantStore;