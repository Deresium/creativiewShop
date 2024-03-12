import CountryVM from "../models/viewmodels/CountryVM";

export default interface IGeographicZoneCountryRequester {
    addGeographicZoneCountry(geographicZoneId: string, countryId: number): Promise<void>;

    deleteGeographicZoneCountry(geographicZoneId: string, countryId: number): Promise<void>;

    getGeographicZoneCountries(geographicZoneId: string): Promise<Array<CountryVM>>;
}