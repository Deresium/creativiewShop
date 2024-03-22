import ProductOptionEntity from "../../database/entities/ProductOptionEntity";
import ProductOptionStoreVM from "../models/viewmodels/ProductOptionStoreVM";

export default class ProductOptionStoreBuilder {
    private readonly productOption: ProductOptionEntity;
    private readonly language: string;

    constructor(productOption: ProductOptionEntity, language: string) {
        this.productOption = productOption;
        this.language = language;
    }

    public buildProductOptionStore(): ProductOptionStoreVM {
        const prices = this.productOption.getListPrices();
        if (prices.length !== 1) {
            return null;
        }

        const price = prices[0].getPrice();
        const productOptionId = this.productOption.getProductOptionId();
        const productId = this.productOption.getProductId();
        const hasStock = this.productOption.getStock() > 0;
        const weight = this.productOption.getWeight();
        const manufacturer = this.productOption.getProduct().getManufacturerName();
        const preorder = this.productOption.getPreorder();
        const title = this.getTitle();
        const description = this.getDescription();
        const pictureIds = this.productOption.getListPictures().map(picture => picture.getProductOptionPictureId());

        return new ProductOptionStoreVM(
            productOptionId,
            productId,
            hasStock,
            weight,
            manufacturer,
            preorder,
            price,
            null,
            null,
            null,
            null,
            title,
            description,
            pictureIds,
            null);
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
}