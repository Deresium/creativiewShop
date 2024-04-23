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
import ISendMailDataGateway from "../../external/aws/mail/ISendMailDataGateway";
import UserEmailVM from "../models/viewmodels/UserEmailVM";
import CustomerVM from "../models/viewmodels/CustomerVM";
import IUserGroupDataGateway from "../../database/gateways/IUserGroupDataGateway";
import {v4 as uuidv4} from 'uuid';
import {createHash} from 'crypto';

export default class UserFacade implements IUserRequester {
    private readonly userDataGateway: IUserDataGateway;
    private readonly userGroupDataGateway: IUserGroupDataGateway;
    private readonly userGroupRequester: IUserGroupRequester;
    private readonly sendMailDataGateway: ISendMailDataGateway;


    constructor(userDataGateway: IUserDataGateway, userGroupDataGateway: IUserGroupDataGateway, userGroupRequester: IUserGroupRequester, sendMailDataGateway: ISendMailDataGateway) {
        this.userDataGateway = userDataGateway;
        this.userGroupDataGateway = userGroupDataGateway;
        this.userGroupRequester = userGroupRequester;
        this.sendMailDataGateway = sendMailDataGateway;
    }

    public async createUser(userCreationDS: UserCreationDS): Promise<void> {
        if (userCreationDS.getPassword() !== userCreationDS.getRepeatPassword()) {
            throw new Error('error.noMatchPassword');
        }

        const user = await this.userDataGateway.findUserByEmailAndCustomer(userCreationDS.getEmail(), userCreationDS.getCustomer().getCustomerId());
        if (user) {
            throw new Error('createAccount.alreadyExists');
        }

        const passwordHashDS = await PasswordHasher.hashPassword(userCreationDS.getPassword());
        await this.userDataGateway.createUser(userCreationDS, passwordHashDS);

        const userEmail = new UserEmailVM(userCreationDS.getName(), userCreationDS.getFirstName(), userCreationDS.getEmail(), userCreationDS.getLanguage());
        const usersGroupAdminStore = await this.userGroupDataGateway.findUsersInGroup(userCreationDS.getCustomer().getCustomerId(), GroupConst.ADMIN_STORE);
        const userAdminStoreEmail = usersGroupAdminStore.map(userGroupAdmin => userGroupAdmin.getUser().getEmail());
        await this.sendMailDataGateway.sendEmailNewUserAccount(userEmail, userCreationDS.getCustomer(), userAdminStoreEmail, 'fr');
    }

    public async createUserTemp(customerId: number, language: string): Promise<string> {
        const user = await this.userDataGateway.createUserTemp(customerId, language);
        return user.getUserId();
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
        for (const user of users) {
            let groupIdDiscountUser: string = null;
            if (user.getUserGroups().length !== 0) {
                groupIdDiscountUser = user.getUserGroups()[0].getGroup().getGroupId();
            }
            const userPurchaser = new UserPurchaserVM(user.getUserId(), groupIdDiscountUser, user.getAccess(), user.getName(), user.getFirstName(), user.getEmail(), user.getLanguage());
            userPurchasers.push(userPurchaser);
        }

        return userPurchasers;
    }

    public async getUsersFromGroupForCustomer(customerId: number, groupId: string): Promise<Array<UserPurchaserVM>> {
        const usersGroup = await this.userGroupDataGateway.findUsersInGroup(customerId, groupId);
        return usersGroup.map(userGroup => new UserPurchaserVM(userGroup.getUser().getUserId(), groupId, userGroup.getUser().getAccess(), userGroup.getUser().getName(), userGroup.getUser().getFirstName(), userGroup.getUser().getEmail(), userGroup.getUser().getLanguage()));
    }


    public async updateUserActive(userId: string, customer: CustomerVM, access: boolean): Promise<void> {
        const user = await this.userDataGateway.findUserById(userId, customer.getCustomerId());
        if (user.getAccess() === access) {
            return;
        }
        await this.userDataGateway.updateUserActive(userId, customer.getCustomerId(), access);
        if (access) {
            const user = await this.userDataGateway.findUserById(userId, customer.getCustomerId());
            const userEmail = new UserEmailVM(user.getName(), user.getFirstName(), user.getEmail(), user.getLanguage());
            await this.sendMailDataGateway.sendEmailUserAccess(userEmail, customer);
        }
    }

    public async userExistsForCustomer(userId: string, customerId: number): Promise<boolean> {
        return await this.userDataGateway.userExistsForCustomer(userId, customerId);
    }

    public async addPasswordChangeRequest(email: string, customer: CustomerVM): Promise<void> {
        const user = await this.userDataGateway.findUserByEmailAndCustomer(email, customer.getCustomerId());
        if (!user) {
            return;
        }
        const uuid: string = uuidv4();
        const hashUuid = createHash('sha256').update(uuid).digest('hex');
        await this.userDataGateway.createPasswordChangeRequest(user.getUserId(), hashUuid);
        await this.sendMailDataGateway.sendEmailForgotPassword(customer, uuid, user.getEmail(), user.getLanguage());
    }

    public async updatePasswordBasedOnChangeRequest(uuid: string, password: string, repeatPassword: string): Promise<void> {
        if (password !== repeatPassword) {
            throw new Error('error.noMatchPassword');
        }

        const hashUuid = createHash('sha256').update(uuid).digest('hex');
        const passwordRequest = await this.userDataGateway.findPasswordChangeRequest(hashUuid);
        if (!passwordRequest) {
            throw new Error('error.noRequest');
        }

        const createdAt = passwordRequest.getCreatedAt();
        const now = new Date();
        const differenceInMs = now.getTime() - createdAt.getTime();
        if (differenceInMs > 1000 * 60 * 60 * 2) { // 2 hours timeout
            throw new Error('error.expired');
        }

        const passwordHashed = await PasswordHasher.hashPassword(password);
        await this.userDataGateway.updatePasswordBasedOnChangeRequest(passwordRequest.getUserId(), hashUuid, passwordHashed.getHashedPassword(), passwordHashed.getSalt());
    }


}