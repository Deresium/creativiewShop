export default class DeliveryOptionStoreVM {
    private readonly deliveryOptionId: string;
    private readonly price: string;
    private readonly name: string;


    constructor(deliveryOptionId: string, price: string, name: string) {
        this.deliveryOptionId = deliveryOptionId;
        this.price = price;
        this.name = name;
    }
}