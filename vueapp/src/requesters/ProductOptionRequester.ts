import axiosServer from "../axios/axiosServer.ts";
import ProductOptionVM from "../viewmodels/ProductOptionVM.ts";
import ProductOptionParser from "../parsers/ProductOptionParser.ts";

export default class ProductOptionRequester {
    public static async requestProductOption(productId: string, productOptionId: string): Promise<ProductOptionVM> {
        const response = await axiosServer.get(`/product/${productId}/productOption/${productOptionId}`);
        return ProductOptionParser.parseProductOption(response.data);
    }

    public static async requestProductOptions(productId: string): Promise<Array<ProductOptionVM>> {
        const response = await axiosServer.get(`/product/${productId}/productOption`);
        return ProductOptionParser.parseProductOptions(response.data);
    }
}