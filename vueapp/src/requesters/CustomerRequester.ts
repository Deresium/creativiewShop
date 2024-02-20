import axiosServer from "../axios/axiosServer.ts";
import CustomerVM from "../viewmodels/CustomerVM.ts";
import CustomerParser from "../parsers/CustomerParser.ts";

export default class CustomerRequester {
    public static async getCustomer(): Promise<CustomerVM> {
        const response = await axiosServer.get('/customerInfo');
        return CustomerParser.parseCustomer(response.data);
    }
}