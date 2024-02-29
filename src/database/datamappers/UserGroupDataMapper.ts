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
            include: [{model: UserEntity, where: {customerId: customerId}}]
        });
    }
}