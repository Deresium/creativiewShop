import UserCreationDS from "../../business/models/datastores/UserCreationDS";
import IUserDataGateway from "../gateways/IUserDataGateway";
import UserEntity from "../entities/UserEntity";
import PasswordHashDS from "../../business/models/datastores/PasswordHashDS";
import UserGroupEntity from "../entities/UserGroupEntity";
import GroupEntity from "../entities/GroupEntity";
import {Op} from "sequelize";

export default class UserDataMapper implements IUserDataGateway {
    public async createUser(userCreationDS: UserCreationDS, hashPassword: PasswordHashDS): Promise<void> {
        await UserEntity.create({
            email: userCreationDS.getEmail(),
            password: hashPassword.getHashedPassword(),
            salted: hashPassword.getSalt(),
            access: false,
            name: userCreationDS.getName(),
            firstName: userCreationDS.getFirstName(),
            customerId: userCreationDS.getCustomerId()
        });
    }

    public async findUserByEmailAndCustomer(email: string, customerId: number): Promise<UserEntity> {
        return await UserEntity.findOne({
            where: {
                email: email,
                customerId: customerId
            }
        })
    }

    public async findActiveUserOnEmail(email: string, customerId: number): Promise<UserEntity> {
        return await UserEntity.findOne({
            where: {
                email: email,
                customerId: customerId,
                access: true
            }
        })
    }

    public async findUserById(userId: string, customerId: number): Promise<UserEntity> {
        return await UserEntity.findOne({
            where: {
                userId: userId,
                customerId: customerId
            }
        });
    }

    public async findUserPurchasers(customerId: number): Promise<Array<UserEntity>> {
        return await UserEntity.findAll({
            where: {
                customerId: customerId,
            },
            include: [{
                model: UserGroupEntity,
                as: 'userGroups',
                required: false,
                include: [{
                    model: GroupEntity,
                    as: 'Group',
                    required: false,
                    where: {groupCategoryCode: {[Op.or]: [null, 'DISCOUNT']}}
                }]
            }]
        });
    }

    public async updateUserActive(userId: string, customerId: number, access: boolean): Promise<void> {
        await UserEntity.update({
            access : access
        },{
            where: {
                userId: userId,
                customerId: customerId
            }
        });
    }

    public async userExistsForCustomer(userId: string, customerId: number): Promise<boolean> {
        const count = await UserEntity.count({
            where: {
                userId: userId,
                customerId: customerId
            }
        });
        return count === 1;
    }


}