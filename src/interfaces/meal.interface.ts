import { CurrencyEnum } from '@/enum/currency.enum';

export interface Meal {
  item: string;
  price: number;
  currency: CurrencyEnum;
}