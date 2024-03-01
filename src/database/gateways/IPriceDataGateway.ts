import ProductOptionPriceEntity from "../entities/ProductOptionPriceEntity";

export default interface IPriceDataGateway {
    updatePrice(productOptionId: string, price: number): Promise<void>;

    getPricesForProductOption(productOptionId: string): Promise<Array<ProductOptionPriceEntity>>;
}