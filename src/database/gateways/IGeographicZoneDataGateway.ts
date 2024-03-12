import GeographicZoneUpdateDS from "../../business/models/datastores/GeographicZoneUpdateDS";
import GeographicZoneEntity from "../entities/GeographicZoneEntity";

export default interface IGeographicZoneDataGateway {
    addGeographicZone(customerId: number): Promise<string>;

    updateGeographicZone(geographicZoneUpdate: GeographicZoneUpdateDS): Promise<void>;

    deleteGeographicZone(geographicZoneId: string, customerId: number): Promise<void>;

    geographicZoneExistsForCustomer(geographicZoneId: string, customerId: number): Promise<boolean>;

    getGeographicZone(geographicZoneId: string, customerId: number): Promise<GeographicZoneEntity>;
}