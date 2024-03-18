export default class UserEmailVM {
    private readonly name: string;
    private readonly firstName: string;
    private readonly email: string;
    private readonly language: string;

    constructor(name: string, firstName: string, email: string, language: string) {
        this.name = name;
        this.firstName = firstName;
        this.email = email;
        this.language = language;
    }


    public getName(): string {
        return this.name;
    }

    public getFirstName(): string {
        return this.firstName;
    }

    public getEmail(): string {
        return this.email;
    }
    
    public getLanguage(): string {
        return this.language;
    }
}