export default class WeightPriceDS {
    private readonly deliveryOptionId: string;
    private readonly gram: number;
    private readonly price: number;


    constructor(deliveryOptionId: string, gram: number, price: number) {
        this.deliveryOptionId = deliveryOptionId;
        this.gram = gram;
        this.price = price;
    }


    getDeliveryOptionId(): string {
        return this.deliveryOptionId;
    }

    getGram(): number {
        return this.gram;
    }

    getPrice(): number {
        return this.price;
    }
}