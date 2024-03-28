import {DataTypes, Model} from "sequelize";
import DatabaseSingleton from "../DatabaseSingleton";

export default class PasswordChangeRequestEntity extends Model {
    private passwordChangeRequestId: string;
    private userId: string;
    private requestUsed: boolean;
    private createdAt: Date;

    public getUserId() {
        return this.userId;
    }

    public getCreatedAt() {
        return this.createdAt;
    }
}

PasswordChangeRequestEntity.init({
    passwordChangeRequestId: {type: DataTypes.BIGINT, primaryKey: true},
    userId: DataTypes.BIGINT,
    requestUsed: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE
}, {
    tableName: 'PasswordChangeRequest',
    sequelize: DatabaseSingleton.getInstance().getSequelize()
});