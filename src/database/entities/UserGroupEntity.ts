import {DataTypes, Model} from "sequelize";
import DatabaseSingleton from "../DatabaseSingleton";
import GroupEntity from "./GroupEntity";
import UserEntity from "./UserEntity";

export default class UserGroupEntity extends Model {
    private userGroupId: string;
    private groupId: string;
    private group: GroupEntity;
    private userId: string;
    private user: UserEntity;
    private startDate: Date;
    private endDate: Date;

    public getGroupId() {
        return this.groupId;
    }

    public getGroup() {
        return this.group;
    }

    public getUser() {
        return this.user;
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

UserGroupEntity.hasOne(GroupEntity, {sourceKey: 'groupId', foreignKey: 'groupId', as: 'group'});