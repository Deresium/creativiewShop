export default class CategoryVM {
    private readonly categoryId: string;
    private readonly nameFr: string;
    private readonly nameEn: string;
    private readonly imageName: string;
    private readonly childrenCategories: Array<CategoryVM>;


    constructor(categoryId: string, nameFr: string, nameEn: string, imageName: string, childrenCategories: Array<CategoryVM>) {
        this.categoryId = categoryId;
        this.nameFr = nameFr;
        this.nameEn = nameEn;
        this.imageName = imageName;
        this.childrenCategories = childrenCategories;
    }
}