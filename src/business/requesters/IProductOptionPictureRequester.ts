import FileVM from "../models/viewmodels/FileVM";

export default interface IProductOptionPictureRequester {
    getPicturesForProductOption(productOptionId: string): Promise<Array<string>>;

    deleteProductOptionPicture(productOptionPictureId: string): Promise<void>;

    getProductOptionPicture(productOptionPictureId: string): Promise<FileVM>;

    addProductOptionPicture(image: any, productOptionId: string, name: string): Promise<void>;
}