import ProductOptionBasketVM from "./ProductOptionBasketVM";

export default class BasketVM {
    private readonly basketId: string;
    private readonly productOptionStores: Array<ProductOptionBasketVM>;
    private readonly total: string;
    private readonly totalWeight: string;
    private readonly deliveryAddressId: string;
    private readonly billingAddressId: string;


    constructor(basketId: string, productOptionStores: Array<ProductOptionBasketVM>, total: string, totalWeight: string, deliveryAddressId: string, billingAddressId: string) {
        this.basketId = basketId;
        this.productOptionStores = productOptionStores;
        this.total = total;
        this.totalWeight = totalWeight;
        this.deliveryAddressId = deliveryAddressId;
        this.billingAddressId = billingAddressId;
    }
}