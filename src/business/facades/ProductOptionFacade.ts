import IProductOptionRequester from "../requesters/IProductOptionRequester";
import ProductOptionVM from "../models/viewmodels/ProductOptionVM";
import ProductOptionUpdateDS from "../models/datastores/ProductOptionUpdateDS";
import IProductOptionDataGateway from "../../database/gateways/IProductOptionDataGateway";
import ProductOptionEntity from "../../database/entities/ProductOptionEntity";
import ProductOptionStoreVM from "../models/viewmodels/ProductOptionStoreVM";
import ProductOptionStoreBuilder from "../utils/ProductOptionStoreBuilder";
import CustomerVM from "../models/viewmodels/CustomerVM";
import ICurrencyRateDataGateway from "../../database/gateways/ICurrencyRateDataGateway";
import ProductOptionStoreFilter from "../utils/ProductOptionStoreFilter";

export default class ProductOptionFacade implements IProductOptionRequester {
    private readonly productOptionDataGateway: IProductOptionDataGateway;
    private readonly currencyRateDataGateway: ICurrencyRateDataGateway;


    constructor(productOptionDataGateway: IProductOptionDataGateway, currencyRateDataGateway: ICurrencyRateDataGateway) {
        this.productOptionDataGateway = productOptionDataGateway;
        this.currencyRateDataGateway = currencyRateDataGateway;
    }

    public async createProductOption(productId: string): Promise<string> {
        return await this.productOptionDataGateway.createProductOption(productId);
    }

    public async deleteProductOption(productOptionId: string): Promise<void> {
        await this.productOptionDataGateway.deleteProductOption(productOptionId);
    }

    public async getProductOption(productOptionId: string): Promise<ProductOptionVM> {
        const productOption = await this.productOptionDataGateway.getProductOption(productOptionId);
        return this.productOptionEntityToVM(productOption);
    }

    public async getProductOptionByProduct(productId: string): Promise<Array<ProductOptionVM>> {
        const productOptions = await this.productOptionDataGateway.getProductOptionByProduct(productId);
        return productOptions.map(productOption => this.productOptionEntityToVM(productOption));
    }

    public async updateProductOption(productOptionUpdate: ProductOptionUpdateDS): Promise<void> {
        await this.productOptionDataGateway.updateProductOption(productOptionUpdate);
    }

    public async getProductOptionFeatured(customerId: string): Promise<Array<string>> {
        const productOptions = await this.productOptionDataGateway.getProductOptionFeatured(customerId);
        return productOptions.map(productOption => productOption.getProductOptionId());
    }

    public async getProductOptionDiscount(customerId: string, groups: Array<string>): Promise<Array<string>> {
        const productOptions = await this.productOptionDataGateway.getProductOptionDiscount(customerId, groups);
        return productOptions.map(productOption => productOption.getProductOptionId());
    }

    public async getProductOptionSearch(customerId: string, searchTerm: string, categoryIds: Array<string>, language: string): Promise<Array<string>> {
        const productOptions = await this.productOptionDataGateway.getAllProductOptionStore(customerId);
        return productOptions.filter(productOption => {
            return new ProductOptionStoreFilter(productOption, language, searchTerm, categoryIds).filter();
        }).map(productOption => productOption.getProductOptionId());
    }

    public async getProductOptionStore(productOptionId: string, groupIds: Array<string>, customer: CustomerVM, currency: string, language: string): Promise<ProductOptionStoreVM> {
        const productOption = await this.productOptionDataGateway.getProductOptionStore(productOptionId, groupIds);
        const rates = await this.currencyRateDataGateway.getCurrentRatesForCustomer(customer.getCustomerId());
        const allOptionsForProduct = await this.productOptionDataGateway.getProductOptionByProductActive(productOption.getProductId());
        const mapRates = new Map<string, number>();
        rates.forEach(rate => mapRates.set(rate.getCurrencyCode(), rate.getRate()));
        return new ProductOptionStoreBuilder(productOption, allOptionsForProduct, customer, mapRates, currency, language).buildProductOptionStore();
    }

    private productOptionEntityToVM(productOption: ProductOptionEntity): ProductOptionVM {
        let price = null;
        if (productOption.getListPrices() && productOption.getListPrices()[0]) {
            price = Number(productOption.getListPrices()[0].getPrice()).toFixed(2);
        }
        return new ProductOptionVM(productOption.getProductOptionId(), productOption.getProductId(), productOption.getNameFr(), productOption.getNameEn(),
            productOption.getCode(), productOption.getStock(), productOption.getActive(), productOption.getFeatured(), productOption.getClick(), productOption.getWeight(), productOption.getPreorder(), price);
    }
}