import CustomerBankVM from "../viewmodels/CustomerBankVM.ts";
import axiosServer from "../axios/axiosServer.ts";
import CustomerBankParser from "../parsers/CustomerBankParser.ts";

export default class CustomerBankRequester {
    public static async requestCustomerBank(): Promise<CustomerBankVM> {
        const response = await axiosServer.get('/customer/bank');
        return CustomerBankParser.parseCustomerBank(response.data);
    }
}