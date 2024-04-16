import ProductOptionPriceEntity from "../entities/ProductOptionPriceEntity";

export default interface IProductOptionPriceDataGateway {
    updatePrice(productOptionId: string, price: string): Promise<void>;

    getPricesForProductOption(productOptionId: string): Promise<Array<ProductOptionPriceEntity>>;

    getLastPriceForProductOption(productOptionId: string): Promise<ProductOptionPriceEntity>;
}