import IDeliveryOptionRequester from "../requesters/IDeliveryOptionRequester";
import DeliveryOptionVM from "../models/viewmodels/DeliveryOptionVM";
import DeliveryOptionUpdateDS from "../models/datastores/DeliveryOptionUpdateDS";
import IDeliveryOptionDataGateway from "../../database/gateways/IDeliveryOptionDataGateway";
import DeliveryOptionEntity from "../../database/entities/DeliveryOptionEntity";
import DeliveryOptionStoreVM from "../models/viewmodels/DeliveryOptionStoreVM";
import DeliveryOptionStoreBuilder from "../utils/DeliveryOptionStoreBuilder";
import CustomerVM from "../models/viewmodels/CustomerVM";
import ICurrencyRateRequester from "../requesters/ICurrencyRateRequester";

export default class DeliveryOptionFacade implements IDeliveryOptionRequester {
    private readonly deliveryOptionDataGateway: IDeliveryOptionDataGateway;
    private readonly currencyRateRequester: ICurrencyRateRequester;

    constructor(deliveryOptionDataGateway: IDeliveryOptionDataGateway, currencyRateRequester: ICurrencyRateRequester) {
        this.deliveryOptionDataGateway = deliveryOptionDataGateway;
        this.currencyRateRequester = currencyRateRequester;
    }

    public async addDeliveryOption(customerId: number): Promise<string> {
        return await this.deliveryOptionDataGateway.addDeliveryOption(customerId);
    }

    public async deleteDeliveryOption(deliveryOptionId: string, customerId: number): Promise<void> {
        await this.deliveryOptionDataGateway.deleteDeliveryOption(deliveryOptionId, customerId);
    }

    public async deliveryOptionExistsForCustomer(deliveryOptionId: string, customerId: number): Promise<boolean> {
        return await this.deliveryOptionDataGateway.deliveryOptionExistsForCustomer(deliveryOptionId, customerId);
    }

    public async getDeliveryOption(deliveryOptionId: string, customerId: number): Promise<DeliveryOptionVM> {
        const deliveryOption = await this.deliveryOptionDataGateway.getDeliveryOption(deliveryOptionId, customerId);
        return this.deliveryOptionToDeliveryOptionVM(deliveryOption);
    }

    public async getDeliveryOptions(customerId: number): Promise<Array<DeliveryOptionVM>> {
        const deliveryOptions = await this.deliveryOptionDataGateway.getDeliveryOptions(customerId);
        return deliveryOptions.map((deliveryOption: any) => this.deliveryOptionToDeliveryOptionVM(deliveryOption));
    }

    public async updateDeliveryOption(deliveryOptionUpdate: DeliveryOptionUpdateDS): Promise<void> {
        await this.deliveryOptionDataGateway.updateDeliveryOption(deliveryOptionUpdate);
    }

    public async getDeliveryOptionsForCountry(customer: CustomerVM, countryId: number, weight: number, currencyCode: string, currencyRates: Map<string, number>): Promise<Array<DeliveryOptionStoreVM>> {
        const deliveryOptionStores = new Array<DeliveryOptionStoreVM>();
        const deliveryOptions = await this.deliveryOptionDataGateway.getDeliveryOptionsForCountry(customer.getCustomerId(), countryId);
        for (const deliveryOption of deliveryOptions) {
            deliveryOptionStores.push(new DeliveryOptionStoreBuilder(deliveryOption, customer, currencyRates, weight, currencyCode).buildDeliveryOptionStore());
        }
        return deliveryOptionStores;
    }

    public async getDeliveryOptionById(customer: CustomerVM, deliveryOptionId: string, weight: number, currencyCode: string, currencyRates: Map<string, number>): Promise<DeliveryOptionStoreVM> {
        const deliveryOption = await this.deliveryOptionDataGateway.getDeliveryOption(deliveryOptionId, customer.getCustomerId());
        return new DeliveryOptionStoreBuilder(deliveryOption, customer, currencyRates, weight, currencyCode).buildDeliveryOptionStore();
    }

    private deliveryOptionToDeliveryOptionVM(deliveryOption: DeliveryOptionEntity): DeliveryOptionVM {
        return new DeliveryOptionVM(deliveryOption.getDeliveryOptionId(), deliveryOption.getNameFr(), deliveryOption.getActive());
    }
}