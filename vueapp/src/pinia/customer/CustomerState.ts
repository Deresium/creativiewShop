export default class CustomerState {
    private customerId: number;
    private name: string;
    private dnsName: string;
    private storeProtectionCode: boolean;
    private firstColor: string;
    private secondColor: string;
    private thirdColor: string;
    private currencyCode: string;


    public getCustomerId(): number {
        return this.customerId;
    }

    public setCustomerId(value: number) {
        this.customerId = value;
    }

    public getName(): string {
        return this.name;
    }

    public setName(value: string) {
        this.name = value;
    }

    public getDnsName(): string {
        return this.dnsName;
    }

    public setDnsName(value: string) {
        this.dnsName = value;
    }

    public getStoreProtectionCode(): boolean {
        return this.storeProtectionCode;
    }

    public setStoreProtectionCode(value: boolean) {
        this.storeProtectionCode = value;
    }

    public getFirstColor(): string {
        return this.firstColor;
    }

    public getFirstColorHex(): string {
        return `#${this.firstColor}`
    }

    public setFirstColor(value: string) {
        this.firstColor = value;
    }

    public getSecondColor(): string {
        return this.secondColor;
    }

    public setSecondColor(value: string) {
        this.secondColor = value;
    }

    public getSecondColorHex(): string {
        return `#${this.secondColor}`
    }

    public getThirdColor(): string {
        return this.thirdColor;
    }

    public getThirdColorHex(): string {
        return `#${this.thirdColor}`
    }

    public setThirdColor(value: string) {
        this.thirdColor = value;
    }


    public getCurrencyCode(): string {
        return this.currencyCode;
    }

    public setCurrencyCode(value: string) {
        this.currencyCode = value;
    }
}