import ICountryRequester from "../requesters/ICountryRequester";
import ICountryDataGateway from "../../database/gateways/ICountryDataGateway";
import CountryVM from "../models/viewmodels/CountryVM";

export default class CountryFacade implements ICountryRequester {
    private readonly countryDataGateway: ICountryDataGateway;


    constructor(countryDataGateway: ICountryDataGateway) {
        this.countryDataGateway = countryDataGateway;
    }

    public async getAllCountries(): Promise<Array<CountryVM>> {
        const countries = await this.countryDataGateway.getAllCountries();
        return countries.map(country => new CountryVM(country.getCountryId(), country.getNameFr(), country.getNameEn()));
    }
}