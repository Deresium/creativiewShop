import IUserRequester from "../requesters/IUserRequester";
import IUserDataGateway from "../../database/gateways/IUserDataGateway";
import UserCreationDS from "../models/datastores/UserCreationDS";
import PasswordHasher from "../utils/PasswordHasher";
import LoginInfoDS from "../models/datastores/LoginInfoDS";
import UserLoginVM from "../models/viewmodels/UserLoginVM";
import UserVM from "../models/viewmodels/UserVM";

export default class UserFacade implements IUserRequester {
    private readonly userDataGateway: IUserDataGateway;

    constructor(userDataGateway: IUserDataGateway) {
        this.userDataGateway = userDataGateway;
    }

    public async createUser(userCreationDS: UserCreationDS): Promise<void> {
        if (userCreationDS.getPassword() !== userCreationDS.getRepeatPassword()) {
            throw new Error('error.noMatchPassword');
        }

        const user = await this.userDataGateway.findUserByEmailAndCustomer(userCreationDS.getEmail(), userCreationDS.getCustomerId());
        if (user) {
            throw new Error('createAccount.alreadyExists');
        }

        const passwordHashDS = await PasswordHasher.hashPassword(userCreationDS.getPassword());
        await this.userDataGateway.createUser(userCreationDS, passwordHashDS);
    }

    public async loginUser(loginInfoDS: LoginInfoDS): Promise<UserLoginVM> {
        const user = await this.userDataGateway.findActiveUserOnEmail(loginInfoDS.getEmail(), loginInfoDS.getCustomerId());
        if (!user) {
            return null;
        }
        const passwordHashed = await PasswordHasher.hashPassword(loginInfoDS.getPassword(), user.getSalted());

        if (passwordHashed.getHashedPassword() === user.getPassword()) {
            return new UserLoginVM(user.getUserId(), user.getRole());
        }
        return null;
    }

    public async getUser(userId: bigint): Promise<UserVM> {
        const userEntity = await this.userDataGateway.findUserById(userId);
        return new UserVM(userEntity.getName(), userEntity.getFirstName(), userEntity.getEmail(), userEntity.getRole() === 'ADMIN', true);
    }
}