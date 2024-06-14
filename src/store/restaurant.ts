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
          radius: '',
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
    },
    addContactInfo(contactInfo: ContactInfo) {
      this.restaurant.contactInfo = contactInfo;
    },
    addCompanyInfo(companyInfo: CompanyInfo) {
      this.restaurant.companyInfo = companyInfo;
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
      await restaurantService.createRestaurant(newRestaurant);
    },
    async addLogo(image: any) {
      const logo = await restaurantService.addRestaurantLogo(image);
      this.restaurant.settings.logo = logo as string;
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
    },
    async getRestaurant(id: string) {
      try {
        this.isLoading = true;
        const restaurant = await restaurantService.getRestaurant(id);
        return restaurant;
      } catch (error: any) {
        this.error = error.message;
      } finally {
        this.isLoading = false;
      }
    }
  }
});

export default useRestaurantStore;