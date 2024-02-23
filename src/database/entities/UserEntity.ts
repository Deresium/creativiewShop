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


    public getUserId(): bigint {
        return this.userId;
    }

    public getEmail(): string {
        return this.email;
    }

    public getRole(): string {
        return this.role;
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
}

UserEntity.init({
    userId: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
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