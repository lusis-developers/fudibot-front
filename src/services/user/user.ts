import { AxiosResponse } from 'axios';

import APIBase from '../base';

import type { User } from '@/interfaces/user.interface';

class APIUser extends APIBase {
  async getUserById(userId: string): Promise<AxiosResponse<User>> {
    return await this.get<User>(`orders/${userId}`);
  }
}

export default APIUser;