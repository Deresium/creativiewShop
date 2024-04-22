import IBasketDataGateway from "../gateways/IBasketDataGateway";
import BasketProductOptionDS from "../../business/models/datastores/BasketProductOptionDS";
import BasketProductOptionEntity from "../entities/BasketProductOptionEntity";
import BasketEntity from "../entities/BasketEntity";
import AddressEntity from "../entities/AddressEntity";
import BasketToOrderDS from "../../business/models/datastores/BasketToOrderDS";
import DatabaseSingleton from "../DatabaseSingleton";
import {Transaction} from "sequelize";
import ProductOptionEntity from "../entities/ProductOptionEntity";
import ProductEntity from "../entities/ProductEntity";
import ProductOptionPictureEntity from "../entities/ProductOptionPictureEntity";

export default class BasketDataMapper implements IBasketDataGateway {
    public async addBasketForUser(userId: string): Promise<BasketEntity> {
        return await BasketEntity.create({
            userId: userId,
            basketStateCode: 'BASKET'
        });
    }

    public async findOpenBasketForUser(userId: string): Promise<BasketEntity> {
        return await BasketEntity.findOne({
            where: {
                userId: userId,
                basketStateCode: 'BASKET'
            }
        });
    }

    public async findBasketById(basketId: string): Promise<BasketEntity> {
        return await BasketEntity.findOne({
            where: {
                basketId: basketId
            },
            include: [{model: AddressEntity, as: 'deliveryAddress', required: false}]
        });
    }

    public async findBasketWithProductOptionWeight(basketId: string): Promise<BasketEntity> {
        return await BasketEntity.findOne({
            where: {
                basketId: basketId
            },
            include: [
                {
                    model: AddressEntity, as: 'deliveryAddress', required: false
                },
                {
                    model: BasketProductOptionEntity,
                    attributes: ['productOptionId', 'quantity'],
                    as: 'basketProductOptions',
                    include: [{model: ProductOptionEntity, attributes: ['weight'], as: 'productOption'}]
                }
            ]
        });
    }

    public async findProductOptionBasket(basketId: string, productOptionId: string): Promise<BasketProductOptionEntity> {
        return await BasketProductOptionEntity.findOne({
            where: {
                basketId: basketId,
                productOptionId: productOptionId
            }
        });
    }

    public async addProductOptionToBasket(basketProductOption: BasketProductOptionDS): Promise<void> {
        await BasketProductOptionEntity.create({
            basketId: basketProductOption.getBasketId(),
            productOptionId: basketProductOption.getProductOptionId(),
            quantity: basketProductOption.getQuantity()
        });
    }

    public async deleteProductOptionBasket(basketId: string, productOptionId: string): Promise<void> {
        await BasketProductOptionEntity.destroy({
            where: {
                basketId: basketId,
                productOptionId: productOptionId
            }
        });
    }

    public async getBasketProductOptions(basketId: string): Promise<Array<BasketProductOptionEntity>> {
        return await BasketProductOptionEntity.findAll({
            where: {
                basketId: basketId
            }
        });
    }

    public async updateProductOptionBasket(basketProductOption: BasketProductOptionDS): Promise<void> {
        await BasketProductOptionEntity.update({
            quantity: basketProductOption.getQuantity()
        }, {
            where: {
                basketId: basketProductOption.getBasketId(),
                productOptionId: basketProductOption.getProductOptionId()
            }
        });
    }

    public async updateBasketBillingAddress(basketId: string, addressId: string): Promise<void> {
        await BasketEntity.update({
            billingAddressId: addressId
        }, {
            where: {
                basketId: basketId
            }
        });
    }

    public async updateBasketDeliveryAddress(basketId: string, addressId: string): Promise<void> {
        await BasketEntity.update({
            deliveryAddressId: addressId
        }, {
            where: {
                basketId: basketId
            }
        });
    }

    public async updateBasketDeliveryOption(basketId: string, deliveryOptionId: string): Promise<void> {
        await BasketEntity.update({
            deliveryOptionId: deliveryOptionId
        }, {
            where: {
                basketId: basketId
            }
        });
    }

    public async updateBasketPaymentMethod(basketId: string, paymentMethod: string): Promise<void> {
        await BasketEntity.update({
            paymentMethodCode: paymentMethod
        }, {
            where: {
                basketId: basketId
            }
        });
    }


    public async basketToOrder(basketToOrderDS: BasketToOrderDS): Promise<void> {
        const date = Date.now();
        await DatabaseSingleton.getInstance().getSequelize().transaction(async (t: Transaction) => {

            await BasketEntity.update({
                orderedAt: date,
                basketStateCode: 'ORDERED',
                currencyAtOrdered: basketToOrderDS.getCurrency(),
                totalWeightAtOrdered: basketToOrderDS.getTotalWeight()
            }, {
                where: {
                    basketId: basketToOrderDS.getBasketId()
                },
                transaction: t
            });

            for (const productOptionId of basketToOrderDS.getProductOptionStocks().keys()) {
                await ProductOptionEntity.update({
                    stock: basketToOrderDS.getProductOptionStocks().get(productOptionId)
                }, {
                    where: {
                        productOptionId: productOptionId
                    },
                    transaction: t
                })
            }

            for (const productOptionId of basketToOrderDS.getBasketProductOptionPrice().keys()) {
                await BasketProductOptionEntity.update({
                    priceAtOrdered: basketToOrderDS.getBasketProductOptionPrice().get(productOptionId)
                }, {
                    where: {
                        productOptionId: productOptionId
                    },
                    transaction: t
                })
            }
        });
    }

    public async getBasketOrder(basketId: string): Promise<BasketEntity> {
        return await BasketEntity.findOne({
            where: {
                basketId: basketId
            },
            include: [
                {
                    model: BasketProductOptionEntity, as: 'basketProductOptions', required: true,
                    include: [
                        {
                            model: ProductOptionEntity, as: 'productOption', required: true,
                            include: [
                                {
                                    model: ProductEntity, as: 'product', required: true
                                },
                                {
                                    model: ProductOptionPictureEntity, as: 'productOptionPictures', required: false
                                }
                            ]
                        }
                    ]
                }
            ]
        });
    }


}