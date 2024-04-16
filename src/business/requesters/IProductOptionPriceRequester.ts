import ProductOptionPriceVM from "../models/viewmodels/ProductOptionPriceVM";
import Decimal from "decimal.js";

export default interface IProductOptionPriceRequester {
    updatePrice(productOptionId: string, price: string): Promise<void>;

    getPricesForProductOption(productOptionId: string): Promise<Array<ProductOptionPriceVM>>;

    getLastPriceForProductOption(productOptionId: string): Promise<string>;

    calculatePercentForProductOption(productOptionId: string, discountPrice: Decimal): Promise<string>;
}