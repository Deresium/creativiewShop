import CurrencyVM from "../viewmodels/CurrencyVM.ts";
import CurrencyRateVM from "../viewmodels/CurrencyRateVM.ts";

export default class CurrencyParser {
    public static parseCurrencies(data: any): Array<CurrencyVM> {
        return data.map((currency: any) => CurrencyParser.parseCurrency(currency));
    }

    public static parseCurrency(data: any): CurrencyVM {
        return new CurrencyVM(data.currencyCode, data.name, data.symbol);
    }

    public static parseCurrencyRates(data: any): Array<CurrencyRateVM> {
        return data.map((currencyRate: any) => CurrencyParser.parseCurrencyRate(currencyRate));
    }

    public static parseCurrencyRate(data: any): CurrencyRateVM {
        return new CurrencyRateVM(data.currencyRateId, data.currencyCode, data.rate, data.startDate, data.endDate);
    }
}