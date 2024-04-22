import DeliveryOptionUpdateDS from "../../business/models/datastores/DeliveryOptionUpdateDS";
import DeliveryOptionEntity from "../entities/DeliveryOptionEntity";

export default interface IDeliveryOptionDataGateway {
    addDeliveryOption(customerId: number): Promise<string>;

    updateDeliveryOption(deliveryOptionUpdate: DeliveryOptionUpdateDS): Promise<void>;

    deleteDeliveryOption(deliveryOptionId: string, customerId: number): Promise<void>;

    deliveryOptionExistsForCustomer(deliveryOptionId: string, customerId: number): Promise<boolean>;

    getDeliveryOption(deliveryOptionId: string, customerId: number, date?: Date): Promise<DeliveryOptionEntity>;

    getDeliveryOptions(customerId: number): Promise<Array<DeliveryOptionEntity>>;

    getDeliveryOptionsForCountry(customerId: number, countryId: number): Promise<Array<DeliveryOptionEntity>>;
}