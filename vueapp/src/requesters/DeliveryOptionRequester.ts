import DeliveryOptionVM from "../viewmodels/DeliveryOptionVM.ts";
import axiosServer from "../axios/axiosServer.ts";
import DeliveryOptionParser from "../parsers/DeliveryOptionParser.ts";
import TitleValueVM from "../viewmodels/TitleValueVM.ts";

export default class DeliveryOptionRequester {
    public static async requestDeliveryOptions(): Promise<Array<DeliveryOptionVM>> {
        const response = await axiosServer.get('/deliveryOption');
        return DeliveryOptionParser.parseDeliveryOptions(response.data);
    }

    public static async requestDeliveryOption(deliveryOptionId: string): Promise<DeliveryOptionVM> {
        const response = await axiosServer.get(`/deliveryOption/${deliveryOptionId}`);
        return DeliveryOptionParser.parseDeliveryOption(response.data);
    }

    public static async requestDeliveryOptionStores(currencyCode: string, currencySymbol: string): Promise<Array<TitleValueVM<string, string>>> {
        const response = await axiosServer.get(`/basket/deliveryOptions`, {
            params: {
                currency: currencyCode
            }
        });

        return response.data.map((data: any) => new TitleValueVM(`${data.name} - ${data.price}${currencySymbol}`, data.deliveryOptionId));
    }
}