import WeightPriceDS from "../models/datastores/WeightPriceDS";
import WeightPriceVM from "../models/viewmodels/WeightPriceVM";

export default interface IWeightPriceRequester {
    addWeightPriceForDeliveryOption(weightPrice: WeightPriceDS): Promise<void>;

    getWeightPriceForDeliveryOption(deliveryOptionId: string): Promise<Array<WeightPriceVM>>;
}