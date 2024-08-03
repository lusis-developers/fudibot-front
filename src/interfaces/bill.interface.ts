import { BillIdType } from "@/enum/bill.enum";

export interface Bill {
  name: string,
  documentType: BillIdType,
  documentNumber: string,
  email: string,
  isSent: boolean
}