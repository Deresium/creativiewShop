import ProductOptionPictureEntity from "../entities/ProductOptionPictureEntity";

export default interface IProductOptionPictureDataGateway {
    getPicturesForProductOption(productOptionId: string): Promise<Array<ProductOptionPictureEntity>>;

    deleteProductOptionPicture(productOptionPictureId: string): Promise<void>;

    getProductOptionPicture(productOptionPictureId: string): Promise<ProductOptionPictureEntity>;

    addProductOptionPicture(productOptionId: string, name: string): Promise<string>;
}