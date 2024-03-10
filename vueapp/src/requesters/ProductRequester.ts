import ProductVM from "../viewmodels/ProductVM.ts";
import ProductParser from "../parsers/ProductParser.ts";
import axiosServer from "../axios/axiosServer.ts";

export default class ProductRequester {
    public static async requestProduct(productId: string): Promise<ProductVM> {
        const response = await axiosServer.get(`/product/${productId}`);
        return ProductParser.parseProduct(response.data);
    }

    public static async requestProducts(): Promise<Array<ProductVM>> {
        const response = await axiosServer.get('/product');
        return ProductParser.parseProducts(response.data);
    }

    public static async requestProductsAdminList(): Promise<any> {
        const response = await axiosServer.get('/productListAdmin');
        return response.data;
    }
}