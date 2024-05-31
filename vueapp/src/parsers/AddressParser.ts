import AddressVM from "../viewmodels/AddressVM.ts";
import TitleValueVM from "../viewmodels/TitleValueVM.ts";

export default class AddressParser {
    public static parseAddresses(data: any): Array<AddressVM> {
        return data.map((address: any) => AddressParser.parseAddress(address));
    }

    public static parseAddressesToTitleValue(data: any): Array<TitleValueVM<string, string>> {
        return data.map((address: any) => AddressParser.parseAddressToTitleValue(address));
    }

    public static parseAddress(address: any): AddressVM {
        return new AddressVM(address.addressId, address.countryId, address.countryName, address.city, address.street, address.streetNumber, address.box, address.zipCode, address.userName, address.userFirstName);
    }

    public static parseAddressToTitleValue(address: any): TitleValueVM<string, string> {
        return new TitleValueVM<string, string>(address.completeAddressLine, address.addressId);
    }

}