export default class ProductOptionPriceVM {
    private readonly startDate: string;
    private readonly endDate: string;
    private readonly price: string;

    constructor(startDate: string, endDate: string, price: string) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.price = price;
    }
}