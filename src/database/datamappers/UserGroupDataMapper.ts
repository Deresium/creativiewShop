import IUserGroupDataGateway from "../gateways/IUserGroupDataGateway";
import UserGroupEntity from "../entities/UserGroupEntity";
import {Op} from "sequelize";

export default class UserGroupDataMapper implements IUserGroupDataGateway {
    public async getAllGroupsForUser(userId: string): Promise<Array<UserGroupEntity>> {
        const date = new Date();
        return await UserGroupEntity.findAll({
            where: {
                userId: userId,
                startDate: {[Op.lte]: date},
                [Op.or]: [
                    {endDate: {[Op.gte]: date}},
                    {endDate: {[Op.is]: null}}
                ]
            }
        });
    }
}