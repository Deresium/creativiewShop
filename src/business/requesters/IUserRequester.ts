import UserCreationDS from "../models/datastores/UserCreationDS";
import LoginInfoDS from "../models/datastores/LoginInfoDS";
import UserLoginVM from "../models/viewmodels/UserLoginVM";
import UserVM from "../models/viewmodels/UserVM";

export default interface IUserRequester {
    createUser(userCreationDS: UserCreationDS): Promise<void>;

    loginUser(loginInfoDS: LoginInfoDS): Promise<UserLoginVM>;

    getUser(userId: string, userGroups: Array<string>): Promise<UserVM>;
}