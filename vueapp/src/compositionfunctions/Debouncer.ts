export default class Debouncer {
    private readonly timeoutInMs: number;
    private readonly functionToExecute: (...args: any[]) => any;
    private timer: number;

    constructor(timeoutInMs: number, functionToExecute: (...args: any[]) => any) {
        this.timeoutInMs = timeoutInMs;
        this.functionToExecute = functionToExecute;
    }

    public debounce(functionArgs?: any[]): Promise<any> {
        return new Promise((resolve) => {
            clearTimeout(this.timer);
            this.timer = window.setTimeout(async () => {
                if (functionArgs) {
                    resolve(await this.functionToExecute(...functionArgs));
                    return;
                }
                resolve(await this.functionToExecute());
            }, this.timeoutInMs);
        });
    }
}