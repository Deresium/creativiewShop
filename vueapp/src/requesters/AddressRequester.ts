import AddressVM from "../viewmodels/AddressVM.ts";
import axiosServer from "../axios/axiosServer.ts";
import AddressParser from "../parsers/AddressParser.ts";
import TitleValueVM from "../viewmodels/TitleValueVM.ts";

export default class AddressRequester {
    public static async requestAddresses(): Promise<Array<AddressVM>> {
        const response = await axiosServer.get('/address');
        return AddressParser.parseAddresses(response.data);
    }

    public static async requestAddressesTitleValue(): Promise<Array<TitleValueVM<string, string>>> {
        const response = await axiosServer.get('/address');
        return AddressParser.parseAddressesToTitleValue(response.data);
    }

    public static async requestAddress(addressId: string): Promise<AddressVM> {
        const response = await axiosServer.get(`/address/${addressId}`);
        return AddressParser.parseAddress(response.data);
    }
}