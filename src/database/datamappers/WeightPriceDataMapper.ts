import IWeightPriceDataGateway from "../gateways/IWeightPriceDataGateway";
import WeightPriceDS from "../../business/models/datastores/WeightPriceDS";
import WeightPriceEntity from "../entities/WeightPriceEntity";
import DatabaseSingleton from "../DatabaseSingleton";
import {Op, Transaction} from "sequelize";
import ProductOptionPriceEntity from "../entities/ProductOptionPriceEntity";

export default class WeightPriceDataMapper implements IWeightPriceDataGateway {
    public async addWeightPriceForGeographicZone(weightPrice: WeightPriceDS): Promise<void> {
        const date = Date.now();
        await DatabaseSingleton.getInstance().getSequelize().transaction(async (t: Transaction) => {
            await WeightPriceEntity.update({
                endDate: date
            }, {
                where: {
                    geographicZoneId: weightPrice.getGeographicZoneId(),
                    gram: weightPrice.getGram(),
                    endDate: {
                        [Op.eq]: null
                    }
                },
                transaction: t
            });

            await WeightPriceEntity.create({
                geographicZoneId: weightPrice.getGeographicZoneId(),
                price: weightPrice.getPrice(),
                gram: weightPrice.getGram(),
                startDate: date
            }, {transaction: t});
        });
    }

    public async getWeightPriceForGeographicZone(geographicZoneId: string): Promise<Array<WeightPriceEntity>> {
        return WeightPriceEntity.findAll({
            where: {
                geographicZoneId: geographicZoneId,
                endDate: {
                    [Op.eq]: null
                }
            }
        });
    }

}