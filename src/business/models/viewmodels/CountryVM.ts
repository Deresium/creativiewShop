export default class CountryVM {
    private readonly countryId: number;
    private readonly nameFr: string;
    private readonly nameEn: string;


    constructor(countryId: number, nameFr: string, nameEn: string) {
        this.countryId = countryId;
        this.nameFr = nameFr;
        this.nameEn = nameEn;
    }
}