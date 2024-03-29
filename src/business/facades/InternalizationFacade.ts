import IInternalizationRequester from "../requesters/IInternalizationRequester";
import InternalizationVM from "../models/viewmodels/InternalizationVM";
import IInternalizationDataGateway from "../../database/gateways/IInternalizationDataGateway";

export default class InternalizationFacade implements IInternalizationRequester {
    private readonly internalizationDataGateway: IInternalizationDataGateway;

    constructor(internalizationDataGateway: IInternalizationDataGateway) {
        this.internalizationDataGateway = internalizationDataGateway;
    }

    public async getInternalizationMessagesForCustomer(customerId: number): Promise<Array<InternalizationVM>> {
        const internalizationMessages = await this.internalizationDataGateway.getAllInternalizationForCustomer(customerId);
        const mapMessages = new Map<string, InternalizationVM>();
        for (const internalizationMessage of internalizationMessages) {
            const key = internalizationMessage.getInternalizationKey();
            const internalizationVM = new InternalizationVM(key, internalizationMessage.getTextFR(), internalizationMessage.getTextEN());

            if (internalizationMessage.getCustomerId() === 0) {
                if (!mapMessages.has(key)) {
                    mapMessages.set(key, internalizationVM);
                }
            } else {
                mapMessages.set(key, internalizationVM);
            }
        }
        return Array.from(mapMessages.values());
    }

}