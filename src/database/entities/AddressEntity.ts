import {DataTypes, Model} from "sequelize";
import DatabaseSingleton from "../DatabaseSingleton";
import CountryEntity from "./CountryEntity";
import UserEntity from "./UserEntity";

export default class AddressEntity extends Model {
    private readonly addressId: string;
    private readonly countryId: number;
    private readonly country: CountryEntity;
    private readonly userId: string;
    private readonly city: string;
    private readonly street: string;
    private readonly streetNumber: string;
    private readonly box: string;
    private readonly zipCode: string;

    private readonly user: UserEntity;


    getAddressId(): string {
        return this.addressId;
    }

    getCountryId(): number {
        return this.countryId;
    }

    getCountry() {
        return this.country;
    }

    getUserId(): string {
        return this.userId;
    }

    getCity(): string {
        return this.city;
    }

    getStreet(): string {
        return this.street;
    }

    getStreetNumber(): string {
        return this.streetNumber;
    }

    getBox(): string {
        return this.box;
    }


    public getZipCode(): string {
        return this.zipCode;
    }


    public getUser(): UserEntity {
        return this.user;
    }
}

AddressEntity.init({
    addressId: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    countryId: DataTypes.INTEGER,
    userId: DataTypes.BIGINT,
    city: DataTypes.STRING,
    street: DataTypes.STRING,
    streetNumber: DataTypes.STRING,
    zipCode: DataTypes.STRING,
    box: DataTypes.STRING,
    deletedAt: DataTypes.DATE
}, {
    tableName: 'Address',
    sequelize: DatabaseSingleton.getInstance().getSequelize()
});

AddressEntity.hasOne(CountryEntity, {
    sourceKey: 'countryId',
    foreignKey: 'countryId',
    as: 'country'
});

AddressEntity.hasOne(UserEntity, {
    sourceKey: 'userId',
    foreignKey: 'userId',
    as: 'user'
});