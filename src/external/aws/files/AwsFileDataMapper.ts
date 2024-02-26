import IFileDataGateway from "./IFileDataGateway";
import IAwsOperations from "./IAwsOperations";

export default class AwsFileDataMapper implements IFileDataGateway {
    private awsOperations: IAwsOperations;

    constructor(awsOperations: IAwsOperations) {
        this.awsOperations = awsOperations;
    }

    async getCategoryPicture(categoryId: string): Promise<string> {
        return await this.awsOperations.getFile(`category/${categoryId}`);
    }

    async deleteCategoryPicture(categoryId: string): Promise<void> {
        await this.awsOperations.deleteFile(`category/${categoryId}`);
    }

    async saveCategoryPicture(categoryId: string, picture: Buffer): Promise<void> {
        await this.awsOperations.addFile(`category/${categoryId}`, picture);
    }
}