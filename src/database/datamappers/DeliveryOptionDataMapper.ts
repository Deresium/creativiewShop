import IDeliveryOptionDataGateway from "../gateways/IDeliveryOptionDataGateway";
import DeliveryOptionEntity from "../entities/DeliveryOptionEntity";
import DeliveryOptionUpdateDS from "../../business/models/datastores/DeliveryOptionUpdateDS";
import {Op} from "sequelize";

export default class DeliveryOptionDataMapper implements IDeliveryOptionDataGateway {
    public async addDeliveryOption(customerId: number): Promise<string> {
        const deliveryOption = await DeliveryOptionEntity.create({
            customerId: customerId,
            active: false
        });
        return deliveryOption.getDeliveryOptionId();
    }

    public async deleteDeliveryOption(deliveryOptionId: string, customerId: number): Promise<void> {
        await DeliveryOptionEntity.update({
            deletedAt: Date.now()
        }, {
            where: {
                deliveryOptionId: deliveryOptionId,
                customerId: customerId
            }
        });
    }

    public async deliveryOptionExistsForCustomer(deliveryOptionId: string, customerId: number): Promise<boolean> {
        const count = await DeliveryOptionEntity.count({
            where: {
                customerId: customerId,
                deliveryOptionId: deliveryOptionId
            }
        });
        return count === 1;
    }

    public async getDeliveryOption(deliveryOptionId: string, customerId: number): Promise<DeliveryOptionEntity> {
        return await DeliveryOptionEntity.findOne({
            where: {
                customerId: customerId,
                deliveryOptionId: deliveryOptionId
            }
        });
    }

    public async getDeliveryOptions(customerId: number): Promise<Array<DeliveryOptionEntity>> {
        return await DeliveryOptionEntity.findAll({
            where: {
                customerId: customerId,
                deletedAt: {
                    [Op.eq]: null
                }
            }
        });
    }

    public async updateDeliveryOption(deliveryOptionUpdate: DeliveryOptionUpdateDS): Promise<void> {
        await DeliveryOptionEntity.update({
            nameFr: deliveryOptionUpdate.getNameFr(),
            active: deliveryOptionUpdate.getActive()
        }, {
            where: {
                customerId: deliveryOptionUpdate.getCustomerId(),
                deliveryOptionId: deliveryOptionUpdate.getDeliveryOptionId()
            }
        });
    }

}