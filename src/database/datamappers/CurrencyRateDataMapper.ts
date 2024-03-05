import ICurrencyRateDataGateway from "../gateways/ICurrencyRateDataGateway";
import CurrencyRateEntity from "../entities/CurrencyRateEntity";
import DatabaseSingleton from "../DatabaseSingleton";
import {Op, Transaction} from "sequelize";
import {now} from "sequelize/types/utils";
import CurrencyEntity from "../entities/CurrencyEntity";

export default class CurrencyRateDataMapper implements ICurrencyRateDataGateway {
    public async addCurrencyRate(currencyCode: string, rate: number, customerId: number): Promise<void> {
        const now = Date.now();
        await DatabaseSingleton.getInstance().getSequelize().transaction(async (t: Transaction) => {
            await CurrencyRateEntity.update({
                endDate: now
            },{
                where: {
                    customerId: customerId,
                    currencyCode: currencyCode,
                    endDate: {
                        [Op.eq]: null
                    }
                },
                transaction: t
            });

            await CurrencyRateEntity.create({
                currencyCode: currencyCode,
                rate: rate,
                customerId: customerId,
                startDate: now
            }, {transaction: t});
        });
    }

    public async getCurrencyRates(currencyCode: string, customerId: number): Promise<Array<CurrencyRateEntity>> {
        return await CurrencyRateEntity.findAll({
            where: {
                customerId: customerId,
                currencyCode: currencyCode
            }
        });
    }

    public async getCurrency(): Promise<Array<CurrencyEntity>> {
        return await CurrencyEntity.findAll();
    }



}