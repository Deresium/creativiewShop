import CurrencyRateVM from "../models/viewmodels/CurrencyRateVM";
import CurrencyVM from "../models/viewmodels/CurrencyVM";
import Decimal from "decimal.js";

export default interface ICurrencyRateRequester {
    addCurrencyRate(currencyCode: string, rate: string, customerId: number): Promise<void>;

    getCurrencyRates(currencyCode: string, customerId: number): Promise<Array<CurrencyRateVM>>;

    getCurrency(customerId: number): Promise<Array<CurrencyVM>>;

    getCurrentCurrencyRateForCustomer(customerId: number): Promise<Map<string, Decimal>>
}