import IBasketDataGateway from "../gateways/IBasketDataGateway";
import BasketProductOptionDS from "../../business/models/datastores/BasketProductOptionDS";
import BasketProductOptionEntity from "../entities/BasketProductOptionEntity";
import BasketEntity from "../entities/BasketEntity";
import AddressEntity from "../entities/AddressEntity";
import BasketToOrderDS from "../../business/models/datastores/BasketToOrderDS";
import DatabaseSingleton from "../DatabaseSingleton";
import {Op, Transaction} from "sequelize";
import ProductOptionEntity from "../entities/ProductOptionEntity";
import ProductEntity from "../entities/ProductEntity";
import ProductOptionPictureEntity from "../entities/ProductOptionPictureEntity";
import UserEntity from "../entities/UserEntity";
import CustomerEntity from "../entities/CustomerEntity";

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

    public async findBasketByIdAndUserId(basketId: string, userId: string): Promise<boolean> {
        const count = await BasketEntity.count({
            where: {
                basketId: basketId,
                userId: userId
            }
        });
        return count === 1;
    }

    public async findBasketByIdAndCustomerId(basketId: string, customerId: string): Promise<boolean> {
        const count = await BasketEntity.count({
            where:{
                basketId: basketId
            },
            include: [
                {
                    model: UserEntity, as: 'user', where: {customerId: customerId}, required: true
                }
            ]
        });
        return count === 1;
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
                    as: 'basketPO',
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


    public async basketToOrder(basketToOrderDS: BasketToOrderDS, customerId: number): Promise<void> {
        const date = Date.now();
        await DatabaseSingleton.getInstance().getSequelize().transaction(async (t: Transaction) => {
            const customer = await CustomerEntity.findOne({
                where: {
                    customerId: customerId
                },
                transaction: t
            });
            const nextOrder = (customer.getOrderCounter() + BigInt(1)).toString();

            await CustomerEntity.update({
                orderCounter: nextOrder
            }, {
                where: {
                    customerId: customerId
                },
                transaction: t
            });

            await BasketEntity.update({
                orderedAt: date,
                basketStateCode: 'ORDERED',
                currencyAtOrdered: basketToOrderDS.getCurrency(),
                totalWeightAtOrdered: basketToOrderDS.getTotalWeight(),
                orderNumber: nextOrder
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
                    model: BasketProductOptionEntity, as: 'basketPO', required: true,
                    include: [
                        {
                            model: ProductOptionEntity, as: 'productOption', required: true,
                            include: [
                                {
                                    model: ProductEntity, as: 'product', required: true
                                },
                                {
                                    model: ProductOptionPictureEntity,
                                    as: 'pictures',
                                    required: false
                                }
                            ]
                        }
                    ]
                }
            ]
        });
    }

    public async getOrdersForUser(userId: string): Promise<Array<BasketEntity>> {
        return await BasketEntity.findAll({
            where: {
                userId: userId,
                basketStateCode: {
                    [Op.not]: 'BASKET'
                }
            },
            include: [
                {
                    model: UserEntity, as: 'user', required: true
                }
            ],
            order: [['orderedAt', 'DESC']]
        });
    }

    public async getOrdersForCustomer(customerId: number): Promise<Array<BasketEntity>> {
        return await BasketEntity.findAll({
            where: {
                basketStateCode: {
                    [Op.not]: 'BASKET'
                }
            },
            include: [
                {
                    model: UserEntity, as: 'user', where: {customerId: customerId}, required: true
                }
            ],
            order: [['orderedAt', 'DESC']]
        });
    }

    public async orderToPaid(basketId: string): Promise<void> {
        const now = new Date();
        await BasketEntity.update({
            basketStateCode: 'PAID',
            paidAt: now
        },{
            where: {
                basketId: basketId
            }
        });
    }

    public async paidToDelivered(basketId: string): Promise<void> {
        const now = new Date();
        await BasketEntity.update({
            basketStateCode: 'DELIVERED',
            deliveredAt: now
        },{
            where: {
                basketId: basketId
            }
        });
    }
}