import { defineStore } from 'pinia';

import APIRestaurant from '@/services/restaurant/restaurant';

import type { Restaurant, Schedule } from '@/interfaces/restaurant.interface';
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
    addBasicInfo(location: Coordinates, botName: string): void {
      console.log(location, botName)
      if (this.restaurant) {
        this.restaurant.botName = botName;
        this.restaurant.location = location
      }
    },
    addContactInfo(email: string, phone: string) {
      if (this.restaurant) {
        this.restaurant.email = email;
        this.restaurant.phone = phone
      }
    },
    addCompanyData(restaurantName: string, schedule: Schedule[]): void {
      if (this.restaurant) {
        this.restaurant.companyName = restaurantName,
        this.restaurant.schedule = schedule
      }
    },
    async postRestaurantLogo(imageFile: File): Promise<void> {
      try {
        const response =  await restaurantService.postAddRestaurantLogo(imageFile);
        if (this.restaurant) {
          this.restaurant.logo = response.data.url;
        }
      } catch (error) {
        this.error = String(error);
      }
    },
    addWebAndManager(website: string, manager: string) {
      if (this.restaurant) {
        this.restaurant.manager = manager;
        this.restaurant.website = website;
      }
    }
  }
});

export default useRestaurantStore;