import ManufacturerDS from "../../business/models/datastores/ManufacturerDS";
import ManufacturerEntity from "../entities/ManufacturerEntity";
import ManufacturerUpdateDS from "../../business/models/datastores/ManufacturerUpdateDS";

export default interface IManufacturerDataGateway {
    addManufacturer(manufacturerDS: ManufacturerDS): Promise<void>;

    removeManufacturer(manufacturerId: string, customerId: number): Promise<void>;

    getAllManufacturer(customerId: number): Promise<Array<ManufacturerEntity>>;

    getManufacturerById(manufacturerId: string, customerId: number): Promise<ManufacturerEntity>;

    updateManufacturer(manufacturerUpdateDS: ManufacturerUpdateDS): Promise<void>;
}