export default class CountryVM {
    private readonly countryId: number;
    private readonly name: string;


    constructor(countryId: number, name: string) {
        this.countryId = countryId;
        this.name = name;
    }


    public getCountryId(): number {
        return this.countryId;
    }

    public getName(): string {
        return this.name;
    }
}