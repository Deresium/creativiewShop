export default class CustomerVM {
    private readonly customerId: number;
    private readonly name: string;
    private readonly dnsName: string;
    private readonly storeProtectionCode: string;
    private readonly firstColor: string;
    private readonly secondColor: string;
    private readonly thirdColor: string;
    private readonly currencyCode: string;
    private readonly currencySymbol: string;
    private readonly emailFrom: string;
    private readonly defaultBankCustomerId: string;


    constructor(customerId: number, name: string, dnsName: string, storeProtectionCode: string, firstColor: string, secondColor: string, thirdColor: string, currencyCode: string, currencySymbol: string, emailFrom: string, defaultBankCustomerId: string) {
        this.customerId = customerId;
        this.name = name;
        this.dnsName = dnsName;
        this.storeProtectionCode = storeProtectionCode;
        this.firstColor = firstColor;
        this.secondColor = secondColor;
        this.thirdColor = thirdColor;
        this.currencyCode = currencyCode;
        this.currencySymbol = currencySymbol;
        this.emailFrom = emailFrom;
        this.defaultBankCustomerId = defaultBankCustomerId;
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

    public getStoreProtectionCode(): string {
        return this.storeProtectionCode;
    }


    public getEmailFrom(): string {
        return this.emailFrom;
    }

    public getCurrencyCode() {
        return this.currencyCode;
    }


    public getDefaultBankCustomerId(): string {
        return this.defaultBankCustomerId;
    }
}