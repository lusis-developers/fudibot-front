export interface Pagoplux {
  restaurantRUC: string;
  clientToken: string;
};
interface Payphone {
  clientToken: string;
}

export interface PaymentMethods {
  pagoplux: Pagoplux;
  payphone: Payphone
}