export interface SalesDataItem {
  year: string;
  month: string;
  revenue: number;
}

export interface SalesOrders {
  annualSalesByMonth: SalesDataItem[]
}