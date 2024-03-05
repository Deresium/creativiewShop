import ICurrencyRateRequester from "../requesters/ICurrencyRateRequester";
import CurrencyRateVM from "../models/viewmodels/CurrencyRateVM";
import ICurrencyRateDataGateway from "../../database/gateways/ICurrencyRateDataGateway";
import CurrencyVM from "../models/viewmodels/CurrencyVM";

export default class CurrencyRateFacade implements ICurrencyRateRequester {
    private readonly currencyRateDataGateway: ICurrencyRateDataGateway;


    constructor(currencyRateDataGateway: ICurrencyRateDataGateway) {
        this.currencyRateDataGateway = currencyRateDataGateway;
    }

    public async addCurrencyRate(currencyCode: string, rate: number, customerId: number): Promise<void> {
        await this.currencyRateDataGateway.addCurrencyRate(currencyCode, rate, customerId);
    }

    public async getCurrencyRates(currencyCode: string, customerId: number): Promise<Array<CurrencyRateVM>> {
        const currencyRateReturn = new Array<CurrencyRateVM>();
        const currencyRates = await this.currencyRateDataGateway.getCurrencyRates(currencyCode, customerId);
        for(const currencyRate of currencyRates) {
            let endDate: string = null;
            const startDate = currencyRate.getStartDate().toISOString();
            if(currencyRate.getEndDate()){
                endDate = currencyRate.getEndDate().toISOString();
            }
            currencyRateReturn.push(new CurrencyRateVM(currencyCode, currencyRate.getRate(), startDate, endDate));
        }
        return currencyRateReturn;
    }

    public async getCurrency(): Promise<Array<CurrencyVM>> {
        const currencies = await this.currencyRateDataGateway.getCurrency();
        return currencies.map(currency => new CurrencyVM(currency.getCurrencyCode(), currency.getName(), currency.getSymbol()));
    }
}