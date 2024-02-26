export default class CategoryCreationDS {
    private readonly nameFr: string;
    private readonly nameEn: string;
    private readonly parentCategoryId: string;
    private readonly customerId: number;


    constructor(nameFr: string, nameEn: string, parentCategoryId: string, customerId: number) {
        this.nameFr = nameFr;
        this.nameEn = nameEn;
        this.parentCategoryId = parentCategoryId;
        this.customerId = customerId;
    }


    public getNameFr(): string {
        return this.nameFr;
    }

    public getNameEn(): string {
        return this.nameEn;
    }

    public getParentCategoryId(): string {
        return this.parentCategoryId;
    }

    public getCustomerId(): number {
        return this.customerId;
    }
}