import type { Bank } from './bank.interface';
import type { Coordinates } from './coordinates.interface';
import type { Drink } from './drink.interface';
import type { Meal } from './meal.interface';
import type { PaymentMethods } from './paymentMethods.interface';

export interface Restaurant {
  _id: string,
  botName: string,
  location: Coordinates,
  uuid: string,
  manager: string,
  email: string,
  paymentMethods?: PaymentMethods;
  companyName: string,
  phone: string,
  schedule: Schedule[],
  logo: string,
  website: string,
  meals?: Meal[] | string[],
  drinks?: Drink[] | string[], 
  bankSettings?: Bank[]| string[],
  createdAt: string,
  updatedAt: string,
}

export interface Schedule {
  day: string,
  open: string,
  close: string
}