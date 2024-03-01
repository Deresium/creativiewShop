import IProductOptionRequester from "../requesters/IProductOptionRequester";
import ProductOptionVM from "../models/viewmodels/ProductOptionVM";
import ProductOptionUpdateDS from "../models/datastores/ProductOptionUpdateDS";
import IProductOptionDataGateway from "../../database/gateways/IProductOptionDataGateway";
import ProductOptionEntity from "../../database/entities/ProductOptionEntity";

export default class ProductOptionFacade implements IProductOptionRequester {
    private readonly productOptionDataGateway: IProductOptionDataGateway;

    constructor(productOptionDataGateway: IProductOptionDataGateway) {
        this.productOptionDataGateway = productOptionDataGateway;
    }

    public async createProductOption(productId: string): Promise<void> {
        await this.productOptionDataGateway.createProductOption(productId);
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

    public async getProductOptionIdByCustomer(customerId: number): Promise<Array<string>> {
        return await this.productOptionDataGateway.getProductOptionIdByCustomer(customerId);
    }

    public async updateProductOption(productOptionUpdate: ProductOptionUpdateDS): Promise<void> {
        await this.productOptionDataGateway.updateProductOption(productOptionUpdate);
    }

    private productOptionEntityToVM(productOption: ProductOptionEntity): ProductOptionVM {
        return new ProductOptionVM(productOption.getProductOptionId(), productOption.getProductId(), productOption.getNameFr(), productOption.getNameEn(),
            productOption.getCode(), productOption.getStock(), productOption.getActive(), productOption.getFeatured(), productOption.getClick(), productOption.getWeight(), productOption.getPreorder());
    }
}