import {DataTypes, Model} from "sequelize";
import DatabaseSingleton from "../DatabaseSingleton";
import AddressEntity from "./AddressEntity";

export default class BankCustomerEntity extends Model {
    private bankCustomerId: string;
    private iban: string;
    private bic: string;
    private bankName: string;
    private accountLabel: string;
    private name: string;
    private addressId: string;
    private customerId: number;

    private address: AddressEntity;


    public getBankCustomerId(): string {
        return this.bankCustomerId;
    }

    public getIban(): string {
        return this.iban;
    }

    public getBic(): string {
        return this.bic;
    }

    public getBankName(): string {
        return this.bankName;
    }

    public getAccountLabel(): string {
        return this.accountLabel;
    }

    public getName(): string {
        return this.name;
    }

    public getAddressId(): string {
        return this.addressId;
    }

    public getCustomerId(): number {
        return this.customerId;
    }

    public getAddress(): AddressEntity {
        return this.address;
    }
}

BankCustomerEntity.init({
    bankCustomerId: {type: DataTypes.STRING, primaryKey: true},
    iban: DataTypes.STRING,
    bic: DataTypes.STRING,
    bankName: DataTypes.STRING,
    accountLabel: DataTypes.STRING,
    name: DataTypes.STRING,
    addressId: DataTypes.STRING,
    customerId: DataTypes.INTEGER
}, {
    tableName: 'BankCustomer',
    sequelize: DatabaseSingleton.getInstance().getSequelize()
});

BankCustomerEntity.hasOne(AddressEntity, {
    sourceKey: 'addressId',
    foreignKey: 'addressId',
    as: 'address'
});