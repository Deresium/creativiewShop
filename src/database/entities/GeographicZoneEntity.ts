import {DataTypes, Model} from "sequelize";
import DatabaseSingleton from "../DatabaseSingleton";

export default class GeographicZoneEntity extends Model {
    private geographicZoneId: string;
    private name: string;
    private active: boolean;
    private customerId: number;
    private deletedAt: Date;


    getGeographicZoneId(): string {
        return this.geographicZoneId;
    }

    getName(): string {
        return this.name;
    }

    getActive(): boolean {
        return this.active;
    }

    getCustomerId(): number {
        return this.customerId;
    }

    getDeletedAt(): Date {
        return this.deletedAt;
    }
}

GeographicZoneEntity.init({
    geographicZoneId: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    name: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    customerId: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
}, {
    tableName: 'GeographicZone',
    sequelize: DatabaseSingleton.getInstance().getSequelize()
});