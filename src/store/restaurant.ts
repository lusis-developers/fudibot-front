import { defineStore } from 'pinia';

import RestaurantService from '@/services/restaurant';
import type { BankSettings, BasicInfo, CompanyInfo, ContactInfo, Restaurant, Settings } from '@/types/restaurant.interface';

interface RootState {
  restaurant: Restaurant;
  error: string | null;
  isLoading: boolean;
}

const restaurantService = new RestaurantService();

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
        logo: '',
        manager: '',
        website: '',
      },
      others: {
        currency: 'USD',
        meals: [],
        drinks: [],
        countryCode: '+593',
        enable: false,
        deleted: false,
      },
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
      const newRestaurant = Object.assign(
        {}, 
        this.restaurant.basicInfo,
        this.restaurant.contactInfo, 
        this.restaurant.companyInfo, 
        this.restaurant.settings,
        this.restaurant.others,
        this.restaurant.bankSettings
      );
      console.log('Settings added:', settings);
      await restaurantService.createRestaurant(newRestaurant);
    },
    async addLogo(image: any) {
      const logo = await restaurantService.addRestaurantLogo(image);
      return logo;
    },
    async addBankSettings(bankSetting: BankSettings) {
      this.restaurant.bankSettings = [...this.restaurant.bankSettings, bankSetting];
      for (const bank of this.restaurant.bankSettings) {
        const newBank = Object.assign(
          {},
          bank,
          { companyName: this.restaurant.companyInfo.companyName }
        )
        await restaurantService.createBank(newBank);
      }
      console.log('Bank Setting added:', bankSetting);
    }
  }
});

export default useRestaurantStore;