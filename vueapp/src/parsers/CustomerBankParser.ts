import CustomerBankVM from "../viewmodels/CustomerBankVM.ts";

export default class CustomerBankParser {
    public static parseCustomerBank(data: any): CustomerBankVM {
        return new CustomerBankVM(
            data.iban,
            data.bic,
            data.bankName,
            data.accountLabel,
            data.name,
            data.countryName,
            data.city,
            data.street,
            data.streetNumber,
            data.box,
            data.zipCode
        )
    }
}