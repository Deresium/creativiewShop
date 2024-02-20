import CustomerVM from "../models/viewmodels/CustomerVM";
import ICustomerDataGateway from "../../database/gateways/ICustomerDataGateway";
import ICustomerRequester from "../requesters/ICustomerRequester";

export default class CustomerCacheSingleton {
    private static instance: CustomerCacheSingleton;
    private readonly customers: Map<string, CustomerVM>;
    private readonly customerRequester?: ICustomerRequester;

    private constructor(customerRequester?: ICustomerRequester) {
        this.customers = new Map<string, CustomerVM>();
        this.customerRequester = customerRequester;
    }

    public static getInstance(customerRequester?: ICustomerRequester): CustomerCacheSingleton {
        if (!this.instance) {
            this.instance = new CustomerCacheSingleton(customerRequester);
        }
        return this.instance;
    }

    public getCustomer(dnsName: string) {
        return this.customers.get(dnsName);
    }


    public async initCache(): Promise<void> {
        if (!this.customerRequester) {
            return;
        }

        const customersResponse = await this.customerRequester.getAllCustomers();
        for (const customerVM of customersResponse) {
            this.customers.set(customerVM.getDnsName(), customerVM);
        }
    }
}