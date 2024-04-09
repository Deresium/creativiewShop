import CountryVM from "../models/viewmodels/CountryVM";

export default interface ICountryRequester {
    getAllCountries(language: string): Promise<Array<CountryVM>>;
}