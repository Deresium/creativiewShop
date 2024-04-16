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
    private readonly weight: string;
    private readonly preorder: boolean;
    private readonly price: string;


    constructor(productOptionId: string, productId: string, nameFr: string, nameEn: string, code: string, stock: number, active: boolean, featured: boolean, click: string, weight: string, preorder: boolean, price: string) {
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
        this.price = price;
    }
}