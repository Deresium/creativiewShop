export default class DeliveryOptionUpdateDS {
    private readonly deliveryOptionId: string;
    private readonly customerId: number;
    private readonly active: boolean;
    private readonly nameFr: string;


    constructor(deliveryOptionId: string, customerId: number, active: boolean, nameFr: string) {
        this.deliveryOptionId = deliveryOptionId;
        this.customerId = customerId;
        this.active = active;
        this.nameFr = nameFr;
    }


    getDeliveryOptionId(): string {
        return this.deliveryOptionId;
    }

    getCustomerId(): number {
        return this.customerId;
    }

    getActive(): boolean {
        return this.active;
    }

    getNameFr(): string {
        return this.nameFr;
    }
}

