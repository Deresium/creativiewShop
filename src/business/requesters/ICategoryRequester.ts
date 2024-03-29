import CategoryCreationDS from "../models/datastores/CategoryCreationDS";
import CategoryUpdateDS from "../models/datastores/CategoryUpdateDS";
import CategoryVM from "../models/viewmodels/CategoryVM";
import CategoryFlatVM from "../models/viewmodels/CategoryFlatVM";
import FileVM from "../models/viewmodels/FileVM";

export default interface ICategoryRequester {
    addCategory(categoryCreationDS: CategoryCreationDS): Promise<void>;

    updateCategory(categoryUpdateDS: CategoryUpdateDS): Promise<void>;

    deleteCategory(categoryId: string, customerId: number): Promise<void>;

    getAllCategories(customerId: number): Promise<Array<CategoryVM>>;

    updateCategoryImage(image: any, imageName: string, categoryId: string, customerId: number): Promise<void>;

    getAllCategoriesFlat(customerId: number): Promise<Array<CategoryFlatVM>>;

    getCategoryImage(categoryId: string, customerId: number): Promise<FileVM>;
}