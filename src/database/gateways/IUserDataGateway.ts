import UserCreationDS from "../../business/models/datastores/UserCreationDS";
import PasswordHashDS from "../../business/models/datastores/PasswordHashDS";
import UserEntity from "../entities/UserEntity";

export default interface IUserDataGateway {
    createUser(userCreationDS: UserCreationDS, hashPassword: PasswordHashDS): Promise<void>;

    findUserByEmailAndCustomer(email: string, customerId: number): Promise<UserEntity>;

    findActiveUserOnEmail(email: string, customerId: number): Promise<UserEntity>;

    findUserById(userId: bigint): Promise<UserEntity>;
}