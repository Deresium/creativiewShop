export default class GeographicZoneUpdateDS {
    private readonly geographicZoneId: string;
    private readonly customerId: number;
    private readonly active: boolean;
    private readonly name: string;


    constructor(geographicZoneId: string, customerId: number, active: boolean, name: string) {
        this.geographicZoneId = geographicZoneId;
        this.customerId = customerId;
        this.active = active;
        this.name = name;
    }


    getGeographicZoneId(): string {
        return this.geographicZoneId;
    }

    getCustomerId(): number {
        return this.customerId;
    }

    getActive(): boolean {
        return this.active;
    }

    getName(): string {
        return this.name;
    }
}

