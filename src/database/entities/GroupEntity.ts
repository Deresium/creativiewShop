import {DataTypes, Model} from "sequelize";
import DatabaseSingleton from "../DatabaseSingleton";

export default class GroupEntity extends Model {
    private groupId: string;
    private name: string;
    private groupCategoryCode: string;
    private customerId: number;


    public getGroupId(): string {
        return this.groupId;
    }

    public getName(): string {
        return this.name;
    }

    public getGroupCategoryCode(): string {
        return this.groupCategoryCode;
    }

    public getCustomerId(): number {
        return this.customerId;
    }
}

GroupEntity.init({
    groupId: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    name: DataTypes.STRING,
    groupCategoryCode: DataTypes.STRING,
    customerId: DataTypes.INTEGER
}, {
    tableName: 'Group',
    sequelize: DatabaseSingleton.getInstance().getSequelize()
});