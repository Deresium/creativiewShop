import IAddressDataGateway from "../gateways/IAddressDataGateway";
import AddressCreationDS from "../../business/models/datastores/AddressCreationDS";
import AddressEntity from "../entities/AddressEntity";
import AddressUpdateDS from "../../business/models/datastores/AddressUpdateDS";
import CountryEntity from "../entities/CountryEntity";

export default class AddressDataMapper implements IAddressDataGateway {
    public async addAddress(addressCreation: AddressCreationDS): Promise<AddressEntity> {
        return await AddressEntity.create({
            countryId: addressCreation.getCountryId(),
            userId: addressCreation.getUserId(),
            city: addressCreation.getCity(),
            street: addressCreation.getStreet(),
            streetNumber: addressCreation.getStreetNumber(),
            box: addressCreation.getBox()
        });
    }

    public async updateAddress(addressUpdate: AddressUpdateDS): Promise<void> {
        await AddressEntity.update({
            countryId: addressUpdate.getCountryId(),
            city: addressUpdate.getCity(),
            street: addressUpdate.getStreet(),
            streetNumber: addressUpdate.getStreetNumber(),
            box: addressUpdate.getBox()
        },{
            where: {
                addressId: addressUpdate.getAddressId(),
                userId: addressUpdate.getUserId()
            }
        });
    }

    public async deleteAddress(addressId: string, userId: string): Promise<void> {
        const now = new Date();
        await AddressEntity.update({
            deletedAt: now
        },{
            where: {
                addressId: addressId,
                userId: userId
            }
        });
    }

    public async getAddress(addressId: string, userId: string): Promise<AddressEntity> {
        return await AddressEntity.findOne({
            where: {
                addressId: addressId,
                userId: userId
            },
            include: [{model: CountryEntity, as: 'country'}]
        });
    }

    public async getAddressesForUser(userId: string): Promise<Array<AddressEntity>> {
        return await AddressEntity.findAll({
            where: {
                userId: userId
            },
            include: [{model: CountryEntity, as: 'country'}]
        });
    }
}