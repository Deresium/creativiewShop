import IUserRequester from "../requesters/IUserRequester";
import IUserDataGateway from "../../database/gateways/IUserDataGateway";
import UserCreationDS from "../models/datastores/UserCreationDS";
import PasswordHasher from "../utils/PasswordHasher";
import LoginInfoDS from "../models/datastores/LoginInfoDS";
import UserLoginVM from "../models/viewmodels/UserLoginVM";
import UserVM from "../models/viewmodels/UserVM";
import IUserGroupRequester from "../requesters/IUserGroupRequester";
import GroupConst from "../utils/GroupConst";
import UserPurchaserVM from "../models/viewmodels/UserPurchaserVM";

export default class UserFacade implements IUserRequester {
    private readonly userDataGateway: IUserDataGateway;
    private readonly userGroupRequester: IUserGroupRequester;

    constructor(userDataGateway: IUserDataGateway, userGroupRequester: IUserGroupRequester) {
        this.userDataGateway = userDataGateway;
        this.userGroupRequester = userGroupRequester;
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
            const userGroups = await this.userGroupRequester.getAllGroupsForUser(user.getUserId(), loginInfoDS.getCustomerId());
            return new UserLoginVM(user.getUserId(), userGroups);
        }
        return null;
    }

    public async getUser(userId: string, customerId: number, userGroups: Array<string>): Promise<UserVM> {
        const userEntity = await this.userDataGateway.findUserById(userId, customerId);
        if (!userEntity) {
            return null;
        }
        return new UserVM(userEntity.getName(), userEntity.getFirstName(), userEntity.getEmail(), GroupConst.hasAccessTo(GroupConst.ADMIN_STORE, userGroups), true);
    }

    public async findUserPurchasers(customerId: number): Promise<Array<UserPurchaserVM>> {
        const userPurchasers = new Array<UserPurchaserVM>();
        const users = await this.userDataGateway.findUserPurchasers(customerId);
        for(const user of users){
            let groupIdDiscountUser: string = null;
            if(user.getUserGroups().length !== 0){
                groupIdDiscountUser = user.getUserGroups()[0].getGroup().getGroupId();
            }
            const userPurchaser = new UserPurchaserVM(user.getUserId(), groupIdDiscountUser,user.getAccess(), user.getName(), user.getFirstName(), user.getEmail());
            userPurchasers.push(userPurchaser);
        }

        return userPurchasers;
    }


    public async updateUserActive(userId: string, customerId: number, access: boolean): Promise<void> {
        await this.userDataGateway.updateUserActive(userId, customerId, access);
    }

    public async userExistsForCustomer(userId: string, customerId: number): Promise<boolean> {
        return await this.userDataGateway.userExistsForCustomer(userId, customerId);
    }
}