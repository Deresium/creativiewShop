import DataEncrypt from "../business/utils/DataEncrypt";

describe('Test Encryption', () => {

    test('encrypt and decrypt dog must equals dog', () => {
        const encrypt = new DataEncrypt().encrypt('dog');
        console.log(encrypt);
        const decrypt = new DataEncrypt().decrypt(encrypt);
        expect(decrypt).toEqual('dog');
    });
});