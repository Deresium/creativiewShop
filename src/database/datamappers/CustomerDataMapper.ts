import ICustomerDataGateway from "../gateways/ICustomerDataGateway";
import CustomerEntity from "../entities/CustomerEntity";
import BankCustomerEntity from "../entities/BankCustomerEntity";
import AddressEntity from "../entities/AddressEntity";
import CountryEntity from "../entities/CountryEntity";
import CurrencyEntity from "../entities/CurrencyEntity";

export default class CustomerDataMapper implements ICustomerDataGateway {
    public async getAllCustomers(): Promise<Array<CustomerEntity>> {
        return await CustomerEntity.findAll({
            include: [{model: CurrencyEntity, as: 'currency'}]
        });
    }

    public async getCustomerBankById(bankCustomerId: string): Promise<BankCustomerEntity> {
        return await BankCustomerEntity.findOne({
            where: {
                bankCustomerId: bankCustomerId
            },
            include: [
                {
                    model: AddressEntity,
                    as: 'address',
                    include: [{model: CountryEntity, as: 'country'}]
                }
            ]
        });
    }
}