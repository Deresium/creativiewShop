import AddressCreationDS from "../../business/models/datastores/AddressCreationDS";
import AddressUpdateDS from "../../business/models/datastores/AddressUpdateDS";
import AddressEntity from "../entities/AddressEntity";

export default interface IAddressDataGateway {
    addAddress(addressCreation: AddressCreationDS): Promise<AddressEntity>;
    updateAddress(addressUpdate: AddressUpdateDS): Promise<void>;
    deleteAddress(addressId: string, userId: string): Promise<void>;
    getAddress(addressId: string, userId: string): Promise<AddressEntity>;
    getAddressesForUser(userId: string): Promise<Array<AddressEntity>>;
}