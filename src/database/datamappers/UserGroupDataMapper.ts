import IUserGroupDataGateway from "../gateways/IUserGroupDataGateway";
import UserGroupEntity from "../entities/UserGroupEntity";
import {Op} from "sequelize";
import UserEntity from "../entities/UserEntity";

export default class UserGroupDataMapper implements IUserGroupDataGateway {
    public async getAllGroupsForUser(userId: string, customerId: number): Promise<Array<UserGroupEntity>> {
        const date = new Date();
        return await UserGroupEntity.findAll({
            where: {
                userId: userId,
                startDate: {[Op.lte]: date},
                [Op.or]: [
                    {endDate: {[Op.gte]: date}},
                    {endDate: {[Op.is]: null}}
                ]
            },
            include: [{model: UserEntity, as: 'user', where: {customerId: customerId}}]
        });
    }

    public async addUserToGroup(userId: string, groupId: string): Promise<void> {
        await UserGroupEntity.create({
            groupId: groupId,
            userId: userId,
            startDate: Date.now()
        });
    }

    public async deleteUserFromGroup(userId: string, groupId: string): Promise<void> {
        await UserGroupEntity.update({
            endDate: Date.now()
        },{
            where: {
                userId: userId,
                groupId: groupId
            }
        });
    }

    public async existsUserInGroup(userId: string, groupId: string): Promise<boolean> {
        const count = await UserGroupEntity.count({
            where: {
                userId: userId,
                groupId: groupId,
                endDate: {[Op.is]: null}
            }
        });
        return count === 1;
    }
}