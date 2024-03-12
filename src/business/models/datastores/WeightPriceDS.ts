export default class WeightPriceDS {
    private readonly geographicZoneId: string;
    private readonly gram: number;
    private readonly price: number;


    constructor(geographicZoneId: string, gram: number, price: number) {
        this.geographicZoneId = geographicZoneId;
        this.gram = gram;
        this.price = price;
    }


    getGeographicZoneId(): string {
        return this.geographicZoneId;
    }

    getGram(): number {
        return this.gram;
    }

    getPrice(): number {
        return this.price;
    }
}