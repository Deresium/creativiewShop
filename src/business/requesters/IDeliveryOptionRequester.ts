import DeliveryOptionUpdateDS from "../models/datastores/DeliveryOptionUpdateDS";
import DeliveryOptionVM from "../models/viewmodels/DeliveryOptionVM";
import DeliveryOptionStoreVM from "../models/viewmodels/DeliveryOptionStoreVM";
import CustomerVM from "../models/viewmodels/CustomerVM";
import Decimal from "decimal.js";

export default interface IDeliveryOptionRequester {
    addDeliveryOption(customerId: number): Promise<string>;

    updateDeliveryOption(deliveryOptionUpdate: DeliveryOptionUpdateDS): Promise<void>;

    deleteDeliveryOption(deliveryOptionId: string, customerId: number): Promise<void>;

    deliveryOptionExistsForCustomer(deliveryOptionId: string, customerId: number): Promise<boolean>;

    getDeliveryOption(deliveryOptionId: string, customerId: number): Promise<DeliveryOptionVM>;

    getDeliveryOptions(customerId: number): Promise<Array<DeliveryOptionVM>>;

    getDeliveryOptionsForCountry(customer: CustomerVM, countryId: number, weight: Decimal, currencyCode: string, currencyRates: Map<string, Decimal>): Promise<Array<DeliveryOptionStoreVM>>;

    getDeliveryOptionById(customer: CustomerVM, deliveryOptionId: string, weight: Decimal, currencyCode: string, currencyRates: Map<string, Decimal>): Promise<DeliveryOptionStoreVM>;
}