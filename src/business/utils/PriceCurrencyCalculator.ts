import CustomerVM from "../models/viewmodels/CustomerVM";

export default class PriceCurrencyCalculator {
    private readonly price: number;
    private readonly currency: string;
    private readonly customer: CustomerVM;
    private readonly currencyRates: Map<string, number>;


    constructor(price: number, currency: string, customer: CustomerVM, currencyRates: Map<string, number>) {
        this.price = price;
        this.currency = currency;
        this.customer = customer;
        this.currencyRates = currencyRates;
    }

    public getPrice() {
        if (this.customer.getCurrencyCode() === this.currency) {
            return this.price;
        }

        const rate = this.currencyRates.get(this.currency);
        if (!rate) {
            return this.price;
        }
        return this.price * rate;
    }
}