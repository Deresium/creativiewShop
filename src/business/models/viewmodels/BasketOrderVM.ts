import BasketProductOptionOrderVM from "./BasketProductOptionOrderVM";

export default class BasketOrderVM {
    private readonly basketId: string;
    private readonly basketProductOptionOrders: Array<BasketProductOptionOrderVM>;
    private readonly totalWeight: string;
    private readonly deliveryPrice: string;
    private readonly productOptionsPrice: string;
    private readonly totalPrice: string;
    private readonly deliveryAddressId: string;
    private readonly billingAddressId: string;
    private readonly deliveryOptionLabel: string;
    private readonly paymentMethod: string;
    private readonly basketStateCode: string;
    private readonly currencyCode: string;
    private readonly currencySymbol: string;
    private readonly createdAt: string;
    private readonly orderedAt: string;
    private readonly paidAt: string;
    private readonly deliveredAt: string;


    constructor(basketId: string, basketProductOptionOrders: Array<BasketProductOptionOrderVM>, totalWeight: string, deliveryPrice: string, productOptionsPrice: string, totalPrice: string, deliveryAddressId: string, billingAddressId: string, deliveryOptionLabel: string, paymentMethod: string, basketStateCode: string, currencyCode: string, currencySymbol: string, createdAt: string, orderedAt: string, paidAt: string, deliveredAt: string) {
        this.basketId = basketId;
        this.basketProductOptionOrders = basketProductOptionOrders;
        this.totalWeight = totalWeight;
        this.deliveryPrice = deliveryPrice;
        this.productOptionsPrice = productOptionsPrice;
        this.totalPrice = totalPrice;
        this.deliveryAddressId = deliveryAddressId;
        this.billingAddressId = billingAddressId;
        this.deliveryOptionLabel = deliveryOptionLabel;
        this.paymentMethod = paymentMethod;
        this.basketStateCode = basketStateCode;
        this.currencyCode = currencyCode;
        this.currencySymbol = currencySymbol;
        this.createdAt = createdAt;
        this.orderedAt = orderedAt;
        this.deliveredAt = deliveredAt;
        this.paidAt = paidAt;
        this.deliveredAt = deliveredAt;
    }
}