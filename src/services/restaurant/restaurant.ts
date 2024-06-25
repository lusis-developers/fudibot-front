import { AxiosResponse } from 'axios';

import APIBase from '../base';

import type { Restaurant } from '@/interfaces/restaurant.interface';
import { Image } from '@/interfaces/file.interface';

class APIRestaurant extends APIBase {
  async getRestaurantById(uuid: string): Promise<AxiosResponse<Restaurant>> {
    return this.get<Restaurant>(`restaurant/${uuid}`)
  }

  async postAddRestaurantLogo(imageFile: File): Promise<AxiosResponse<Image>> {
    return await this.uploadFile<Image>('restaurant-logo', imageFile)
  }

  async patchRestaurantData(data: Restaurant): Promise<AxiosResponse<Restaurant>> {
    return await this.patch<Restaurant>('restaurant', data);
  }
}

export default APIRestaurant;