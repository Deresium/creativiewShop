import IProductOptionDiscountDataGateway from "../gateways/IProductOptionDiscountDataGateway";
import ProductOptionDiscountDS from "../../business/models/datastores/ProductOptionDiscountDS";
import ProductOptionDiscountEntity from "../entities/ProductOptionDiscountEntity";

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
            }
        });
    }
}