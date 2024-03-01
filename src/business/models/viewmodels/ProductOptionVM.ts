export default class ProductOptionVM {
    private readonly productOptionId: string;
    private readonly productId: string;
    private readonly nameFr: string;
    private readonly nameEn: string;
    private readonly code: string;
    private readonly stock: number;
    private readonly active: boolean;
    private readonly featured: boolean;
    private readonly click: string;
    private readonly weight: number;
    private readonly preorder: boolean;


    constructor(productOptionId: string, productId: string, nameFr: string, nameEn: string, code: string, stock: number, active: boolean, featured: boolean, click: string, weight: number, preorder: boolean) {
        this.productOptionId = productOptionId;
        this.productId = productId;
        this.nameFr = nameFr;
        this.nameEn = nameEn;
        this.code = code;
        this.stock = stock;
        this.active = active;
        this.featured = featured;
        this.click = click;
        this.weight = weight;
        this.preorder = preorder;
    }
}