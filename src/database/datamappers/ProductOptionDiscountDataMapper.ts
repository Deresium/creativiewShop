import IProductOptionDiscountDataGateway from "../gateways/IProductOptionDiscountDataGateway";
import ProductOptionDiscountDS from "../../business/models/datastores/ProductOptionDiscountDS";
import ProductOptionDiscountEntity from "../entities/ProductOptionDiscountEntity";
import ProductEntity from "../entities/ProductEntity";
import ProductOptionEntity from "../entities/ProductOptionEntity";
import GroupEntity from "../entities/GroupEntity";
import ProductOptionPriceEntity from "../entities/ProductOptionPriceEntity";
import {Op} from "sequelize";

export default class ProductOptionDiscountDataMapper implements IProductOptionDiscountDataGateway {
    public async addProductOptionDiscount(productOptionDiscountDs: ProductOptionDiscountDS): Promise<void> {
        await ProductOptionDiscountEntity.create({
            productOptionId: productOptionDiscountDs.getProductOptionId(),
            groupId: productOptionDiscountDs.getGroupId(),
            percent: productOptionDiscountDs.getPercent(),
            startDate: productOptionDiscountDs.getStartDate(),
            endDate: productOptionDiscountDs.getEndDate()
        });
    }

    public async deleteProductOptionDiscount(productOptionDiscountId: string): Promise<void> {
        const now = Date.now();
        await ProductOptionDiscountEntity.update({
            deletedAt: now
        }, {where: {productOptionDiscountId: productOptionDiscountId}});
    }

    public async getDiscountsForProductOption(productOptionId: string): Promise<Array<ProductOptionDiscountEntity>> {
        return await ProductOptionDiscountEntity.findAll({
            where: {
                productOptionId: productOptionId
            },
            include: [
                {model: GroupEntity, as: 'group', required: false},
                {model: ProductOptionEntity, as: 'productOption', include: [{
                    model: ProductOptionPriceEntity, as: 'productOptionPrices', where: {endDate: {[Op.eq]: null}}
                }]
            }]
        });
    }
}