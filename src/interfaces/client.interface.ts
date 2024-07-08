import { Restaurant } from "./restaurant.interface";


export interface Client {
  sub: string;
  name: string;
  email: string;
  picture: string;
  email_verified: boolean;
  given_name: string,
  nickname: string,
  family_name: string,
  restaurant?: Restaurant,
  password?: string,
  token?: string
}
