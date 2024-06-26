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

export interface OrderResponse {
  currentPage: number,
  total: number,
  totalOrders: number,
  orders: Order[],
  hasNextPage: boolean,
  nextPage: number | null,
  hasPreviousPage: boolean
  previousPage: number | null,
}