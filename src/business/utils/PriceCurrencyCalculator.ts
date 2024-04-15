import CustomerVM from "../models/viewmodels/CustomerVM";
import ICurrencyRateDataGateway from "../../database/gateways/ICurrencyRateDataGateway";

export default class PriceCurrencyCalculator {
    private readonly price: number;
    private readonly currency: string;
    private readonly customer: CustomerVM;
    private readonly currencyRateDataGateway: ICurrencyRateDataGateway;


    constructor(price: number, currency: string, customer: CustomerVM, currencyRateDataGateway: ICurrencyRateDataGateway) {
        this.price = Number(price);
        this.currency = currency;
        this.customer = customer;
        this.currencyRateDataGateway = currencyRateDataGateway;
    }

    public async getPrice() {
        const rates = await this.currencyRateDataGateway.getCurrentRatesForCustomer(this.customer.getCustomerId());
        const mapRates = new Map<string, number>();
        rates.forEach(rate => mapRates.set(rate.getCurrencyCode(), rate.getRate()));

        if (this.customer.getCurrencyCode() === this.currency) {
            return this.price;
        }

        const rate = mapRates.get(this.currency);
        if (!rate) {
            return this.price;
        }
        return this.price * rate;
    }
}