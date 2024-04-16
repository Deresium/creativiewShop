import ProductOptionBasketDS from "./ProductOptionBasketDS";


export default class BasketDS {
    private readonly basketId: string;
    private readonly productOptionStores: Array<ProductOptionBasketDS>;
    private readonly total: number;
    private readonly totalWeight: number;
    private readonly deliveryAddressId: string;
    private readonly billingAddressId: string;
    private readonly deliveryAddressCountryId: number;
    private readonly deliveryOptionId: string;


    constructor(basketId: string, productOptionStores: Array<ProductOptionBasketDS>, total: number, totalWeight: number, deliveryAddressId: string, billingAddressId: string, deliveryAddressCountryId: number, deliveryOptionId: string) {
        this.basketId = basketId;
        this.productOptionStores = productOptionStores;
        this.total = total;
        this.totalWeight = totalWeight;
        this.deliveryAddressId = deliveryAddressId;
        this.billingAddressId = billingAddressId;
        this.deliveryAddressCountryId = deliveryAddressCountryId;
        this.deliveryOptionId = deliveryOptionId;
    }


    getBasketId(): string {
        return this.basketId;
    }

    getProductOptionStores(): Array<ProductOptionBasketDS> {
        return this.productOptionStores;
    }

    getTotal(): number {
        return this.total;
    }

    getTotalWeight(): number {
        return this.totalWeight;
    }

    getDeliveryAddressId(): string {
        return this.deliveryAddressId;
    }

    getBillingAddressId(): string {
        return this.billingAddressId;
    }

    getDeliveryAddressCountryId(): number {
        return this.deliveryAddressCountryId;
    }

    getDeliveryOptionId(): string {
        return this.deliveryOptionId;
    }
}