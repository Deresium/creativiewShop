import ManufacturerVM from "../viewmodels/ManufacturerVM.ts";

export default class ManufacturerParser {
    public static parseManufacturers(data: any): Array<ManufacturerVM> {
        return data.map((manufacturer: any) => ManufacturerParser.parseManufacturer(manufacturer));
    }

    public static parseManufacturer(data: any): ManufacturerVM {
        return new ManufacturerVM(data.manufacturerId, data.name);
    }
}