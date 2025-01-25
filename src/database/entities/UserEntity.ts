import {DataTypes, Model} from "sequelize";
import DatabaseSingleton from "../DatabaseSingleton";
import UserGroupEntity from "./UserGroupEntity";


export default class UserEntity extends Model {
    private userId: string;
    private email: string;
    private password: string;
    private salted: string;
    private access: boolean;
    private name: string;
    private firstName: string;
    private customerId: number;
    private language: string;
    private phone: string;

    private userGroups: Array<UserGroupEntity>;


    public getUserId(): string {
        return this.userId;
    }

    public getEmail(): string {
        return this.email;
    }

    public getPassword(): string {
        return this.password;
    }

    public getSalted(): string {
        return this.salted;
    }

    public getAccess(): boolean {
        return this.access;
    }

    public getName(): string {
        return this.name;
    }

    public getFirstName(): string {
        return this.firstName;
    }

    public getCustomerId(): number {
        return this.customerId;
    }


    public getLanguage(): string {
        return this.language;
    }

    public getUserGroups() {
        return this.userGroups;
    }

    public getPhoneNumber() {
        return this.phone;
    }
}

UserEntity.init({
    userId: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    salted: DataTypes.STRING,
    access: DataTypes.BOOLEAN,
    name: DataTypes.STRING,
    firstName: DataTypes.STRING,
    customerId: DataTypes.INTEGER,
    language: DataTypes.STRING,
    phone: DataTypes.STRING
}, {
    tableName: 'User',
    sequelize: DatabaseSingleton.getInstance().getSequelize()
});

UserEntity.hasMany(UserGroupEntity, {sourceKey: 'userId', foreignKey: 'userId', as: 'userGroups'});
UserGroupEntity.hasOne(UserEntity, {sourceKey: 'userId', foreignKey: 'userId', as: 'user'});