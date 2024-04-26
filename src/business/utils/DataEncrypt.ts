import crypto from "crypto"

export default class DataEncrypt {
    private static readonly ALGORITHM = "aes-256-cbc";

    public encrypt(data: string) {
        const cipher = crypto.createCipheriv(DataEncrypt.ALGORITHM, Buffer.from(process.env.CRYPTO_KEY, 'hex'), Buffer.from(process.env.CRYPTO_IV, 'hex'));
        let encrypted = cipher.update(data, 'utf-8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }

    public decrypt(data: string) {
        const decipher = crypto.createDecipheriv(DataEncrypt.ALGORITHM, Buffer.from(process.env.CRYPTO_KEY, 'hex'), Buffer.from(process.env.CRYPTO_IV, 'hex'));
        let decrypted = decipher.update(data, 'hex', 'utf-8');
        decrypted += decipher.final('utf-8');
        return decrypted;
    }
}