import ProductOptionUpdateDS from "../models/datastores/ProductOptionUpdateDS";
import ProductOptionVM from "../models/viewmodels/ProductOptionVM";

export default interface IProductOptionRequester {
    createProductOption(productId: string): Promise<void>;

    updateProductOption(productOptionUpdate: ProductOptionUpdateDS): Promise<void>;

    getProductOption(productOptionId: string): Promise<ProductOptionVM>;

    getProductOptionByProduct(productId: string): Promise<Array<ProductOptionVM>>;

    getProductOptionIdByCustomer(customerId: number): Promise<Array<string>>;

    deleteProductOption(productOptionId: string): Promise<void>;
}