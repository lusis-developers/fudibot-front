export interface Restaurant {
  basicInfo:      BasicInfo;
  contactInfo:    ContactInfo;
  companyInfo:    CompanyInfo;
  settings:       Settings;
  currency:       string;
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