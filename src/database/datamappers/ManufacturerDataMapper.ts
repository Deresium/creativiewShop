import IManufacturerDataGateway from "../gateways/IManufacturerDataGateway";
import ManufacturerDS from "../../business/models/datastores/ManufacturerDS";
import ManufacturerEntity from "../entities/ManufacturerEntity";
import ManufacturerUpdateDS from "../../business/models/datastores/ManufacturerUpdateDS";
import {Op} from "sequelize";

export default class ManufacturerDataMapper implements IManufacturerDataGateway {
    public async addManufacturer(manufacturerDS: ManufacturerDS): Promise<void> {
        await ManufacturerEntity.create({
            name: manufacturerDS.getName(),
            customerId: manufacturerDS.getCustomerId()
        });
    }

    public async getAllManufacturer(customerId: number): Promise<Array<ManufacturerEntity>> {
        return await ManufacturerEntity.findAll({
            where: {
                customerId: customerId,
                deletedAt: {
                    [Op.eq]: null
                }
            }
        });
    }

    public async removeManufacturer(manufacturerId: string, customerId: number): Promise<void> {
        await ManufacturerEntity.update({
            deletedAt: Date.now()
        }, {
            where: {
                customerId: customerId,
                manufacturerId: manufacturerId
            }
        });
    }

    public async updateManufacturer(manufacturerUpdateDS: ManufacturerUpdateDS): Promise<void> {
        await ManufacturerEntity.update({
            name: manufacturerUpdateDS.getName()
        }, {
            where: {
                customerId: manufacturerUpdateDS.getCustomerId(),
                manufacturerId: manufacturerUpdateDS.getManufacturerId()
            }
        });
    }

    public async getManufacturerById(manufacturerId: string, customerId: number): Promise<ManufacturerEntity> {
        return await ManufacturerEntity.findOne({
            where: {
                customerId: customerId,
                manufacturerId: manufacturerId
            }
        });
    }
}