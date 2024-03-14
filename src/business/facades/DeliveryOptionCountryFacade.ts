import IDeliveryOptionCountryRequester from "../requesters/IDeliveryOptionCountryRequester";
import CountryVM from "../models/viewmodels/CountryVM";
import IDeliveryOptionCountryDataGateway from "../../database/gateways/IDeliveryOptionCountryDataGateway";

export default class DeliveryOptionCountryFacade implements IDeliveryOptionCountryRequester {
    private readonly deliveryOptionCountryDataGateway: IDeliveryOptionCountryDataGateway;

    constructor(deliveryOptionCountryDataGateway: IDeliveryOptionCountryDataGateway) {
        this.deliveryOptionCountryDataGateway = deliveryOptionCountryDataGateway;
    }

    public async addDeliveryOptionCountry(deliveryOptionId: string, countryId: number): Promise<void> {
        await this.deliveryOptionCountryDataGateway.addDeliveryOptionCountry(deliveryOptionId, countryId);
    }

    public async deleteDeliveryOptionCountry(deliveryOptionId: string, countryId: number): Promise<void> {
        await this.deliveryOptionCountryDataGateway.deleteDeliveryOptionCountry(deliveryOptionId, countryId);
    }

    public async getDeliveryOptionCountries(deliveryOptionId: string): Promise<Array<CountryVM>> {
        const deliveryOptionCountries = await this.deliveryOptionCountryDataGateway.getDeliveryOptionCountries(deliveryOptionId);
        return deliveryOptionCountries.map(deliveryOptionCountry => new CountryVM(deliveryOptionCountry.getCountry().getCountryId(), deliveryOptionCountry.getCountry().getNameFr(), deliveryOptionCountry.getCountry().getNameEn()));
    }
}