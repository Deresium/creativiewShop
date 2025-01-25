import UserCreationDS from "../../business/models/datastores/UserCreationDS";
import PasswordHashDS from "../../business/models/datastores/PasswordHashDS";
import UserEntity from "../entities/UserEntity";
import PasswordChangeRequestEntity from "../entities/PasswordChangeRequestEntity";

export default interface IUserDataGateway {
    createUser(userCreationDS: UserCreationDS, hashPassword: PasswordHashDS): Promise<void>;

    createUserTemp(customerId: number, language: string): Promise<UserEntity>;

    findUserByEmailAndCustomer(email: string, customerId: number): Promise<UserEntity>;

    findActiveUserOnEmail(email: string, customerId: number): Promise<UserEntity>;

    findUserById(userId: string, customerId: number): Promise<UserEntity>;

    findUserPurchasers(customerId: number, onlyWithAccess: boolean): Promise<Array<UserEntity>>;

    updateUserActive(userId: string, customerId: number, access: boolean): Promise<void>;

    userExistsForCustomer(userId: string, customerId: number): Promise<boolean>;

    createPasswordChangeRequest(userId: string, hash: string): Promise<void>;

    findPasswordChangeRequest(hash: string): Promise<PasswordChangeRequestEntity>;

    updatePasswordBasedOnChangeRequest(userId: string, hash: string, newPassword: string, newSalt: string): Promise<void>;

    updatePhoneNumber(userId: string, phoneNumber: string): Promise<void>;

    getPhoneNumber(userId: string): Promise<string>;
}