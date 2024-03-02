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


    public getProductOptionId(): string {
        return this.productOptionId;
    }

    public getProductId(): string {
        return this.productId;
    }

    public getNameFr(): string {
        return this.nameFr;
    }

    public getNameEn(): string {
        return this.nameEn;
    }

    public getCode(): string {
        return this.code;
    }

    public getStock(): number {
        return this.stock;
    }

    public getActive(): boolean {
        return this.active;
    }

    public getFeatured(): boolean {
        return this.featured;
    }

    public getClick(): string {
        return this.click;
    }

    public getWeight(): number {
        return this.weight;
    }

    public getPreorder(): boolean {
        return this.preorder;
    }
}