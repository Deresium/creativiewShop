import ProductOptionUpdateDS from "../models/datastores/ProductOptionUpdateDS";
import ProductOptionVM from "../models/viewmodels/ProductOptionVM";
import ProductOptionStoreVM from "../models/viewmodels/ProductOptionStoreVM";
import CustomerVM from "../models/viewmodels/CustomerVM";

export default interface IProductOptionRequester {
    createProductOption(productId: string): Promise<string>;

    updateProductOption(productOptionUpdate: ProductOptionUpdateDS): Promise<void>;

    getProductOption(productOptionId: string): Promise<ProductOptionVM>;

    getProductOptionByProduct(productId: string): Promise<Array<ProductOptionVM>>;

    deleteProductOption(productOptionId: string): Promise<void>;

    getProductOptionFeatured(customerId: string): Promise<Array<string>>;

    getProductOptionDiscount(customerId: string, groups: Array<string>): Promise<Array<string>>;

    getProductOptionSearch(customerId: string, searchTerm: string, language: string): Promise<Array<string>>;

    getProductOptionStore(productOptionId: string, groupIds: Array<string>, customer: CustomerVM, currency: string, language: string): Promise<ProductOptionStoreVM>;
}