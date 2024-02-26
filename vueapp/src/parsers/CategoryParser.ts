import CategoryVM from "../viewmodels/CategoryVM.ts";

export default class CategoryParser {
    public static parseCategories(data: any): Array<CategoryVM> {
        const array = new Array<CategoryVM>();
        for (const category of data) {
            array.push(CategoryParser.parseCategory(category));
        }
        return array;
    }

    private static parseCategory(data: any): CategoryVM {
        const categoryVM = new CategoryVM(data.categoryId, data.nameFr, data.nameEn, data.imageName);
        for (const category of data.childrenCategories) {
            categoryVM.addCategory(CategoryParser.parseCategory(category));
        }
        return categoryVM;
    }
}