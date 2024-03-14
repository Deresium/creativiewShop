import WeightPriceDS from "../../business/models/datastores/WeightPriceDS";
import WeightPriceEntity from "../entities/WeightPriceEntity";

export default interface IWeightPriceDataGateway {
    addWeightPriceForDeliveryOption(weightPrice: WeightPriceDS): Promise<void>;

    getWeightPriceForDeliveryOption(deliveryOptionId: string): Promise<Array<WeightPriceEntity>>;
}