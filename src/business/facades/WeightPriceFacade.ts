import IWeightPriceRequester from "../requesters/IWeightPriceRequester";
import IWeightPriceDataGateway from "../../database/gateways/IWeightPriceDataGateway";
import WeightPriceDS from "../models/datastores/WeightPriceDS";
import WeightPriceVM from "../models/viewmodels/WeightPriceVM";

export default class WeightPriceFacade implements IWeightPriceRequester {
    private readonly weightPriceDataGateway: IWeightPriceDataGateway;


    constructor(weightPriceDataGateway: IWeightPriceDataGateway) {
        this.weightPriceDataGateway = weightPriceDataGateway;
    }

    public async addWeightPriceForGeographicZone(weightPrice: WeightPriceDS): Promise<void> {
        await this.weightPriceDataGateway.addWeightPriceForGeographicZone(weightPrice);
    }

    public async getWeightPriceForGeographicZone(geographicZoneId: string): Promise<Array<WeightPriceVM>> {
        const weightPrices = await this.weightPriceDataGateway.getWeightPriceForGeographicZone(geographicZoneId);
        return weightPrices.map(weightPrice => {
            const startDate = weightPrice.getStartDate().toISOString();

            let price: string = null;
            if(weightPrice.getPrice()){
                price = Number(weightPrice.getPrice()).toFixed(2);
            }

            let gram: string = null;
            if(weightPrice.getGram()){
                gram = Number(weightPrice.getGram()).toFixed(2);
            }

            return new WeightPriceVM(gram, price, startDate);
        });
    }


}