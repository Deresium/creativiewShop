export default class ProductOptionListAdminFlatVM {
    private readonly productId: string;
    private readonly manufacturerName: string;
    private readonly codeProduct: string;
    private readonly nameFrProduct: string;
    private readonly nameFrProductOption: string;
    private readonly active: boolean;
    private readonly stock: string;
    private readonly price: string;


    constructor(productId: string, manufacturerName: string, codeProduct: string, nameFrProduct: string, nameFrProductOption: string, active: boolean, stock: string, price: string) {
        this.productId = productId;
        this.manufacturerName = manufacturerName;
        this.codeProduct = codeProduct;
        this.nameFrProduct = nameFrProduct;
        this.nameFrProductOption = nameFrProductOption;
        this.active = active;
        this.stock = stock;
        this.price = price;
    }


    public getProductId(): string {
        return this.productId;
    }

    public getManufacturerName(): string {
        return this.manufacturerName;
    }

    public getCodeProduct(): string {
        return this.codeProduct;
    }

    public getNameFrProduct(): string {
        return this.nameFrProduct;
    }

    public getNameFrProductOption(): string {
        return this.nameFrProductOption;
    }

    public getActive(): boolean {
        return this.active;
    }

    public getStock(): string {
        return this.stock;
    }

    public getPrice(): string {
        return this.price;
    }
}