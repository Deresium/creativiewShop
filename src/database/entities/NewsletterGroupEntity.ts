import {DataTypes, Model} from "sequelize";
import DatabaseSingleton from "../DatabaseSingleton";

export default class NewsletterGroupEntity extends Model {
    private readonly newsletterId: string;
    private readonly groupId: string;
}

NewsletterGroupEntity.init({
    newsletterId: {type: DataTypes.BIGINT, primaryKey: true},
    groupId: {type: DataTypes.BIGINT, primaryKey: true}
}, {
    tableName: 'NewsletterGroup',
    sequelize: DatabaseSingleton.getInstance().getSequelize()
});