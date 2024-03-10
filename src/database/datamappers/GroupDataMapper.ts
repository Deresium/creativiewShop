import IGroupDataGateway from "../gateways/IGroupDataGateway";
import GroupEntity from "../entities/GroupEntity";
import {Op} from "sequelize";

export default class GroupDataMapper implements IGroupDataGateway {
    public async getDiscountGroupsForCustomer(customerId: number): Promise<Array<GroupEntity>> {
        return await GroupEntity.findAll({
            where: {
                customerId: {
                    [Op.or]: [null, customerId]
                },
                deletedAt: {
                    [Op.eq]: null
                },
                groupCategoryCode: 'DISCOUNT'
            }
        });
    }
}