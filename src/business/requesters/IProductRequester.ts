import ProductUpdateDS from "../models/datastores/ProductUpdateDS";
import ProductVM from "../models/viewmodels/ProductVM";
import ProductListAdminVM from "../models/viewmodels/ProductListAdminVM";

export default interface IProductRequester {
    getAllProduct(customerId: number): Promise<Array<ProductVM>>;

    getProduct(productId: string, customerId: number): Promise<ProductVM>;

    productExistsForCustomer(productId: string, customerId: number): Promise<boolean>;

    updateProduct(productUpdateDS: ProductUpdateDS): Promise<void>;

    deleteProduct(productId: string, customerId: number): Promise<void>;

    createProduct(customerId: number): Promise<string>;

    getListAdminProducts(customerId: number): Promise<Array<ProductListAdminVM>>
}