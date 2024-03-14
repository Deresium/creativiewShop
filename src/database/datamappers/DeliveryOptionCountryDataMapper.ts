import IDeliveryOptionCountryDataGateway from "../gateways/IDeliveryOptionCountryDataGateway";
import DeliveryOptionCountryEntity from "../entities/DeliveryOptionCountryEntity";
import CountryEntity from "../entities/CountryEntity";

export default class DeliveryOptionCountryDataMapper implements IDeliveryOptionCountryDataGateway {
    public async addDeliveryOptionCountry(deliveryOptionId: string, countryId: number): Promise<void> {
        await DeliveryOptionCountryEntity.create({
            deliveryOptionId: deliveryOptionId,
            countryId: countryId
        });
    }

    public async deleteDeliveryOptionCountry(deliveryOptionId: string, countryId: number): Promise<void> {
        await DeliveryOptionCountryEntity.destroy({
            where: {
                deliveryOptionId: deliveryOptionId,
                countryId: countryId
            }
        });
    }

    public async getDeliveryOptionCountries(deliveryOptionId: string): Promise<Array<DeliveryOptionCountryEntity>> {
        return await DeliveryOptionCountryEntity.findAll({
            where: {
                deliveryOptionId: deliveryOptionId
            },
            include: [{model: CountryEntity, as: 'country'}]
        });
    }

}