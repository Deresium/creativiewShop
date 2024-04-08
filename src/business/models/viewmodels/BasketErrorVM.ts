export default class BasketErrorVM {
    private readonly id: string;
    private readonly reason: string;


    constructor(id: string, reason: string) {
        this.id = id;
        this.reason = reason;
    }
}