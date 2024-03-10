import IProductRequester from "../requesters/IProductRequester";
import ProductVM from "../models/viewmodels/ProductVM";
import ProductUpdateDS from "../models/datastores/ProductUpdateDS";
import IProductDataGateway from "../../database/gateways/IProductDataGateway";
import ProductEntity from "../../database/entities/ProductEntity";
import ProductListAdminVM from "../models/viewmodels/ProductListAdminVM";
import ProductOptionListAdminVM from "../models/viewmodels/ProductOptionListAdminVM";

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

    public async getListAdminProducts(customerId: number): Promise<Array<ProductListAdminVM>> {
        const products = await this.productDataGateway.getAllProductsAdmin(customerId);
        return products.map(product => this.productEntityToProductListAdminVM(product));
    }

    private productEntityToProductVM(productEntity: ProductEntity): ProductVM {
        return new ProductVM(productEntity.getProductId(), productEntity.getCustomerId(), productEntity.getManufacturerId(), productEntity.getManufacturerName(), productEntity.getCode(), productEntity.getNameFr(), productEntity.getNameEn(), productEntity.getDescriptionFr(), productEntity.getDescriptionEn());
    }

    private productEntityToProductListAdminVM(productEntity: ProductEntity): ProductListAdminVM {
        const productOptions = new Array<ProductOptionListAdminVM>();
        for (const productOption of productEntity.getProductOptions()) {
            let price = null;
            if (productOption.getListPrices() && productOption.getListPrices().length === 1) {
                price = Number(productOption.getListPrices()[0].getPrice()).toFixed(2);
            }
            productOptions.push(new ProductOptionListAdminVM(productOption.getNameFr(), productOption.getActive(), productOption.getStock(), price));
        }
        return new ProductListAdminVM(productEntity.getProductId(), productEntity.getCustomerId(), productEntity.getManufacturerId(), productEntity.getManufacturerName(), productEntity.getCode(), productEntity.getNameFr(), productEntity.getNameEn(), productEntity.getDescriptionFr(), productEntity.getDescriptionEn(), productOptions);
    }
}