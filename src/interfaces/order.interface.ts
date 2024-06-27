import { OrderStatus } from "@/enum/order.enum"

export interface OrderItem {
  item: string,
  quantity: string,
  price: string
}

export interface Order {
  name: string,
  email: string,
  id: string,
  phone: string,
  order: OrderItem[]
}

export interface OrdersRequested {
  deliveryCost: number,
  items: OrderItem[],
  orderStatus: OrderStatus,
  totalOrder: number,
  userId: string,
  restaurantId: string,
  _id: string
}

export interface OrderResponse {
  currentPage: number,
  totalPages: number,
  totalOrders: number,
  orders: OrdersRequested[],
  hasNextPage: boolean,
  nextPage: number | null,
  hasPreviousPage: boolean, 
  previousPage: number | null,
}