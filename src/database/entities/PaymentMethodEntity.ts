import {DataTypes, Model} from "sequelize";
import DatabaseSingleton from "../DatabaseSingleton";

export default class PaymentMethodEntity extends Model {
    private paymentMethodCode: string;
}

PaymentMethodEntity.init({
    paymentMethodCode: {type: DataTypes.STRING, primaryKey: true}
}, {
    tableName: 'PaymentMethod',
    sequelize: DatabaseSingleton.getInstance().getSequelize()
});