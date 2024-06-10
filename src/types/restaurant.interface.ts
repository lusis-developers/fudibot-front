export interface Restaurant {
  basicInfo:      BasicInfo;
  contactInfo:    ContactInfo;
  companyInfo:    CompanyInfo;
  settings:       Settings;
  currency:       string;
  bankSettings: BankSettings[];
  meals?:        any;
  drinks?:       any;
  countryCode:    string;
  enable:         boolean;
  deleted:        boolean;
}

export interface Location {
  lat:        number;
  lng:        number;
  radius:     number;
  fullAdress: string;
}

export interface BasicInfo {
  location:       Location;
  botName:        string;
}

export interface ContactInfo {
  email:          string;
  cellphone:      string;
}

export interface CompanyInfo {
  companyName:    string;
  schedule:       string;
}

export interface Settings {
  manager:        string;
  website:        string;
  logo:           string;
}

export interface BankSettings {
  bankName: string;
  accountType: 'Ahorros' | 'Corriente';
  accountNumber: string;
  accountHolderName: string;
  identification: string;
  email: string;
  phone: string;
}