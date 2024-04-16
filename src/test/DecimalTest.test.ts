import Decimal from "decimal.js";

describe('Test Decimal.js', () => {

    test('0.1+0.2=0.3', () => {
        const result = new Decimal(0.1).add(new Decimal(0.2));
        expect(result.toString()).toEqual('0.3');
    });

    test('0.1+0.2!=0.3', () => {
        const result = 0.1 + 0.2;
        expect(result.toString()).not.toEqual('0.3');
    });

    test('2%0.2 === 0', () => {
        const result = new Decimal(2).modulo(0.2);
        expect(result.toString()).toEqual('0');
    });

    test('2%0.2 !== 0', () => {
        const result = 2%0.2;
        expect(result.toString()).not.toBe('0');
    });
});