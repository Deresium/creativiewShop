export default class WeightPriceVM {
    private readonly gram: string;
    private readonly price: string;
    private readonly startDate: string;


    constructor(gram: string, price: string, startDate: string) {
        this.gram = gram;
        this.price = price;
        this.startDate = startDate;
    }
}