export default class AddressVM {
    private readonly addressId: string;
    private readonly countryId: number;
    private readonly countryName: string;
    private readonly city: string;
    private readonly street: string;
    private readonly streetNumber: string;
    private readonly box: string;
    private readonly zipCode: string;


    constructor(addressId: string, countryId: number, countryName: string, city: string, street: string, streetNumber: string, box: string, zipCode: string) {
        this.addressId = addressId;
        this.countryId = countryId;
        this.countryName = countryName;
        this.city = city;
        this.street = street;
        this.streetNumber = streetNumber;
        this.box = box;
        this.zipCode = zipCode;
    }


    public getAddressId(): string {
        return this.addressId;
    }

    public getCountryId(): number {
        return this.countryId;
    }

    public getCountryName(): string {
        return this.countryName;
    }

    public getCity(): string {
        return this.city;
    }

    public getStreet(): string {
        return this.street;
    }

    public getStreetNumber(): string {
        return this.streetNumber;
    }

    public getBox(): string {
        return this.box;
    }


    public getZipCode(): string {
        return this.zipCode;
    }
}