import ProductOptionPriceVM from "../viewmodels/ProductOptionPriceVM.ts";
import axiosServer from "../axios/axiosServer.ts";
import ProductOptionPriceParser from "../parsers/ProductOptionPriceParser.ts";

export default class ProductOptionPriceRequester {
    public static async requestPrices(productId: string, productOptionId: string): Promise<Array<ProductOptionPriceVM>> {
        const response = await axiosServer.get(`/product/${productId}/productOption/${productOptionId}/price`);
        return ProductOptionPriceParser.parsePrices(response.data);
    }
}