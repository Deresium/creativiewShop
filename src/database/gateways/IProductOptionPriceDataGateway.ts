import ProductOptionPriceEntity from "../entities/ProductOptionPriceEntity";

export default interface IProductOptionPriceDataGateway {
    updatePrice(productOptionId: string, price: number): Promise<void>;

    getPricesForProductOption(productOptionId: string): Promise<Array<ProductOptionPriceEntity>>;

    getLastPriceForProductOption(productOptionId: string): Promise<ProductOptionPriceEntity>;
}