export default class CustomerVM {
    private readonly customerId: number;
    private readonly name: string;
    private readonly dnsName: string;
    private readonly storeProtectionCode: boolean;
    private readonly firstColor: string;
    private readonly secondColor: string;
    private readonly thirdColor: string;


    constructor(customerId: number, name: string, dnsName: string, storeProtectionCode: boolean, firstColor: string, secondColor: string, thirdColor: string) {
        this.customerId = customerId;
        this.name = name;
        this.dnsName = dnsName;
        this.storeProtectionCode = storeProtectionCode;
        this.firstColor = firstColor;
        this.secondColor = secondColor;
        this.thirdColor = thirdColor;
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
}