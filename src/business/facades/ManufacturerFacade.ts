import IManufacturerRequester from "../requesters/IManufacturerRequester";
import ManufacturerDS from "../models/datastores/ManufacturerDS";
import ManufacturerVM from "../models/viewmodels/ManufacturerVM";
import ManufacturerUpdateDS from "../models/datastores/ManufacturerUpdateDS";
import IManufacturerDataGateway from "../../database/gateways/IManufacturerDataGateway";

export default class ManufacturerFacade implements IManufacturerRequester {
    private readonly manufacturerDataGateway: IManufacturerDataGateway;

    constructor(manufacturerDataGateway: IManufacturerDataGateway) {
        this.manufacturerDataGateway = manufacturerDataGateway;
    }

    public async addManufacturer(manufacturerDS: ManufacturerDS): Promise<void> {
        await this.manufacturerDataGateway.addManufacturer(manufacturerDS);
    }

    public async getAllManufacturer(customerId: number): Promise<Array<ManufacturerVM>> {
        const manufacturers = await this.manufacturerDataGateway.getAllManufacturer(customerId);
        return manufacturers.map(manufacturer => new ManufacturerVM(manufacturer.getManufacturerId(), manufacturer.getName()));
    }

    public async removeManufacturer(manufacturerId: string, customerId: number): Promise<void> {
        await this.manufacturerDataGateway.removeManufacturer(manufacturerId, customerId);
    }

    public async updateManufacturer(manufacturerUpdateDS: ManufacturerUpdateDS): Promise<void> {
        await this.manufacturerDataGateway.updateManufacturer(manufacturerUpdateDS);
    }

    public async getManufacturerById(manufacturerId: string, customerId: number): Promise<ManufacturerVM> {
        const manufacturer = await this.manufacturerDataGateway.getManufacturerById(manufacturerId, customerId);
        return new ManufacturerVM(manufacturer.getManufacturerId(), manufacturer.getName());
    }
}