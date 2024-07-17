import { UserStatusEnum } from '@/enum/user.enum';

import type { Coordinates } from './coordinates.interface';


export interface User {
  number: string;
  name: string;
  status: UserStatusEnum;
  purchases: [];
  historyOrder: [];
  currentOrderDetail: Record<string, any>;
  purchaseCounter: number;
  currentLocation: Coordinates;
  successfulOrders: string;
  currentBill: string;
}