import InternalizationEntity from "../entities/InternalizationEntity";

export default interface IInternalizationDataGateway {
    getAllInternalizationForCustomer(customerId: number): Promise<Array<InternalizationEntity>>;
}