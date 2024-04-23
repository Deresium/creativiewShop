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
    private readonly paymentMethod: string;
    private readonly hasPreorderItems: boolean;


    constructor(basketId: string, productOptionStores: Array<ProductOptionBasketVM>, total: string, totalWeight: string, deliveryAddressId: string, billingAddressId: string, deliveryAddressCountryId: number, deliveryOptionId: string, paymentMethod: string, hasPreorderItems: boolean) {
        this.basketId = basketId;
        this.productOptionStores = productOptionStores;
        this.total = total;
        this.totalWeight = totalWeight;
        this.deliveryAddressId = deliveryAddressId;
        this.billingAddressId = billingAddressId;
        this.deliveryAddressCountryId = deliveryAddressCountryId;
        this.deliveryOptionId = deliveryOptionId;
        this.paymentMethod = paymentMethod;
        this.hasPreorderItems = hasPreorderItems;
    }
}