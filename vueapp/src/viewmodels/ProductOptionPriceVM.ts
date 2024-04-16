export default class ProductOptionPriceVM {
    private readonly startDate: Date;
    private readonly endDate: Date;
    private readonly price: string;

    constructor(startDate: Date, endDate: Date, price: string) {
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

    public getPrice(): string {
        return this.price;
    }
}