export default class LoginInfoDS {
    private readonly email: string;
    private readonly customerId: number;
    private readonly password: string;


    constructor(email: string, customerId: number, password: string) {
        this.email = email;
        this.customerId = customerId;
        this.password = password;
    }


    public getEmail(): string {
        return this.email;
    }

    public getCustomerId(): number {
        return this.customerId;
    }

    public getPassword(): string {
        return this.password;
    }
}