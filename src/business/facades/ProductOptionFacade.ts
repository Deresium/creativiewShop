import IProductOptionRequester from "../requesters/IProductOptionRequester";
import ProductOptionVM from "../models/viewmodels/ProductOptionVM";
import ProductOptionUpdateDS from "../models/datastores/ProductOptionUpdateDS";
import IProductOptionDataGateway from "../../database/gateways/IProductOptionDataGateway";
import ProductOptionEntity from "../../database/entities/ProductOptionEntity";
import ProductOptionStoreVM from "../models/viewmodels/ProductOptionStoreVM";
import ProductOptionStoreBuilder from "../utils/ProductOptionStoreBuilder";

export default class ProductOptionFacade implements IProductOptionRequester {
    private readonly productOptionDataGateway: IProductOptionDataGateway;

    constructor(productOptionDataGateway: IProductOptionDataGateway) {
        this.productOptionDataGateway = productOptionDataGateway;
    }

    public async createProductOption(productId: string): Promise<string> {
        return await this.productOptionDataGateway.createProductOption(productId);
    }

    public async deleteProductOption(productOptionId: string): Promise<void> {
        await this.productOptionDataGateway.deleteProductOption(productOptionId);
    }

    public async getProductOption(productOptionId: string): Promise<ProductOptionVM> {
        const productOption = await this.productOptionDataGateway.getProductOption(productOptionId);
        return this.productOptionEntityToVM(productOption);
    }

    public async getProductOptionByProduct(productId: string): Promise<Array<ProductOptionVM>> {
        const productOptions = await this.productOptionDataGateway.getProductOptionByProduct(productId);
        return productOptions.map(productOption => this.productOptionEntityToVM(productOption));
    }

    public async updateProductOption(productOptionUpdate: ProductOptionUpdateDS): Promise<void> {
        await this.productOptionDataGateway.updateProductOption(productOptionUpdate);
    }

    public async getProductOptionFeatured(customerId: string): Promise<Array<string>> {
        const productOptions = await this.productOptionDataGateway.getProductOptionFeatured(customerId);
        return productOptions.map(productOption => productOption.getProductOptionId());
    }

    public async getProductOptionStore(productOptionId: string, groupIds: Array<string>, language: string): Promise<ProductOptionStoreVM> {
        const productOption = await this.productOptionDataGateway.getProductOptionStore(productOptionId, groupIds);
        return new ProductOptionStoreBuilder(productOption, language).buildProductOptionStore();
    }

    private productOptionEntityToVM(productOption: ProductOptionEntity): ProductOptionVM {
        let price = null;
        if (productOption.getListPrices() && productOption.getListPrices()[0]) {
            price = Number(productOption.getListPrices()[0].getPrice()).toFixed(2);
        }
        return new ProductOptionVM(productOption.getProductOptionId(), productOption.getProductId(), productOption.getNameFr(), productOption.getNameEn(),
            productOption.getCode(), productOption.getStock(), productOption.getActive(), productOption.getFeatured(), productOption.getClick(), productOption.getWeight(), productOption.getPreorder(), price);
    }
}