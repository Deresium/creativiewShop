export default class PaymentMethodCustomerVM {
    private readonly customerId: number;
    private readonly customerName: string;
    private readonly key: string;
    private readonly encryptedSecret: string;


    constructor(customerId: number, customerName: string, key: string, encryptedSecret: string) {
        this.customerId = customerId;
        this.customerName = customerName;
        this.key = key;
        this.encryptedSecret = encryptedSecret;
    }
}