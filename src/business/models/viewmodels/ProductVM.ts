export default class ProductVM {
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
}