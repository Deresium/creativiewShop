import ProductOptionStoreVM from "./ProductOptionStoreVM.ts";

export default class ProductOptionStoreBasketVM {
    private readonly productOptionStore: ProductOptionStoreVM;
    private readonly quantity: number;


    constructor(productOptionStore: ProductOptionStoreVM, quantity: number) {
        this.productOptionStore = productOptionStore;
        this.quantity = quantity;
    }


    public getProductOptionStore(): ProductOptionStoreVM {
        return this.productOptionStore;
    }

    public getQuantity(): number {
        return this.quantity;
    }

    public getTitle() {
        return this.productOptionStore.getTitle();
    }

    public getProductId() {
        return this.productOptionStore.getProductId();
    }

    public getProductOptionId() {
        return this.productOptionStore.getProductOptionId();
    }

    public getPictureId() {
        if (this.productOptionStore.getPictures().length >= 1) {
            return this.productOptionStore.getPictures()[0];
        }
        return null;
    }

    public hasMultipleOptions() {
        return this.productOptionStore.getAllOptions().length > 1;
    }

    public getTitleOption() {
        return this.productOptionStore.getTitleOption();
    }
}