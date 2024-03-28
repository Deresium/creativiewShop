export default class ProductOptionStoreOtherOptionVM {
    private readonly productOptionId: string;
    private readonly name: string;


    constructor(productOptionId: string, name: string) {
        this.productOptionId = productOptionId;
        this.name = name;
    }
}