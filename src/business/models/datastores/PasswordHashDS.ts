export default class PasswordHashDS {
    private readonly hashedPassword: string;
    private readonly salt: string;

    constructor(hashedPassword: string, salt: string) {
        this.hashedPassword = hashedPassword;
        this.salt = salt;
    }

    getHashedPassword() {
        return this.hashedPassword;
    }

    getSalt() {
        return this.salt;
    }
}