import ICategoryRequester from "../requesters/ICategoryRequester";
import CategoryCreationDS from "../models/datastores/CategoryCreationDS";
import CategoryVM from "../models/viewmodels/CategoryVM";
import CategoryUpdateDS from "../models/datastores/CategoryUpdateDS";
import ICategoryDataGateway from "../../database/gateways/ICategoryDataGateway";
import IFileDataGateway from "../../external/aws/files/IFileDataGateway";
import CategoryFlatVM from "../models/viewmodels/CategoryFlatVM";
import FileVM from "../models/viewmodels/FileVM";
import ContentType from "../utils/ContentType";

export default class CategoryFacade implements ICategoryRequester {
    private readonly categoryDataGateway: ICategoryDataGateway;
    private readonly fileDataGateway: IFileDataGateway;

    constructor(categoryDataGateway: ICategoryDataGateway, fileDataGateway: IFileDataGateway) {
        this.categoryDataGateway = categoryDataGateway;
        this.fileDataGateway = fileDataGateway;
    }

    public async addCategory(categoryCreationDS: CategoryCreationDS): Promise<void> {
        await this.categoryDataGateway.addCategory(categoryCreationDS);
    }

    public async updateCategoryImage(image: any, imageName: string, categoryId: string, customerId: number): Promise<void> {
        try {
            await this.fileDataGateway.saveCategoryPicture(categoryId, image);
            await this.categoryDataGateway.updateCategoryImageInfo(imageName, categoryId, customerId);
        } catch (error) {
            console.error('facade operation aborded');
        }
    }

    public async deleteCategory(categoryId: string, customerId: number): Promise<void> {
        try {
            await this.categoryDataGateway.deleteCategory(categoryId, customerId);
            await this.fileDataGateway.deleteCategoryPicture(categoryId);
            const children = await this.categoryDataGateway.getAllChildrenCategories(categoryId);
            for (const child of children) {
                await this.deleteCategory(child.getCategoryId(), customerId);
            }
        } catch (error) {
            console.error('facade operation aborded');
        }
    }

    public async updateCategory(categoryUpdateDS: CategoryUpdateDS): Promise<void> {
        await this.categoryDataGateway.updateCategory(categoryUpdateDS);
    }

    public async getAllCategories(customerId: number): Promise<Array<CategoryVM>> {
        const categories = await this.categoryDataGateway.getAllCategoriesOrderByParent(customerId);

        const returnCategories = new Array<CategoryVM>();
        const childrenListCategory = new Map<string, Array<CategoryVM>>();
        for (const category of categories) {
            const children = new Array<CategoryVM>();
            const categoryVM = new CategoryVM(category.getCategoryId(), category.getNameFr(), category.getNameEn(), category.getImageName(), children);
            childrenListCategory.set(category.getCategoryId(), children);

            if (category.getParentCategoryId() === null) {
                returnCategories.push(categoryVM);
            } else {
                childrenListCategory.get(category.getParentCategoryId()).push(categoryVM);
            }
        }
        return returnCategories;
    }

    public async getAllCategoriesFlat(customerId: number): Promise<Array<CategoryFlatVM>> {
        const categories = await this.categoryDataGateway.getAllCategoriesOrderByParent(customerId);

        const returnCategories = new Array<CategoryFlatVM>();
        const childrenListCategory = new Map<string, string>();
        for (const category of categories) {
            if (category.getParentCategoryId() === null) {
                childrenListCategory.set(category.getCategoryId(), category.getNameFr());
            } else {
                const flatName = `${childrenListCategory.get(category.getParentCategoryId())} > ${category.getNameFr()}`;
                childrenListCategory.set(category.getCategoryId(), flatName);
            }

            const categoryFlatVM = new CategoryFlatVM(category.getCategoryId(), category.getNameFr(), category.getNameEn(),
                category.getImageName(), childrenListCategory.get(category.getCategoryId()), childrenListCategory.get(category.getParentCategoryId()), category.getParentCategoryId());
            returnCategories.push(categoryFlatVM);
        }
        return returnCategories;
    }

    public async getCategoryImage(categoryId: string): Promise<FileVM> {
        const category = await this.categoryDataGateway.getCategoryById(categoryId);
        if (category && category.getImageName()) {
            const file = await this.fileDataGateway.getCategoryPicture(categoryId);
            const extension = ContentType.determinateContentType(category.getImageName());
            return new FileVM(file, extension, category.getImageName());
        }
        return null;
    }
}