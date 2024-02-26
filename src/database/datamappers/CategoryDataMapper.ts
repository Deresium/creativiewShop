import ICategoryDataGateway from "../gateways/ICategoryDataGateway";
import CategoryCreationDS from "../../business/models/datastores/CategoryCreationDS";
import CategoryEntity from "../entities/CategoryEntity";
import CategoryUpdateDS from "../../business/models/datastores/CategoryUpdateDS";
import {Op} from "sequelize";

export default class CategoryDataMapper implements ICategoryDataGateway {
    public async addCategory(categoryCreationDS: CategoryCreationDS): Promise<void> {
        await CategoryEntity.create({
            parentCategoryId: categoryCreationDS.getParentCategoryId(),
            nameFr: categoryCreationDS.getNameFr(),
            nameEn: categoryCreationDS.getNameEn(),
            customerId: categoryCreationDS.getCustomerId()
        });
    }

    public async updateCategory(categoryUpdateDS: CategoryUpdateDS): Promise<void> {
        await CategoryEntity.update({
            parentCategoryId: categoryUpdateDS.getParentCategoryId(),
            nameFr: categoryUpdateDS.getNameFr(),
            nameEn: categoryUpdateDS.getNameEn(),
        }, {
            where: {
                categoryId: categoryUpdateDS.getCategoryId(),
                customerId: categoryUpdateDS.getCustomerId()
            }
        });
    }

    public async updateCategoryImageInfo(imageName: string, categoryId: string, customerId: number): Promise<void> {
        await CategoryEntity.update({
            imageName: imageName
        }, {
            where: {
                categoryId: categoryId,
                customerId: customerId
            }
        });
    }

    public async deleteCategory(categoryId: string, customerId: number): Promise<void> {
        await CategoryEntity.update({
            deletedAt: Date.now()
        }, {
            where: {
                categoryId: categoryId,
                customerId: customerId
            }
        });
    }

    public async getAllCategoriesOrderByParent(customerId: number): Promise<Array<CategoryEntity>> {
        return await CategoryEntity.findAll({
            where: {
                deletedAt: {
                    [Op.eq]: null
                },
                customerId: customerId
            },
            order: [
                ['parentCategoryId', 'ASC NULLS FIRST']
            ]
        })
    }

    public async getCategoryById(categoryId: string): Promise<CategoryEntity> {
        return await CategoryEntity.findOne({
            where: {
                deletedAt: {
                    [Op.eq]: null
                },
                categoryId: categoryId
            }
        });
    }

    public async getAllChildrenCategories(categoryId: string): Promise<Array<CategoryEntity>> {
        return await CategoryEntity.findAll({
            where: {
                deletedAt: {
                    [Op.eq]: null
                },
                parentCategoryId: categoryId
            }
        });
    }
}