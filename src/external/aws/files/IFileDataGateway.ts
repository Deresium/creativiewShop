export default interface IFileDataGateway {
    getCategoryPicture(categoryId: string): Promise<string>;

    saveCategoryPicture(categoryId: string, picture: Buffer): Promise<void>;

    deleteCategoryPicture(categoryId: string): Promise<void>;

    getProductOptionPicture(productOptionPictureId: string): Promise<string>;

    saveProductOptionPicture(productOptionPictureId: string, picture: Buffer): Promise<void>;

    deleteProductOptionPicture(productOptionPictureId: string): Promise<void>;
}