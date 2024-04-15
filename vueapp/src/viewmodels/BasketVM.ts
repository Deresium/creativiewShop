import ProductOptionBasketVM from "./ProductOptionBasketVM";

export default class BasketVM {
    private readonly basketId: string;
    private readonly productOptionStores: Array<ProductOptionBasketVM>;
    private readonly total: string;
    private readonly totalWeight: string;
    private readonly deliveryAddressId: string;
    private readonly billingAddressId: string;
    private readonly deliveryAddressCountryId: number;
    private readonly deliveryOptionId: string;


    constructor(basketId: string, productOptionStores: Array<ProductOptionBasketVM>, total: string, totalWeight: string, deliveryAddressId: string, billingAddressId: string, deliveryAddressCountryId: number, deliveryOptionId: string) {
        this.basketId = basketId;
        this.productOptionStores = productOptionStores;
        this.total = total;
        this.totalWeight = totalWeight;
        this.deliveryAddressId = deliveryAddressId;
        this.billingAddressId = billingAddressId;
        this.deliveryAddressCountryId = deliveryAddressCountryId;
        this.deliveryOptionId = deliveryOptionId;
    }


    public getBasketId(): string {
        return this.basketId;
    }

    public getProductOptionStores(): Array<ProductOptionBasketVM> {
        return this.productOptionStores;
    }

    public getTotal(): string {
        return this.total;
    }


    getTotalWeight(): string {
        return this.totalWeight
    }


    public getDeliveryAddressId(): string {
        return this.deliveryAddressId;
    }

    public getBillingAddressId(): string {
        return this.billingAddressId;
    }


    public getDeliveryAddressCountryId(): number {
        return this.deliveryAddressCountryId;
    }


    public getDeliveryOptionId(): string {
        return this.deliveryOptionId;
    }
}