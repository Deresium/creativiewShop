import ManufacturerDS from "./ManufacturerDS";

export default class ManufacturerUpdateDS extends ManufacturerDS {
    private readonly manufacturerId: string;


    constructor(name: string, customerId: number, manufacturerId: string) {
        super(name, customerId);
        this.manufacturerId = manufacturerId;
    }

    public getManufacturerId(): string {
        return this.manufacturerId;
    }
}