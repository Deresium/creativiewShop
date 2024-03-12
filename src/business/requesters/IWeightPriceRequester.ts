import WeightPriceDS from "../models/datastores/WeightPriceDS";
import WeightPriceVM from "../models/viewmodels/WeightPriceVM";

export default interface IWeightPriceRequester {
    addWeightPriceForGeographicZone(weightPrice: WeightPriceDS): Promise<void>;

    getWeightPriceForGeographicZone(geographicZoneId: string): Promise<Array<WeightPriceVM>>;
}