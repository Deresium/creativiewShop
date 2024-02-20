"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class DatabaseSingleton {
    constructor() {
        let dialectOptions = {};
        if (process.env.NODE_ENV === 'production') {
            dialectOptions = {
                ssl: {
                    rejectUnauthorized: false
                }
            };
        }
        this.sequelize = new sequelize_1.Sequelize(process.env.DATABASE_URL, {
            dialectOptions,
            schema: 'creativiewshopschema'
        });
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new DatabaseSingleton();
        }
        return this.instance;
    }
    getSequelize() {
        return this.sequelize;
    }
    testConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('try to connect...');
            try {
                yield this.sequelize.authenticate();
                const databaseName = this.sequelize.getDatabaseName();
                console.log(`sequelize connexion ok to ${databaseName}`);
            }
            catch (error) {
                console.log('sequelize connexion failed');
            }
        });
    }
}
exports.default = DatabaseSingleton;
//# sourceMappingURL=DatabaseSingleton.js.map