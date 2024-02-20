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
const InternalizationVM_1 = __importDefault(require("../models/viewmodels/InternalizationVM"));
class InternalizationFacade {
    constructor(internalizationDataGateway) {
        this.internalizationDataGateway = internalizationDataGateway;
    }
    getInternalizationMessagesForCustomer(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const internalizationMessages = yield this.internalizationDataGateway.getAllInternalizationForCustomer(customerId);
            const mapMessages = new Map();
            for (const internalizationMessage of internalizationMessages) {
                const key = internalizationMessage.getInternalizationKey();
                const internalizationVM = new InternalizationVM_1.default(key, internalizationMessage.getTextFR(), internalizationMessage.getTextEN());
                if (internalizationMessage.getCustomerId() === 0) {
                    if (!mapMessages.has(key)) {
                        mapMessages.set(key, internalizationVM);
                    }
                }
                else {
                    mapMessages.set(key, internalizationVM);
                }
            }
            return Array.from(mapMessages.values());
        });
    }
}
exports.default = InternalizationFacade;
//# sourceMappingURL=InternalizationFacade.js.map