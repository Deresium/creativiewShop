import CustomerEntity from "../entities/CustomerEntity";
import BankCustomerEntity from "../entities/BankCustomerEntity";

export default interface ICustomerDataGateway {
    getAllCustomers(): Promise<Array<CustomerEntity>>;

    getCustomerBankById(bankCustomerId: string): Promise<BankCustomerEntity>;
}