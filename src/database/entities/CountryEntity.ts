import {DataTypes, Model} from "sequelize";
import DatabaseSingleton from "../DatabaseSingleton";

export default class CountryEntity extends Model {
    private countryId: number;
    private nameFr: string;
    private nameEn: string;


    getCountryId(): number {
        return this.countryId;
    }

    getNameFr(): string {
        return this.nameFr;
    }

    getNameEn(): string {
        return this.nameEn;
    }
}

CountryEntity.init({
    countryId: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nameFr: DataTypes.STRING,
    nameEn: DataTypes.STRING
}, {
    tableName: 'Country',
    sequelize: DatabaseSingleton.getInstance().getSequelize()
});