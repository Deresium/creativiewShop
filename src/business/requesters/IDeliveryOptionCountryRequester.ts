import CountryVM from "../models/viewmodels/CountryVM";

export default interface IDeliveryOptionCountryRequester {
    addDeliveryOptionCountry(deliveryOptionId: string, countryId: number): Promise<void>;

    deleteDeliveryOptionCountry(deliveryOptionId: string, countryId: number): Promise<void>;

    getDeliveryOptionCountries(deliveryOptionId: string): Promise<Array<CountryVM>>;
}