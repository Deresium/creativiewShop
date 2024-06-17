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

    public async getProductOptionFeatured(customerId: number): Promise<Array<string>> {
        const productOptions = await this.productOptionDataGateway.getProductOptionFeatured(customerId);
        return productOptions.map(productOption => productOption.getProductOptionId());
    }

    public async getProductOptionLastOneAdded(customerId: number): Promise<Array<string>> {
        const productOptions = await this.productOptionDataGateway.getProductOptionLastOneAdded(customerId);
        return productOptions.map(productOption => productOption.getProductOptionId());
    }

    public async getProductOptionOnlyOneLeft(customerId: number): Promise<Array<string>> {
        const productOptions = await this.productOptionDataGateway.getProductOptionOnlyOneLeft(customerId);
        return productOptions.map(productOption => productOption.getProductOptionId());
    }

    public async getProductOptionRandom(customerId: number): Promise<Array<string>> {
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

    public async getProductOptionDiscount(customerId: number, groups: Array<string>): Promise<Array<string>> {
        const productOptions = await this.productOptionDataGateway.getProductOptionDiscount(customerId, groups);
        return productOptions.map(productOption => productOption.getProductOptionId());
    }

    public async getProductOptionSearch(customer: CustomerVM, groupIds: Array<string>, searchTerm: string, categoryIds: Array<string>, manufacturerIds: Array<string>, currency: string, language: string, orderBy: string): Promise<Array<string>> {
        const productOptions = await this.productOptionDataGateway.getAllProductOptionStore(customer.getCustomerId());
        const productOptionsFilter = productOptions.filter(productOption => {
            return new ProductOptionStoreFilter(productOption, language, searchTerm, categoryIds, manufacturerIds).filter()
        });
        if (!orderBy) {
            return productOptionsFilter.map(productOption => productOption.getProductOptionId());
        }

        switch (orderBy) {
            case 'PRICE_ASC':
                const currencyRates = await this.currencyRateRequester.getCurrentCurrencyRateForCustomer(customer.getCustomerId());
                const productOptionIds = productOptionsFilter.map(productOption => productOption.getProductOptionId());
                const productOptionsStore = await this.getMultipleProductOptionStore(productOptionIds, groupIds, customer, currency, language, false, currencyRates);
                const orderProductOptions = productOptionsStore.sort((po1, po2) => po1.getDefaultPrice().comparedTo(po2.getDefaultPrice()));
                return orderProductOptions.map(productOption => productOption.getProductOptionId());
            case 'PRICE_DESC':
                const currencyRatesDesc = await this.currencyRateRequester.getCurrentCurrencyRateForCustomer(customer.getCustomerId());
                const productOptionIdsDesc = productOptionsFilter.map(productOption => productOption.getProductOptionId());
                const productOptionsStoreDesc = await this.getMultipleProductOptionStore(productOptionIdsDesc, groupIds, customer, currency, language, false, currencyRatesDesc);
                const orderProductOptionsDesc = productOptionsStoreDesc.sort((po1, po2) => po2.getDefaultPrice().comparedTo(po1.getDefaultPrice()));
                return orderProductOptionsDesc.map(productOption => productOption.getProductOptionId());
            case 'DATEADD_ASC':
                const productOptionOrderByDateAsc = productOptionsFilter.sort((po1, po2) => po1.getCreatedAt().getTime() - po2.getCreatedAt().getTime());
                return productOptionOrderByDateAsc.map(productOption => productOption.getProductOptionId());
            case 'DATEADD_DESC':
                const productOptionOrderByDateDesc = productOptionsFilter.sort((po1, po2) => po2.getCreatedAt().getTime() - po1.getCreatedAt().getTime());
                return productOptionOrderByDateDesc.map(productOption => productOption.getProductOptionId());
            default:
                return productOptionsFilter.map(productOption => productOption.getProductOptionId());
        }
    }

    public async getProductOptionStore(productOptionId: string, groupIds: Array<string>, customer: CustomerVM, currency: string, language: string, withOptions: boolean, currencyRates?: Map<string, Decimal>): Promise<ProductOptionStoreDS> {
        if (!productOptionId) {
            return null;
        }
        const productOptionStores = await this.getMultipleProductOptionStore([productOptionId], groupIds, customer, currency, language, withOptions, currencyRates);
        if (productOptionStores && productOptionStores.length > 0) {
            return productOptionStores[0];
        }
        return null;
    }

    public async getMultipleProductOptionStore(productOptionId: Array<string>, groupIds: Array<string>, customer: CustomerVM, currency: string, language: string, withOptions: boolean, currencyRates?: Map<string, Decimal>): Promise<Array<ProductOptionStoreDS>> {
        let currencyRatesLocal = currencyRates;
        if (!currencyRatesLocal) {
            currencyRatesLocal = await this.currencyRateRequester.getCurrentCurrencyRateForCustomer(customer.getCustomerId());
        }
        const productOptions = await this.productOptionDataGateway.getProductOptionStores(productOptionId, groupIds);
        const productOptionsBuild = new Array<ProductOptionStoreDS>();
        for (const productOption of productOptions) {
            let allOptionsForProduct = new Array<ProductOptionEntity>();
            if (withOptions) {
                allOptionsForProduct = await this.productOptionDataGateway.getProductOptionByProductActive(productOption.getProductId());
            }
            const productOptionBuild = new ProductOptionStoreBuilder(productOption, allOptionsForProduct, currencyRatesLocal, customer, currency, language).buildProductOptionStore();
            productOptionsBuild.push(productOptionBuild);
        }
        return productOptionsBuild;
    }

    public async getProductOptionStoreVM(productOptionId: string, groupIds: Array<string>, customer: CustomerVM, currency: string, language: string, currencyRates?: Map<string, Decimal>): Promise<ProductOptionStoreVM> {
        const productOptionStore = await this.getProductOptionStore(productOptionId, groupIds, customer, currency, language, true, currencyRates);
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
        let weight = null;
        if (productOption.getWeight()) {
            weight = productOption.getWeight().toFixed(2);
        }

        return new ProductOptionVM(productOption.getProductOptionId(), productOption.getProductId(), productOption.getNameFr(), productOption.getNameEn(),
            productOption.getCode(), productOption.getStock(), productOption.getActive(), productOption.getFeatured(), productOption.getClick(), weight, productOption.getPreorder(), price);
    }
}