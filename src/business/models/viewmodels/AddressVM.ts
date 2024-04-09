export default class AddressVM {
    private readonly addressId: string;
    private readonly countryId: number;
    private readonly countryName: string;
    private readonly city: string;
    private readonly street: string;
    private readonly streetNumber: string;
    private readonly box: string;
    private readonly zipCode: string;
    private readonly completeAddressLine: string;


    constructor(addressId: string, countryId: number, countryName: string, city: string, street: string, streetNumber: string, box: string, zipCode: string, completeAddressLine: string) {
        this.addressId = addressId;
        this.countryId = countryId;
        this.countryName = countryName;
        this.city = city;
        this.street = street;
        this.streetNumber = streetNumber;
        this.box = box;
        this.zipCode = zipCode;
        this.completeAddressLine = completeAddressLine;
    }
}