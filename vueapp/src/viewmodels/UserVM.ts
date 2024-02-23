export default class UserVM {
    private readonly email: string;
    private readonly name: string;
    private readonly firstName: string;
    private readonly isAdmin: boolean;
    private readonly isLoggedIn: boolean


    constructor(email: string, name: string, firstName: string, isAdmin: boolean, isLoggedIn: boolean) {
        this.email = email;
        this.name = name;
        this.firstName = firstName;
        this.isAdmin = isAdmin;
        this.isLoggedIn = isLoggedIn;
    }


    public getEmail(): string {
        return this.email;
    }

    public getName(): string {
        return this.name;
    }

    public getFirstName(): string {
        return this.firstName;
    }

    public getIsAdmin(): boolean {
        return this.isAdmin;
    }

    public getIsLoggedIn(): boolean {
        return this.isLoggedIn;
    }
}