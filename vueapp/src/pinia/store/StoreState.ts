export default class StoreState {
    private currencyCode: string;
    private currencySymbol: string;
    private hasAccessToStore: boolean;


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


    public getHasAccessToStore(): boolean {
        return this.hasAccessToStore;
    }

    public setHasAccessToStore(value: boolean) {
        this.hasAccessToStore = value;
    }
}