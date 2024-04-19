export default class CustomerBankVM {
    private readonly iban: string;
    private readonly bic: string;
    private readonly bankName: string;
    private readonly accountLabel: string;
    private readonly name: string;
    private readonly countryName: string;
    private readonly city: string;
    private readonly street: string;
    private readonly streetNumber: string;
    private readonly box: string;
    private readonly zipCode: string;

    constructor(iban: string, bic: string, bankName: string, accountLabel: string, name: string, countryName: string, city: string, street: string, streetNumber: string, box: string, zipCode: string) {
        this.iban = iban;
        this.bic = bic;
        this.bankName = bankName;
        this.accountLabel = accountLabel;
        this.name = name;
        this.countryName = countryName;
        this.city = city;
        this.street = street;
        this.streetNumber = streetNumber;
        this.box = box;
        this.zipCode = zipCode;
    }
}