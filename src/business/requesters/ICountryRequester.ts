import CountryVM from "../models/viewmodels/CountryVM";

export default interface ICountryRequester {
    getAllCountries(): Promise<Array<CountryVM>>;
}