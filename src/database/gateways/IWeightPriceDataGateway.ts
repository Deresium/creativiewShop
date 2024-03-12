import WeightPriceDS from "../../business/models/datastores/WeightPriceDS";
import WeightPriceEntity from "../entities/WeightPriceEntity";

export default interface IWeightPriceDataGateway {
    addWeightPriceForGeographicZone(weightPrice: WeightPriceDS): Promise<void>;

    getWeightPriceForGeographicZone(geographicZoneId: string): Promise<Array<WeightPriceEntity>>;
}