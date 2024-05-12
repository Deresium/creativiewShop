import ProductOptionEntity from "../../database/entities/ProductOptionEntity";

export default class ProductOptionStoreFilter {
    private readonly productOption: ProductOptionEntity;
    private readonly language: string;
    private readonly searchTerm: string;
    private readonly categoryIds: Array<string>;
    private readonly manufacturerIds: Array<string>;


    constructor(productOption: ProductOptionEntity, language: string, searchTerm: string, categoryIds: Array<string>, manufacturerIds: Array<string>) {
        this.productOption = productOption;
        this.language = language;
        this.searchTerm = searchTerm;
        this.categoryIds = categoryIds;
        this.manufacturerIds = manufacturerIds;
    }

    public filter(): boolean {
        const filterOnCategories = this.filterOnCategories();
        if (!filterOnCategories) {
            return false;
        }
        const filterOnManufacturer = this.filterOnManufacturers();
        if (!filterOnManufacturer) {
            return false;
        }
        return this.filterOnSearchTerm();
    }

    private filterOnSearchTerm(): boolean {
        if (!this.searchTerm) {
            return true;
        }
        const upperSearchTerm = this.searchTerm.toUpperCase();
        return this.include(upperSearchTerm, this.getProductName()) ||
            this.include(upperSearchTerm, this.getProductOptionName());
    }

    private filterOnCategories(): boolean {
        if (!this.categoryIds || this.categoryIds.length === 0) {
            return true;
        }

        if (!this.productOption.getProductOptionCategories() || this.productOption.getProductOptionCategories().length === 0) {
            return false;
        }

        for (const category of this.productOption.getProductOptionCategories()) {
            if (this.categoryIds.includes(category.getCategoryId())) {
                return true;
            }
        }
        return false;
    }

    private filterOnManufacturers(): boolean {
        if (!this.manufacturerIds || this.manufacturerIds.length === 0) {
            return true;
        }
        if (!this.productOption.getProduct().getManufacturerId()) {
            return false;
        }

        for (const manufacturer of this.manufacturerIds) {
            if (this.productOption.getProduct().getManufacturerId() === manufacturer) {
                return true;
            }
        }
        return false;
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