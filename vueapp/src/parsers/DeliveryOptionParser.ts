import DeliveryOptionVM from "../viewmodels/DeliveryOptionVM.ts";

export default class DeliveryOptionParser {
    public static parseDeliveryOptions(data: any): Array<DeliveryOptionVM> {
        return data.map((deliveryOption: any) => DeliveryOptionParser.parseDeliveryOption(deliveryOption));
    }

    public static parseDeliveryOption(data: any): DeliveryOptionVM {
        return new DeliveryOptionVM(data.deliveryOptionId, data.nameFr, data.active);
    }
}