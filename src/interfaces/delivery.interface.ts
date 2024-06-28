interface FleetDetail {
  radiusKm: number;
  price: number;
  _id: string;
}

export interface Delivery {
  picker: {
    key_local: string;
  };
  _id: string;
  hasOwnFleet: boolean;
  fleetDetails: FleetDetail[];
  createdAt: string;
  updatedAt: string;
}

export interface HasOwnFleet {
  id: string,
  hasOwnFleet: boolean
}