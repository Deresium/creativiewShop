export default class ManufacturerDS {
    private readonly name: string;
    private readonly customerId: number;


    constructor(name: string, customerId: number) {
        this.name = name;
        this.customerId = customerId;
    }

    public getName(): string {
        return this.name;
    }

    public getCustomerId(): number {
        return this.customerId;
    }
}