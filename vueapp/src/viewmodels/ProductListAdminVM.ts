import ProductOptionListAdminVM from "./ProductOptionListAdminVM";

export default class ProductListAdminVM {
    private readonly productId: string;
    private readonly customerId: number;
    private readonly manufacturerId: string;
    private readonly manufacturerName: string;
    private readonly code: string;
    private readonly nameFr: string;
    private readonly nameEn: string;
    private readonly descriptionFr: string;
    private readonly descriptionEn: string;
    private readonly productOptions: Array<ProductOptionListAdminVM>;


    constructor(productId: string, customerId: number, manufacturerId: string, manufacturerName: string, code: string, nameFr: string, nameEn: string, descriptionFr: string, descriptionEn: string, productOptions: Array<ProductOptionListAdminVM>) {
        this.productId = productId;
        this.customerId = customerId;
        this.manufacturerId = manufacturerId;
        this.manufacturerName = manufacturerName;
        this.code = code;
        this.nameFr = nameFr;
        this.nameEn = nameEn;
        this.descriptionFr = descriptionFr;
        this.descriptionEn = descriptionEn;
        this.productOptions = productOptions;
    }


    public getProductId(): string {
        return this.productId;
    }

    public getCustomerId(): number {
        return this.customerId;
    }

    public getManufacturerId(): string {
        return this.manufacturerId;
    }

    public getManufacturerName(): string {
        return this.manufacturerName;
    }

    public getCode(): string {
        return this.code;
    }

    public getNameFr(): string {
        return this.nameFr;
    }

    public getNameEn(): string {
        return this.nameEn;
    }

    public getDescriptionFr(): string {
        return this.descriptionFr;
    }

    public getDescriptionEn(): string {
        return this.descriptionEn;
    }

    public getProductOptions(): Array<ProductOptionListAdminVM> {
        return this.productOptions;
    }
}