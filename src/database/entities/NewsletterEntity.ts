import {DataTypes, Model} from "sequelize";
import DatabaseSingleton from "../DatabaseSingleton";

export default class NewsletterEntity extends Model {
    private readonly newsletterId: string;
    private readonly object: string;
    private readonly content: string;
    private readonly customerId: number;
    private readonly sendToAllUsers: boolean;


    public getNewsletterId(): string {
        return this.newsletterId;
    }
}

NewsletterEntity.init({
    newsletterId: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    object: DataTypes.STRING,
    content: DataTypes.TEXT,
    customerId: DataTypes.INTEGER,
    sendToAllUsers: DataTypes.BOOLEAN
}, {
    tableName: 'Newsletter',
    sequelize: DatabaseSingleton.getInstance().getSequelize()
});