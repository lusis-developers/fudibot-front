import { CurrencyEnum } from '@/enum/currency.enum';

export interface Drink {
  companyName: string;
  item: string;
  price: number;
  image: string;
  currency: CurrencyEnum;
  description: string;
  _id?: string;
  uuid?: string;
}