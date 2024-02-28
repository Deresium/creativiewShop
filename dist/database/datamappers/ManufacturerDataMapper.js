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
const ManufacturerEntity_1 = __importDefault(require("../entities/ManufacturerEntity"));
const sequelize_1 = require("sequelize");
class ManufacturerDataMapper {
    addManufacturer(manufacturerDS) {
        return __awaiter(this, void 0, void 0, function* () {
            yield ManufacturerEntity_1.default.create({
                name: manufacturerDS.getName(),
                customerId: manufacturerDS.getCustomerId()
            });
        });
    }
    getAllManufacturer(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ManufacturerEntity_1.default.findAll({
                where: {
                    customerId: customerId,
                    deletedAt: {
                        [sequelize_1.Op.eq]: null
                    }
                }
            });
        });
    }
    removeManufacturer(manufacturerId, customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield ManufacturerEntity_1.default.update({
                deletedAt: Date.now()
            }, {
                where: {
                    customerId: customerId,
                    manufacturerId: manufacturerId
                }
            });
        });
    }
    updateManufacturer(manufacturerUpdateDS) {
        return __awaiter(this, void 0, void 0, function* () {
            yield ManufacturerEntity_1.default.update({
                name: manufacturerUpdateDS.getName()
            }, {
                where: {
                    customerId: manufacturerUpdateDS.getCustomerId(),
                    manufacturerId: manufacturerUpdateDS.getManufacturerId()
                }
            });
        });
    }
    getManufacturerById(manufacturerId, customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ManufacturerEntity_1.default.findOne({
                where: {
                    customerId: customerId,
                    manufacturerId: manufacturerId
                }
            });
        });
    }
}
exports.default = ManufacturerDataMapper;
//# sourceMappingURL=ManufacturerDataMapper.js.map