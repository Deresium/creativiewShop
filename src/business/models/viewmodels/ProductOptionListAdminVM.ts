export default class ProductOptionListAdminVM {
    private readonly productOptionId: string;
    private readonly nameFr: string;
    private readonly nameEn: string;
    private readonly active: boolean;
    private readonly stock: number;
    private readonly price: string;
    private readonly firstPictureId: string;


    constructor(productOptionId: string, nameFr: string, nameEn: string, active: boolean, stock: number, price: string, firstPictureId: string) {
        this.productOptionId = productOptionId;
        this.nameFr = nameFr;
        this.nameEn = nameEn;
        this.active = active;
        this.stock = stock;
        this.price = price;
        this.firstPictureId = firstPictureId;
    }
}