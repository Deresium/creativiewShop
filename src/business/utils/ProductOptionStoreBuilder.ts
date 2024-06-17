import ProductOptionEntity from "../../database/entities/ProductOptionEntity";
import CustomerVM from "../models/viewmodels/CustomerVM";
import ProductOptionDiscountEntity from "../../database/entities/ProductOptionDiscountEntity";
import PercentCalculator from "./PercentCalculator";
import TitleValueVM from "../models/viewmodels/TitleValueVM";
import PriceCurrencyCalculator from "./PriceCurrencyCalculator";
import ProductOptionStoreDS from "../models/datastores/ProductOptionStoreDS";
import Decimal from "decimal.js";

export default class ProductOptionStoreBuilder {
    private readonly productOption: ProductOptionEntity;
    private readonly allOptionsForProduct: Array<ProductOptionEntity>;
    private readonly currencyRates: Map<string, Decimal>;
    private readonly customer: CustomerVM;
    private readonly currency: string;
    private readonly language: string;

    constructor(productOption: ProductOptionEntity, allOptionsForProduct: Array<ProductOptionEntity>, currencyRates: Map<string, Decimal>, customer: CustomerVM, currency: string, language: string) {
        this.productOption = productOption;
        this.allOptionsForProduct = allOptionsForProduct;
        this.currencyRates = currencyRates;
        this.customer = customer;
        this.currency = currency;
        this.language = language;
    }

    public buildProductOptionStore(): ProductOptionStoreDS {
        const prices = this.productOption.getListPrices();
        if (prices.length !== 1) {
            return null;
        }

        const price = prices[0].getPrice();
        const priceCurrency = new PriceCurrencyCalculator(price, this.currency, this.customer, this.currencyRates).getPrice();

        const productOptionId = this.productOption.getProductOptionId();
        const productId = this.productOption.getProductId();
        const hasStock = this.productOption.getStock() > 0;
        const stock = this.productOption.getStock();
        const weight = this.productOption.getWeight();
        const manufacturerId = this.productOption.getProduct().getManufacturerId();
        const manufacturer = this.productOption.getProduct().getManufacturerName();
        const preorder = this.productOption.getPreorder();
        const title = this.getTitle();
        const titleOption = this.getOptionName(this.productOption);
        const description = this.getDescription();
        const pictureIds = this.productOption.getListPictures().map(picture => picture.getProductOptionPictureId());
        const discount = this.getMaxDiscountOption();

        let discountPrice: Decimal, percent: Decimal, startDateDiscount: Date, endDateDiscount: Date;
        if (discount !== null) {
            discountPrice = PercentCalculator.calculateDiscountPriceBasedOnPercent(priceCurrency, discount.getPercent());
            percent = discount.getPercent();
            startDateDiscount = discount.getStartDate();
            endDateDiscount = discount.getEndDate();
        }

        const allOptions = this.allOptionsForProduct.map(productOption => {
            return new TitleValueVM(this.getOptionName(productOption), productOption.getProductOptionId());
        });

        return new ProductOptionStoreDS(
            productOptionId,
            productId,
            hasStock,
            stock,
            weight,
            manufacturerId,
            manufacturer,
            preorder,
            priceCurrency,
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
        let currentDiscountPercent = new Decimal(0);
        let discountToReturn: ProductOptionDiscountEntity = null;
        for (const discount of this.productOption.getProductOptionDiscounts()) {
            if (discount.getPercent().greaterThan(currentDiscountPercent)) {
                discountToReturn = discount;
            }
        }
        return discountToReturn;
    }
}