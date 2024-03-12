import IGeographicZoneCountryRequester from "../requesters/IGeographicZoneCountryRequester";
import IGeographicZoneDataGateway from "../../database/gateways/IGeographicZoneDataGateway";
import CountryVM from "../models/viewmodels/CountryVM";
import IGeographicZoneCountryDataGateway from "../../database/gateways/IGeographicZoneCountryDataGateway";

export default class GeographicZoneCountryFacade implements IGeographicZoneCountryRequester {
    private readonly geographicZoneCountryDataGateway: IGeographicZoneCountryDataGateway;

    constructor(geographicZoneCountryDataGateway: IGeographicZoneCountryDataGateway) {
        this.geographicZoneCountryDataGateway = geographicZoneCountryDataGateway;
    }

    public async addGeographicZoneCountry(geographicZoneId: string, countryId: number): Promise<void> {
        await this.geographicZoneCountryDataGateway.addGeographicZoneCountry(geographicZoneId, countryId);
    }

    public async deleteGeographicZoneCountry(geographicZoneId: string, countryId: number): Promise<void> {
        await this.geographicZoneCountryDataGateway.deleteGeographicZoneCountry(geographicZoneId, countryId);
    }

    public async getGeographicZoneCountries(geographicZoneId: string): Promise<Array<CountryVM>> {
        const geographicZoneCountries = await this.geographicZoneCountryDataGateway.getGeographicZoneCountries(geographicZoneId);
        return geographicZoneCountries.map(geographicZoneCountry => new CountryVM(geographicZoneCountry.getCountry().getCountryId(), geographicZoneCountry.getCountry().getNameFr(), geographicZoneCountry.getCountry().getNameEn()));
    }
}