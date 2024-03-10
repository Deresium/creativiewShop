export default class ProductOptionListAdminVM {
    private readonly nameFr: string;
    private readonly active: boolean;
    private readonly stock: number;
    private readonly price: string;


    constructor(nameFr: string, active: boolean, stock: number, price: string) {
        this.nameFr = nameFr;
        this.active = active;
        this.stock = stock;
        this.price = price;
    }
}