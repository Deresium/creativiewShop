import {DataTypes, Model} from "sequelize";
import DatabaseSingleton from "../DatabaseSingleton";
import CountryEntity from "./CountryEntity";

export default class GeographicZoneCountryEntity extends Model {
    private geographicZoneId: string;
    private country: CountryEntity;


    getGeographicZoneId(): string {
        return this.geographicZoneId;
    }

    getCountry(): CountryEntity {
        return this.country;
    }
}

GeographicZoneCountryEntity.init({
    geographicZoneId: {type: DataTypes.BIGINT, primaryKey: true},
    countryId: {type: DataTypes.INTEGER, primaryKey: true}
}, {
    tableName: 'GeographicZoneCountry',
    sequelize: DatabaseSingleton.getInstance().getSequelize()
});

GeographicZoneCountryEntity.hasOne(CountryEntity, {
    sourceKey: 'countryId',
    foreignKey: 'countryId',
    as: 'country'
});