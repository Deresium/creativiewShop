import CategoryFlatVM from "../viewmodels/CategoryFlatVM.ts";
import axiosServer from "../axios/axiosServer.ts";
import CategoryFlatParser from "../parsers/CategoryFlatParser.ts";

export default class CategoryFlatRequester {
    public static async requestCategoriesFlat(): Promise<Array<CategoryFlatVM>> {
        const response = await axiosServer.get('/categoryFlat');
        return CategoryFlatParser.parseCategoriesFlat(response.data);
    }
}