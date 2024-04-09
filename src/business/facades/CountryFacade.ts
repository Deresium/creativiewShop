import ICountryRequester from "../requesters/ICountryRequester";
import ICountryDataGateway from "../../database/gateways/ICountryDataGateway";
import CountryVM from "../models/viewmodels/CountryVM";
import CountryEntity from "../../database/entities/CountryEntity";

export default class CountryFacade implements ICountryRequester {
    private readonly countryDataGateway: ICountryDataGateway;


    constructor(countryDataGateway: ICountryDataGateway) {
        this.countryDataGateway = countryDataGateway;
    }

    public async getAllCountries(language: string): Promise<Array<CountryVM>> {
        const countries = await this.countryDataGateway.getAllCountries();
        return countries.map(country => new CountryVM(country.getCountryId(), this.getCountryName(language, country)));
    }

    private getCountryName(language: string, countryEntity: CountryEntity): string {
        switch (language) {
            case 'fr':
                return countryEntity.getNameFr();
            case 'en':
                return countryEntity.getNameEn();
            default:
                return countryEntity.getNameEn();
        }
    }
}