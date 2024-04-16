import IProductOptionRequester from "../requesters/IProductOptionRequester";
import ProductOptionVM from "../models/viewmodels/ProductOptionVM";
import ProductOptionUpdateDS from "../models/datastores/ProductOptionUpdateDS";
import IProductOptionDataGateway from "../../database/gateways/IProductOptionDataGateway";
import ProductOptionEntity from "../../database/entities/ProductOptionEntity";
import ProductOptionStoreVM from "../models/viewmodels/ProductOptionStoreVM";
import ProductOptionStoreBuilder from "../utils/ProductOptionStoreBuilder";
import CustomerVM from "../models/viewmodels/CustomerVM";
import ProductOptionStoreFilter from "../utils/ProductOptionStoreFilter";
import ICurrencyRateRequester from "../requesters/ICurrencyRateRequester";
import ProductOptionStoreDS from "../models/datastores/ProductOptionStoreDS";
import Decimal from "decimal.js";

export default class ProductOptionFacade implements IProductOptionRequester {
    private readonly productOptionDataGateway: IProductOptionDataGateway;
    private readonly currencyRateRequester: ICurrencyRateRequester;


    constructor(productOptionDataGateway: IProductOptionDataGateway, currencyRateRequester: ICurrencyRateRequester) {
        this.productOptionDataGateway = productOptionDataGateway;
        this.currencyRateRequester = currencyRateRequester;
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

    public async getProductOptionLastOneAdded(customerId: string): Promise<Array<string>> {
        const productOptions = await this.productOptionDataGateway.getProductOptionLastOneAdded(customerId);
        return productOptions.map(productOption => productOption.getProductOptionId());
    }

    public async getProductOptionOnlyOneLeft(customerId: string): Promise<Array<string>> {
        const productOptions = await this.productOptionDataGateway.getProductOptionOnlyOneLeft(customerId);
        return productOptions.map(productOption => productOption.getProductOptionId());
    }

    public async getProductOptionRandom(customerId: string): Promise<Array<string>> {
        const productOptions = await this.productOptionDataGateway.getAllProductOptionStore(customerId);
        const productOptionsRandom = new Array<string>();
        let max = 5;
        if (productOptions.length < 5) {
            max = productOptions.length;
        }
        while (productOptionsRandom.length < max) {
            const randomInt = (Math.floor(Math.random() * productOptions.length)).toString();
            const productOptionId = productOptions[randomInt].getProductOptionId();
            if (!productOptionsRandom.includes(productOptionId)) {
                productOptionsRandom.push(productOptionId);
            }
        }
        return productOptionsRandom;
    }


    public async getProductOptionDiscount(customerId: string, groups: Array<string>): Promise<Array<string>> {
        const productOptions = await this.productOptionDataGateway.getProductOptionDiscount(customerId, groups);
        return productOptions.map(productOption => productOption.getProductOptionId());
    }

    public async getProductOptionSearch(customerId: string, searchTerm: string, categoryIds: Array<string>, manufacturerIds: Array<string>, language: string): Promise<Array<string>> {
        const productOptions = await this.productOptionDataGateway.getAllProductOptionStore(customerId);
        return productOptions.filter(productOption => {
            return new ProductOptionStoreFilter(productOption, language, searchTerm, categoryIds, manufacturerIds).filter();
        }).map(productOption => productOption.getProductOptionId());
    }

    public async getProductOptionStore(productOptionId: string, groupIds: Array<string>, customer: CustomerVM, currency: string, language: string, currencyRates?: Map<string, Decimal>): Promise<ProductOptionStoreDS> {
        let currencyRatesLocal = currencyRates;
        if (!currencyRatesLocal) {
            currencyRatesLocal = await this.currencyRateRequester.getCurrentCurrencyRateForCustomer(customer.getCustomerId());
        }
        const productOption = await this.productOptionDataGateway.getProductOptionStore(productOptionId, groupIds);
        const allOptionsForProduct = await this.productOptionDataGateway.getProductOptionByProductActive(productOption.getProductId());
        return new ProductOptionStoreBuilder(productOption, allOptionsForProduct, currencyRatesLocal, customer, currency, language).buildProductOptionStore();
    }

    public async getProductOptionStoreVM(productOptionId: string, groupIds: Array<string>, customer: CustomerVM, currency: string, language: string, currencyRates?: Map<string, Decimal>): Promise<ProductOptionStoreVM> {
        const productOptionStore = await this.getProductOptionStore(productOptionId, groupIds, customer, currency, language, currencyRates);
        let startDateDiscount: string;
        let endDateDiscount: string;
        let discountPrice: string;
        let percent: string;
        let weight: string;
        let basePrice: string;
        if (productOptionStore.getDiscountPrice()) {
            startDateDiscount = productOptionStore.getStartDateDiscount().toISOString();
            endDateDiscount = productOptionStore.getEndDateDiscount().toISOString();
            discountPrice = productOptionStore.getDiscountPrice().toFixed(2);
            percent = productOptionStore.getPercent().toFixed(2);
        }
        if (productOptionStore.getWeight()) {
            weight = productOptionStore.getWeight().toFixed(2);
        }
        if (productOptionStore.getBasePrice()) {
            basePrice = productOptionStore.getBasePrice().toFixed(2);
        }
        return new ProductOptionStoreVM(
            productOptionStore.getProductOptionId(),
            productOptionStore.getProductId(),
            productOptionStore.getHasStock(),
            weight,
            productOptionStore.getManufacturerId(),
            productOptionStore.getManufacturer(),
            productOptionStore.getPreorder(),
            basePrice,
            discountPrice,
            percent,
            startDateDiscount,
            endDateDiscount,
            productOptionStore.getTitle(),
            productOptionStore.getTitleOption(),
            productOptionStore.getDescription(),
            productOptionStore.getPictures(),
            productOptionStore.getAllOptions()
        )
    }

    private productOptionEntityToVM(productOption: ProductOptionEntity): ProductOptionVM {
        let price = null;
        if (productOption.getListPrices() && productOption.getListPrices()[0]) {
            price = productOption.getListPrices()[0].getPrice().toFixed(2);
        }
        return new ProductOptionVM(productOption.getProductOptionId(), productOption.getProductId(), productOption.getNameFr(), productOption.getNameEn(),
            productOption.getCode(), productOption.getStock(), productOption.getActive(), productOption.getFeatured(), productOption.getClick(), productOption.getWeight().toFixed(2), productOption.getPreorder(), price);
    }
}