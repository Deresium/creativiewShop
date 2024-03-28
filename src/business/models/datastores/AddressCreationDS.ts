export default class AddressCreationDS {
    private readonly countryId: number;
    private readonly userId: string;
    private readonly city: string;
    private readonly street: string;
    private readonly streetNumber: string;
    private readonly box: string;


    constructor(countryId: number, userId: string, city: string, street: string, streetNumber: string, box: string) {
        this.countryId = countryId;
        this.userId = userId;
        this.city = city;
        this.street = street;
        this.streetNumber = streetNumber;
        this.box = box;
    }


    getCountryId(): number {
        return this.countryId;
    }

    getUserId(): string {
        return this.userId;
    }

    getCity(): string {
        return this.city;
    }

    getStreet(): string {
        return this.street;
    }

    getStreetNumber(): string {
        return this.streetNumber;
    }

    getBox(): string {
        return this.box;
    }
}