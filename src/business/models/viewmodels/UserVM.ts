export default class UserVM {
    private readonly name: string;
    private readonly firstName: string;
    private readonly email: string;
    private readonly isAdminStore: boolean;
    private readonly isLoggedIn: boolean;

    constructor(name: string, firstName: string, email: string, isAdminStore: boolean, isLoggedIn: boolean) {
        this.name = name;
        this.firstName = firstName;
        this.email = email;
        this.isAdminStore = isAdminStore;
        this.isLoggedIn = isLoggedIn;
    }
}