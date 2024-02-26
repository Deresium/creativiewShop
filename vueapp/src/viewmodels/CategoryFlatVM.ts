export default class CategoryFlatVM {
    private readonly categoryId: string;
    private readonly nameFr: string;
    private readonly nameEn: string;
    private readonly imageName: string;
    private readonly fullNameAriane: string;
    private readonly parentsAriane: string;


    constructor(categoryId: string, nameFr: string, nameEn: string, imageName: string, fullNameAriane: string, parentsAriane: string) {
        this.categoryId = categoryId;
        this.nameFr = nameFr;
        this.nameEn = nameEn;
        this.imageName = imageName;
        this.fullNameAriane = fullNameAriane;
        this.parentsAriane = parentsAriane;
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

    public getFullNameAriane(): string {
        return this.fullNameAriane;
    }

    public getParentsAriane(): string {
        return this.parentsAriane;
    }
}