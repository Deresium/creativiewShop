import ProductOptionDiscountDS from "../models/datastores/ProductOptionDiscountDS";
import ProductOptionDiscountVM from "../models/viewmodels/ProductOptionDiscountVM";
import Decimal from "decimal.js";

export default interface IProductOptionDiscountRequester {
    getDiscountsForProductOption(productOptionId: string): Promise<Array<ProductOptionDiscountVM>>;

    addProductOptionDiscount(productOptionDiscountDs: ProductOptionDiscountDS): Promise<void>;

    deleteProductOptionDiscount(productOptionDiscountId: string): Promise<void>;

    calculateDiscountPercent(originalPrice: Decimal, discountPrice: Decimal): Decimal;
}