export default class WeightPriceVM {
    private readonly gram: string;
    private readonly price: string;
    private readonly startDate: Date;


    constructor(gram: string, price: string, startDate: Date) {
        this.gram = gram;
        this.price = price;
        this.startDate = startDate;
    }


    public getGram(): string {
        return this.gram;
    }

    public getPrice(): string {
        return this.price;
    }

    public getStartDate(): Date {
        return this.startDate;
    }
}