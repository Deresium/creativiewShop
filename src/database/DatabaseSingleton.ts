import {Sequelize} from "sequelize";

export default class DatabaseSingleton {
    private static instance: DatabaseSingleton;
    private readonly sequelize: Sequelize;

    private constructor() {
        let dialectOptions: any = {};
        if (process.env.NODE_ENV === 'production') {
            dialectOptions = {
                ssl: {
                    rejectUnauthorized: false
                }
            }
        }

        this.sequelize = new Sequelize(process.env.DATABASE_URL, {
            dialectOptions
        });
    }

    public static getInstance(): DatabaseSingleton {
        if (!this.instance) {
            this.instance = new DatabaseSingleton();
        }
        return this.instance;
    }

    getSequelize() {
        return this.sequelize;
    }

    async testConnect() {
        console.log('try to connect...');
        try {
            await this.sequelize.authenticate();
            const databaseName = this.sequelize.getDatabaseName();
            console.log(`sequelize connexion ok to ${databaseName}`);
        } catch (error) {
            console.log('sequelize connexion failed');
        }
    }

    /*async disconnect() {
        try {
            await this.sequelize.close();
            console.log('disconnected');
        } catch (error) {
            console.log('error during disconnect');
        }
    }*/
}