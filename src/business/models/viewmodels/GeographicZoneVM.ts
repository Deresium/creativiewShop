export default class GeographicZoneVM {
    private geographicZoneId: string;
    private name: string;
    private active: boolean;


    constructor(geographicZoneId: string, name: string, active: boolean) {
        this.geographicZoneId = geographicZoneId;
        this.name = name;
        this.active = active;
    }
}