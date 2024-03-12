import GeographicZoneCountryEntity from "../entities/GeographicZoneCountryEntity";

export default interface IGeographicZoneCountryDataGateway {
    addGeographicZoneCountry(geographicZoneId: string, countryId: number): Promise<void>;

    deleteGeographicZoneCountry(geographicZoneId: string, countryId: number): Promise<void>;

    getGeographicZoneCountries(geographicZoneId: string): Promise<Array<GeographicZoneCountryEntity>>;
}