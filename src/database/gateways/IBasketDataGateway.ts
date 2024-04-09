import BasketProductOptionEntity from "../entities/BasketProductOptionEntity";
import BasketProductOptionDS from "../../business/models/datastores/BasketProductOptionDS";
import BasketEntity from "../entities/BasketEntity";

export default interface IBasketDataGateway {
    getBasketProductOptions(basketId: string): Promise<Array<BasketProductOptionEntity>>;

    addBasketForUser(userId: string): Promise<BasketEntity>;

    findOpenBasketForUser(userId: string): Promise<BasketEntity>;

    addProductOptionToBasket(basketProductOption: BasketProductOptionDS): Promise<void>;

    findProductOptionBasket(basketId: string, productOptionId: string): Promise<BasketProductOptionEntity>;

    updateProductOptionBasket(basketProductOption: BasketProductOptionDS): Promise<void>;

    deleteProductOptionBasket(basketId: string, productOptionId: string): Promise<void>;

    updateBasketDeliveryAddress(basketId: string, addressId: string): Promise<void>;

    updateBasketBillingAddress(basketId: string, addressId: string): Promise<void>;

    findBasketById(basketId: string): Promise<BasketEntity>;
}