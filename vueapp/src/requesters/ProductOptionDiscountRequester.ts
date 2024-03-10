import ProductOptionDiscountVM from "../viewmodels/ProductOptionDiscountVM.ts";
import axiosServer from "../axios/axiosServer.ts";
import ProductOptionDiscountParser from "../parsers/ProductOptionDiscountParser.ts";

export default class ProductOptionDiscountRequester {
    public static async requestProductOptionDiscounts(productId: string, productOptionId: string): Promise<Array<ProductOptionDiscountVM>> {
        const response = await axiosServer.get(`/product/${productId}/productOption/${productOptionId}/discount`);
        return ProductOptionDiscountParser.parseProductOptionDiscounts(response.data);
    }
}