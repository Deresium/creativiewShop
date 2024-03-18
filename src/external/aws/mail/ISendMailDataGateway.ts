import CustomerVM from "../../../business/models/viewmodels/CustomerVM";
import UserEmailVM from "../../../business/models/viewmodels/UserEmailVM";

export default interface ISendMailDataGateway {
    sendEmailUserAccess(user: UserEmailVM, customer: CustomerVM): Promise<void>;

    sendEmailNewUserAccount(user: UserEmailVM, customer: CustomerVM, userAdminStoreEmail: Array<string>): Promise<void>;
}