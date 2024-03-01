export default class ProductOptionUpdateDS {
    private productOptionId: string;
    private productId: string;
    private readonly code: string;
    private readonly nameFr: string;
    private readonly nameEn: string;
    private readonly weight: number;
    private readonly stock: number;
    private readonly active: boolean;
    private readonly preorder: boolean;
    private readonly featured: boolean;


    constructor(productOptionId: string, productId: string, code: string, nameFr: string, nameEn: string, weight: number, stock: number, active: boolean, preorder: boolean, featured: boolean) {
        this.productOptionId = productOptionId;
        this.productId = productId;
        this.code = code;
        this.nameFr = nameFr;
        this.nameEn = nameEn;
        this.weight = weight;
        this.stock = stock;
        this.active = active;
        this.preorder = preorder;
        this.featured = featured;
    }


    public getProductOptionId(): string {
        return this.productOptionId;
    }

    public getProductId(): string {
        return this.productId;
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

    public getWeight(): number {
        return this.weight;
    }

    public getStock(): number {
        return this.stock;
    }

    public getActive(): boolean {
        return this.active;
    }

    public getPreorder(): boolean {
        return this.preorder;
    }

    public getFeatured(): boolean {
        return this.featured;
    }
}