import GeographicZoneUpdateDS from "../models/datastores/GeographicZoneUpdateDS";
import GeographicZoneVM from "../models/viewmodels/GeographicZoneVM";

export default interface IGeographicZoneRequester {
    addGeographicZone(customerId: number): Promise<string>;

    updateGeographicZone(geographicZoneUpdate: GeographicZoneUpdateDS): Promise<void>;

    deleteGeographicZone(geographicZoneId: string, customerId: number): Promise<void>;

    geographicZoneExistsForCustomer(geographicZoneId: string, customerId: number): Promise<boolean>;

    getGeographicZone(geographicZoneId: string, customerId: number): Promise<GeographicZoneVM>;
}