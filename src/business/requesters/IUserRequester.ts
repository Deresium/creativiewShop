import UserCreationDS from "../models/datastores/UserCreationDS";
import LoginInfoDS from "../models/datastores/LoginInfoDS";
import UserLoginVM from "../models/viewmodels/UserLoginVM";
import UserVM from "../models/viewmodels/UserVM";
import UserPurchaserVM from "../models/viewmodels/UserPurchaserVM";
import CustomerVM from "../models/viewmodels/CustomerVM";

export default interface IUserRequester {
    createUser(userCreationDS: UserCreationDS): Promise<void>;

    createUserTemp(customerId: number, language: string): Promise<string>;

    loginUser(loginInfoDS: LoginInfoDS): Promise<UserLoginVM>;

    getUser(userId: string, customerId: number, userGroups: Array<string>): Promise<UserVM>;

    findUserPurchasers(customerId: number): Promise<Array<UserPurchaserVM>>;

    updateUserActive(userId: string, customerId: CustomerVM, access: boolean): Promise<void>;

    userExistsForCustomer(userId: string, customerId: number): Promise<boolean>;

    getUsersFromGroupForCustomer(customerId: number, groupId: string): Promise<Array<UserPurchaserVM>>;

    addPasswordChangeRequest(email: string, customer: CustomerVM): Promise<void>;

    updatePasswordBasedOnChangeRequest(uuid: string, password: string, repeatPassword: string): Promise<void>;
}