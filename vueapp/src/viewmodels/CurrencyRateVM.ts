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


    getCurrencyCode(): string {
        return this.currencyCode;
    }

    getRate(): number {
        return this.rate;
    }

    getStartDate(): string {
        return this.startDate;
    }

    getEndDate(): string {
        return this.endDate;
    }
}