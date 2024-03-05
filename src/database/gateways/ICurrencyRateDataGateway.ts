import CurrencyRateEntity from "../entities/CurrencyRateEntity";
import CurrencyEntity from "../entities/CurrencyEntity";

export default interface ICurrencyRateDataGateway {
    addCurrencyRate(currencyCode: string, rate: number, customerId: number): Promise<void>;

    getCurrencyRates(currencyCode: string, customerId: number): Promise<Array<CurrencyRateEntity>>;

    getCurrency(): Promise<Array<CurrencyEntity>>;
}