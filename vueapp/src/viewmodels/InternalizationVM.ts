export default class InternalizationVM {
    private readonly internalizationKey: string;
    private readonly textFR: string;
    private readonly textEN: string;

    constructor(internalizationKey: string, textFR: string, textEN: string) {
        this.internalizationKey = internalizationKey;
        this.textFR = textFR;
        this.textEN = textEN;
    }


    public getInternalizationKey(): string {
        return this.internalizationKey;
    }

    public getTextFR(): string {
        return this.textFR;
    }

    public getTextEN(): string {
        return this.textEN;
    }
}