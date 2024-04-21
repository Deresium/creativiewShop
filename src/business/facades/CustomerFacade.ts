import ICustomerRequester from "../requesters/ICustomerRequester";
import CustomerVM from "../models/viewmodels/CustomerVM";
import ICustomerDataGateway from "../../database/gateways/ICustomerDataGateway";
import CustomerEntity from "../../database/entities/CustomerEntity";
import CustomerBankVM from "../models/viewmodels/CustomerBankVM";
import CountryEntity from "../../database/entities/CountryEntity";

export default class CustomerFacade implements ICustomerRequester {

    private readonly customerGateway: ICustomerDataGateway;

    constructor(customerGateway: ICustomerDataGateway) {
        this.customerGateway = customerGateway;
    }

    public async getAllCustomers(): Promise<Array<CustomerVM>> {
        const customersEntities = await this.customerGateway.getAllCustomers();
        return customersEntities.map(customer => this.customerToVM(customer));
    }

    public async getCustomerBankById(customerBankId: string, language: string): Promise<CustomerBankVM> {
        if (!customerBankId) {
            return null;
        }

        const customerBank = await this.customerGateway.getCustomerBankById(customerBankId);

        let countryName = null;
        let city = null;
        let street = null;
        let streetNumber = null;
        let box = null;
        let zipCode = null;

        if (customerBank.getAddress()) {
            city = customerBank.getAddress().getCity();
            street = customerBank.getAddress().getStreet();
            streetNumber = customerBank.getAddress().getStreetNumber();
            box = customerBank.getAddress().getBox();
            zipCode = customerBank.getAddress().getZipCode();
            if (customerBank.getAddress().getCountry()) {
                countryName = this.getCountryName(customerBank.getAddress().getCountry(), language);
            }
        }
        return new CustomerBankVM(customerBank.getIban(), customerBank.getBic(), customerBank.getBankName(), customerBank.getAccountLabel(), customerBank.getName(), countryName, city, street, streetNumber, box, zipCode);
    }

    private customerToVM(customerEntity: CustomerEntity): CustomerVM {
        return new CustomerVM(customerEntity.getCustomerId(), customerEntity.getName(), customerEntity.getDnsName(),
            customerEntity.getStoreProtectionCode(), customerEntity.getFirstColor(), customerEntity.getSecondColor(),
            customerEntity.getThirdColor(), customerEntity.getCurrencyCode(), customerEntity.getEmailFrom(), customerEntity.getDefaultBankCustomerId());
    }

    private getCountryName(country: CountryEntity, language: string): string {
        switch (language) {
            case 'fr':
                return country.getNameFr();
            case 'en':
                return country.getNameEn();
            default:
                return country.getNameEn();
        }
    }


}