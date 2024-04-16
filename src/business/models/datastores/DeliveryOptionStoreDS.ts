import Decimal from "decimal.js";

export default class DeliveryOptionStoreDS {
    private readonly deliveryOptionId: string;
    private readonly price: Decimal;
    private readonly name: string;


    constructor(deliveryOptionId: string, price: Decimal, name: string) {
        this.deliveryOptionId = deliveryOptionId;
        this.price = price;
        this.name = name;
    }


    public getDeliveryOptionId(): string {
        return this.deliveryOptionId;
    }

    public getPrice(): Decimal {
        return this.price;
    }

    public getName(): string {
        return this.name;
    }
}