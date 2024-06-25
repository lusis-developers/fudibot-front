import { AccountType } from '@/enum/bank.enum';

export interface Restaurant {
  companyName:    string;
  basicInfo:      BasicInfo;
  contactInfo:    ContactInfo;
  settings:       Settings;
  others:         Others;
  bankSettings: BankSettings[];
  schedule: Schedule[];
}

export interface Location {
  latitude: number;
  longitude: number;
  radius: string;
  fullAdress: string;
}

export interface BasicInfo {
  location: Location;
  botName: string;
}

export interface ContactInfo {
  email: string;
  cellphone: string;
}

export interface Schedule {
  day: string;
  open: string;
  close: string;
}

export interface Settings {
  manager: string;
  logo: string;
  website: string;
}

export interface BankSettings {
  bankName: string;
  accountType: AccountType;
  accountNumber: string;
  accountHolderName: string;
  identification: string;
  email: string;
  phone: string;
}

export interface Others {
  currency:       string;
  meals:          any[];
  drinks:         any[];
  countryCode:    string;
  enable:         boolean;
  deleted:        boolean;
  uuid:           string;
}

export interface CreatedRestaurant {
  botId: string;
  botName: string;
  cellphone: string;
  companyName: string;
  website: string;
  countryCode: string;
  createdAt: Date;
  updatedAt: Date;
  currency: string;
  deleted: boolean;
  delivery: string;
  drinks: string[];
  meals: string[];
  email: string;
  enable: boolean;
  location: Location;
  logo: string;
  manager: string;
  menu: string;
  uuid: string;
  paymentMethods: string;
  schedule: Schedule[];
  bankSettings: string[];
}

export interface PickerData {
  token: string;
  message: string;
  statusCode: number;
}

export interface Picker {
  data: PickerData;
}

export interface RestaurantResponse {
  picker: Picker;
  restaurant: CreatedRestaurant;
}