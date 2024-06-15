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
  lat:        number;
  lng:        number;
  radius:     string;
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

export interface Schedule {
  day:    string;
  open:   string;
  close:  string;
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