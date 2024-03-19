import {DataTypes, Model} from "sequelize";
import DatabaseSingleton from "../DatabaseSingleton";

export default class PasswordChangeRequestEntity extends Model {
    private passwordChangeRequestId: string;
    private userId: string;
    private requestUsed: boolean;
    private createdAt: Date;

    public getUserId(){
        return this.userId;
    }
}

PasswordChangeRequestEntity.init({
    passwordChangeRequestId: {type: DataTypes.STRING, primaryKey: true},
    userId: DataTypes.STRING,
    requestUsed: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE
},{
    tableName: 'PasswordChangeRequest',
    sequelize: DatabaseSingleton.getInstance().getSequelize()
});