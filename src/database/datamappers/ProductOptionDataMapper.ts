import IProductOptionDataGateway from "../gateways/IProductOptionDataGateway";
import ProductOptionEntity from "../entities/ProductOptionEntity";
import ProductOptionUpdateDS from "../../business/models/datastores/ProductOptionUpdateDS";
import {Op} from "sequelize";
import ProductEntity from "../entities/ProductEntity";
import ProductOptionPriceEntity from "../entities/ProductOptionPriceEntity";
import ProductOptionPictureEntity from "../entities/ProductOptionPictureEntity";

export default class ProductOptionDataMapper implements IProductOptionDataGateway {
    public async createProductOption(productId: string): Promise<string> {
        const productOption = await ProductOptionEntity.create({
            productId: productId,
            preorder: false,
            featured: false,
            active: false
        });
        return productOption.getProductOptionId();
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

    public async getProductOptionByProduct(productId: string): Promise<Array<ProductOptionEntity>> {
        return await ProductOptionEntity.findAll({
            where: {
                productId: productId,
                deletedAt: {
                    [Op.eq]: null
                }
            },
            include: [{
                model: ProductOptionPriceEntity, as: 'productOptionPrices', where: {
                    endDate: {[Op.eq]: null}
                }
            }]
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

    public async getProductOptionFeatured(customerId: string): Promise<Array<ProductOptionEntity>> {
        return await ProductOptionEntity.findAll({
            attributes: ['productOptionId'],
            where: {
                featured: true,
                active: true
            },
            include: [{attributes: [], model: ProductEntity, where: {customerId: customerId}, as: 'product'}]
        })
    };

    public async getProductOptionStore(productOptionId: string, groupIds: Array<string>): Promise<ProductOptionEntity> {
        return await ProductOptionEntity.findOne({
            where: {
                productOptionId: productOptionId
            },
            include: [
                {
                    model: ProductEntity,
                    as: 'product'
                },
                {
                    attributes: ['productOptionPictureId'],
                    model: ProductOptionPictureEntity,
                    as: 'productOptionPictures'
                },
                {
                    model: ProductOptionPriceEntity,
                    where: {endDate: {[Op.eq]: null}},
                    as: 'productOptionPrices'
                }
            ]
        });
    }

}