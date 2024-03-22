export default class StoreState {
    private currencyCode: string;
    private currencySymbol: string;


    public getCurrencyCode(): string {
        return this.currencyCode;
    }

    public setCurrencyCode(value: string) {
        this.currencyCode = value;
    }

    public getCurrencySymbol(): string {
        return this.currencySymbol;
    }

    public setCurrencySymbol(value: string) {
        this.currencySymbol = value;
    }
}