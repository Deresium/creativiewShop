import CustomerVM from "../viewmodels/CustomerVM.ts";

export default class CustomerParser {
    public static parseCustomer(customer: any): CustomerVM {
        return new CustomerVM(customer.customerId, customer.name, customer.dnsName, customer.storeProtectionCode, customer.firstColor, customer.secondColor, customer.thirdColor);
    }
}