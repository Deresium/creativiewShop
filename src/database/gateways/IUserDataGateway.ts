import UserCreationDS from "../../business/models/datastores/UserCreationDS";

export default interface IUserDataGateway {
    createUser(userCreationDS: UserCreationDS, salted: string): Promise<void>;
}