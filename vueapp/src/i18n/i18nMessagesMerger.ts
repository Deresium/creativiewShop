import i18n from "./i18n.ts";
import InternalizationVM from "../viewmodels/InternalizationVM.ts";

export default class I18nMessagesMerger {
    private static i18nGlobal = i18n.global;

    public addMessages(messages: Array<InternalizationVM>) {
        I18nMessagesMerger.i18nGlobal.mergeLocaleMessage('fr', this.toFR(messages));
        I18nMessagesMerger.i18nGlobal.mergeLocaleMessage('en', this.toEN(messages));
    }

    private toFR(messageResources: Array<InternalizationVM>): Object {
        const objToReturn: any = {};
        for(const msg of messageResources){
            objToReturn[msg.getInternalizationKey()] = msg.getTextFR();
        }
        return objToReturn;
    }

    private toEN(messageResources: Array<InternalizationVM>): Object {
        const objToReturn: any = {};
        for(const msg of messageResources){
            objToReturn[msg.getInternalizationKey()] = msg.getTextEN();
        }
        return objToReturn;
    }
}