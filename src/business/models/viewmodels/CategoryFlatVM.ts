export default class CategoryFlatVM {
    private readonly categoryId: string;
    private readonly nameFr: string;
    private readonly nameEn: string;
    private readonly imageName: string;
    private readonly fullNameAriane: string;
    private readonly parentsAriane: string;
    private readonly parentCategoryId: string;


    constructor(categoryId: string, nameFr: string, nameEn: string, imageName: string, fullNameAriane: string, parentsAriane: string, parentCategoryId: string) {
        this.categoryId = categoryId;
        this.nameFr = nameFr;
        this.nameEn = nameEn;
        this.imageName = imageName;
        this.fullNameAriane = fullNameAriane;
        this.parentsAriane = parentsAriane;
        this.parentCategoryId = parentCategoryId;
    }
}