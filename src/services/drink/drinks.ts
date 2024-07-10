import { AxiosResponse } from 'axios';

import APIBase from '../base';

import type { Drink } from '@/interfaces/drink.interface';
import type { Image } from '@/interfaces/file.interface';

class APIDrink extends APIBase {
  async addDrinks(drink: Drink): Promise<AxiosResponse<Drink>> {
    return this.post<Drink>('drinks', drink);
  }

  async addDrinkImage(image: File): Promise<AxiosResponse<Image>> {
    return this.uploadFile<Image>(`drinks-image`, image);
  }

  async removeDrink(drinkId: string) {
    return this.delete(`drinks/${drinkId}`);
  }

  async getDrinks(uuid: string, page: number = 1): Promise<AxiosResponse> {
    return await this.get(`restaurant/${uuid}/drinks?page=${page}`);
  }
}

export default APIDrink;