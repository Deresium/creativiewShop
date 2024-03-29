import i18n from "../i18n/i18n.ts";
import RulerOptions from "./RulerOptions.ts";
import * as validator from "validator";

export default class Ruler {
    private static readonly t = i18n.global.t;
    private readonly rulerOptions: RulerOptions;

    constructor(rulerOptions: RulerOptions) {
        this.rulerOptions = rulerOptions;
    }

    public notEmpty = (value: any) => {
        if (!value || (typeof value === 'string' && validator.isEmpty(value))) {
            return Ruler.t('error.notEmpty', {field: this.rulerOptions.fieldName});
        }
        return true;
    };

    public isEmail = (value: any) => {
        if (!validator.isEmail(value)) {
            return Ruler.t('error.email', {field: this.rulerOptions.fieldName});
        }
        return true;
    };

    public isStrongPassword = (value: any) => {
        const minLength = 8;
        if (!validator.isStrongPassword(value, {minLength: minLength, minUppercase: 1, minNumbers: 1, minSymbols: 0})) {
            return Ruler.t('error.password', {field: this.rulerOptions.fieldName, min: minLength});
        }
        return true;
    };

    public isSamePassword = (value: any) => {
        if (value !== this.rulerOptions.compareTo) {
            return Ruler.t('error.noMatchPassword');
        }
        return true;
    };

    public isSameValue = (value: any) => {
        if (value && value === this.rulerOptions.compareTo) {
            return Ruler.t('error.sameValue', {
                field: this.rulerOptions.fieldName,
                valueTxt: this.rulerOptions.valueTxt
            });
        }
        return true;
    }
}