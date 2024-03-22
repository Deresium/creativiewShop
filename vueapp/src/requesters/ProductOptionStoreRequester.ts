import axiosServer from "../axios/axiosServer.ts";
import ProductOptionStoreVM from "../viewmodels/ProductOptionStoreVM.ts";
import ProductOptionStoreParser from "../parsers/ProductOptionStoreParser.ts";

export default class ProductOptionStoreRequester {
    public static async requestFeaturedProductOptionIds(): Promise<Array<string>> {
        const response = await axiosServer.get('/store/featuredProduct');
        return response.data;
    }

    public static async requestProductOptionStore(productOptionId: string): Promise<ProductOptionStoreVM> {
        const response = await axiosServer.get(`store/${productOptionId}`);
        return ProductOptionStoreParser.parseProductOptionStore(response.data);
    }


}