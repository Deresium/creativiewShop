import BasketProductOptionDS from "../models/datastores/BasketProductOptionDS";
import BasketVM from "../models/viewmodels/BasketVM";
import CustomerVM from "../models/viewmodels/CustomerVM";
import BasketErrorReportVM from "../models/viewmodels/BasketErrorReportVM";

export default interface IBasketRequester {
    getBasket(basketId: string, groupIds: Array<string>, customer: CustomerVM, currency: string, language: string): Promise<BasketVM>;

    addOpenBasketIfNotExists(userId: string): Promise<string>;

    addProductOptionToBasket(basketProductOption: BasketProductOptionDS): Promise<void>;

    updateProductOptionBasket(basketProductOption: BasketProductOptionDS): Promise<void>;

    deleteProductOptionBasket(basketId: string, productOptionId: string): Promise<void>;

    checkBasket(basketId: string, groupIds: Array<string>, customer: CustomerVM, language: string): Promise<BasketErrorReportVM>;
}