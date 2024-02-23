import bcrypt from "bcryptjs";
import PasswordHashDS from "../models/datastores/PasswordHashDS";

export default class PasswordHasher {
    static async hashPassword(passwordNoHash: string, salt?: string): Promise<PasswordHashDS> {
        let localSalt: string | null;
        if (salt) {
            localSalt = salt
        } else {
            localSalt = await bcrypt.genSalt(10);
        }
        const hashedPassword = await bcrypt.hash(passwordNoHash, localSalt);
        return new PasswordHashDS(hashedPassword, localSalt);
    }
}