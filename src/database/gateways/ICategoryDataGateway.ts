import CategoryCreationDS from "../../business/models/datastores/CategoryCreationDS";
import CategoryUpdateDS from "../../business/models/datastores/CategoryUpdateDS";
import CategoryEntity from "../entities/CategoryEntity";

export default interface ICategoryDataGateway {
    addCategory(categoryCreationDS: CategoryCreationDS): Promise<void>;

    updateCategory(categoryUpdateDS: CategoryUpdateDS): Promise<void>;

    deleteCategory(categoryId: string, customerId: number): Promise<void>;

    getAllCategoriesOrderByParent(customerId: number): Promise<Array<CategoryEntity>>;

    getCategoryById(categoryId: string): Promise<CategoryEntity>;

    getAllChildrenCategories(categoryId: string): Promise<Array<CategoryEntity>>;

    updateCategoryImageInfo(imageName: string, categoryId: string, customerId: number): Promise<void>;
}