import CustomerVM from "../viewmodels/CustomerVM";

export default class UserCreationDS {
    private readonly email: string;
    private readonly password: string;
    private readonly repeatPassword: string;
    private readonly name: string;
    private readonly firstName: string;
    private readonly customer: CustomerVM;
    private readonly language: string;

    constructor(email: string, password: string, repeatPassword: string, name: string, firstName: string, customer: CustomerVM, language: string) {
        this.email = email;
        this.password = password;
        this.repeatPassword = repeatPassword;
        this.name = name;
        this.firstName = firstName;
        this.customer = customer;
        this.language = language;
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

    public getCustomer() {
        return this.customer;
    }


    public getLanguage(): string {
        return this.language;
    }
}