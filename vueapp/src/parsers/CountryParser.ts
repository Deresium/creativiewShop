import CountryVM from "../viewmodels/CountryVM.ts";
import TitleValueVM from "../viewmodels/TitleValueVM.ts";

export default class CountryParser {
    public static parseCountries(data: any): Array<CountryVM> {
        return data.map((country: any) => CountryParser.parseCountry(country));
    }

    public static parseCountry(data: any): CountryVM {
        return new CountryVM(data.countryId, data.nameFr, data.nameEn);
    }

    public static parseCountriesToItemValues(data: any): Array<TitleValueVM<string, number>> {
        return data.map((country: any) => new TitleValueVM(country.nameFr, country.countryId));
    }
}