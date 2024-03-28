import IBasketDataGateway from "../gateways/IBasketDataGateway";
import BasketProductOptionDS from "../../business/models/datastores/BasketProductOptionDS";
import BasketProductOptionEntity from "../entities/BasketProductOptionEntity";
import BasketEntity from "../entities/BasketEntity";

export default class BasketDataMapper implements IBasketDataGateway {
    public async addBasketForUser(userId: string): Promise<BasketEntity> {
        return  await BasketEntity.create({
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
}