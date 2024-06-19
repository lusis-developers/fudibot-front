import { CurrencyEnum } from '@/enum/currency.enum';

export interface Drink {
  item: string;
  price: number;
  currency: CurrencyEnum;
}