import {DataTypes, Model} from "sequelize";
import DatabaseSingleton from "../DatabaseSingleton";

export default class NewsletterUserEntity extends Model {
    private readonly newsletterId: string;
    private readonly userId: string;
}

NewsletterUserEntity.init({
    newsletterId: {type: DataTypes.BIGINT, primaryKey: true},
    userId: {type: DataTypes.BIGINT, primaryKey: true}
},{
    tableName: 'NewsletterUser',
    sequelize: DatabaseSingleton.getInstance().getSequelize()
});