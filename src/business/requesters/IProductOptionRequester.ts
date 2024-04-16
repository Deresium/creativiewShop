import ProductOptionUpdateDS from "../models/datastores/ProductOptionUpdateDS";
import ProductOptionVM from "../models/viewmodels/ProductOptionVM";
import ProductOptionStoreVM from "../models/viewmodels/ProductOptionStoreVM";
import CustomerVM from "../models/viewmodels/CustomerVM";
import ProductOptionStoreDS from "../models/datastores/ProductOptionStoreDS";
import Decimal from "decimal.js";

export default interface IProductOptionRequester {
    createProductOption(productId: string): Promise<string>;

    updateProductOption(productOptionUpdate: ProductOptionUpdateDS): Promise<void>;

    getProductOption(productOptionId: string): Promise<ProductOptionVM>;

    getProductOptionByProduct(productId: string): Promise<Array<ProductOptionVM>>;

    deleteProductOption(productOptionId: string): Promise<void>;

    getProductOptionFeatured(customerId: string): Promise<Array<string>>;

    getProductOptionLastOneAdded(customerId: string): Promise<Array<string>>;

    getProductOptionOnlyOneLeft(customerId: string): Promise<Array<string>>;

    getProductOptionRandom(customerId: string): Promise<Array<string>>;

    getProductOptionDiscount(customerId: string, groups: Array<string>): Promise<Array<string>>;

    getProductOptionSearch(customerId: string, searchTerm: string, categoryIds: Array<string>, manufacturerIds: Array<string>, language: string): Promise<Array<string>>;

    getProductOptionStore(productOptionId: string, groupIds: Array<string>, customer: CustomerVM, currency: string, language: string, currencyRates?: Map<string, Decimal>): Promise<ProductOptionStoreDS>;

    getProductOptionStoreVM(productOptionId: string, groupIds: Array<string>, customer: CustomerVM, currency: string, language: string, currencyRates?: Map<string, Decimal>): Promise<ProductOptionStoreVM>;
}