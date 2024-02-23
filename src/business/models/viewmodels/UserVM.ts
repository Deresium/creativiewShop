export default class UserVM {
    private readonly name: string;
    private readonly firstName: string;
    private readonly email: string;
    private readonly isAdmin: boolean;
    private readonly isLoggedIn: boolean;

    constructor(name: string, firstName: string, email: string, isAdmin: boolean, isLoggedIn) {
        this.name = name;
        this.firstName = firstName;
        this.email = email;
        this.isAdmin = isAdmin;
        this.isLoggedIn = isLoggedIn;
    }
}