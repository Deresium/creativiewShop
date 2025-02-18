export default class UserVM {
    private readonly email: string;
    private readonly name: string;
    private readonly firstName: string;
    private readonly isAdminStore: boolean;
    private readonly isAdminGlobal: boolean;
    private readonly isLoggedIn: boolean;


    constructor(email: string, name: string, firstName: string, isAdminStore: boolean, isAdminGlobal: boolean, isLoggedIn: boolean) {
        this.email = email;
        this.name = name;
        this.firstName = firstName;
        this.isAdminStore = isAdminStore;
        this.isAdminGlobal = isAdminGlobal;
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

    public getIsAdminStore(): boolean {
        return this.isAdminStore;
    }


    public getIsAdminGlobal(): boolean {
        return this.isAdminGlobal;
    }

    public getIsLoggedIn(): boolean {
        return this.isLoggedIn;
    }
}