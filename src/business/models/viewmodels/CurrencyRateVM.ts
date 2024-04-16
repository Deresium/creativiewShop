export default class CurrencyRateVM {
    private readonly currencyRateId: string;
    private readonly currencyCode: string;
    private readonly rate: string;
    private readonly startDate: string;
    private readonly endDate: string;


    constructor(currencyRateId: string, currencyCode: string, rate: string, startDate: string, endDate: string) {
        this.currencyRateId = currencyRateId;
        this.currencyCode = currencyCode;
        this.rate = rate;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}