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
const ManufacturerVM_1 = __importDefault(require("../models/viewmodels/ManufacturerVM"));
class ManufacturerFacade {
    constructor(manufacturerDataGateway) {
        this.manufacturerDataGateway = manufacturerDataGateway;
    }
    addManufacturer(manufacturerDS) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.manufacturerDataGateway.addManufacturer(manufacturerDS);
        });
    }
    getAllManufacturer(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const manufacturers = yield this.manufacturerDataGateway.getAllManufacturer(customerId);
            return manufacturers.map(manufacturer => new ManufacturerVM_1.default(manufacturer.getManufacturerId(), manufacturer.getName()));
        });
    }
    removeManufacturer(manufacturerId, customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.manufacturerDataGateway.removeManufacturer(manufacturerId, customerId);
        });
    }
    updateManufacturer(manufacturerUpdateDS) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.manufacturerDataGateway.updateManufacturer(manufacturerUpdateDS);
        });
    }
    getManufacturerById(manufacturerId, customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const manufacturer = yield this.manufacturerDataGateway.getManufacturerById(manufacturerId, customerId);
            return new ManufacturerVM_1.default(manufacturer.getManufacturerId(), manufacturer.getName());
        });
    }
}
exports.default = ManufacturerFacade;
//# sourceMappingURL=ManufacturerFacade.js.map