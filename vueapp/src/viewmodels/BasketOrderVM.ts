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
    private readonly createdAt: Date;
    private readonly orderedAt: Date;
    private readonly paidAt: Date;
    private readonly deliveredAt: Date;


    constructor(basketId: string, basketProductOptionOrders: Array<BasketProductOptionOrderVM>, totalWeight: string, deliveryPrice: string, productOptionsPrice: string, totalPrice: string, deliveryAddressId: string, billingAddressId: string, deliveryOptionLabel: string, paymentMethod: string, basketStateCode: string, currencyCode: string, currencySymbol: string, createdAt: Date, orderedAt: Date, paidAt: Date, deliveredAt: Date) {
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


    public getBasketId(): string {
        return this.basketId;
    }

    public getBasketProductOptionOrders(): Array<BasketProductOptionOrderVM> {
        return this.basketProductOptionOrders;
    }

    public getTotalWeight(): string {
        return this.totalWeight;
    }

    public getDeliveryPrice(): string {
        return this.deliveryPrice;
    }

    public getProductOptionsPrice(): string {
        return this.productOptionsPrice;
    }

    public getTotalPrice(): string {
        return this.totalPrice;
    }

    public getDeliveryAddressId(): string {
        return this.deliveryAddressId;
    }

    public getBillingAddressId(): string {
        return this.billingAddressId;
    }

    public getDeliveryOptionLabel(): string {
        return this.deliveryOptionLabel;
    }

    public getPaymentMethod(): string {
        return this.paymentMethod;
    }

    public getBasketStateCode(): string {
        return this.basketStateCode;
    }

    public getCurrencyCode(): string {
        return this.currencyCode;
    }

    public getCurrencySymbol(): string {
        return this.currencySymbol;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public getOrderedAt(): Date {
        return this.orderedAt;
    }

    public getPaidAt(): Date {
        return this.paidAt;
    }

    public getDeliveredAt(): Date {
        return this.deliveredAt;
    }
}