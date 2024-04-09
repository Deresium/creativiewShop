import IAddressRequester from "../requesters/IAddressRequester";
import IAddressDataGateway from "../../database/gateways/IAddressDataGateway";
import AddressCreationDS from "../models/datastores/AddressCreationDS";
import AddressVM from "../models/viewmodels/AddressVM";
import AddressUpdateDS from "../models/datastores/AddressUpdateDS";
import AddressEntity from "../../database/entities/AddressEntity";

export default class AddressFacade implements IAddressRequester {
    private readonly addressDataGateway: IAddressDataGateway;

    constructor(addressDataGateway: IAddressDataGateway) {
        this.addressDataGateway = addressDataGateway;
    }

    public async addAddress(addressCreation: AddressCreationDS): Promise<string> {
        const address = await this.addressDataGateway.addAddress(addressCreation);
        return address.getAddressId();
    }

    public async updateAddress(addressUpdate: AddressUpdateDS): Promise<void> {
        await this.addressDataGateway.updateAddress(addressUpdate);
    }

    public async deleteAddress(addressId: string, userId: string): Promise<void> {
        await this.addressDataGateway.deleteAddress(addressId, userId);
    }

    public async getAddress(addressId: string, userId: string, language: string): Promise<AddressVM> {
        const address = await this.addressDataGateway.getAddress(addressId, userId);
        return this.addressEntityToAddressVM(address, language);
    }

    public async getAddressesForUser(userId: string, language: string): Promise<Array<AddressVM>> {
        const addresses = await this.addressDataGateway.getAddressesForUser(userId);
        return addresses.map(address => this.addressEntityToAddressVM(address, language));
    }

    private addressEntityToAddressVM(addressEntity: AddressEntity, language: string): AddressVM {
        let countryName = null;
        switch (language) {
            case 'fr':
                countryName = addressEntity.getCountry().getNameFr();
                break;
            case 'en':
                countryName = addressEntity.getCountry().getNameEn();
                break;
            default:
                countryName = addressEntity.getCountry().getNameEn();
                break;
        }
        let address = `${addressEntity.getStreet()}, ${addressEntity.getStreetNumber()} ${addressEntity.getZipCode()} ${addressEntity.getCity()}`;
        if (addressEntity.getBox()) {
            address = `${address} (${addressEntity.getBox()})`
        }
        return new AddressVM(addressEntity.getAddressId(), addressEntity.getCountryId(), countryName, addressEntity.getCity(), addressEntity.getStreet(), addressEntity.getStreetNumber(), addressEntity.getBox(), addressEntity.getZipCode(), address);
    }
}