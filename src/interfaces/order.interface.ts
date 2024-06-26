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