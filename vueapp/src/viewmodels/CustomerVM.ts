export default class CustomerVM {
    private readonly customerId: number;
    private readonly name: string;
    private readonly dnsName: string;
    private readonly storeProtectionCode: boolean;
    private readonly firstColor: string;
    private readonly secondColor: string;
    private readonly thirdColor: string;
    private readonly currencyCode: string;


    constructor(customerId: number, name: string, dnsName: string, storeProtectionCode: boolean, firstColor: string, secondColor: string, thirdColor: string, currencyCode: string) {
        this.customerId = customerId;
        this.name = name;
        this.dnsName = dnsName;
        this.storeProtectionCode = storeProtectionCode;
        this.firstColor = firstColor;
        this.secondColor = secondColor;
        this.thirdColor = thirdColor;
        this.currencyCode = currencyCode;
    }


    public getCustomerId(): number {
        return this.customerId;
    }

    public getName(): string {
        return this.name;
    }

    public getDnsName(): string {
        return this.dnsName;
    }

    public getStoreProtectionCode(): boolean {
        return this.storeProtectionCode;
    }


    public getFirstColor(): string {
        return this.firstColor;
    }

    public getSecondColor(): string {
        return this.secondColor;
    }

    public getThirdColor(): string {
        return this.thirdColor;
    }


    public getCurrencyCode(): string {
        return this.currencyCode;
    }
}