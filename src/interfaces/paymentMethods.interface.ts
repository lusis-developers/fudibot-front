import { PaymentLinkType } from "@/enum/paymentMethods.enum";

export interface Pagoplux {
  restaurantRUC: string;
  clientToken: string;
};
export interface Payphone {
  clientToken: string;
}

export interface Datafast {
  entityId: string,
  bearerToken: string
}

export interface PaymentMethods {
  paymentLinkSelected: PaymentLinkType
  pagoplux: Pagoplux;
  payphone: Payphone;
  datafast: Datafast;
}