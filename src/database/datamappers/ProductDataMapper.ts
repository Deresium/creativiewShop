import IProductDataGateway from "../gateways/IProductDataGateway";
import ProductEntity from "../entities/ProductEntity";
import ProductUpdateDS from "../../business/models/datastores/ProductUpdateDS";
import {Op} from "sequelize";
import ManufacturerEntity from "../entities/ManufacturerEntity";

export default class ProductDataMapper implements IProductDataGateway {
    public async createProduct(customerId: number): Promise<string> {
        const product = await ProductEntity.create({
            customerId: customerId
        });
        return product.getProductId()
    }

    public async deleteProduct(productId: string, customerId: number): Promise<void> {
        await ProductEntity.update({
            deletedAt: Date.now()
        }, {
            where: {
                productId: productId,
                customerId: customerId
            }
        });
    }

    public async getAllProduct(customerId: number): Promise<Array<ProductEntity>> {
        return await ProductEntity.findAll({
            where: {
                customerId: customerId,
                deletedAt: {
                    [Op.eq]: null
                }
            },
            include: {model: ManufacturerEntity, as: 'manufacturer'}
        });
    }

    public async getProduct(productId: string, customerId: number): Promise<ProductEntity> {
        return await ProductEntity.findOne({
            where: {
                customerId: customerId,
                productId: productId
            },
            include: {model: ManufacturerEntity, as: 'manufacturer'}
        });
    }

    public async productExistsForCustomer(productId: string, customerId: number): Promise<boolean> {
        const count = await ProductEntity.count({
            where: {
                customerId: customerId,
                productId: productId
            }
        });
        return count === 1;
    }


    public async updateProduct(productUpdateDS: ProductUpdateDS): Promise<void> {
        await ProductEntity.update({
            manufacturerId: productUpdateDS.getManufacturerId(),
            code: productUpdateDS.getCode(),
            nameFr: productUpdateDS.getNameFr(),
            nameEn: productUpdateDS.getNameEn(),
            descriptionFr: productUpdateDS.getDescriptionFr(),
            descriptionEn: productUpdateDS.getDescriptionEn()
        }, {
            where: {
                productId: productUpdateDS.getProductId(),
                customerId: productUpdateDS.getCustomerId()
            }
        });
    }

}