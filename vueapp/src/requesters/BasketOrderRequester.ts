import BasketOrderLightVM from "../viewmodels/BasketOrderLightVM.ts";
import axiosServer from "../axios/axiosServer.ts";
import BasketOrderParser from "../parsers/BasketOrderParser.ts";
import BasketOrderVM from "../viewmodels/BasketOrderVM.ts";

export default class BasketOrderRequester {
    public static async requestBasketOrderLightForCustomer(): Promise<Array<BasketOrderLightVM>> {
        const response = await axiosServer.get('/order/customer');
        return BasketOrderParser.parseBasketOrderLights(response.data);
    }

    public static async requestBasketOrderLightForUser(): Promise<Array<BasketOrderLightVM>> {
        const response = await axiosServer.get('/order/user');
        return BasketOrderParser.parseBasketOrderLights(response.data);
    }

    public static async requestBasketOrder(basketId: string): Promise<BasketOrderVM> {
        const response = await axiosServer.get(`/order/${basketId}`);
        return BasketOrderParser.parseBasketOrder(response.data);
    }
}