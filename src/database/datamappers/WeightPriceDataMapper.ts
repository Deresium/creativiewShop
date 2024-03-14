import IWeightPriceDataGateway from "../gateways/IWeightPriceDataGateway";
import WeightPriceDS from "../../business/models/datastores/WeightPriceDS";
import WeightPriceEntity from "../entities/WeightPriceEntity";
import DatabaseSingleton from "../DatabaseSingleton";
import {Op, Transaction} from "sequelize";

export default class WeightPriceDataMapper implements IWeightPriceDataGateway {
    public async addWeightPriceForDeliveryOption(weightPrice: WeightPriceDS): Promise<void> {
        const date = Date.now();
        await DatabaseSingleton.getInstance().getSequelize().transaction(async (t: Transaction) => {
            await WeightPriceEntity.update({
                endDate: date
            }, {
                where: {
                    deliveryOptionId: weightPrice.getDeliveryOptionId(),
                    gram: weightPrice.getGram(),
                    endDate: {
                        [Op.eq]: null
                    }
                },
                transaction: t
            });

            await WeightPriceEntity.create({
                deliveryOptionId: weightPrice.getDeliveryOptionId(),
                price: weightPrice.getPrice(),
                gram: weightPrice.getGram(),
                startDate: date
            }, {transaction: t});
        });
    }

    public async getWeightPriceForDeliveryOption(deliveryOptionId: string): Promise<Array<WeightPriceEntity>> {
        return WeightPriceEntity.findAll({
            where: {
                deliveryOptionId: deliveryOptionId,
                endDate: {
                    [Op.eq]: null
                }
            },
            order: [['gram', 'ASC NULLS FIRST']]
        });
    }

}