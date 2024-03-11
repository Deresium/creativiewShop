import CurrencyRateEntity from "../entities/CurrencyRateEntity";
import CurrencyEntity from "../entities/CurrencyEntity";
import CurrencyCustomerEntity from "../entities/CurrencyCustomerEntity";

export default interface ICurrencyRateDataGateway {
    addCurrencyRate(currencyCode: string, rate: number, customerId: number): Promise<void>;

    getCurrencyRates(currencyCode: string, customerId: number): Promise<Array<CurrencyRateEntity>>;

    getCustomerCurrency(customerId: number): Promise<Array<CurrencyCustomerEntity>>
}