import {DataTypes, Model} from "sequelize";
import DatabaseSingleton from "../DatabaseSingleton";

export default class InternalizationEntity extends Model {
    private internalizationId: bigint;
    private internalizationKey: string;
    private textFR: string;
    private textEN: string;
    private customerId: number;

    public getInternalizationKey() {
        return this.internalizationKey;
    }

    public getTextFR() {
        return this.textFR;
    }

    public getTextEN() {
        return this.textEN;
    }

    public getCustomerId(){
        return this.customerId;
    }
}

InternalizationEntity.init({
    internalizationId: {type: DataTypes.BIGINT, primaryKey: true},
    internalizationKey: DataTypes.STRING,
    textFR: DataTypes.STRING,
    textEN: DataTypes.STRING,
    customerId: DataTypes.INTEGER
}, {
    tableName: 'Internalization',
    sequelize: DatabaseSingleton.getInstance().getSequelize()
});