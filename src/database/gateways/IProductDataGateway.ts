import ProductEntity from "../entities/ProductEntity";
import ProductUpdateDS from "../../business/models/datastores/ProductUpdateDS";

export default interface IProductDataGateway {
    getAllProduct(customerId: number): Promise<Array<ProductEntity>>;

    getProduct(productId: string, customerId: number): Promise<ProductEntity>;

    productExistsForCustomer(productId: string, customerId: number): Promise<boolean>;

    updateProduct(productUpdateDS: ProductUpdateDS): Promise<void>;

    deleteProduct(productId: string, customerId: number): Promise<void>;

    createProduct(customerId: number): Promise<string>;
}