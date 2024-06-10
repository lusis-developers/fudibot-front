import { defineStore } from 'pinia';

// import RestaurantService from '@/services/restaurant';
import type { BankSettings, BasicInfo, CompanyInfo, ContactInfo, Restaurant, Settings } from '@/types/restaurant.interface';

interface RootState {
  restaurant: Restaurant;
  error: string | null;
  isLoading: boolean;
}

// const restaurantService = new RestaurantService();

const useRestaurantStore = defineStore('RestaurantStore', {
  state: (): RootState => ({
    restaurant: {
      basicInfo: {
        location: {
          lat: 0,
          lng: 0,
          radius: 0,
          fullAdress: ''
        },
        botName: ''
      },
      contactInfo: {
        email: '',
        cellphone: ''
      },
      companyInfo: {
        companyName: '',
        schedule: ''
      },
      settings: {
        manager: '',
        website: '',
        logo: ''
      },
      currency: 'USD',
      meals: [],
      drinks: [],
      countryCode: '+593',
      enable: false,
      deleted: false,
      bankSettings: [] as BankSettings[],
    },
    error: null,
    isLoading: false
  }),

  actions: {
    addBasicInfo(basicInfo: BasicInfo) {
      this.restaurant.basicInfo = basicInfo;
      console.log('Basic Info added:', basicInfo);
    },
    addContactInfo(contactInfo: ContactInfo) {
      this.restaurant.contactInfo = contactInfo;
      console.log('Contact Info added:', contactInfo);
    },
    addCompanyInfo(companyInfo: CompanyInfo) {
      this.restaurant.companyInfo = companyInfo;
      console.log('Company Info added:', companyInfo);
    },
    async addSettings(settings: Settings) {
      this.restaurant.settings = settings;
      console.log('Settings added:', settings);
      // await restaurantService.createRestaurant(this.restaurant);
    },
    addBankSettings(bankSetting: BankSettings) {
      this.restaurant.bankSettings = [...this.restaurant.bankSettings, bankSetting];
      console.log('Bank Setting added:', bankSetting);
    }
  }
});

export default useRestaurantStore;