import ICustomerRequester from "../requesters/ICustomerRequester";
import CustomerVM from "../models/viewmodels/CustomerVM";
import ICustomerDataGateway from "../../database/gateways/ICustomerDataGateway";
import CustomerEntity from "../../database/entities/CustomerEntity";

export default class CustomerFacade implements ICustomerRequester {

    private readonly customerGateway: ICustomerDataGateway;

    constructor(customerGateway: ICustomerDataGateway) {
        this.customerGateway = customerGateway;
    }

    public async getAllCustomers(): Promise<Array<CustomerVM>> {
        const customersEntities = await this.customerGateway.getAllCustomers();
        return customersEntities.map(customer => this.customerToVM(customer));
    }

    public async getCustomerInfo(customerId: number): Promise<CustomerVM> {
        const customerEntity = await this.customerGateway.getCustomer(customerId);
        return this.customerToVM(customerEntity);
    }

    private customerToVM(customerEntity: CustomerEntity): CustomerVM {
        return new CustomerVM(customerEntity.getCustomerId(), customerEntity.getName(), customerEntity.getDnsName(), customerEntity.getStoreProtectionCode(), customerEntity.getFirstColor(), customerEntity.getSecondColor(), customerEntity.getThirdColor());
    }
}