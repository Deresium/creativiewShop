import IProductRequester from "../requesters/IProductRequester";
import ProductVM from "../models/viewmodels/ProductVM";
import ProductUpdateDS from "../models/datastores/ProductUpdateDS";
import IProductDataGateway from "../../database/gateways/IProductDataGateway";
import ProductEntity from "../../database/entities/ProductEntity";

export default class ProductFacade implements IProductRequester {
    private readonly productDataGateway: IProductDataGateway;

    constructor(productDataGateway: IProductDataGateway) {
        this.productDataGateway = productDataGateway;
    }

    public async createProduct(customerId: number): Promise<string> {
        return await this.productDataGateway.createProduct(customerId);
    }

    public async deleteProduct(productId: string, customerId: number): Promise<void> {
        await this.productDataGateway.deleteProduct(productId, customerId);
    }

    public async getAllProduct(customerId: number): Promise<Array<ProductVM>> {
        const productEntities = await this.productDataGateway.getAllProduct(customerId);
        return productEntities.map(productEntity => this.productEntityToProductVM(productEntity));
    }

    public async getProduct(productId: string, customerId: number): Promise<ProductVM> {
        const productEntity = await this.productDataGateway.getProduct(productId, customerId);
        return this.productEntityToProductVM(productEntity);
    }

    public async productExistsForCustomer(productId: string, customerId: number): Promise<boolean> {
        return await this.productDataGateway.productExistsForCustomer(productId, customerId);
    }

    public async updateProduct(productUpdateDS: ProductUpdateDS): Promise<void> {
        await this.productDataGateway.updateProduct(productUpdateDS);
    }

    private productEntityToProductVM(productEntity: ProductEntity): ProductVM {
        return new ProductVM(productEntity.getProductId(), productEntity.getCustomerId(), productEntity.getManufacturerId(), productEntity.getManufacturerName(), productEntity.getCode(), productEntity.getNameFr(), productEntity.getNameEn(), productEntity.getDescriptionFr(), productEntity.getDescriptionEn());
    }
}