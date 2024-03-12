import IGeographicZoneCountryDataGateway from "../gateways/IGeographicZoneCountryDataGateway";
import GeographicZoneCountryEntity from "../entities/GeographicZoneCountryEntity";
import CountryEntity from "../entities/CountryEntity";

export default class GeographicZoneCountryDataMapper implements IGeographicZoneCountryDataGateway {
    public async addGeographicZoneCountry(geographicZoneId: string, countryId: number): Promise<void> {
        await GeographicZoneCountryEntity.create({
            geographicZoneId: geographicZoneId,
            countryId: countryId
        });
    }

    public async deleteGeographicZoneCountry(geographicZoneId: string, countryId: number): Promise<void> {
        await GeographicZoneCountryEntity.destroy({
            where: {
                geographicZoneId: geographicZoneId,
                countryId: countryId
            }
        });
    }

    public async getGeographicZoneCountries(geographicZoneId: string): Promise<Array<GeographicZoneCountryEntity>> {
        return await GeographicZoneCountryEntity.findAll({
            where: {
                geographicZoneId: geographicZoneId
            },
            include: [{model: CountryEntity, as: 'country'}]
        });
    }

}