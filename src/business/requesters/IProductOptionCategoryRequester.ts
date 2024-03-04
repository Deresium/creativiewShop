export default interface IProductOptionCategoryRequester {
    getProductOptionCategoriesId(productOptionId: string): Promise<Array<string>>;
    replaceCategories(productOptionId: string, listCategoriesId: Array<string>): Promise<void>;
}