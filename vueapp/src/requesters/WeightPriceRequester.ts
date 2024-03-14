import WeightPriceVM from "../viewmodels/WeightPriceVM.ts";
import axiosServer from "../axios/axiosServer.ts";
import WeightPriceParser from "../parsers/WeightPriceParser.ts";

export default class WeightPriceRequester {
    public static async requestWeightPrices(deliveryOptionId: string): Promise<Array<WeightPriceVM>> {
        const response = await axiosServer.get(`/deliveryOption/${deliveryOptionId}/weightPrice`);
        return WeightPriceParser.parseWeightPrices(response.data);
    }
}