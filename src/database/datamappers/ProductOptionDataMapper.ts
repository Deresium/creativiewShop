import IProductOptionDataGateway from "../gateways/IProductOptionDataGateway";
import ProductOptionEntity from "../entities/ProductOptionEntity";
import ProductOptionUpdateDS from "../../business/models/datastores/ProductOptionUpdateDS";
import {Op} from "sequelize";
import ProductEntity from "../entities/ProductEntity";
import ProductOptionPriceEntity from "../entities/ProductOptionPriceEntity";
import ProductOptionPictureEntity from "../entities/ProductOptionPictureEntity";
import ProductOptionDiscountEntity from "../entities/ProductOptionDiscountEntity";
import ProductOptionCategoryEntity from "../entities/ProductOptionCategoryEntity";
import ManufacturerEntity from "../entities/ManufacturerEntity";

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
                },
                required: false
            }]
        });
    }

    public async getProductOptionByProductActive(productId: string): Promise<Array<ProductOptionEntity>> {
        return await ProductOptionEntity.findAll({
            attributes: ['productOptionId', 'nameFr', 'nameEn'],
            where: {
                productId: productId,
                deletedAt: {
                    [Op.eq]: null
                },
                active: true
            }
        })
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
                active: true,
                deletedAt: {
                    [Op.eq]: null
                }
            },
            include: [{
                attributes: [],
                model: ProductEntity,
                where: {
                    customerId: customerId,
                    deletedAt: {
                        [Op.eq]: null
                    }
                },
                as: 'product'
            }]
        });
    };

    public async getProductOptionLastOneAdded(customerId: string): Promise<Array<ProductOptionEntity>> {
        return await ProductOptionEntity.findAll({
            attributes: ['productOptionId', 'createdAt'],
            where: {
                active: true,
                deletedAt: {
                    [Op.eq]: null
                }
            },
            order: [['createdAt', 'DESC']],
            limit: 5,
            include: [
                {
                    attributes: [],
                    model: ProductEntity,
                    where: {
                        customerId: customerId,
                        deletedAt: {
                            [Op.eq]: null
                        }
                    },
                    as: 'product'
                },
                {
                    attributes: [],
                    model: ProductOptionPriceEntity,
                    required: true,
                    as: 'productOptionPrices'
                }
            ]
        });
    }

    public async getProductOptionOnlyOneLeft(customerId: string): Promise<Array<ProductOptionEntity>> {
        return await ProductOptionEntity.findAll({
            attributes: ['productOptionId'],
            where: {
                active: true,
                stock: 1,
                deletedAt: {
                    [Op.eq]: null
                }
            },
            limit: 5,
            include: [
                {
                    attributes: [],
                    model: ProductEntity,
                    where: {
                        customerId: customerId,
                        deletedAt: {
                            [Op.eq]: null
                        }
                    },
                    as: 'product'
                },
                {
                    attributes: [],
                    model: ProductOptionPriceEntity,
                    required: true,
                    as: 'productOptionPrices'
                }
            ]
        });
    }


    public async getAllProductOptionStore(customerId: string): Promise<Array<ProductOptionEntity>> {
        return await ProductOptionEntity.findAll({
            attributes: ['productOptionId', 'nameFr', 'nameEn'],
            where: {
                active: true,
                deletedAt: {
                    [Op.eq]: null
                }
            },
            include: [
                {
                    attributes: ['nameFr', 'nameEn', 'descriptionFr', 'descriptionEn', 'manufacturerId'],
                    model: ProductEntity,
                    where: {
                        customerId: customerId,
                        deletedAt: {
                            [Op.eq]: null
                        }
                    },
                    as: 'product'
                },
                {
                    attributes: [],
                    model: ProductOptionPriceEntity,
                    required: true,
                    as: 'productOptionPrices'
                },
                {
                    attributes: ['categoryId'],
                    model: ProductOptionCategoryEntity,
                    required: false,
                    as: 'productOptionCategories'
                }
            ]
        });
    }


    public async getProductOptionDiscount(customerId: string, groups: Array<string>): Promise<Array<ProductOptionEntity>> {
        const date = new Date();
        return await ProductOptionEntity.findAll({
            attributes: ['productOptionId'],
            where: {
                active: true,
                deletedAt: {
                    [Op.eq]: null
                },
                '$groupId$': {[Op.or]: [null, groups]}
            },
            include: [
                {
                    attributes: [],
                    model: ProductEntity,
                    where: {
                        customerId: customerId,
                        deletedAt: {
                            [Op.eq]: null
                        }
                    },
                    as: 'product'
                },
                {
                    attributes: [],
                    model: ProductOptionDiscountEntity,
                    where: {
                        startDate: {[Op.lte]: date},
                        endDate: {
                            [Op.or]: [{[Op.gte]: date}, {[Op.is]: null}]
                        },
                        deletedAt: {
                            [Op.or]: [{[Op.gte]: date}, {[Op.is]: null}]
                        }

                    },
                    required: true,
                    as: 'productOptionDiscounts'
                }
            ]
        });
    }

    public async getProductOptionStore(productOptionId: string, groupIds: Array<string>): Promise<ProductOptionEntity> {
        const date = new Date();
        return await ProductOptionEntity.findOne({
            where: {
                productOptionId: productOptionId,
                '$groupId$': {[Op.or]: [null, groupIds]}
            },
            include: [
                {
                    model: ProductEntity,
                    as: 'product',
                    include: [{model: ManufacturerEntity, as: 'manufacturer', required: false}]
                },
                {
                    attributes: ['productOptionPictureId'],
                    model: ProductOptionPictureEntity,
                    required: false,
                    as: 'productOptionPictures'
                },
                {
                    model: ProductOptionPriceEntity,
                    required: false,
                    where: {endDate: {[Op.eq]: null}},
                    as: 'productOptionPrices'
                },
                {
                    model: ProductOptionDiscountEntity,
                    required: false,
                    where: {
                        startDate: {[Op.lte]: date},
                        endDate: {
                            [Op.or]: [{[Op.gte]: date}, {[Op.is]: null}]
                        },
                        deletedAt: {
                            [Op.or]: [{[Op.gte]: date}, {[Op.is]: null}]
                        }

                    },
                    as: 'productOptionDiscounts'
                }
            ]
        });
    }

}