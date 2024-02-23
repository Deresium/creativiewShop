import ICustomerDataGateway from "../gateways/ICustomerDataGateway";
import CustomerEntity from "../entities/CustomerEntity";

export default class CustomerDataMapper implements ICustomerDataGateway {
    public async getAllCustomers(): Promise<Array<CustomerEntity>> {
        return await CustomerEntity.findAll();
    }
}