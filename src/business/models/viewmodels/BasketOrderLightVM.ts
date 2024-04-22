export default class BasketOrderLightVM{
    private readonly basketId: string;
    private readonly firstName: string;
    private readonly name: string;
    private readonly email: string;
    private readonly createdAt: string;
    private readonly orderedAt: string;
    private readonly paidAt: string;
    private readonly deliveredAt: string;
    private readonly basketStateCode: string;


    constructor(basketId: string, firstName: string, name: string, email: string, createdAt: string, orderedAt: string, paidAt: string, deliveredAt: string, basketStateCode: string) {
        this.basketId = basketId;
        this.firstName = firstName;
        this.name = name;
        this.email = email;
        this.createdAt = createdAt;
        this.orderedAt = orderedAt;
        this.paidAt = paidAt;
        this.deliveredAt = deliveredAt;
        this.basketStateCode = basketStateCode;
    }
}