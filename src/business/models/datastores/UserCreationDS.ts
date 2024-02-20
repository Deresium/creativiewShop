export default class UserCreationDS {
    private readonly email: string;
    private readonly password: string;
    private readonly repeatPassword: string;
    private readonly name: string;
    private readonly firstName: string;
    private readonly customerId: number;

    constructor(email: string, password: string, repeatPassword: string, name: string, firstName: string, customerId: number) {
        this.email = email;
        this.password = password;
        this.repeatPassword = repeatPassword;
        this.name = name;
        this.firstName = firstName;
        this.customerId = customerId
    }

    public getEmail() {
        return this.email;
    }

    public getPassword() {
        return this.password;
    }

    public getRepeatPassword() {
        return this.repeatPassword;
    }

    public getName() {
        return this.name;
    }

    public getFirstName() {
        return this.firstName;
    }

    public getCustomerId() {
        return this.customerId;
    }

}