import ProductOptionStoreVM from "../viewmodels/ProductOptionStoreVM.ts";

export default class ProductOptionStoreParser {

    public static parseProductOptionStore(data: any): ProductOptionStoreVM {
        return new ProductOptionStoreVM(
            data.productOptionId,
            data.productId,
            data.hasStock,
            data.weight,
            data.manufacturer,
            data.preorder,
            data.basePrice,
            data.discountPrice,
            data.percent,
            data.startDateDiscount,
            data.endDateDiscount,
            data.title,
            data.description,
            data.pictures,
            data.otherOptions
        );
    }
}