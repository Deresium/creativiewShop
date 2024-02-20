import CustomerVM from "../models/viewmodels/CustomerVM";

export default interface ICustomerRequester {
    getAllCustomers(): Promise<Array<CustomerVM>>;

    getCustomerInfo(customerId: number): Promise<CustomerVM>;
}