import {DataTypes, Model} from "sequelize";
import DatabaseSingleton from "../DatabaseSingleton";


export default class UserEntity extends Model {
    private userId: bigint;
    private email: string;
    private role: string;
    private password: string;
    private salted: string;
    private access: boolean;
    private name: string;
    private firstName: string;
    private customerId: number;
}

UserEntity.init({
    userId: {type: DataTypes.BIGINT, primaryKey: true},
    email: DataTypes.STRING,
    role: DataTypes.STRING,
    password: DataTypes.STRING,
    salted: DataTypes.STRING,
    access: DataTypes.BOOLEAN,
    name: DataTypes.STRING,
    firstName: DataTypes.STRING,
    customerId: DataTypes.INTEGER
}, {
    tableName: 'User',
    sequelize: DatabaseSingleton.getInstance().getSequelize()
});