import ProductOptionUpdateDS from "../../business/models/datastores/ProductOptionUpdateDS";
import ProductOptionEntity from "../entities/ProductOptionEntity";

export default interface IProductOptionDataGateway {
    createProductOption(productId: string): Promise<string>;

    updateProductOption(productOptionUpdate: ProductOptionUpdateDS): Promise<void>;

    getProductOption(productOptionId: string): Promise<ProductOptionEntity>;

    getProductOptionByProduct(productId: string): Promise<Array<ProductOptionEntity>>;

    deleteProductOption(productOptionId: string): Promise<void>;

    getProductOptionFeatured(customerId: number): Promise<Array<ProductOptionEntity>>;

    getProductOptionStores(productOptionId: Array<string>, groupIds: Array<string>): Promise<Array<ProductOptionEntity>>;

    getProductOptionDiscount(customerId: number, groups: Array<string>): Promise<Array<ProductOptionEntity>>;

    getProductOptionLastOneAdded(customerId: number): Promise<Array<ProductOptionEntity>>;

    getProductOptionOnlyOneLeft(customerId: number): Promise<Array<ProductOptionEntity>>;

    getAllProductOptionStore(customerId: number): Promise<Array<ProductOptionEntity>>;

    getProductOptionByProductActive(productId: string): Promise<Array<ProductOptionEntity>>;

}