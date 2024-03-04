import {DataTypes, Model} from "sequelize";
import DatabaseSingleton from "../DatabaseSingleton";

export default class CountryEntity extends Model {
    private countryId: number;
    private nameFr: string;
    private nameEn: string;
}

CountryEntity.init({
    countryId: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nameFr: DataTypes.STRING,
    nameEn: DataTypes.STRING
}, {
    tableName: 'Country',
    sequelize: DatabaseSingleton.getInstance().getSequelize()
});