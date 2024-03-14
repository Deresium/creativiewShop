export default class DeliveryOptionVM {
    private deliveryOptionId: string;
    private nameFr: string;
    private active: boolean;


    constructor(deliveryOptionId: string, nameFr: string, active: boolean) {
        this.deliveryOptionId = deliveryOptionId;
        this.nameFr = nameFr;
        this.active = active;
    }
}