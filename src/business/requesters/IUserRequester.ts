import UserCreationDS from "../models/datastores/UserCreationDS";

export default interface IUserRequester {
    createUser(userVM: UserCreationDS): Promise<void>;
}