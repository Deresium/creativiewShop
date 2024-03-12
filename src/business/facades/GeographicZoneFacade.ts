import IGeographicZoneRequester from "../requesters/IGeographicZoneRequester";
import GeographicZoneVM from "../models/viewmodels/GeographicZoneVM";
import GeographicZoneUpdateDS from "../models/datastores/GeographicZoneUpdateDS";
import IGeographicZoneDataGateway from "../../database/gateways/IGeographicZoneDataGateway";

export default class GeographicZoneFacade implements IGeographicZoneRequester {
    private readonly geographicZoneDataGateway: IGeographicZoneDataGateway;

    constructor(geographicZoneDataGateway: IGeographicZoneDataGateway) {
        this.geographicZoneDataGateway = geographicZoneDataGateway;
    }

    public async addGeographicZone(customerId: number): Promise<string> {
        return await this.geographicZoneDataGateway.addGeographicZone(customerId);
    }

    public async deleteGeographicZone(geographicZoneId: string, customerId: number): Promise<void> {
        await this.geographicZoneDataGateway.deleteGeographicZone(geographicZoneId, customerId);
    }

    public async geographicZoneExistsForCustomer(geographicZoneId: string, customerId: number): Promise<boolean> {
        return await this.geographicZoneDataGateway.geographicZoneExistsForCustomer(geographicZoneId, customerId);
    }

    public async getGeographicZone(geographicZoneId: string, customerId: number): Promise<GeographicZoneVM> {
        const geographicZone = await this.geographicZoneDataGateway.getGeographicZone(geographicZoneId, customerId);
        return new GeographicZoneVM(geographicZone.getGeographicZoneId(), geographicZone.getName(), geographicZone.getActive());
    }

    public async updateGeographicZone(geographicZoneUpdate: GeographicZoneUpdateDS): Promise<void> {
        await this.geographicZoneDataGateway.updateGeographicZone(geographicZoneUpdate);
    }

}