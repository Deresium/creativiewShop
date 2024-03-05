export default class CurrencyRateVM {
    private readonly currencyCode: string;
    private readonly rate: number;
    private readonly startDate: string;
    private readonly endDate: string;


    constructor(currencyCode: string, rate: number, startDate: string, endDate: string) {
        this.currencyCode = currencyCode;
        this.rate = rate;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}