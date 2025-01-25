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
    private readonly firstName: string;
    private readonly name: string;
    private readonly email: string;
    private readonly orderNumber: string;
    private readonly createdAt: string;
    private readonly orderedAt: string;
    private readonly paidAt: string;
    private readonly deliveredAt: string;
    private readonly phoneNumber: string;


    constructor(basketId: string, basketProductOptionOrders: Array<BasketProductOptionOrderVM>, totalWeight: string, deliveryPrice: string, productOptionsPrice: string, totalPrice: string, deliveryAddressId: string, billingAddressId: string, deliveryOptionLabel: string, paymentMethod: string, basketStateCode: string, currencyCode: string, currencySymbol: string, firstName: string, name: string, email: string, orderNumber: string, createdAt: string, orderedAt: string, paidAt: string, deliveredAt: string, phoneNumber: string) {
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
        this.firstName = firstName;
        this.name = name;
        this.email = email;
        this.orderNumber = orderNumber;
        this.createdAt = createdAt;
        this.orderedAt = orderedAt;
        this.deliveredAt = deliveredAt;
        this.paidAt = paidAt;
        this.deliveredAt = deliveredAt;
        this.phoneNumber = phoneNumber;
    }


    public getFirstName(): string {
        return this.firstName;
    }

    public getName(): string {
        return this.name;
    }

    public getEmail(): string {
        return this.email;
    }

    public getBasketProductOptionOrders(): Array<BasketProductOptionOrderVM> {
        return this.basketProductOptionOrders;
    }

    public getTotalPrice() {
        return this.totalPrice
    }

    public getCurrencySymbol() {
        return this.currencySymbol;
    }


    public getCurrencyCode(): string {
        return this.currencyCode;
    }

    public getDeliveryPrice(): string {
        return this.deliveryPrice;
    }

    public getBasketStateCode(): string {
        return this.basketStateCode;
    }


    public getPaymentMethod(): string {
        return this.paymentMethod;
    }


    public getOrderNumber(): string {
        return this.orderNumber;
    }

    public getPhoneNumber(): string {
        return this.phoneNumber;
    }
}