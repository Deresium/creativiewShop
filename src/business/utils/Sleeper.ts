export default class Sleeper {
    public sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}