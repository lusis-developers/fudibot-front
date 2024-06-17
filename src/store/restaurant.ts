import { defineStore } from 'pinia';

import useClientStore from './client';
import RestaurantService from '@/services/restaurant';
import type { BankSettings, BasicInfo, ContactInfo, Restaurant, Schedule, Settings, RestaurantResponse } from '@/types/restaurant.interface';

interface RootState {
  restaurant: Restaurant;
  error: string | null;
  isLoading: boolean;
}

const { getUser } = useClientStore();
const userSub = getUser()?.sub;

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
      companyName: '',
      schedule: [] as Schedule[],
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
        uuid: '',
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
    addCompanyName(companyName: string) {
      this.restaurant.companyName = companyName;
    },
    async addSchedule(schedule: Schedule) {
      this.restaurant.schedule = [...this.restaurant.schedule, schedule];
    },
    async addSettings(settings: Settings) {
      this.restaurant.settings = settings;
      const newRestaurant = Object.assign(
        {}, 
        this.restaurant.basicInfo,
        this.restaurant.contactInfo, 
        this.restaurant.settings,
        { companyName: this.restaurant.companyName, userSub },
        { schedule: this.restaurant.schedule },
        this.restaurant.others,
        this.restaurant.bankSettings
      );
      const createdRestaurant = await restaurantService.createRestaurant(newRestaurant) as RestaurantResponse;
      this.restaurant.others.uuid = createdRestaurant.restaurant.uuid;
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
          { uuid: this.restaurant.others.uuid }
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