import Ruler from "./Ruler.ts";

const useRules = () => {
    const notEmpty = (fieldName: string) => {
        return new Ruler({fieldName}).notEmpty;
    };

    const isEmail = (fieldName: string) => {
        return new Ruler({fieldName}).isEmail;
    };

    const isStrongPassword = (fieldName: string) => {
        return new Ruler({fieldName}).isStrongPassword;
    };

    const isSamePassword = (password: any) => {
        return new Ruler({compareTo: password}).isSamePassword;
    };

    const isSameValue = (fieldName: string, value: any, valueTxt: string) => {
        return new Ruler({fieldName, compareTo: value, valueTxt}).isSameValue;
    };

    return {
        notEmpty,
        isEmail,
        isStrongPassword,
        isSamePassword,
        isSameValue
    }
};

export default useRules;