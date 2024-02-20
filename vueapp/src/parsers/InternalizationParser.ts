import InternalizationVM from "../viewmodels/InternalizationVM.ts";

export default class InternalizationParser {
    public static parseInternalizationMessages(internalizationMessages: any): Array<InternalizationVM> {
        const internalizationsVM = new Array<InternalizationVM>();
        for (const internalization of internalizationMessages) {
            internalizationsVM.push(this.parseInternalizationMessage(internalization));
        }
        return internalizationsVM;
    }

    private static parseInternalizationMessage(internalizationMessage: any): InternalizationVM {
        return new InternalizationVM(internalizationMessage.internalizationKey, internalizationMessage.textFR, internalizationMessage.textEN);
    }
}