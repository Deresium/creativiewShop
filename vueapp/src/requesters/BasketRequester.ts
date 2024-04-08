import axiosServer from "../axios/axiosServer.ts";
import BasketParser from "../parsers/BasketParser.ts";
import BasketVM from "../viewmodels/BasketVM.ts";

export default class BasketRequester {
    public static async requestBasket(): Promise<BasketVM> {
        try {
            const response = await axiosServer.get('/basket');
            return BasketParser.parseBasket(response.data);
        } catch (error) {
            return null;
        }
    }
}