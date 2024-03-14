import UserCreationDS from "../models/datastores/UserCreationDS";
import LoginInfoDS from "../models/datastores/LoginInfoDS";
import UserLoginVM from "../models/viewmodels/UserLoginVM";
import UserVM from "../models/viewmodels/UserVM";
import UserPurchaserVM from "../models/viewmodels/UserPurchaserVM";

export default interface IUserRequester {
    createUser(userCreationDS: UserCreationDS): Promise<void>;

    loginUser(loginInfoDS: LoginInfoDS): Promise<UserLoginVM>;

    getUser(userId: string, customerId: number, userGroups: Array<string>): Promise<UserVM>;

    findUserPurchasers(customerId: number): Promise<Array<UserPurchaserVM>>;

    updateUserActive(userId: string, customerId: number, access: boolean): Promise<void>;

    userExistsForCustomer(userId: string, customerId: number): Promise<boolean>;
}