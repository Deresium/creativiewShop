export default class ManufacturerVM {
    private readonly manufacturerId: string;
    private readonly name: string;


    constructor(manufacturerId: string, name: string) {
        this.manufacturerId = manufacturerId;
        this.name = name;
    }


    public getManufacturerId(): string {
        return this.manufacturerId;
    }

    public getName(): string {
        return this.name;
    }
}