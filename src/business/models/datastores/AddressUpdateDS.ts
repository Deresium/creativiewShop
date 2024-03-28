import AddressCreationDS from "./AddressCreationDS";

export default class AddressUpdateDS extends AddressCreationDS {
    private readonly addressId: string;


    constructor(countryId: number, userId: string, city: string, street: string, streetNumber: string, box: string, addressId: string) {
        super(countryId, userId, city, street, streetNumber, box);
        this.addressId = addressId;
    }


    getAddressId(): string {
        return this.addressId;
    }
}