export interface Restaurant {
  basicInfo:      BasicInfo;
  contactInfo:    ContactInfo;
  companyInfo:    CompanyInfo;
  settings:       Settings;
  others:         Others;
  bankSettings: BankSettings[];
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
  logo:           string;
  website:        string;
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

export interface Others {
  currency:       string;
  meals:          any[];
  drinks:         any[];
  countryCode:    string;
  enable:         boolean;
  deleted:        boolean;
}