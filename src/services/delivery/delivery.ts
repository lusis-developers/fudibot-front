import { AxiosResponse } from 'axios';

import APIBase from '../base';

import type {
	AddOrEditFleetDetail,
	Delivery,
	HasOwnFleet,
} from '@/interfaces/delivery.interface';

class APIDelivery extends APIBase {
	async getDeliveryData(id: string): Promise<AxiosResponse> {
		return await this.get(`/get-delivery-data/${id}`);
	}

	async postHasOwnFleet(data: HasOwnFleet): Promise<AxiosResponse<Delivery>> {
		return await this.patch<Delivery>("has-own-fleet", data);
	}

	async addFleetDetail(
		data: AddOrEditFleetDetail
	): Promise<AxiosResponse<Delivery>> {
		return await this.post<Delivery>("add-fleet-detail", data);
	}
}

export default APIDelivery;
