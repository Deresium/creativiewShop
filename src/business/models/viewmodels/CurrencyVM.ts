export default class CurrencyVM {
    private readonly currencyCode: string;
    private readonly name: string;
    private readonly symbol: string;


    constructor(currencyCode: string, name: string, symbol: string) {
        this.currencyCode = currencyCode;
        this.name = name;
        this.symbol = symbol;
    }
}