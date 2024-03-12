import IGeographicZoneDataGateway from "../gateways/IGeographicZoneDataGateway";
import GeographicZoneEntity from "../entities/GeographicZoneEntity";
import GeographicZoneUpdateDS from "../../business/models/datastores/GeographicZoneUpdateDS";
import ProductEntity from "../entities/ProductEntity";

export default class GeographicZoneDataMapper implements IGeographicZoneDataGateway {
    public async addGeographicZone(customerId: number): Promise<string> {
        const geographicZone = await GeographicZoneEntity.create({
            customerId: customerId
        });
        return geographicZone.getGeographicZoneId();
    }

    public async deleteGeographicZone(geographicZoneId: string, customerId: number): Promise<void> {
        await GeographicZoneEntity.update({
            deletedAt: Date.now()
        }, {
            where: {
                geographicZoneId: geographicZoneId,
                customerId: customerId
            }
        });
    }

    public async geographicZoneExistsForCustomer(geographicZoneId: string, customerId: number): Promise<boolean> {
        const count = await GeographicZoneEntity.count({
            where: {
                customerId: customerId,
                geographicZoneId: geographicZoneId
            }
        });
        return count === 1;
    }

    public async getGeographicZone(geographicZoneId: string, customerId: number): Promise<GeographicZoneEntity> {
        return await GeographicZoneEntity.findOne({
            where: {
                customerId: customerId,
                geographicZoneId: geographicZoneId
            }
        });
    }

    public async updateGeographicZone(geographicZoneUpdate: GeographicZoneUpdateDS): Promise<void> {
        await GeographicZoneEntity.update({
            name: geographicZoneUpdate.getName(),
            active: geographicZoneUpdate.getActive()
        },{
            where: {
                customerId: geographicZoneUpdate.getCustomerId(),
                geographicZoneId: geographicZoneUpdate.getGeographicZoneId()
            }
        });
    }

}