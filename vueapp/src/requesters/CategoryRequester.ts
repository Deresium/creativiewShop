import CategoryVM from "../viewmodels/CategoryVM.ts";
import axiosServer from "../axios/axiosServer.ts";
import CategoryParser from "../parsers/CategoryParser.ts";

export default class CategoryRequester {
    public static async requestCategories(): Promise<Array<CategoryVM>> {
        const response = await axiosServer.get('/category');
        return CategoryParser.parseCategories(response.data);
    }
}