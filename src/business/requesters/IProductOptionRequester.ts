import ProductOptionUpdateDS from "../models/datastores/ProductOptionUpdateDS";
import ProductOptionVM from "../models/viewmodels/ProductOptionVM";
import ProductOptionStoreVM from "../models/viewmodels/ProductOptionStoreVM";

export default interface IProductOptionRequester {
    createProductOption(productId: string): Promise<string>;

    updateProductOption(productOptionUpdate: ProductOptionUpdateDS): Promise<void>;

    getProductOption(productOptionId: string): Promise<ProductOptionVM>;

    getProductOptionByProduct(productId: string): Promise<Array<ProductOptionVM>>;

    deleteProductOption(productOptionId: string): Promise<void>;

    getProductOptionFeatured(customerId: string): Promise<Array<string>>;

    getProductOptionStore(productOptionId: string, groupIds: Array<string>, language: string): Promise<ProductOptionStoreVM>;
}