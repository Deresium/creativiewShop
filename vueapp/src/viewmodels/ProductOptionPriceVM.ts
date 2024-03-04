export default class ProductOptionPriceVM {
    private readonly startDate: Date;
    private readonly endDate: Date;
    private readonly price: number;

    constructor(startDate: Date, endDate: Date, price: number) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.price = price;
    }

    public getStartDate(): Date {
        return this.startDate;
    }

    public getEndDate(): Date {
        return this.endDate;
    }

    public getPrice(): number {
        return this.price;
    }
}