import ICustomerDataGateway from "../gateways/ICustomerDataGateway";
import CustomerEntity from "../entities/CustomerEntity";
import CurrencyEntity from "../entities/CurrencyEntity";

export default class CustomerDataMapper implements ICustomerDataGateway {
    public async getAllCustomers(): Promise<Array<CustomerEntity>> {
        return await CustomerEntity.findAll({
            include: [{model: CurrencyEntity, as: 'currency'}]
        });
    }
}