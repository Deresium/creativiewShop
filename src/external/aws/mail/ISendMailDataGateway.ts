import CustomerVM from "../../../business/models/viewmodels/CustomerVM";
import UserEmailVM from "../../../business/models/viewmodels/UserEmailVM";
import BasketOrderVM from "../../../business/models/viewmodels/BasketOrderVM";
import CustomerBankVM from "../../../business/models/viewmodels/CustomerBankVM";

export default interface ISendMailDataGateway {
    sendEmailUserAccess(user: UserEmailVM, customer: CustomerVM): Promise<void>;

    sendEmailNewUserAccount(user: UserEmailVM, customer: CustomerVM, userAdminStoreEmail: Array<string>, language: string): Promise<void>;

    sendEmailForgotPassword(customer: CustomerVM, uuid: string, to: string, language: string): Promise<void>;

    sendEmailNewOrder(customer: CustomerVM, basket: BasketOrderVM, userAdminStoreEmail: Array<string>, language: string): Promise<void>;

    sendEmailUserOrder(customer: CustomerVM, basket: BasketOrderVM, customerBank: CustomerBankVM, to: string, language: string): Promise<void>
}