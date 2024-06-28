import { OrderStatus } from '@/enum/order.enum';

export const statusAvailable = [
  {
    status: OrderStatus.OPEN,
    nameDisplayed: 'Abierto'
  },
  {
    status: OrderStatus.PREPARING,
    nameDisplayed: 'Preparando'
  },
  {
    status: OrderStatus.ON_THE_WAY,
    nameDisplayed: 'En camino'
  },
  {
    status: OrderStatus.CANCELLED_BY_RESTAURANT,
    nameDisplayed: 'Cancelado'
  },
]