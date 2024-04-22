export default class BasketOrderLightVM {
    private readonly basketId: string;
    private readonly firstName: string;
    private readonly name: string;
    private readonly email: string;
    private readonly createdAt: Date;
    private readonly orderedAt: Date;
    private readonly paidAt: Date;
    private readonly deliveredAt: Date;
    private readonly basketStateCode: string;
    private readonly orderNumber: string;


    constructor(basketId: string, firstName: string, name: string, email: string, createdAt: Date, orderedAt: Date, paidAt: Date, deliveredAt: Date, basketStateCode: string, orderNumber: string) {
        this.basketId = basketId;
        this.firstName = firstName;
        this.name = name;
        this.email = email;
        this.createdAt = createdAt;
        this.orderedAt = orderedAt;
        this.paidAt = paidAt;
        this.deliveredAt = deliveredAt;
        this.basketStateCode = basketStateCode;
        this.orderNumber = orderNumber;
    }


    public getBasketId(): string {
        return this.basketId;
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

    public getBasketStateCode(): string {
        return this.basketStateCode;
    }

    public getOrderNumber(): string {
        return this.orderNumber;
    }
}