export default class ProductOptionListAdminFlatVM {
    private readonly productId: string;
    private readonly productOptionId: string;
    private readonly manufacturerName: string;
    private readonly codeProduct: string;
    private readonly nameFrProduct: string;
    private readonly nameEnProduct: string;
    private readonly nameFrProductOption: string;
    private readonly nameEnProductOption: string;
    private readonly active: boolean;
    private readonly stock: string;
    private readonly price: string;
    private readonly pictureId: string;


    constructor(productId: string, productOptionId: string, manufacturerName: string, codeProduct: string, nameFrProduct: string, nameEnProduct: string, nameFrProductOption: string, nameEnProductOption: string, active: boolean, stock: string, price: string, pictureId: string) {
        this.productId = productId;
        this.productOptionId = productOptionId;
        this.manufacturerName = manufacturerName;
        this.codeProduct = codeProduct;
        this.nameFrProduct = nameFrProduct;
        this.nameEnProduct = nameEnProduct;
        this.nameFrProductOption = nameFrProductOption;
        this.nameEnProductOption = nameEnProductOption;
        this.active = active;
        this.stock = stock;
        this.price = price;
        this.pictureId = pictureId;
    }


    public getProductId(): string {
        return this.productId;
    }


    public getProductOptionId(): string {
        return this.productOptionId;
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


    public getPictureId(): string {
        return this.pictureId;
    }


    public getNameEnProduct(): string {
        return this.nameEnProduct;
    }

    public getNameEnProductOption(): string {
        return this.nameEnProductOption;
    }
}