import DatabaseSingleton from "../DatabaseSingleton";
import IDatabaseConnectionGateway from "../gateways/IDatabaseConnectionGateway";

export default class DatabaseConnectionMapper implements IDatabaseConnectionGateway {
    async testConnect() {
        await DatabaseSingleton.getInstance().testConnect();
    }
}