import CategoryCreationDS from "./CategoryCreationDS";

export default class CategoryUpdateDS extends CategoryCreationDS {
    private readonly categoryId: string;


    constructor(nameFr: string, nameEn: string, parentCategoryId: string, categoryId: string, customerId: number) {
        super(nameFr, nameEn, parentCategoryId, customerId);
        this.categoryId = categoryId;
    }


    public getCategoryId(): string {
        return this.categoryId;
    }
}