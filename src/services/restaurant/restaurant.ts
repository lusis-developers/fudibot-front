import { AxiosResponse } from 'axios';

import APIBase from '../base';

import type { Restaurant } from '@/interfaces/restaurant.interface';

class APIRestaurant extends APIBase {
  async getRestaurantById(uuid: string): Promise<AxiosResponse<Restaurant>> {
    return this.get<Restaurant>(`restaurant/${uuid}`)
  }
}

export default APIRestaurant;