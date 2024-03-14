import DeliveryOptionUpdateDS from "../models/datastores/DeliveryOptionUpdateDS";
import DeliveryOptionVM from "../models/viewmodels/DeliveryOptionVM";

export default interface IDeliveryOptionRequester {
    addDeliveryOption(customerId: number): Promise<string>;

    updateDeliveryOption(deliveryOptionUpdate: DeliveryOptionUpdateDS): Promise<void>;

    deleteDeliveryOption(deliveryOptionId: string, customerId: number): Promise<void>;

    deliveryOptionExistsForCustomer(deliveryOptionId: string, customerId: number): Promise<boolean>;

    getDeliveryOption(deliveryOptionId: string, customerId: number): Promise<DeliveryOptionVM>;

    getDeliveryOptions(customerId: number): Promise<Array<DeliveryOptionVM>>;
}