import {DataTypes, Model} from "sequelize";
import DatabaseSingleton from "../DatabaseSingleton";

export default class GeographicZoneCountryEntity extends Model {
    private geographicZoneId: string;
    private countryId: number;
}

GeographicZoneCountryEntity.init({
    geographicZoneId: {type: DataTypes.BIGINT, primaryKey: true},
    countryId: {type: DataTypes.INTEGER, primaryKey: true}
}, {
    tableName: 'GeographicZoneCountry',
    sequelize: DatabaseSingleton.getInstance().getSequelize()
});