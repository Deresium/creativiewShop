import IProductOptionCategoryRequester from "../requesters/IProductOptionCategoryRequester";
import IProductOptionCategoryDataGateway from "../../database/gateways/IProductOptionCategoryDataGateway";

export default class ProductOptionCategoryFacade implements IProductOptionCategoryRequester {
    private productOptionCategoryDataGateway: IProductOptionCategoryDataGateway;

    constructor(productOptionCategoryDataGateway: IProductOptionCategoryDataGateway) {
        this.productOptionCategoryDataGateway = productOptionCategoryDataGateway;
    }

    public async getProductOptionCategoriesId(productOptionId: string): Promise<Array<string>> {
        const productOptionCategories =  await this.productOptionCategoryDataGateway.getProductOptionCategories(productOptionId);
        return productOptionCategories.map(productOptionCategory => productOptionCategory.getCategoryId());
    }

    public async replaceCategories(productOptionId: string, listCategoriesId: Array<string>): Promise<void> {
        await this.productOptionCategoryDataGateway.replaceCategories(productOptionId, listCategoriesId);
    }

}