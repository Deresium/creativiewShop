import IProductOptionPictureRequester from "../requesters/IProductOptionPictureRequester";
import FileVM from "../models/viewmodels/FileVM";
import IProductOptionPictureDataGateway from "../../database/gateways/IProductOptionPictureDataGateway";
import IFileDataGateway from "../../external/aws/files/IFileDataGateway";
import ContentType from "../utils/ContentType";

export default class ProductOptionPictureFacade implements IProductOptionPictureRequester {
    private readonly productOptionPictureDataGateway: IProductOptionPictureDataGateway;
    private readonly fileDataGateway: IFileDataGateway;

    constructor(productOptionPictureDataGateway: IProductOptionPictureDataGateway, fileDataGateway: IFileDataGateway) {
        this.productOptionPictureDataGateway = productOptionPictureDataGateway;
        this.fileDataGateway = fileDataGateway;
    }

    public async addProductOptionPicture(image: any, productOptionId: string, name: string): Promise<void> {
        try {
            const productOptionPictureId = await this.productOptionPictureDataGateway.addProductOptionPicture(productOptionId, name);
            await this.fileDataGateway.saveProductOptionPicture(productOptionPictureId, image);
        } catch (error) {
            console.error(error);
        }
    }

    public async deleteProductOptionPicture(productOptionPictureId: string): Promise<void> {
        try {
            await this.productOptionPictureDataGateway.deleteProductOptionPicture(productOptionPictureId);
            await this.fileDataGateway.deleteProductOptionPicture(productOptionPictureId);
        } catch (error) {
            console.error(error);
        }
    }

    public async getPicturesForProductOption(productOptionId: string): Promise<Array<string>> {
        const pictures = await this.productOptionPictureDataGateway.getPicturesForProductOption(productOptionId);
        return pictures.map(picture => picture.getProductOptionPictureId());
    }

    public async getProductOptionPicture(productOptionPictureId: string): Promise<FileVM> {
        const picture = await this.productOptionPictureDataGateway.getProductOptionPicture(productOptionPictureId);
        if (picture && picture.getName()) {
            const file = await this.fileDataGateway.getProductOptionPicture(productOptionPictureId);
            const extension = ContentType.determinateContentType(picture.getName());
            return new FileVM(file, extension, picture.getName());
        }
    }
}