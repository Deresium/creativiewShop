export default class ProductOptionPriceVM {
    private readonly startDate: string;
    private readonly endDate: string;
    private readonly price: number;

    constructor(startDate: string, endDate: string, price: number) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.price = price;
    }
}