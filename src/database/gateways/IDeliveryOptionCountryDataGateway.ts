import DeliveryOptionCountryEntity from "../entities/DeliveryOptionCountryEntity";

export default interface IDeliveryOptionCountryDataGateway {
    addDeliveryOptionCountry(deliveryOptionId: string, countryId: number): Promise<void>;

    deleteDeliveryOptionCountry(deliveryOptionId: string, countryId: number): Promise<void>;

    getDeliveryOptionCountries(deliveryOptionId: string): Promise<Array<DeliveryOptionCountryEntity>>;
}