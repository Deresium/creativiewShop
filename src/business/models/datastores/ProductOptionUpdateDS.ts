export default class ProductOptionUpdateDS {
    private productOptionId: string;
    private readonly code: string;
    private readonly nameFr: string;
    private readonly nameEn: string;
    private readonly weight: string;
    private readonly stock: number;
    private readonly active: boolean;
    private readonly preorder: boolean;
    private readonly featured: boolean;


    constructor(productOptionId: string, code: string, nameFr: string, nameEn: string, weight: string, stock: number, active: boolean, preorder: boolean, featured: boolean) {
        this.productOptionId = productOptionId;
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

    public getCode(): string {
        return this.code;
    }

    public getNameFr(): string {
        return this.nameFr;
    }

    public getNameEn(): string {
        return this.nameEn;
    }

    public getWeight(): string {
        if (this.weight) {
            return this.weight;
        }
        return null;
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