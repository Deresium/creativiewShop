import {DataTypes, Model} from "sequelize";
import DatabaseSingleton from "../DatabaseSingleton";
import CustomerEntity from "./CustomerEntity";

export default class PaymentMethodCustomerEntity extends Model {
    private paymentMethodCode: string;
    private customerId: number;
    private key: string;
    private secret: string;

    private customer: CustomerEntity;


    public getPaymentMethodCode(): string {
        return this.paymentMethodCode;
    }


    public getCustomerId(): number {
        return this.customerId;
    }

    public getKey(): string {
        return this.key;
    }

    public getSecret(): string {
        return this.secret;
    }

    public getCustomerName(): string {
        if (!this.customer) {
            return null;
        }
        return this.customer.getName();
    }
}

PaymentMethodCustomerEntity.init({
    paymentMethodCode: {type: DataTypes.STRING, primaryKey: true},
    customerId: {type: DataTypes.INTEGER, primaryKey: true},
    key: DataTypes.STRING,
    secret: DataTypes.STRING
}, {
    tableName: 'PaymentMethodCustomer',
    sequelize: DatabaseSingleton.getInstance().getSequelize()
});

PaymentMethodCustomerEntity.hasOne(CustomerEntity, {
    sourceKey: 'customerId',
    foreignKey: 'customerId',
    as: 'customer'
});