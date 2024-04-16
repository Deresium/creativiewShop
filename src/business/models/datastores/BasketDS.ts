import ProductOptionBasketDS from "./ProductOptionBasketDS";
import Decimal from "decimal.js";


export default class BasketDS {
    private readonly basketId: string;
    private readonly productOptionStores: Array<ProductOptionBasketDS>;
    private readonly total: Decimal;
    private readonly totalWeight: Decimal;
    private readonly deliveryAddressId: string;
    private readonly billingAddressId: string;
    private readonly deliveryAddressCountryId: number;
    private readonly deliveryOptionId: string;
    private readonly paymentMethod: string;


    constructor(basketId: string, productOptionStores: Array<ProductOptionBasketDS>, total: Decimal, totalWeight: Decimal, deliveryAddressId: string, billingAddressId: string, deliveryAddressCountryId: number, deliveryOptionId: string, paymentMethod: string) {
        this.basketId = basketId;
        this.productOptionStores = productOptionStores;
        this.total = total;
        this.totalWeight = totalWeight;
        this.deliveryAddressId = deliveryAddressId;
        this.billingAddressId = billingAddressId;
        this.deliveryAddressCountryId = deliveryAddressCountryId;
        this.deliveryOptionId = deliveryOptionId;
        this.paymentMethod = paymentMethod;
    }


    getBasketId(): string {
        return this.basketId;
    }

    getProductOptionStores(): Array<ProductOptionBasketDS> {
        return this.productOptionStores;
    }

    getTotal(): Decimal {
        return this.total;
    }

    getTotalWeight(): Decimal {
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


    public getPaymentMethod(): string {
        return this.paymentMethod;
    }
}