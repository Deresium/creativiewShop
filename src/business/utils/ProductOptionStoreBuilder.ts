import ProductOptionEntity from "../../database/entities/ProductOptionEntity";
import ProductOptionStoreVM from "../models/viewmodels/ProductOptionStoreVM";
import CustomerVM from "../models/viewmodels/CustomerVM";
import ProductOptionDiscountEntity from "../../database/entities/ProductOptionDiscountEntity";
import PercentCalculator from "./PercentCalculator";
import TitleValueVM from "../models/viewmodels/TitleValueVM";
import PriceCurrencyCalculator from "./PriceCurrencyCalculator";

export default class ProductOptionStoreBuilder {
    private readonly productOption: ProductOptionEntity;
    private readonly allOptionsForProduct: Array<ProductOptionEntity>;
    private readonly currencyRates: Map<string, number>;
    private readonly customer: CustomerVM;
    private readonly currency: string;
    private readonly language: string;

    constructor(productOption: ProductOptionEntity, allOptionsForProduct: Array<ProductOptionEntity>, currencyRates: Map<string, number>, customer: CustomerVM, currency: string, language: string) {
        this.productOption = productOption;
        this.allOptionsForProduct = allOptionsForProduct;
        this.currencyRates = currencyRates;
        this.customer = customer;
        this.currency = currency;
        this.language = language;
    }

    public buildProductOptionStore(): ProductOptionStoreVM {
        const prices = this.productOption.getListPrices();
        if (prices.length !== 1) {
            return null;
        }

        const price = prices[0].getPrice();
        const priceCurrency = new PriceCurrencyCalculator(price, this.currency, this.customer, this.currencyRates).getPrice();

        const productOptionId = this.productOption.getProductOptionId();
        const productId = this.productOption.getProductId();
        const hasStock = this.productOption.getStock() > 0;
        const weight = this.productOption.getWeight();
        const manufacturerId = this.productOption.getProduct().getManufacturerId();
        const manufacturer = this.productOption.getProduct().getManufacturerName();
        const preorder = this.productOption.getPreorder();
        const title = this.getTitle();
        const titleOption = this.getOptionName(this.productOption);
        const description = this.getDescription();
        const pictureIds = this.productOption.getListPictures().map(picture => picture.getProductOptionPictureId());
        const discount = this.getMaxDiscountOption();

        let discountPrice: string, percent: string, startDateDiscount: string, endDateDiscount: string;
        if (discount !== null) {
            discountPrice = Number(PercentCalculator.calculateDiscountPriceBasedOnPercent(priceCurrency, discount.getPercent())).toFixed(2);
            percent = Number(discount.getPercent()).toFixed(2);
            startDateDiscount = discount.getStartDate().toISOString();
            endDateDiscount = discount.getEndDate().toISOString();
        }

        const allOptions = this.allOptionsForProduct.map(productOption => {
            return new TitleValueVM(this.getOptionName(productOption), productOption.getProductOptionId(),);
        });

        return new ProductOptionStoreVM(
            productOptionId,
            productId,
            hasStock,
            weight,
            manufacturerId,
            manufacturer,
            preorder,
            Number(priceCurrency).toFixed(2),
            discountPrice,
            percent,
            startDateDiscount,
            endDateDiscount,
            title,
            titleOption,
            description,
            pictureIds,
            allOptions);
    }

    private getTitle() {
        switch (this.language) {
            case 'fr':
                return this.productOption.getProduct().getNameFr();
            case 'en':
                return this.productOption.getProduct().getNameEn();
            default:
                return this.productOption.getProduct().getNameEn();
        }
    }

    private getDescription() {
        switch (this.language) {
            case 'fr':
                return this.productOption.getProduct().getDescriptionFr();
            case 'en':
                return this.productOption.getProduct().getDescriptionEn();
            default:
                return this.productOption.getProduct().getDescriptionFr();
        }
    }

    private getOptionName(productOption: ProductOptionEntity) {
        switch (this.language) {
            case 'fr':
                return productOption.getNameFr();
            case 'en':
                return productOption.getNameEn();
            default:
                return productOption.getNameFr();
        }
    }

    private getMaxDiscountOption(): ProductOptionDiscountEntity {
        let currentDiscountPercent = 0;
        let discountToReturn: ProductOptionDiscountEntity = null;
        for (const discount of this.productOption.getProductOptionDiscounts()) {
            if (discount.getPercent() > currentDiscountPercent) {
                discountToReturn = discount;
            }
        }
        return discountToReturn;
    }
}