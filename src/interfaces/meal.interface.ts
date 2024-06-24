import { CurrencyEnum } from '@/enum/currency.enum';

export interface Meal {
  companyName: string;
  item: string;
  price: number;
  image: string;
  currency: CurrencyEnum;
  description: string;
}