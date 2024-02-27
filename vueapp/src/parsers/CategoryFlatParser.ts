import CategoryFlatVM from "../viewmodels/CategoryFlatVM.ts";

export default class CategoryFlatParser {
    public static parseCategoriesFlat(data: any): Array<CategoryFlatVM> {
        const array = new Array<CategoryFlatVM>();
        for (const category of data) {
            array.push(CategoryFlatParser.parseCategoryFlat(category));
        }
        return array;
    }

    private static parseCategoryFlat(category: any): CategoryFlatVM {
        return new CategoryFlatVM(category.categoryId, category.nameFr, category.nameEn, category.imageName, category.fullNameAriane, category.parentsAriane, category.parentCategoryId);
    }
}