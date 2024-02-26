export default class CategoryVM {
    private readonly categoryId: string;
    private readonly nameFr: string;
    private readonly nameEn: string;
    private readonly imageName: string;
    private readonly childrenCategories: Array<CategoryVM>;


    constructor(categoryId: string, nameFr: string, nameEn: string, imageName: string) {
        this.categoryId = categoryId;
        this.nameFr = nameFr;
        this.nameEn = nameEn;
        this.imageName = imageName;
        this.childrenCategories = new Array<CategoryVM>();
    }


    public addCategory(categoryVM: CategoryVM) {
        this.childrenCategories.push(categoryVM);
    }

    public getCategoryId(): string {
        return this.categoryId;
    }

    public getNameFr(): string {
        return this.nameFr;
    }

    public getNameEn(): string {
        return this.nameEn;
    }

    public getImageName(): string {
        return this.imageName;
    }

    public getChildrenCategories(): Array<CategoryVM> {
        return this.childrenCategories;
    }
}