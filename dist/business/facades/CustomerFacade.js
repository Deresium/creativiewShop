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
const CustomerVM_1 = __importDefault(require("../models/viewmodels/CustomerVM"));
class CustomerFacade {
    constructor(customerGateway) {
        this.customerGateway = customerGateway;
    }
    getAllCustomers() {
        return __awaiter(this, void 0, void 0, function* () {
            const customersEntities = yield this.customerGateway.getAllCustomers();
            return customersEntities.map(customer => this.customerToVM(customer));
        });
    }
    getCustomerInfo(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const customerEntity = yield this.customerGateway.getCustomer(customerId);
            return this.customerToVM(customerEntity);
        });
    }
    customerToVM(customerEntity) {
        return new CustomerVM_1.default(customerEntity.getCustomerId(), customerEntity.getName(), customerEntity.getDnsName(), customerEntity.getStoreProtectionCode(), customerEntity.getFirstColor(), customerEntity.getSecondColor(), customerEntity.getThirdColor());
    }
}
exports.default = CustomerFacade;
//# sourceMappingURL=CustomerFacade.js.map