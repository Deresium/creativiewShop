import ManufacturerDS from "../models/datastores/ManufacturerDS";
import ManufacturerUpdateDS from "../models/datastores/ManufacturerUpdateDS";
import ManufacturerVM from "../models/viewmodels/ManufacturerVM";

export default interface IManufacturerRequester {
    addManufacturer(manufacturerDS: ManufacturerDS): Promise<void>;

    removeManufacturer(manufacturerId: string, customerId: number): Promise<void>;

    getAllManufacturer(customerId: number): Promise<Array<ManufacturerVM>>;

    updateManufacturer(manufacturerUpdateDS: ManufacturerUpdateDS): Promise<void>;
}