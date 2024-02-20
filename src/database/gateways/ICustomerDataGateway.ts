import CustomerEntity from "../entities/CustomerEntity";

export default interface ICustomerDataGateway {
    getAllCustomers(): Promise<Array<CustomerEntity>>;
    getCustomer(customerId: number): Promise<CustomerEntity>;
}