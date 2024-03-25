import BasketProductOptionEntity from "../entities/BasketProductOptionEntity";
import BasketProductOptionDS from "../../business/models/datastores/BasketProductOptionDS";
import BasketEntity from "../entities/BasketEntity";

export default interface IBasketDataGateway {
    getBasketProductOptions(basketId: string): Promise<Array<BasketProductOptionEntity>>;
    addBasketForUser(userId: string): Promise<string>;
    addBasket(): Promise<string>;
    findOpenBasketForUser(userId: string): Promise<BasketEntity>;
    isBasketOpen(basketId: string): Promise<boolean>;
    addProductOptionToBasket(basketProductOption: BasketProductOptionDS): Promise<void>;
    updateProductOptionBasket(basketProductOption: BasketProductOptionDS): Promise<void>;
    deleteProductOptionBasket(basketId: string, productOptionId: string): Promise<void>;
}