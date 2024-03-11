import CurrencyVM from "../viewmodels/CurrencyVM.ts";
import axiosServer from "../axios/axiosServer.ts";
import CurrencyParser from "../parsers/CurrencyParser.ts";
import CurrencyRateVM from "../viewmodels/CurrencyRateVM.ts";

export default class CurrencyRequester {
    public static async requestCurrencies(): Promise<Array<CurrencyVM>> {
        const response = await axiosServer.get('/currency');
        return CurrencyParser.parseCurrencies(response.data);
    }

    public static async requestCurrencyRates(currencyCode: string): Promise<Array<CurrencyRateVM>> {
        const response = await axiosServer.get(`/currencyRate/${currencyCode}`);
        return CurrencyParser.parseCurrencyRates(response.data);
    }
}