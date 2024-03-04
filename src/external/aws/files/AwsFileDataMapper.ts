import IFileDataGateway from "./IFileDataGateway";
import IAwsOperations from "./IAwsOperations";

export default class AwsFileDataMapper implements IFileDataGateway {
    private awsOperations: IAwsOperations;

    constructor(awsOperations: IAwsOperations) {
        this.awsOperations = awsOperations;
    }

    public async getCategoryPicture(categoryId: string): Promise<string> {
        return await this.awsOperations.getFile(`category/${categoryId}`);
    }

    public async deleteCategoryPicture(categoryId: string): Promise<void> {
        await this.awsOperations.deleteFile(`category/${categoryId}`);
    }

    public async saveCategoryPicture(categoryId: string, picture: Buffer): Promise<void> {
        await this.awsOperations.addFile(`category/${categoryId}`, picture);
    }

    public async deleteProductOptionPicture(productOptionPictureId: string): Promise<void> {
        await this.awsOperations.deleteFile(`productoption/${productOptionPictureId}`);
    }

    public async getProductOptionPicture(productOptionPictureId: string): Promise<string> {
        return await this.awsOperations.getFile(`productoption/${productOptionPictureId}`);
    }

    public async saveProductOptionPicture(productOptionPictureId: string, picture: Buffer): Promise<void> {
        await this.awsOperations.addFile(`productoption/${productOptionPictureId}`, picture);
    }


}