import AddressCreationDS from "../models/datastores/AddressCreationDS";
import AddressUpdateDS from "../models/datastores/AddressUpdateDS";
import AddressVM from "../models/viewmodels/AddressVM";

export default interface IAddressRequester {
    addAddress(addressCreation: AddressCreationDS): Promise<string>;
    updateAddress(addressUpdate: AddressUpdateDS): Promise<void>;
    deleteAddress(addressId: string, userId: string): Promise<void>;
    getAddress(addressId: string, userId: string, language: string): Promise<AddressVM>;
    getAddressesForUser(userId: string, language: string): Promise<Array<AddressVM>>;
}