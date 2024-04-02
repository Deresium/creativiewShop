import ProductOptionEntity from "../../database/entities/ProductOptionEntity";

export default class ProductOptionStoreFilter {
    private readonly productOption: ProductOptionEntity;
    private readonly language: string;
    private readonly searchTerm: string;


    constructor(productOption: ProductOptionEntity, language: string, searchTerm: string) {
        this.productOption = productOption;
        this.language = language;
        this.searchTerm = searchTerm;
    }

    public filter(): boolean {
        if (!this.searchTerm) {
            return true;
        }
        const upperSearchTerm = this.searchTerm.toUpperCase();
        return this.include(upperSearchTerm, this.getProductName()) ||
            this.include(upperSearchTerm, this.getProductOptionName()) ||
            this.include(upperSearchTerm, this.getProductDescription());
    }

    private getProductName() {
        switch (this.language) {
            case 'fr':
                return this.productOption.getProduct().getNameFr();
            case 'en':
                return this.productOption.getProduct().getNameEn();
            default:
                return this.productOption.getProduct().getNameEn();
        }
    }

    private getProductOptionName() {
        switch (this.language) {
            case 'fr':
                return this.productOption.getNameFr();
            case 'en':
                return this.productOption.getNameEn();
            default:
                return this.productOption.getNameEn();
        }
    }

    private getProductDescription() {
        switch (this.language) {
            case 'fr':
                return this.productOption.getProduct().getDescriptionFr();
            case 'en':
                return this.productOption.getProduct().getDescriptionEn();
            default:
                return this.productOption.getProduct().getDescriptionEn();
        }
    }

    private include(searchTerm: string, text: string): boolean {
        if (!text) {
            return false;
        }

        const upperText = text.toUpperCase();
        return upperText.includes(searchTerm);
    }
}