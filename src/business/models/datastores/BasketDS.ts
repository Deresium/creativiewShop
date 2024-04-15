import ProductOptionBasketDS from "./ProductOptionBasketDS";

export default class BasketDS {
    private readonly basketId: string;
    private readonly productOptionStores: Array<ProductOptionBasketDS>;
    private readonly totalWeight: string;
    private readonly deliveryAddressId: string;
    private readonly billingAddressId: string;
    private readonly deliveryAddressCountryId: number;


    constructor(basketId: string, productOptionStores: Array<ProductOptionBasketDS>, totalWeight: string, deliveryAddressId: string, billingAddressId: string, deliveryAddressCountryId: number) {
        this.basketId = basketId;
        this.productOptionStores = productOptionStores;
        this.totalWeight = totalWeight;
        this.deliveryAddressId = deliveryAddressId;
        this.billingAddressId = billingAddressId;
        this.deliveryAddressCountryId = deliveryAddressCountryId;
    }
}