import ManufacturerVM from "../viewmodels/ManufacturerVM.ts";
import axiosServer from "../axios/axiosServer.ts";
import ManufacturerParser from "../parsers/ManufacturerParser.ts";

export default class ManufacturerRequester {

    public static async getManufacturer(manufacturerId: string): Promise<ManufacturerVM> {
        const response = await axiosServer.get(`/manufacturer/${manufacturerId}`);
        return ManufacturerParser.parseManufacturer(response.data);
    }

    public static async getManufacturers(): Promise<Array<ManufacturerVM>> {
        const response = await axiosServer.get('/manufacturer');
        return ManufacturerParser.parseManufacturers(response.data);
    }
}