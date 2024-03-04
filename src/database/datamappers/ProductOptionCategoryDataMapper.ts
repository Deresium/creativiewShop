import IProductOptionCategoryDataGateway from "../gateways/IProductOptionCategoryDataGateway";
import ProductOptionCategoryEntity from "../entities/ProductOptionCategoryEntity";
import DatabaseSingleton from "../DatabaseSingleton";
import {Transaction} from "sequelize";

export default class ProductOptionCategoryDataMapper implements IProductOptionCategoryDataGateway {
    public async getProductOptionCategories(productOptionId: string): Promise<Array<ProductOptionCategoryEntity>> {
        return await ProductOptionCategoryEntity.findAll({
            where: {
                productOptionId: productOptionId,
            }
        });
    }
    public async replaceCategories(productOptionId: string, listCategoriesId: Array<string>): Promise<void> {
        await DatabaseSingleton.getInstance().getSequelize().transaction(async (t: Transaction) => {

            await ProductOptionCategoryEntity.destroy({
                where: {
                    productOptionId: productOptionId
                },
                transaction: t
            });

            for(const categoryId of listCategoriesId) {
                await ProductOptionCategoryEntity.create({
                    categoryId: categoryId,
                    productOptionId: productOptionId
                },{transaction: t});
            }

        });
    }

}