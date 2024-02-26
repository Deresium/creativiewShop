export default interface IFileDataGateway {
    getCategoryPicture(categoryId: string): Promise<string>;

    saveCategoryPicture(categoryId: string, picture: Buffer): Promise<void>;

    deleteCategoryPicture(categoryId: string): Promise<void>;
}