import {DataTypes, Model} from "sequelize";
import DatabaseSingleton from "../DatabaseSingleton";

export default class PaymentMethodCustomerEntity extends Model {
    private paymentMethodCode: string;
    private customerId: number;


    public getPaymentMethodCode(): string {
        return this.paymentMethodCode;
    }
}

PaymentMethodCustomerEntity.init({
    paymentMethodCode: {type: DataTypes.STRING, primaryKey: true},
    customerId: {type: DataTypes.INTEGER, primaryKey: true}
}, {
    tableName: 'PaymentMethodCustomer',
    sequelize: DatabaseSingleton.getInstance().getSequelize()
});