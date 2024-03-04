import ProductOptionCategoryEntity from "../entities/ProductOptionCategoryEntity";

export default interface IProductOptionCategoryDataGateway {
    getProductOptionCategories(productOptionId: string): Promise<Array<ProductOptionCategoryEntity>>;
    replaceCategories(productOptionId: string, listCategoriesId: Array<string>): Promise<void>;
}