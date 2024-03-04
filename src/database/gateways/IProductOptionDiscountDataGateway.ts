import ProductOptionDiscountEntity from "../entities/ProductOptionDiscountEntity";
import ProductOptionDiscountDS from "../../business/models/datastores/ProductOptionDiscountDS";

export default interface IProductOptionDiscountDataGateway {
    getDiscountsForProductOption(productOptionId: string): Promise<Array<ProductOptionDiscountEntity>>;
    addProductOptionDiscount(productOptionDiscountDs: ProductOptionDiscountDS): Promise<void>;
    deleteProductOptionDiscount(productOptionDiscountId: string): Promise<void>;
}