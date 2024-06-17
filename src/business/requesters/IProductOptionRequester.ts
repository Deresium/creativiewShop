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

    getProductOptionFeatured(customerId: number): Promise<Array<string>>;

    getProductOptionLastOneAdded(customerId: number): Promise<Array<string>>;

    getProductOptionOnlyOneLeft(customerId: number): Promise<Array<string>>;

    getProductOptionRandom(customerId: number): Promise<Array<string>>;

    getProductOptionDiscount(customerId: number, groups: Array<string>): Promise<Array<string>>;

    getProductOptionSearch(customer: CustomerVM, groupIds: Array<string>, searchTerm: string, categoryIds: Array<string>, manufacturerIds: Array<string>, currency: string, language: string, orderBy: string): Promise<Array<string>>;

    getProductOptionStore(productOptionId: string, groupIds: Array<string>, customer: CustomerVM, currency: string, language: string, withOptions: boolean, currencyRates?: Map<string, Decimal>): Promise<ProductOptionStoreDS>;

    getProductOptionStoreVM(productOptionId: string, groupIds: Array<string>, customer: CustomerVM, currency: string, language: string, currencyRates?: Map<string, Decimal>): Promise<ProductOptionStoreVM>;
}