import CountryVM from "../viewmodels/CountryVM.ts";
import axiosServer from "../axios/axiosServer.ts";
import CountryParser from "../parsers/CountryParser.ts";
import TitleValueVM from "../viewmodels/TitleValueVM.ts";

export default class CountryRequester {
    public static async requestCountries(): Promise<Array<TitleValueVM<string, number>>> {
        const response = await axiosServer.get(`/country`);
        return CountryParser.parseCountriesToItemValues(response.data);
    }

    public static async requestCountriesDeliveryOption(deliveryOptionId: string): Promise<Array<CountryVM>> {
        const response = await axiosServer.get(`/deliveryOption/${deliveryOptionId}/country`);
        return CountryParser.parseCountries(response.data);
    }
}