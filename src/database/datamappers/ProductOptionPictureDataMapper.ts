import IProductOptionPictureDataGateway from "../gateways/IProductOptionPictureDataGateway";
import ProductOptionPictureEntity from "../entities/ProductOptionPictureEntity";

export default class ProductOptionPictureDataMapper implements IProductOptionPictureDataGateway {
    public async addProductOptionPicture(productOptionId: string, name: string): Promise<string> {
        const productOptionPicture = await ProductOptionPictureEntity.create({
            productOptionId: productOptionId,
            name: name
        });
        return productOptionPicture.getProductOptionPictureId();
    }

    public async deleteProductOptionPicture(productOptionPictureId: string): Promise<void> {
        await ProductOptionPictureEntity.destroy({
            where: {
                productOptionPictureId: productOptionPictureId
            }
        })
    }

    public async getPicturesForProductOption(productOptionId: string): Promise<Array<ProductOptionPictureEntity>> {
        return await ProductOptionPictureEntity.findAll({
            where: {
                productOptionId: productOptionId
            }
        });
    }

    public async getProductOptionPicture(productOptionPictureId: string): Promise<ProductOptionPictureEntity> {
        return await ProductOptionPictureEntity.findOne({
            where: {
                productOptionPictureId: productOptionPictureId
            }
        });
    }

}