import DeliveryOptionVM from "../viewmodels/DeliveryOptionVM.ts";
import axiosServer from "../axios/axiosServer.ts";
import DeliveryOptionParser from "../parsers/DeliveryOptionParser.ts";

export default class DeliveryOptionRequester {
    public static async requestDeliveryOptions(): Promise<Array<DeliveryOptionVM>> {
        const response = await axiosServer.get('/deliveryOption');
        return DeliveryOptionParser.parseDeliveryOptions(response.data);
    }

    public static async requestDeliveryOption(deliveryOptionId: string): Promise<DeliveryOptionVM> {
        const response = await axiosServer.get(`/deliveryOption/${deliveryOptionId}`);
        return DeliveryOptionParser.parseDeliveryOption(response.data);
    }
}