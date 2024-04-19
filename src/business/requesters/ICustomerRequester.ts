import CustomerVM from "../models/viewmodels/CustomerVM";
import CustomerBankVM from "../models/viewmodels/CustomerBankVM";

export default interface ICustomerRequester {
    getAllCustomers(): Promise<Array<CustomerVM>>;

    getCustomerBankById(customerBankId: string, language: string): Promise<CustomerBankVM>;
}