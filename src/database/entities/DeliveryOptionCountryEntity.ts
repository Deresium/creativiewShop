import {DataTypes, Model} from "sequelize";
import DatabaseSingleton from "../DatabaseSingleton";
import CountryEntity from "./CountryEntity";

export default class DeliveryOptionCountryEntity extends Model {
    private deliveryOptionId: string;
    private country: CountryEntity;


    getDeliveryOptionId(): string {
        return this.deliveryOptionId;
    }

    getCountry(): CountryEntity {
        return this.country;
    }
}

DeliveryOptionCountryEntity.init({
    deliveryOptionId: {type: DataTypes.BIGINT, primaryKey: true},
    countryId: {type: DataTypes.INTEGER, primaryKey: true}
}, {
    tableName: 'DeliveryOptionCountry',
    sequelize: DatabaseSingleton.getInstance().getSequelize()
});

DeliveryOptionCountryEntity.hasOne(CountryEntity, {
    sourceKey: 'countryId',
    foreignKey: 'countryId',
    as: 'country'
});