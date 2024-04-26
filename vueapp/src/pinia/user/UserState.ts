export default class UserState {
    private email: string;
    private name: string;
    private firstName: string;
    private isAdminStore: boolean;
    private isAdminGlobal: boolean;
    private isLoggedIn: boolean;


    public getEmail(): string {
        return this.email;
    }

    public setEmail(value: string) {
        this.email = value;
    }

    public getNameFirstName() {
        return `${this.firstName} ${this.name}`;
    }

    public setName(value: string) {
        this.name = value;
    }

    public setFirstName(value: string) {
        this.firstName = value;
    }

    public getIsAdminStore(): boolean {
        return this.isAdminStore;
    }

    public setIsAdminStore(value: boolean) {
        this.isAdminStore = value;
    }

    public getIsLoggedIn(): boolean {
        return this.isLoggedIn;
    }

    public setIsLoggedIn(value: boolean) {
        this.isLoggedIn = value;
    }


    public getIsAdminGlobal(): boolean {
        return this.isAdminGlobal;
    }

    public setIsAdminGlobal(value: boolean) {
        this.isAdminGlobal = value;
    }
}