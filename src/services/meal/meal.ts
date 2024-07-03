import { AxiosResponse } from 'axios';

import APIBase from '../base';

import type { Image } from '@/interfaces/file.interface';
import type { Meal } from '@/interfaces/meal.interface';

class APIMeal extends APIBase {
  async addMeals(meal: Meal): Promise<AxiosResponse<Meal>> {
    return this.post('meals', meal);
  }
  
  async addMealImage(image: File): Promise<AxiosResponse<Image>> {
    return this.uploadFile<Image>(`meals-image`, image);
  }

  async removeMeal(mealId: string) {
    return this.delete(`meals/${mealId}`);
  }

  async getMeals(uuid: string, page: number = 1): Promise<AxiosResponse> {
    return await this.get(`restaurant/${uuid}/meals?page=${page}`);
  }
}

export default APIMeal;