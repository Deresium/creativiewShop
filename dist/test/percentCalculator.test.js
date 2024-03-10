"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PercentCalculator_1 = __importDefault(require("../business/utils/PercentCalculator"));
describe('Test Percent Calculator', () => {
    test('original price 1000 discount 800', () => {
        const percent = PercentCalculator_1.default.calculatePercentBasedOnPrices(1000, 800);
        expect(percent).toBe(20);
    });
    test('original price 500 discount 0', () => {
        const percent = PercentCalculator_1.default.calculatePercentBasedOnPrices(500, 0);
        expect(percent).toBe(100);
    });
    test('original price 500 discount 800', () => {
        const percent = PercentCalculator_1.default.calculatePercentBasedOnPrices(500, 800);
        expect(percent).toBe(-60);
    });
});
//# sourceMappingURL=percentCalculator.test.js.map