export default class UserState {
    private email: string;
    private name: string;
    private firstName: string;
    private isAdmin: boolean;
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

    public getIsAdmin(): boolean {
        return this.isAdmin;
    }

    public setIsAdmin(value: boolean) {
        this.isAdmin = value;
    }

    public getIsLoggedIn(): boolean {
        return this.isLoggedIn;
    }

    public setIsLoggedIn(value: boolean) {
        this.isLoggedIn = value;
    }
}