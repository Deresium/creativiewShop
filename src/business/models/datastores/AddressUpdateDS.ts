import AddressCreationDS from "./AddressCreationDS";

export default class AddressUpdateDS extends AddressCreationDS {
    private readonly addressId: string;


    constructor(countryId: number, userId: string, city: string, street: string, streetNumber: string, box: string, zipCode: string, addressId: string) {
        super(countryId, userId, city, street, streetNumber, box, zipCode);
        this.addressId = addressId;
    }


    getAddressId(): string {
        return this.addressId;
    }
}