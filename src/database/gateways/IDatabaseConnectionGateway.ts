export default interface IDatabaseConnectionGateway {
    testConnect(): Promise<void>;
}