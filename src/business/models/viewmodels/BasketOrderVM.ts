import BasketProductOptionOrderVM from "./BasketProductOptionOrderVM";

export default class BasketOrderVM {
    private readonly basketId: string;
    private readonly BasketProductOptionOrders: Array<BasketProductOptionOrderVM>;
    private readonly totalWeight: string;
    private readonly deliveryPrice: string;
    private readonly productOptionsPrice: string;
    private readonly totalPrice: string;
    private readonly deliveryAddressId: string;
    private readonly billingAddressId: string;
    private readonly deliveryOptionLabel: string;
    private readonly paymentMethod: string;
    private readonly basketStateCode: string;
    private readonly currency: string;


    constructor(basketId: string, BasketProductOptionOrders: Array<BasketProductOptionOrderVM>, totalWeight: string, deliveryPrice: string, productOptionsPrice: string, totalPrice: string, deliveryAddressId: string, billingAddressId: string, deliveryOptionLabel: string, paymentMethod: string, basketStateCode: string, currency: string) {
        this.basketId = basketId;
        this.BasketProductOptionOrders = BasketProductOptionOrders;
        this.totalWeight = totalWeight;
        this.deliveryPrice = deliveryPrice;
        this.productOptionsPrice = productOptionsPrice;
        this.totalPrice = totalPrice;
        this.deliveryAddressId = deliveryAddressId;
        this.billingAddressId = billingAddressId;
        this.deliveryOptionLabel = deliveryOptionLabel;
        this.paymentMethod = paymentMethod;
        this.basketStateCode = basketStateCode;
        this.currency = currency;
    }
}