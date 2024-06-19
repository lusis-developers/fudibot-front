import { Restaurant } from "./restaurantDeprecated.interface";

export interface Client {
  sub: string;
  name: string;
  email: string;
  picture: string;
  email_verified: boolean;
  given_name: string,
  nickname: string,
  family_name: string,
  restaurant?: Restaurant
}
