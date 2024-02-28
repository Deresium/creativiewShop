"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ManufacturerDS_1 = __importDefault(require("./ManufacturerDS"));
class ManufacturerUpdateDS extends ManufacturerDS_1.default {
    constructor(name, customerId, manufacturerId) {
        super(name, customerId);
        this.manufacturerId = manufacturerId;
    }
    getManufacturerId() {
        return this.manufacturerId;
    }
}
exports.default = ManufacturerUpdateDS;
//# sourceMappingURL=ManufacturerUpdateDS.js.map