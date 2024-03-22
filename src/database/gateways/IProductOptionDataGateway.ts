import ProductOptionUpdateDS from "../../business/models/datastores/ProductOptionUpdateDS";
import ProductOptionEntity from "../entities/ProductOptionEntity";

export default interface IProductOptionDataGateway {
    createProductOption(productId: string): Promise<string>;

    updateProductOption(productOptionUpdate: ProductOptionUpdateDS): Promise<void>;

    getProductOption(productOptionId: string): Promise<ProductOptionEntity>;

    getProductOptionByProduct(productId: string): Promise<Array<ProductOptionEntity>>;

    deleteProductOption(productOptionId: string): Promise<void>;

    getProductOptionFeatured(customerId: string): Promise<Array<ProductOptionEntity>>;

    getProductOptionStore(productOptionId: string, groupIds: Array<string>): Promise<ProductOptionEntity>;

}