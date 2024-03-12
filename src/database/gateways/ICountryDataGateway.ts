import CountryEntity from "../entities/CountryEntity";

export default interface ICountryDataGateway {
    getAllCountries(): Promise<Array<CountryEntity>>;
}