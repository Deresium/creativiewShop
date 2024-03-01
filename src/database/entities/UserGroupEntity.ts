import {DataTypes, Model} from "sequelize";
import DatabaseSingleton from "../DatabaseSingleton";
import UserEntity from "./UserEntity";

export default class UserGroupEntity extends Model {
    private userGroupId: string;
    private groupId: string;
    private userId: string;
    private startDate: Date;
    private endDate: Date;

    public getGroupId() {
        return this.groupId;
    }
}

UserGroupEntity.init({
    userGroupId: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    groupId: DataTypes.BIGINT,
    userId: DataTypes.BIGINT,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
}, {
    tableName: 'UserGroup',
    sequelize: DatabaseSingleton.getInstance().getSequelize()
});

UserGroupEntity.hasOne(UserEntity, {sourceKey: 'userId', foreignKey: 'userId'});