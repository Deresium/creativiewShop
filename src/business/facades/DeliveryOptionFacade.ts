import IDeliveryOptionRequester from "../requesters/IDeliveryOptionRequester";
import DeliveryOptionVM from "../models/viewmodels/DeliveryOptionVM";
import DeliveryOptionUpdateDS from "../models/datastores/DeliveryOptionUpdateDS";
import IDeliveryOptionDataGateway from "../../database/gateways/IDeliveryOptionDataGateway";
import DeliveryOptionEntity from "../../database/entities/DeliveryOptionEntity";

export default class DeliveryOptionFacade implements IDeliveryOptionRequester {
    private readonly deliveryOptionDataGateway: IDeliveryOptionDataGateway;

    constructor(deliveryOptionDataGateway: IDeliveryOptionDataGateway) {
        this.deliveryOptionDataGateway = deliveryOptionDataGateway;
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

    private deliveryOptionToDeliveryOptionVM(deliveryOption: DeliveryOptionEntity): DeliveryOptionVM {
        return new DeliveryOptionVM(deliveryOption.getDeliveryOptionId(), deliveryOption.getNameFr(), deliveryOption.getActive());
    }

}