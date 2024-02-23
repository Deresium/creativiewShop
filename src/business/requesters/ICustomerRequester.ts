import CustomerVM from "../models/viewmodels/CustomerVM";

export default interface ICustomerRequester {
    getAllCustomers(): Promise<Array<CustomerVM>>;
}