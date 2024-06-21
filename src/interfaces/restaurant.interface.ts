import { Coordinates } from './coordinates.interface';

export interface Restaurant {
  _id: string,
  botName: string,
  location: Coordinates,
  manager: string,
  email: string,
  companyName: string
}