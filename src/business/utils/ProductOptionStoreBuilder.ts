import ProductOptionEntity from "../../database/entities/ProductOptionEntity";
import ProductOptionStoreVM from "../models/viewmodels/ProductOptionStoreVM";
import CustomerVM from "../models/viewmodels/CustomerVM";
import ProductOptionDiscountEntity from "../../database/entities/ProductOptionDiscountEntity";
import PercentCalculator from "./PercentCalculator";
import TitleValueVM from "../models/viewmodels/TitleValueVM";

export default class ProductOptionStoreBuilder {
    private readonly productOption: ProductOptionEntity;
    private readonly allOptionsForProduct: Array<ProductOptionEntity>;
    private readonly customer: CustomerVM;
    private readonly rates: Map<string, number>;
    private readonly currency: string;
    private readonly language: string;

    constructor(productOption: ProductOptionEntity, allOptionsForProduct: Array<ProductOptionEntity>, customer: CustomerVM, rates: Map<string, number>, currency: string, language: string) {
        this.productOption = productOption;
        this.allOptionsForProduct = allOptionsForProduct;
        this.customer = customer;
        this.currency = currency;
        this.language = language;
        this.rates = rates;
    }

    public buildProductOptionStore(): ProductOptionStoreVM {
        const prices = this.productOption.getListPrices();
        if (prices.length !== 1) {
            return null;
        }

        const price = prices[0].getPrice();
        const priceCurrency = this.getPriceCurrency(price, this.currency);

        const productOptionId = this.productOption.getProductOptionId();
        const productId = this.productOption.getProductId();
        const hasStock = this.productOption.getStock() > 0;
        const weight = this.productOption.getWeight();
        const manufacturer = this.productOption.getProduct().getManufacturerName();
        const preorder = this.productOption.getPreorder();
        const title = this.getTitle();
        const description = this.getDescription();
        const pictureIds = this.productOption.getListPictures().map(picture => picture.getProductOptionPictureId());
        const discount = this.getMaxDiscountOption(this.productOption.getProductOptionDiscounts());

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
            manufacturer,
            preorder,
            Number(priceCurrency).toFixed(2),
            discountPrice,
            percent,
            startDateDiscount,
            endDateDiscount,
            title,
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

    private getPriceCurrency(basePrice: number, currencyCode: string) {
        if (this.customer.getCurrencyCode() === currencyCode) {
            return basePrice;
        }

        const rate = this.rates.get(currencyCode);
        if (!rate) {
            return basePrice;
        }
        return basePrice * rate;
    }

    private getMaxDiscountOption(productOptionDiscounts: Array<ProductOptionDiscountEntity>): ProductOptionDiscountEntity {
        let currentDiscountPercent = 0;
        let discountToReturn: ProductOptionDiscountEntity = null;
        for (const discount of productOptionDiscounts) {
            if (discount.getPercent() > currentDiscountPercent) {
                discountToReturn = discount;
            }
        }
        return discountToReturn;
    }
}