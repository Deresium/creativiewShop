import {DataTypes, Model} from "sequelize";
import DatabaseSingleton from "../DatabaseSingleton";

export default class DeliveryOptionEntity extends Model {
    private deliveryOptionId: string;
    private nameFr: string;
    private active: boolean;
    private customerId: number;
    private deletedAt: Date;


    getDeliveryOptionId(): string {
        return this.deliveryOptionId;
    }

    getNameFr(): string {
        return this.nameFr;
    }

    getActive(): boolean {
        return this.active;
    }

    getCustomerId(): number {
        return this.customerId;
    }

    getDeletedAt(): Date {
        return this.deletedAt;
    }
}

DeliveryOptionEntity.init({
    deliveryOptionId: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    nameFr: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    customerId: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
}, {
    tableName: 'DeliveryOption',
    sequelize: DatabaseSingleton.getInstance().getSequelize()
});