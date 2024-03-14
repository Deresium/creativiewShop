import {DataTypes, Model} from "sequelize";
import DatabaseSingleton from "../DatabaseSingleton";
import UserEntity from "./UserEntity";
import GroupEntity from "./GroupEntity";

export default class UserGroupEntity extends Model {
    private userGroupId: string;
    private group: GroupEntity;
    private userId: string;
    private startDate: Date;
    private endDate: Date;

    public getGroupId() {
        if(this.group) {
            return this.group.getGroupId();
        }
        return null;
    }

    public getGroup(){
        return this.group;
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

UserGroupEntity.hasOne(UserEntity, {sourceKey: 'userId', foreignKey: 'userId', as: 'user'});
UserGroupEntity.hasOne(GroupEntity, {sourceKey: 'groupId', foreignKey: 'groupId', as: 'group'});