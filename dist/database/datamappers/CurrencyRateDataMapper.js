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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CurrencyRateEntity_1 = __importDefault(require("../entities/CurrencyRateEntity"));
const DatabaseSingleton_1 = __importDefault(require("../DatabaseSingleton"));
const sequelize_1 = require("sequelize");
const CurrencyEntity_1 = __importDefault(require("../entities/CurrencyEntity"));
class CurrencyRateDataMapper {
    addCurrencyRate(currencyCode, rate, customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const now = Date.now();
            yield DatabaseSingleton_1.default.getInstance().getSequelize().transaction((t) => __awaiter(this, void 0, void 0, function* () {
                yield CurrencyRateEntity_1.default.update({
                    endDate: now
                }, {
                    where: {
                        customerId: customerId,
                        currencyCode: currencyCode,
                        endDate: {
                            [sequelize_1.Op.eq]: null
                        }
                    },
                    transaction: t
                });
                yield CurrencyRateEntity_1.default.create({
                    currencyCode: currencyCode,
                    rate: rate,
                    customerId: customerId,
                    startDate: now
                }, { transaction: t });
            }));
        });
    }
    getCurrencyRates(currencyCode, customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield CurrencyRateEntity_1.default.findAll({
                where: {
                    customerId: customerId,
                    currencyCode: currencyCode
                }
            });
        });
    }
    getCurrency() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield CurrencyEntity_1.default.findAll();
        });
    }
}
exports.default = CurrencyRateDataMapper;
//# sourceMappingURL=CurrencyRateDataMapper.js.map