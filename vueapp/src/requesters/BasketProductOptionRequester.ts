import BasketProductOptionVM from "../viewmodels/BasketProductOptionVM.ts";
import axiosServer from "../axios/axiosServer.ts";
import BasketProductOptionParser from "../parsers/BasketProductOptionParser.ts";

export default class BasketProductOptionRequester {
    public static async requestBasketProductOptions(): Promise<Array<BasketProductOptionVM>> {
        const response = await axiosServer.get('/basket');
        return BasketProductOptionParser.parseBasketProductOptions(response.data);
    }
}