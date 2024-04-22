import {DataTypes, Model} from "sequelize";
import DatabaseSingleton from "../DatabaseSingleton";
import AddressEntity from "./AddressEntity";
import BasketProductOptionEntity from "./BasketProductOptionEntity";
import Decimal from "decimal.js";

export default class BasketEntity extends Model {
    private readonly basketId: string;
    private readonly basketStateCode: string;
    private readonly userId: string;
    private readonly deliveryOptionId: string;
    private readonly deliveryAddressId: string;
    private readonly billingAddressId: string;
    private readonly totalWeightAtOrdered: string;
    private readonly currencyAtOrdered: string;
    private readonly paymentMethodCode: string;
    private readonly orderedAt: Date;
    private readonly paidAt: Date;
    private readonly deliveredAt: Date;
    private readonly deletedAt: Date;
    private readonly createdAt: Date;

    private readonly deliveryAddress: AddressEntity;
    private readonly basketProductOptions: Array<BasketProductOptionEntity>;


    getBasketId(): string {
        return this.basketId;
    }

    getBasketStateCode() {
        return this.basketStateCode;
    }

    getDeliveryAddressId() {
        return this.deliveryAddressId;
    }

    getBillingAddressId() {
        return this.billingAddressId;
    }

    getDeliveryAddress() {
        return this.deliveryAddress;
    }


    public getDeliveryOptionId(): string {
        return this.deliveryOptionId;
    }


    public getPaymentMethodCode(): string {
        return this.paymentMethodCode;
    }

    public getBasketProductOptions(): Array<BasketProductOptionEntity> {
        return this.basketProductOptions;
    }


    getTotalWeightAtOrdered(): Decimal {
        if(this.totalWeightAtOrdered) {
            return new Decimal(this.totalWeightAtOrdered);
        }
        return null;
    }


    getCurrencyAtOrdered(): string {
        return this.currencyAtOrdered;
    }


    getOrderedAt(): Date {
        return this.orderedAt;
    }
}

BasketEntity.init({
    basketId: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    basketStateCode: DataTypes.STRING,
    userId: DataTypes.BIGINT,
    deliveryOptionId: DataTypes.STRING,
    deliveryAddressId: DataTypes.BIGINT,
    billingAddressId: DataTypes.BIGINT,
    totalWeightAtOrdered: DataTypes.DECIMAL,
    currencyAtOrdered: DataTypes.STRING,
    paymentMethodCode: DataTypes.STRING,
    orderedAt: DataTypes.DATE,
    paidAt: DataTypes.DATE,
    deliveredAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
    createdAt: DataTypes.DATE

}, {
    tableName: 'Basket',
    sequelize: DatabaseSingleton.getInstance().getSequelize()
});

BasketEntity.hasOne(AddressEntity, {
    sourceKey: 'deliveryAddressId',
    foreignKey: 'addressId',
    as: 'deliveryAddress'
});

BasketEntity.hasMany(BasketProductOptionEntity, {
    sourceKey: 'basketId',
    foreignKey: 'basketId',
    as: 'basketProductOptions'
});