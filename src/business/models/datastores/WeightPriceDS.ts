export default class WeightPriceDS {
    private readonly deliveryOptionId: string;
    private readonly gram: string;
    private readonly price: string;


    constructor(deliveryOptionId: string, gram: string, price: string) {
        this.deliveryOptionId = deliveryOptionId;
        this.gram = gram;
        this.price = price;
    }


    getDeliveryOptionId(): string {
        return this.deliveryOptionId;
    }

    getGram(): string {
        return this.gram;
    }

    getPrice(): string {
        return this.price;
    }
}