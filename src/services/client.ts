import APIBase from "./base";

interface User {
  _id: string;
  name: string;
  email: string;
  picture: string;
  email_verified: boolean;
  sub: string;
  restaurant: string[];
  createdAt: Date;
  updatedAt: Date;
}

class ClientService extends APIBase {
  async createClient(data: any) {
    try {
      return this.post('client', data);
    } catch (error) {
      console.error(error);
    }
  }
  async getClientIDRestaurant(sub: string) {
    try {
      const clientDB = await this.get<User>(`client/${sub}`);
      return clientDB.restaurant[0];
    } catch (error) {
      console.error(error);
    }
  }
}

export default ClientService;