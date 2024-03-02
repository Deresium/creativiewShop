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
const ApplicationRouter_1 = __importDefault(require("./ApplicationRouter"));
const ManufacturerDS_1 = __importDefault(require("../../business/models/datastores/ManufacturerDS"));
const ManufacturerUpdateDS_1 = __importDefault(require("../../business/models/datastores/ManufacturerUpdateDS"));
class ManufacturerRouter extends ApplicationRouter_1.default {
    constructor(manufacturerRequester, onlyAdminStoreMiddleware) {
        super();
        this.manufacturerRequester = manufacturerRequester;
        this.onlyAdminStoreMiddleware = onlyAdminStoreMiddleware;
        this.initRoutes();
    }
    initRoutes() {
        this.getRouter().post('/manufacturer', this.onlyAdminStoreMiddleware, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const customerId = req.customer.getCustomerId();
            const name = req.body.name;
            const manufacturer = new ManufacturerDS_1.default(name, customerId);
            yield this.manufacturerRequester.addManufacturer(manufacturer);
            res.send();
        }));
        this.getRouter().put('/manufacturer/:manufacturerId', this.onlyAdminStoreMiddleware, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const manufacturerId = String(req.params.manufacturerId);
            const customerId = req.customer.getCustomerId();
            const name = req.body.name;
            const manufacturer = new ManufacturerUpdateDS_1.default(name, customerId, manufacturerId);
            yield this.manufacturerRequester.updateManufacturer(manufacturer);
            res.send();
        }));
        this.getRouter().delete('/manufacturer/:manufacturerId', this.onlyAdminStoreMiddleware, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const manufacturerId = String(req.params.manufacturerId);
            const customerId = req.customer.getCustomerId();
            yield this.manufacturerRequester.removeManufacturer(manufacturerId, customerId);
            res.send();
        }));
        this.getRouter().get('/manufacturer', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const customerId = req.customer.getCustomerId();
            const manufacturers = yield this.manufacturerRequester.getAllManufacturer(customerId);
            res.status(200).send(manufacturers);
        }));
        this.getRouter().get('/manufacturer/:manufacturerId', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const manufacturerId = String(req.params.manufacturerId);
            const customerId = req.customer.getCustomerId();
            const manufacturer = yield this.manufacturerRequester.getManufacturerById(manufacturerId, customerId);
            res.status(200).send(manufacturer);
        }));
    }
}
exports.default = ManufacturerRouter;
//# sourceMappingURL=ManufacturerRouter.js.map