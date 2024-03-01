import IProductOptionDataGateway from "../gateways/IProductOptionDataGateway";
import ProductOptionEntity from "../entities/ProductOptionEntity";
import ProductOptionUpdateDS from "../../business/models/datastores/ProductOptionUpdateDS";
import {Op} from "sequelize";
import ProductEntity from "../entities/ProductEntity";

export default class ProductOptionDataMapper implements IProductOptionDataGateway {
    public async createProductOption(productId: string): Promise<void> {
        await ProductOptionEntity.create({
            productId: productId
        });
    }

    public async deleteProductOption(productOptionId: string): Promise<void> {
        await ProductOptionEntity.update({
            deletedAt: Date.now()
        }, {
            where: {
                productOptionId: productOptionId
            }
        });
    }

    public async getProductOption(productOptionId: string): Promise<ProductOptionEntity> {
        return await ProductOptionEntity.findByPk(productOptionId);
    }

    public async getProductOptionIdByCustomer(customerId: number): Promise<Array<string>> {
        const response = await ProductOptionEntity.findAll({
            attributes: ['productOptionId'],
            where: {
                deletedAt: {
                    [Op.eq]: null
                }
            },
            include: [{model: ProductEntity, where: {customerId: customerId}}]
        });

        return response.map(productOption => productOption.getProductOptionId());
    }

    public async getProductOptionByProduct(productId: string): Promise<Array<ProductOptionEntity>> {
        return await ProductOptionEntity.findAll({
            where: {
                productId: productId,
                deletedAt: {
                    [Op.eq]: null
                }
            }
        });
    }

    public async updateProductOption(productOptionUpdate: ProductOptionUpdateDS): Promise<void> {
        await ProductOptionEntity.update({
            code: productOptionUpdate.getCode(),
            nameFr: productOptionUpdate.getNameFr(),
            nameEn: productOptionUpdate.getNameEn(),
            weight: productOptionUpdate.getWeight(),
            stock: productOptionUpdate.getStock(),
            active: productOptionUpdate.getActive(),
            preorder: productOptionUpdate.getPreorder(),
            featured: productOptionUpdate.getFeatured()
        }, {
            where: {
                productOptionId: productOptionUpdate.getProductOptionId()
            }
        });
    }

}