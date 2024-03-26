import BasketEntity from "../../database/entities/BasketEntity";
import BasketProductOptionDS from "../models/datastores/BasketProductOptionDS";
import BasketProductOptionVM from "../models/viewmodels/BasketProductOptionVM";

export default interface IBasketRequester {
    getBasketProductOptions(basketId: string): Promise<Array<BasketProductOptionVM>>;
    addOpenBasketIfNotExists(userId: string): Promise<string>;
    addOpenBasket(): Promise<string>;
    isOpenBasket(basketId: string): Promise<boolean>;
    addProductOptionToBasket(basketProductOption: BasketProductOptionDS): Promise<void>;
    updateProductOptionBasket(basketProductOption: BasketProductOptionDS): Promise<void>;
    deleteProductOptionBasket(basketId: string, productOptionId: string): Promise<void>;
}