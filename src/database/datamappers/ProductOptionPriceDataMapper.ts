import IProductOptionPriceDataGateway from "../gateways/IProductOptionPriceDataGateway";
import ProductOptionPriceEntity from "../entities/ProductOptionPriceEntity";
import {Op, Transaction} from "sequelize";
import DatabaseSingleton from "../DatabaseSingleton";

export default class ProductOptionPriceDataMapper implements IProductOptionPriceDataGateway {

    public async getPricesForProductOption(productOptionId: string): Promise<Array<ProductOptionPriceEntity>> {
        return await ProductOptionPriceEntity.findAll({
            where: {
                productOptionId: productOptionId
            },
            order: [
                ['startDate', 'DESC']
            ]
        });
    }

    public async updatePrice(productOptionId: string, price: number): Promise<void> {
        const date = Date.now();
        await DatabaseSingleton.getInstance().getSequelize().transaction(async (t: Transaction) => {
            await ProductOptionPriceEntity.update({
                endDate: date
            }, {
                where: {
                    productOptionId: productOptionId,
                    endDate: {
                        [Op.eq]: null
                    }
                },
                transaction: t
            });

            await ProductOptionPriceEntity.create({
                price: price,
                productOptionId: productOptionId,
                startDate: date
            }, {transaction: t});
        });
    }

}