import ProductOptionPriceVM from "../models/viewmodels/ProductOptionPriceVM";

export default interface IProductOptionPriceRequester {
    updatePrice(productOptionId: string, price: number): Promise<void>;

    getPricesForProductOption(productOptionId: string): Promise<Array<ProductOptionPriceVM>>;
}