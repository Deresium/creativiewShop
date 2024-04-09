import axiosServer from "../axios/axiosServer.ts";
import BasketParser from "../parsers/BasketParser.ts";
import BasketVM from "../viewmodels/BasketVM.ts";

export default class BasketRequester {
    public static async requestBasket(currencyCode: string): Promise<BasketVM> {
        try {
            const response = await axiosServer.get('/basket', {
                params: {
                    currency: currencyCode
                }
            });
            return BasketParser.parseBasket(response.data);
        } catch (error) {
            return null;
        }
    }

    public static async requestNbItemsBasket(): Promise<number> {
        try {
            const response = await axiosServer.get('/basket/nbItems');
            return response.data.nbItems;
        } catch (error) {
            return 0;
        }
    }
}