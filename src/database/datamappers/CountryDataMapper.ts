import ICountryDataGateway from "../gateways/ICountryDataGateway";
import CountryEntity from "../entities/CountryEntity";

export default class CountryDataMapper implements ICountryDataGateway {
    public async getAllCountries(): Promise<Array<CountryEntity>> {
        return CountryEntity.findAll();
    }
}