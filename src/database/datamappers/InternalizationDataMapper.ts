import IInternalizationDataGateway from "../gateways/IInternalizationDataGateway";
import InternalizationEntity from "../entities/InternalizationEntity";
import {Op} from "sequelize";

export default class InternalizationDataMapper implements IInternalizationDataGateway {
    public async getAllInternalizationForCustomer(customerId: number): Promise<Array<InternalizationEntity>> {
        return await InternalizationEntity.findAll({
            where: {
                customerId: {
                    [Op.or]: [null, customerId]
                }
            },
            order: [['customerId', 'NULLS LAST']]
        });
    }

}