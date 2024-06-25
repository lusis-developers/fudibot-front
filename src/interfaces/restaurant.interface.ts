import { Bank } from './bank.interface';
import type { Coordinates } from './coordinates.interface';
import type { Drink } from './drink.interface';
import type { Meal } from './meal.interface';

export interface Restaurant {
  _id: string,
  botName: string,
  location: Coordinates,
  manager: string,
  email: string,
  companyName: string,
  phone: string,
  schedule: Schedule[],
  logo: string,
  website: string,
  uuid: string,
  meals?: Meal[] | string[],
  drinks?: Drink[] | string[], 
  bankSettings?: Bank[]| string[],
}

export interface Schedule {
  day: string,
  open: string,
  close: string
}