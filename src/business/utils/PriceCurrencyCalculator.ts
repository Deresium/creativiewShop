import CustomerVM from "../models/viewmodels/CustomerVM";
import Decimal from "decimal.js";

export default class PriceCurrencyCalculator {
    private readonly price: Decimal;
    private readonly currency: string;
    private readonly customer: CustomerVM;
    private readonly currencyRates: Map<string, Decimal>;


    constructor(price: Decimal, currency: string, customer: CustomerVM, currencyRates: Map<string, Decimal>) {
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
        return this.price.mul(rate);
    }
}