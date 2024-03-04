import ProductOptionDiscountDS from "../models/datastores/ProductOptionDiscountDS";
import ProductOptionDiscountVM from "../models/viewmodels/ProductOptionDiscountVM";

export default interface IProductOptionDiscountRequester {
    getDiscountsForProductOption(productOptionId: string): Promise<Array<ProductOptionDiscountVM>>;
    addProductOptionDiscount(productOptionDiscountDs: ProductOptionDiscountDS): Promise<void>;
    deleteProductOptionDiscount(productOptionDiscountId: string): Promise<void>;
}