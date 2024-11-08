export default class BasketErrorVM {
    private readonly id: string;
    private readonly label: string;
    private readonly reason: string;


    constructor(id: string, label: string, reason: string) {
        this.id = id;
        this.label = label;
        this.reason = reason;
    }
}