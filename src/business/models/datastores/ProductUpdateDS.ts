export default class ProductUpdateDS {
    private readonly productId: string;
    private readonly customerId: number;
    private readonly manufacturerId: string;
    private readonly code: string;
    private readonly nameFr: string;
    private readonly nameEn: string;
    private readonly descriptionFr: string;
    private readonly descriptionEn: string;


    constructor(productId: string, customerId: number, manufacturerId: string, code: string, nameFr: string, nameEn: string, descriptionFr: string, descriptionEn: string) {
        this.productId = productId;
        this.customerId = customerId;
        this.manufacturerId = manufacturerId;
        this.code = code;
        this.nameFr = nameFr;
        this.nameEn = nameEn;
        this.descriptionFr = descriptionFr;
        this.descriptionEn = descriptionEn;
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
}