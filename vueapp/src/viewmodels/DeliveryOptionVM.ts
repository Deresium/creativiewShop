export default class DeliveryOptionVM {
    private readonly deliveryOptionId: string;
    private readonly nameFr: string;
    private readonly active: boolean;


    constructor(deliveryOptionId: string, nameFr: string, active: boolean) {
        this.deliveryOptionId = deliveryOptionId;
        this.nameFr = nameFr;
        this.active = active;
    }


    public getDeliveryOptionId(): string {
        return this.deliveryOptionId;
    }

    public getNameFr(): string {
        return this.nameFr;
    }

    public getActive(): boolean {
        return this.active;
    }
}